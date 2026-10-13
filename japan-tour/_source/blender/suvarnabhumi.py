# Builds the Suvarnabhumi terminal model and exports public/models/suvarnabhumi.glb.
# Run:  blender -b --python blender/suvarnabhumi.py
# Metres. Blender axes: X along the terminal, -Y = airside (gates), Z up. The glTF exporter
# turns this into the site's frame (airside = +z). Two root nodes are exported: LOD0 (full
# detail) and LOD1 (main masses only); ambient occlusion is baked into vertex colours.
import bpy, bmesh, math, os, sys
from mathutils import Vector, Matrix

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'models', 'suvarnabhumi.glb')
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

# ---------------- materials ----------------
def mat(name, color, rough=0.5, metal=0.0, emit=None):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    m.use_backface_culling = True   # single-sided in the export: no shadow acne from back faces
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*color, 1)
    b.inputs['Roughness'].default_value = rough
    b.inputs['Metallic'].default_value = metal
    if emit:
        b.inputs['Emission Color'].default_value = (*emit, 1)
        b.inputs['Emission Strength'].default_value = 0.0
    return m

def srgb(h):
    h = h.lstrip('#'); c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c)

M = {
    'steel': mat('Steel', srgb('#eef1f4'), 0.38, 0.35),
    'frame': mat('Frame', srgb('#cfd6dc'), 0.45, 0.5),
    'dark': mat('Dark', srgb('#39424d'), 0.6, 0.3),
    'glass': mat('Glass', srgb('#8fc0e2'), 0.1, 0.35, emit=srgb('#ffd9a0')),
    'tubeglass': mat('TubeGlass', srgb('#6fb2e0'), 0.1, 0.35, emit=srgb('#7fd0ff')),
    'membrane': mat('Membrane', srgb('#f6f7f8'), 0.55, 0.0),
    'roof': mat('Roof', srgb('#f1f3f5'), 0.5, 0.25),
    'gold': mat('Gold', srgb('#d9b25b'), 0.3, 0.8),
    'plaster': mat('Plaster', srgb('#f4efe4'), 0.7, 0.0),
    'floor': mat('Floor', srgb('#8f98a3'), 0.8, 0.0),
    'rubber': mat('Rubber', srgb('#1c1e22'), 0.9, 0.0),
}

# ---------------- mesh helpers ----------------
def obj_from_bm(name, bm, material, parent, smooth=True, recalc=False):
    me = bpy.data.meshes.new(name)
    if recalc: bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
    bm.normal_update(); bm.to_mesh(me); bm.free()
    me.materials.append(material)
    if smooth:
        for p in me.polygons: p.use_smooth = True
        me.set_sharp_from_angle(angle=math.radians(38))
    o = bpy.data.objects.new(name, me)
    scene.collection.objects.link(o)
    o.parent = parent
    return o

def box(name, size, loc, material, parent, bevel=0.0, rot=(0, 0, 0)):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1)
    bmesh.ops.scale(bm, vec=Vector(size), verts=bm.verts)
    if bevel > 0:
        bmesh.ops.bevel(bm, geom=bm.edges[:], offset=min(bevel, min(size) * 0.45), segments=2, profile=0.6, affect='EDGES')
    o = obj_from_bm(name, bm, material, parent)
    o.location = loc; o.rotation_euler = rot
    return o

def cyl(name, r1, r2, depth, loc, material, parent, verts=20, rot=(0, 0, 0), caps=True):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=caps, segments=verts, radius1=r1, radius2=r2, depth=depth)
    o = obj_from_bm(name, bm, material, parent)
    o.location = loc; o.rotation_euler = rot
    return o

def beam(name, a, b, th, material, parent, verts=8):
    a, b = Vector(a), Vector(b); d = b - a
    o = cyl(name, th, th, d.length, (a + b) / 2, material, parent, verts=verts)
    o.rotation_mode = 'QUATERNION'; o.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(d.normalized())
    return o

