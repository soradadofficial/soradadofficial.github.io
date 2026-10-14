# Akane Sky Tokyo tower for stay-tokyo.html, built on the real footprint (OSM way 87439168) and the
# storeys in src/akane-plan.js (via blender/akane_layout.json, written by scripts/akane-layout.mjs).
# Hotel floors 1-33, eave 99.4 m, roof structure to 104.4 m; balconies wrap the guest floors 3-32.
# The facade's material and colour are not published (spec 1.10), so the palette here is a neutral
# light-glass reading of photos, marked unverified on the page.
#
# Run: blender -b --python blender/akane_tower.py   (or the bpy wheel, then gltf-transform draco)
import sys, os, json, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bpy, bmesh
from mathutils import Vector
import kit

HERE = os.path.dirname(os.path.abspath(__file__))
L = json.load(open(os.path.join(HERE, 'akane_layout.json')))
# page frame (x east, z south) -> Blender (x east, y north)
RING = [(x, -z) for x, z in L['ring']]
PORCH = [(x, -z) for x, z in L['porch']]
FLOORS = {k: (y, h) for k, y, h in L['floors']}
EAVE, TOP = L['eave'], L['top']

def area2(pts):
    return sum(pts[i][0] * pts[(i + 1) % len(pts)][1] - pts[(i + 1) % len(pts)][0] * pts[i][1] for i in range(len(pts))) / 2

if area2(RING) < 0: RING.reverse()   # counter-clockwise from above
if area2(PORCH) < 0: PORCH.reverse()
# the two middle points of the three-segment south tip (lowest y after the CCW flip)
TIP_MID = sorted(range(len(RING)), key=lambda i: RING[i][1])[:2]

def offset(pts, d):
    """Move every edge of a convex CCW polygon outward by d (negative = inward)."""
    n = len(pts); out = []
    lines = []
    for i in range(n):
        a, b = Vector((*pts[i], 0)), Vector((*pts[(i + 1) % n], 0))
        t = (b - a).normalized(); nrm = Vector((t.y, -t.x, 0))
        lines.append((a + nrm * d, t))
    for i in range(n):
        (p, d1), (q, d2) = lines[i - 1], lines[i]
        den = d1.x * d2.y - d1.y * d2.x
        s = ((q.x - p.x) * d2.y - (q.y - p.y) * d2.x) / den
        out.append(((p + d1 * s).x, (p + d1 * s).y))
    return out

def prism(name, pts, z0, z1, material, parent, caps=True, uv=False):
    bm = bmesh.new()
    bot = [bm.verts.new((x, y, z0)) for x, y in pts]
    top = [bm.verts.new((x, y, z1)) for x, y in pts]
    n = len(pts); sides = []
    for i in range(n):
        j = (i + 1) % n
        sides.append(bm.faces.new((bot[i], bot[j], top[j], top[i])))
    if caps:
        bm.faces.new(list(reversed(bot))); bm.faces.new(top)
    if uv:  # u = metres along the perimeter, v = metres up: the page draws mullions and lit windows from these
        lay = bm.loops.layers.uv.new('UVMap'); u = 0.0
        for i, f in enumerate(sides):
            a, b = Vector(pts[i]), Vector(pts[(i + 1) % n]); w = (b - a).length
            for loop in f.loops:
                v = loop.vert.co
                along = (Vector((v.x, v.y)) - a).length
                loop[lay].uv = ((u + along) / 100.0, v.z / 100.0)
            u += w
    return kit.obj_from_bm(name, bm, material, parent, smooth=False)

def ring_band(name, outer, inner, z0, z1, material, parent):
    """A flat ring (outer polygon minus inner polygon) extruded from z0 to z1."""
    bm = bmesh.new(); n = len(outer)
    ob = [bm.verts.new((x, y, z0)) for x, y in outer]; ot = [bm.verts.new((x, y, z1)) for x, y in outer]
    ib = [bm.verts.new((x, y, z0)) for x, y in inner]; it = [bm.verts.new((x, y, z1)) for x, y in inner]
    for i in range(n):
        j = (i + 1) % n
        bm.faces.new((ob[i], ob[j], ot[j], ot[i]))      # outer wall
        bm.faces.new((ib[j], ib[i], it[i], it[j]))      # inner wall
        bm.faces.new((ot[i], ot[j], it[j], it[i]))      # top
        bm.faces.new((ob[j], ob[i], ib[i], ib[j]))      # underside
    return kit.obj_from_bm(name, bm, material, parent, smooth=False)

kit.reset()
glass = kit.mat('Glass', '#6f8ea3', rough=0.12, metal=0.55)
slab = kit.mat('Slab', '#efebe4', rough=0.7)
rail = kit.mat('Rail', '#c9dbe6', rough=0.08, metal=0.1, alpha=0.42)
fin = kit.mat('Fin', '#dfe2e5', rough=0.45, metal=0.2)
stone = kit.mat('Stone', '#d8d0c3', rough=0.8)
crown = kit.mat('Crown', '#c9ccd0', rough=0.5, metal=0.35)
glow = kit.mat('CrownGlow', '#fff3dc', rough=0.4, emit='#ffe2b0', strength=0.0)
canopy = kit.mat('Canopy', '#f4f1ea', rough=0.55)
dark = kit.mat('Recess', '#3a4652', rough=0.6)

