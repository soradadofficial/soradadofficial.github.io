# Shared helpers for the Blender build scripts (metres; X right, Y depth, Z up).
import bpy, bmesh, math, os
from mathutils import Vector

scene = None
MATS = {}

def reset():
    global scene
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    MATS.clear()
    return scene

def srgb(h):
    h = h.lstrip('#'); c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c)

def mat(name, color, rough=0.6, metal=0.0, emit=None, strength=0.0, alpha=1.0):
    if name in MATS: return MATS[name]
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    m.use_backface_culling = alpha == 1.0
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*srgb(color), 1)
    b.inputs['Roughness'].default_value = rough
    b.inputs['Metallic'].default_value = metal
    if emit:
        b.inputs['Emission Color'].default_value = (*srgb(emit), 1)
        b.inputs['Emission Strength'].default_value = strength
    if alpha < 1.0:
        b.inputs['Alpha'].default_value = alpha
        try: m.surface_render_method = 'BLENDED'
        except Exception: m.blend_method = 'BLEND'
    MATS[name] = m
    return m

def obj_from_bm(name, bm, material, parent, smooth=True, recalc=False, angle=38):
    me = bpy.data.meshes.new(name)
    if recalc: bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    bm.normal_update(); bm.to_mesh(me); bm.free()
    me.materials.append(material)
    if smooth:
        for p in me.polygons: p.use_smooth = True
        me.set_sharp_from_angle(angle=math.radians(angle))
    o = bpy.data.objects.new(name, me)
    scene.collection.objects.link(o)
    o.parent = parent
    return o

def box(name, size, loc, material, parent, bevel=0.0, rot=(0, 0, 0), seg=2):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1)
    bmesh.ops.scale(bm, vec=Vector(size), verts=bm.verts)
    if bevel > 0:
        bmesh.ops.bevel(bm, geom=bm.edges[:], offset=min(bevel, min(size) * 0.45), segments=seg, profile=0.6, affect='EDGES')
    o = obj_from_bm(name, bm, material, parent)
    o.location = loc; o.rotation_euler = rot
    return o

def soft(name, size, loc, material, parent, rot=(0, 0, 0), puff=0.5):
    # cushion / pillow / duvet: a subdivided, rounded box
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1)
    bmesh.ops.subdivide_edges(bm, edges=bm.edges[:], cuts=3, use_grid_fill=True)
    for v in bm.verts:
        n = Vector((v.co.x, v.co.y, v.co.z)); r = max(abs(n.x), abs(n.y), abs(n.z))
        s = n.normalized() * 0.5 * (1 + 0.25 * puff)
        v.co = n.lerp(s, puff * 0.55) if r > 0 else n
    bmesh.ops.scale(bm, vec=Vector(size), verts=bm.verts)
    o = obj_from_bm(name, bm, material, parent, angle=80)
    o.location = loc; o.rotation_euler = rot
    return o

def cyl(name, r1, r2, depth, loc, material, parent, verts=20, rot=(0, 0, 0), caps=True):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=caps, segments=verts, radius1=r1, radius2=r2, depth=depth)
    o = obj_from_bm(name, bm, material, parent)
    o.location = loc; o.rotation_euler = rot
    return o

def ball(name, r, loc, material, parent, sub=2, scale=(1, 1, 1)):
    bm = bmesh.new()
    bmesh.ops.create_icosphere(bm, subdivisions=sub, radius=r)
    bmesh.ops.scale(bm, vec=Vector(scale), verts=bm.verts)
    o = obj_from_bm(name, bm, material, parent, angle=80)
    o.location = loc
    return o

def beam(name, a, b, th, material, parent, verts=8):
    a, b = Vector(a), Vector(b); d = b - a
    o = cyl(name, th, th, d.length, (a + b) / 2, material, parent, verts=verts)
    o.rotation_mode = 'QUATERNION'; o.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(d.normalized())
    return o

def lathe(name, profile, material, parent, steps=32, loc=(0, 0, 0)):
    bm = bmesh.new(); rings = []
    for r, z in profile:
        rings.append([bm.verts.new((r * math.cos(2 * math.pi * k / steps), r * math.sin(2 * math.pi * k / steps), z)) for k in range(steps)])
    for i in range(len(rings) - 1):
        for k in range(steps):
            bm.faces.new((rings[i][k], rings[i][(k + 1) % steps], rings[i + 1][(k + 1) % steps], rings[i + 1][k]))
    o = obj_from_bm(name, bm, material, parent)
    o.location = loc
    return o

def plane(name, sx, sy, loc, material, parent, rot=(0, 0, 0), wave=0.0, cuts=0):
    # flat panel in XY (rotate as needed); wave > 0 makes curtain folds along X
    bm = bmesh.new(); nx = max(1, cuts)
    rows = [[bm.verts.new(((i / nx - 0.5) * sx, (j - 0.5) * sy, wave * math.sin(i * 1.9))) for i in range(nx + 1)] for j in (0, 1)]
    for i in range(nx): bm.faces.new((rows[0][i], rows[0][i + 1], rows[1][i + 1], rows[1][i]))
    o = obj_from_bm(name, bm, material, parent, angle=80)
    o.location = loc; o.rotation_euler = rot
    return o