def lathe(name, profile, material, parent, steps=48, loc=(0, 0, 0)):
    bm = bmesh.new(); rings = []
    for r, z in profile:
        rings.append([bm.verts.new((r * math.cos(2 * math.pi * k / steps), r * math.sin(2 * math.pi * k / steps), z)) for k in range(steps)])
    for i in range(len(rings) - 1):
        for k in range(steps):
            bm.faces.new((rings[i][k], rings[i][(k + 1) % steps], rings[i + 1][(k + 1) % steps], rings[i + 1][k]))
    o = obj_from_bm(name, bm, material, parent)
    o.location = loc
    return o

def shell(name, x0, x1, a, b, material, parent, t0=0.0, t1=math.pi, seg=28, bulge=0.0, thick=0.12, y0=0.0):
    # elliptical arch skin running along X (half-width a, height b); bulge pillows the middle of the bay
    bm = bmesh.new(); nx = 4 if bulge else 1; rows = []
    for i in range(nx + 1):
        u = i / nx; k = 1 + bulge * math.sin(u * math.pi)
        rows.append([bm.verts.new((x0 + (x1 - x0) * u, y0 + a * k * math.cos(t0 + (t1 - t0) * j / seg), b * k * math.sin(t0 + (t1 - t0) * j / seg))) for j in range(seg + 1)])
    for i in range(nx):
        for j in range(seg):
            bm.faces.new((rows[i][j], rows[i + 1][j], rows[i + 1][j + 1], rows[i][j + 1]))
    bmesh.ops.solidify(bm, geom=bm.faces[:], thickness=thick)
    return obj_from_bm(name, bm, material, parent, recalc=True)

def arc_tube(name, x, a, b, r, material, parent, seg=28, y0=0.0):
    # steel rib following the ellipse at station x
    bm = bmesh.new(); rings = []; n = 6
    for j in range(seg + 1):
        t = math.pi * j / seg
        c = Vector((x, y0 + a * math.cos(t), b * math.sin(t)))
        nrm = Vector((0, b * math.cos(t), a * math.sin(t))).normalized()
        rings.append([bm.verts.new(c + nrm * (r * math.cos(2 * math.pi * k / n)) + Vector((r * math.sin(2 * math.pi * k / n), 0, 0))) for k in range(n)])
    for j in range(seg):
        for k in range(n):
            bm.faces.new((rings[j][k], rings[j][(k + 1) % n], rings[j + 1][(k + 1) % n], rings[j + 1][k]))
    return obj_from_bm(name, bm, material, parent, recalc=True)