root = kit.group('Tower', None)
BAL = 1.3  # balcony depth: the OSM outline is taken as the balcony edge, the glass line sits behind it
g_line = offset(RING, -BAL)

# guest floors 3-32 and the 33F sky floor: recessed glass with UVs for the page's window shader
y3 = FLOORS[3][0]; y33, h33 = FLOORS[33]
prism('GlassGuest', g_line, y3, y33, glass, root, caps=False, uv=True)
prism('GlassSky', offset(RING, -0.7), y33, EAVE, glass, root, caps=False, uv=True)
# balcony slab edge and glass balustrade on every guest floor
for k in range(3, 34):
    y = FLOORS[k][0]
    ring_band(f'Slab{k}', RING, g_line, y - 0.32, y, slab, root)
    if k <= 32: ring_band(f'Rail{k}', RING, offset(RING, -0.06), y, y + 1.05, rail, root)
# 33F roof edge and parapet
ring_band('Parapet', RING, offset(RING, -0.5), EAVE, EAVE + 1.1, slab, root)
ring_band('ParapetGlow', offset(RING, 0.02), offset(RING, -0.52), EAVE + 1.1, EAVE + 1.22, glow, root)

# vertical fins at every room division and corner, from 3F to the eave
for i, (x, z, nx, nz) in enumerate(L['fins']):
    n = Vector((nx, -nz, 0)); p = Vector((x, -z, 0)) - n * 0.55
    o = kit.box(f'Fin{i}', (0.32, 1.1, EAVE - y3 + 1.2), (p.x, p.y, (y3 + EAVE + 1.2) / 2), fin, root)
    o.rotation_euler = (0, 0, math.atan2(n.y, n.x))
# corner columns at every footprint vertex, full height
for i, (x, y) in enumerate(RING):
    c = Vector((x, y, 0)); d = -c.normalized() * 0.7
    kit.box(f'Corner{i}', (0.9, 0.9, EAVE + 1.1), (c.x + d.x, c.y + d.y, (EAVE + 1.1) / 2), fin, root)

# base: 1F lobby and 2F garden floor (0-9 m), set back further, stone piers between tall glass
base = offset(RING, -2.4)
prism('GlassBase', base, 0, y3 - 0.4, glass, root, caps=False, uv=True)
ring_band('Slab2', RING, base, FLOORS[2][0] - 0.4, FLOORS[2][0], slab, root)
ring_band('Slab3base', RING, base, y3 - 0.6, y3 - 0.32, stone, root)
for i, (x, y) in enumerate(base):
    nxt = base[(i + 1) % len(base)]; a, b = Vector((x, y, 0)), Vector((*nxt, 0)); L_ = (b - a).length
    steps = max(1, int(L_ // 7.2))
    for s in range(steps + 1):
        p = a.lerp(b, s / steps); dirv = (b - a).normalized()
        o = kit.box(f'Pier{i}_{s}', (1.0, 1.4, y3 - 0.6), (p.x, p.y, (y3 - 0.6) / 2), stone, root)
        o.rotation_euler = (0, 0, math.atan2(dirv.y, dirv.x))

# south entrance wing (OSM way 411265067) with the porte-cochere canopy over the drop-off
porch_in = PORCH
prism('PorchWall', offset(porch_in, -0.4) if len(porch_in) < 6 else porch_in, 0, 6.5, stone, root)
tip = min(PORCH, key=lambda p: p[1])  # southernmost point of the wing
kit.box('Canopy', (24, 16, 0.6), (tip[0] + 0.5, tip[1] - 5.5, 6.2), canopy, root)
for dx in (-10, 10):
    kit.cyl(f'CanopyPost{dx}', 0.35, 0.35, 6.0, (tip[0] + 0.5 + dx, tip[1] - 12, 3.0), fin, root, verts=12)
kit.box('CanopyGlow', (23.2, 15.2, 0.08), (tip[0] + 0.5, tip[1] - 5.5, 5.88), glow, root)

# roof: penthouse (plant floor) set back, louvred, to the top of the building at 104.4 m
HEX = [p for i, p in enumerate(RING) if i not in TIP_MID]  # south tip as one chord, so big insets stay valid
pent = offset(HEX, -9.0)
prism('Penthouse', pent, EAVE, TOP - 0.6, crown, root)
prism('PenthouseCap', offset(pent, 0.4), TOP - 0.6, TOP, slab, root)
for i in range(len(pent)):
    a, b = Vector((*pent[i], 0)), Vector((*pent[(i + 1) % len(pent)], 0)); L_ = (b - a).length; n = int(L_ // 1.2)
    t = (b - a).normalized(); nrm = Vector((t.y, -t.x, 0))
    for s in range(1, n):
        p = a.lerp(b, s / n) + nrm * 0.12
        o = kit.box(f'Louvre{i}_{s}', (0.12, 0.25, TOP - EAVE - 1.4), (p.x, p.y, (EAVE + TOP - 0.6) / 2), dark, root)
        o.rotation_euler = (0, 0, math.atan2(t.y, t.x))

parts = kit.join_by_material(root)
out = os.path.join(HERE, '..', 'public', 'models', 'akane-tower.glb')
print('size', kit.export_glb(out))