def shell(name, x0, x1, a, b, material, parent, seg=20, bulge=0.0, thick=0.4, nx=None):
    # elliptical arch skin along X from x0 to x1 (half-width a, height b); bulge pillows the bay
    bm = bmesh.new(); nx = nx or (4 if bulge else 1); rows = []
    for i in range(nx + 1):
        u = i / nx; k = 1 + bulge * math.sin(u * math.pi)
        rows.append([bm.verts.new((x0 + (x1 - x0) * u, a * k * math.cos(math.pi * j / seg), b * k * math.sin(math.pi * j / seg))) for j in range(seg + 1)])
    for i in range(nx):
        for j in range(seg):
            bm.faces.new((rows[i][j], rows[i + 1][j], rows[i + 1][j + 1], rows[i][j + 1]))
    if thick: bmesh.ops.solidify(bm, geom=bm.faces[:], thickness=thick)
    return obj_from_bm(name, bm, material, parent, recalc=True)

def arc_rib(name, x, a, b, r, material, parent, seg=20):
    # steel rib following the ellipse at station x
    bm = bmesh.new(); rings = []; n = 5
    for j in range(seg + 1):
        t = math.pi * j / seg
        c = Vector((x, a * math.cos(t), b * math.sin(t)))
        nrm = Vector((0, b * math.cos(t), a * math.sin(t))).normalized()
        rings.append([bm.verts.new(c + nrm * (r * math.cos(2 * math.pi * k / n)) + Vector((r * math.sin(2 * math.pi * k / n), 0, 0))) for k in range(n)])
    for j in range(seg):
        for k in range(n):
            bm.faces.new((rings[j][k], rings[j][(k + 1) % n], rings[j + 1][(k + 1) % n], rings[j + 1][k]))
    return obj_from_bm(name, bm, material, parent, recalc=True)

def group(name, parent, loc=(0, 0, 0), rot_z=0.0):
    e = bpy.data.objects.new(name, None); scene.collection.objects.link(e); e.parent = parent
    e.location = loc; e.rotation_euler = (0, 0, rot_z)
    return e

def join_by_material(root):
    bpy.context.view_layer.update()
    groups = {}
    for o in [o for o in scene.objects if o.type == 'MESH']:
        p = o
        while p.parent: p = p.parent
        if p is root: groups.setdefault(o.data.materials[0].name, []).append(o)
    out = []
    for name, objs in groups.items():
        bpy.ops.object.select_all(action='DESELECT')
        for o in objs:
            mw = o.matrix_world.copy(); o.parent = None; o.matrix_world = mw; o.select_set(True)
        bpy.context.view_layer.objects.active = objs[0]
        if len(objs) > 1: bpy.ops.object.join()
        j = bpy.context.view_layer.objects.active
        bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
        j.name = f'{root.name}_{name}'; j.parent = root
        out.append(j)
    def under(o):
        while o.parent: o = o.parent
        return o is root
    for o in [o for o in scene.objects if o.type == 'EMPTY' and o is not root and under(o)]:
        bpy.data.objects.remove(o)
    return out

def bake_ao(objs, samples=64, distance=1.2, floor=0.55):
    # short-range ambient occlusion into vertex colours: contact shadows, not a dark room
    scene.render.engine = 'CYCLES'
    scene.cycles.device = 'CPU'; scene.cycles.samples = samples
    scene.render.bake.target = 'VERTEX_COLORS'
    if not scene.world: scene.world = bpy.data.worlds.new('W')
    scene.world.light_settings.distance = distance
    todo = [o for o in objs if o.data.materials[0].node_tree.nodes['Principled BSDF'].inputs['Alpha'].default_value == 1.0]
    for o in todo:
        me = o.data
        if not me.color_attributes: me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
        me.color_attributes.active_color = me.color_attributes[0]; me.color_attributes.render_color_index = 0
    for o in todo:
        bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active = o
        bpy.ops.object.bake(type='AO')
        for c in o.data.color_attributes[0].data:
            v = min(1.0, floor + (1.05 - floor) * c.color[0]); c.color = (v, v, v, 1)

def export_glb(path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    kw = dict(filepath=path, export_format='GLB', export_apply=True, export_yup=True, export_draco_mesh_compression_enable=True, export_draco_mesh_compression_level=6)
    for extra in (dict(export_vertex_color='ACTIVE'), dict()):
        try:
            bpy.ops.export_scene.gltf(**kw, **extra); break
        except TypeError as e:
            print('export option not accepted, retrying:', e)
    return os.path.getsize(path)