# ---------------- the model ----------------
def build(root, detail):
    P = root
    # --- main hall: glass volume on a plinth, mullions and transoms ---
    box('Plinth', (97, 23, 1.0), (0, 6, 0.5), M['plaster'], P, 0.2)
    box('Hall', (94, 20, 11), (0, 6, 6.5), M['glass'], P, 0.5)
    box('HallRoof', (95.5, 21.5, 0.6), (0, 6, 12.2), M['steel'], P, 0.15)
    if detail:
        for i in range(41):
            x = -47 + i * 2.35
            for y in (-4.08, 16.08):
                box('Mullion', (0.14, 0.28, 10.6), (x, y, 6.5), M['frame'], P)
        for z in (3.6, 6.4, 9.2):
            for y in (-4.1, 16.1):
                box('Transom', (94.2, 0.2, 0.16), (0, y, z), M['frame'], P)
        for sx in (-1, 1):
            for j in range(9):
                box('MullionEnd', (0.28, 0.14, 10.6), (sx * 47.08, -4 + j * 2.5, 6.5), M['frame'], P)
    # --- canopy: thin slab floating on eight truss frames with V legs ---
    box('Canopy', (112, 36, 0.9), (0, 5, 18.3), M['roof'], P, 0.3)
    box('CanopySoffit', (110, 34, 0.25), (0, 5, 17.75), M['dark'], P)
    box('Fascia', (112.6, 36.6, 0.35), (0, 5, 18.9), M['steel'], P, 0.12)
    if detail:
        for i in range(-6, 7):   # glazed skylight strips
            box('Skylight', (2.2, 30, 0.12), (i * 8, 5, 18.8), M['tubeglass'], P)
        for i in range(111):     # louvre blades
            x = -55 + i
            if abs((x + 4) % 8 - 4) < 1.4: continue
            box('Louvre', (0.12, 34.6, 0.5), (x, 5, 19.0), M['steel'], P, rot=(0, math.radians(28), 0))
    for i in range(8):
        x = -49 + i * 14
        beam('TrussTop', (x, -12.5, 17.3), (x, 22.5, 17.3), 0.32, M['steel'], P, 10)
        pts = [(x, -12.5 + 35 * k / 10, 17.3 - 2.6 * math.sin(math.pi * k / 10)) for k in range(11)]
        for k in range(10):
            beam('TrussBot', pts[k], pts[k + 1], 0.26, M['steel'], P, 8)
            if detail and 0 < k < 10:
                beam('TrussWeb', pts[k], (x, -12.5 + 35 * (k + (0.5 if k % 2 else -0.5)) / 10, 17.3), 0.11, M['frame'], P, 6)
        for sy, y in ((-1, -9.5), (1, 19.5)):
            for dx in (-1.6, 1.6):   # V legs
                bm_leg = beam('Leg', (x + dx * 0.15, y + sy * 1.2, 0.9), (x + dx, y - sy * 0.6, 16.6), 0.42, M['steel'], P, 12)
            cyl('LegFoot', 1.1, 0.8, 0.9, (x, y + sy * 1.2, 0.45), M['plaster'], P, 16)
    # --- concourse: 24 bays, white membrane alternating with glass, steel ribs, glazed ends ---
    Y = -11.0; A = 7.0; B = 8.5; L = 124.0; N = 24; bay = L / N
    box('TubeFloor', (L, 13.6, 0.5), (0, Y, 0.25), M['floor'], P, 0.1)
    for i in range(N):
        x0 = -L / 2 + i * bay; x1 = x0 + bay
        if i % 2 == 0:
            shell('Membrane', x0 + 0.12, x1 - 0.12, A, B, M['membrane'], P, bulge=0.045 if detail else 0.0, seg=28 if detail else 14)
        else:
            shell('TubeGlass', x0 + 0.12, x1 - 0.12, A * 0.985, B * 0.985, M['tubeglass'], P, seg=28 if detail else 14, thick=0.08)
            if detail:
                for t in (0.22, 0.5, 0.78):   # glazing bars along the bay
                    a = math.pi * t
                    beam('GlzBar', (x0, A * math.cos(a), B * math.sin(a)), (x1, A * math.cos(a), B * math.sin(a)), 0.06, M['frame'], P, 5)
    # shells are built around y = 0; move every concourse skin object onto the concourse axis
    for o in [c for c in P.children if c.name.startswith(('Membrane', 'TubeGlass', 'GlzBar'))]:
        o.location.y += Y
    for i in range(N + 1):
        r = arc_tube('Rib', -L / 2 + i * bay, A * 1.02, B * 1.02, 0.2 if detail else 0.24, M['steel'], P, seg=28 if detail else 12, y0=Y)
    for sx in (-1, 1):
        bm = bmesh.new(); seg = 24
        c0 = bm.verts.new((sx * L / 2, Y, 0)); ring = [bm.verts.new((sx * L / 2, Y + A * math.cos(math.pi * j / seg), B * math.sin(math.pi * j / seg))) for j in range(seg + 1)]
        for j in range(seg):
            bm.faces.new((c0, ring[j], ring[j + 1]) if sx > 0 else (c0, ring[j + 1], ring[j]))
        obj_from_bm('TubeEnd', bm, M['glass'], P, smooth=False)
        if detail:
            for j in (4, 8, 12, 16, 20):
                a = math.pi * j / seg
                beam('EndBar', (sx * (L / 2 + 0.05), Y + A * math.cos(a), 0), (sx * (L / 2 + 0.05), Y + A * math.cos(a), B * math.sin(a)), 0.07, M['frame'], P, 5)
    # --- jet bridges: rotunda, two telescoping tunnels, cab, wheeled support ---
    for x in (-25, 0, 25):
        cyl('Rotunda', 2.4, 2.4, 3.4, (x, -18.4, 4.4), M['steel'], P, 24)
        cyl('RotundaCap', 2.6, 2.6, 0.25, (x, -18.4, 6.2), M['frame'], P, 24)
        cyl('RotundaLeg', 0.45, 0.6, 2.7, (x, -18.4, 1.35), M['dark'], P, 12)
        box('TunnelA', (2.7, 5.4, 2.8), (x, -22.6, 4.4), M['steel'], P, 0.35)
        box('TunnelB', (2.4, 4.6, 2.5), (x, -26.6, 4.3), M['steel'], P, 0.3)
        box('BridgeCab', (3.0, 2.2, 2.9), (x, -29.4, 4.3), M['frame'], P, 0.4)
        if detail:
            for y, ln in ((-22.6, 4.6), (-26.6, 3.8)):
                for sxx in (-1, 1):
                    box('BridgeWin', (0.06, ln, 0.8), (x + sxx * 1.37 * (1 if y > -24 else 0.89), y, 4.9), M['glass'], P)
            box('Bogie', (3.4, 1.0, 0.5), (x, -27.4, 1.0), M['dark'], P, 0.1)
            for sxx in (-1, 1):
                cyl('Wheel', 0.55, 0.55, 0.4, (x + sxx * 1.5, -27.4, 0.55), M['rubber'], P, 14, rot=(0, math.pi / 2, 0))
                beam('BogieLeg', (x + sxx * 1.1, -27.4, 1.1), (x + sxx * 1.1, -27.4, 3.0), 0.16, M['dark'], P, 8)
    # --- control tower ---
    T = bpy.data.objects.new('Tower', None); scene.collection.objects.link(T); T.parent = P; T.location = (70, -6, 0)
    lathe('Shaft', [(3.6, 0), (3.4, 1.2), (2.7, 6), (2.15, 20), (1.9, 38), (1.95, 45), (2.5, 48.5), (3.9, 51), (5.6, 52.6), (6.0, 52.9)], M['steel'], T)
    lathe('CabGlass', [(6.0, 52.9), (6.5, 54.4), (6.6, 56.6), (5.9, 58.6)], M['glass'], T)
    lathe('CabRoof', [(6.1, 58.6), (6.25, 58.9), (5.6, 59.8), (3.8, 60.9), (1.6, 61.5), (0.01, 61.6)], M['steel'], T)
    lathe('Gallery', [(6.2, 52.6), (7.1, 52.6), (7.1, 52.95), (6.2, 52.95)], M['dark'], T)
    cyl('Mast', 0.2, 0.08, 7, (0, 0, 65), M['dark'], T, 8)
    if detail:
        for k in range(20):
            a = 2 * math.pi * k / 20
            beam('CabBar', (6.0 * math.cos(a), 6.0 * math.sin(a), 52.9), (6.62 * math.cos(a), 6.62 * math.sin(a), 56.6), 0.06, M['frame'], T, 5)
            beam('Rail', (7.05 * math.cos(a), 7.05 * math.sin(a), 52.95), (7.05 * math.cos(a), 7.05 * math.sin(a), 54.0), 0.04, M['dark'], T, 4)
        lathe('RailTop', [(7.0, 54.0), (7.1, 54.0), (7.1, 54.08), (7.0, 54.08)], M['dark'], T, 40)
        for z in (12, 24, 36):
            lathe('ShaftBand', [(2.55 - (z - 12) * 0.022, z), (2.6 - (z - 12) * 0.022, z + 0.1), (2.55 - (z - 12) * 0.022, z + 0.5)], M['frame'], T)
        cyl('Dish', 0.9, 0.2, 0.5, (2.4, 0, 62.2), M['frame'], T, 16, rot=(0, math.radians(60), 0))
    bcn = bpy.data.objects.new('Beacon', None); scene.collection.objects.link(bcn); bcn.parent = T; bcn.location = (0, 0, 68.7)
    # --- Thai pavilions with three-tier swept roofs ---
    for sx in (-1, 1):
        S = bpy.data.objects.new('Sala', None); scene.collection.objects.link(S); S.parent = P; S.location = (sx * 62, 6, 0)
        box('SalaBase', (8, 8, 1.2), (0, 0, 0.6), M['plaster'], S, 0.25)
        box('SalaStep', (9.4, 9.4, 0.5), (0, 0, 0.25), M['plaster'], S, 0.12)
        for cx in (-2.6, 2.6):
            for cy in (-2.6, 2.6):
                cyl('SalaCol', 0.32, 0.26, 3.6, (cx, cy, 3.0), M['plaster'], S, 12)
        for k in range(3):
            w = 5.2 - k * 1.35; z0 = 4.8 + k * 1.9; h = 2.7; rows = []; bm = bmesh.new(); n = 8
            for i in range(n + 1):
                t = i / n; f = (1 - t) ** 1.9 * (1 - 0.0) + 0.02   # concave sweep, flared eaves
                r = w * (f + 0.12 * (1 - t) ** 6)
                rows.append([bm.verts.new((r * cxx, r * cyy, z0 + h * t - 0.35 * (1 - t) ** 5)) for cxx, cyy in ((1, 1), (-1, 1), (-1, -1), (1, -1))])
            for i in range(n):
                for q in range(4):
                    bm.faces.new((rows[i][q], rows[i][(q + 1) % 4], rows[i + 1][(q + 1) % 4], rows[i + 1][q]))
            bm.faces.new(rows[0][::-1])
            obj_from_bm('SalaRoof', bm, M['gold'], S)
        cyl('Finial', 0.3, 0.02, 4.5, (0, 0, 13.3), M['gold'], S, 10)
        if detail:
            for q in range(4):   # chofa hooks on the eaves
                a = math.pi / 4 + q * math.pi / 2
                beam('Chofa', (7.0 * math.cos(a), 7.0 * math.sin(a), 4.5), (7.9 * math.cos(a), 7.9 * math.sin(a), 5.9), 0.1, M['gold'], S, 6)

def join_by_material(root):
    # one mesh per material under this LOD root (keeps empties such as Beacon)
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
        bpy.ops.object.join()
        j = bpy.context.view_layer.objects.active
        bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
        j.name = f'{root.name}_{name}'; j.parent = root
        out.append(j)
    return out

def bake_ao(objs):
    scene.render.engine = 'CYCLES'
    scene.cycles.device = 'CPU'; scene.cycles.samples = 128
    scene.render.bake.target = 'VERTEX_COLORS'
    for o in objs:
        me = o.data
        if not me.color_attributes: me.color_attributes.new('Col', 'BYTE_COLOR', 'CORNER')
        me.color_attributes.active_color = me.color_attributes[0]; me.color_attributes.render_color_index = 0
    for o in objs:
        bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active = o
        bpy.ops.object.bake(type='AO')
        # lift the result so it darkens creases without dulling open surfaces
        col = o.data.color_attributes[0].data
        for c in col:
            v = min(1.0, 0.62 + 0.5 * c.color[0]); c.color = (v, v, v, 1)

lod0 = bpy.data.objects.new('LOD0', None); scene.collection.objects.link(lod0)
build(lod0, True)
lod1 = bpy.data.objects.new('LOD1', None); scene.collection.objects.link(lod1)
build(lod1, False)
m0 = join_by_material(lod0); m1 = join_by_material(lod1)
for o in m1: o.hide_render = True          # bake each LOD without the other in the way
try:
    bake_ao(m0)
    for o in m0: o.hide_render = True
    for o in m1: o.hide_render = False
    bake_ao(m1)
    for o in m0: o.hide_render = False
    print('AO baked')
except Exception as e:
    print('AO bake skipped:', e)

tris = lambda objs: sum(sum(len(p.vertices) - 2 for p in o.data.polygons) for o in objs)
print('TRIS LOD0', tris(m0), 'LOD1', tris(m1))
os.makedirs(os.path.dirname(OUT), exist_ok=True)
kw = dict(filepath=OUT, export_format='GLB', export_apply=True, export_yup=True, export_draco_mesh_compression_enable=True, export_draco_mesh_compression_level=6)
for extra in (dict(export_vertex_color='ACTIVE', export_all_vertex_colors=False), dict(export_vertex_color='ACTIVE'), dict()):
    try:
        bpy.ops.export_scene.gltf(**kw, **extra); break
    except TypeError as e:
        print('export option not accepted, retrying:', e)
print('EXPORTED', OUT, os.path.getsize(OUT), 'bytes')
