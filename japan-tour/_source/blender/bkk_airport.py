# Suvarnabhumi Airport passenger complex, laid out from published figures (real metres):
#   main terminal 444 m x 111 m under a 567 m x 210 m louvred roof on 8 super-trusses
#   concourses in an H: east-west section 1,350 m, two north-south legs 932 m, tube section
#   with membrane and glass bays on arch ribs; control tower 132 m; midfield SAT-1 to the south.
#   (Structurae, Werner Sobek, ITD project pages and Wikipedia; see materials.html.)
# Positions of the tower, car parks and hotel are approximate. Run:
#   blender -b --python blender/bkk_airport.py
# Blender frame: X east, Y north, Z up, origin at the centre of the east-west concourse.
import bpy, bmesh, math, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import kit
from kit import mat, box, cyl, beam, lathe, shell, arc_rib, group

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'models', 'suvarnabhumi.glb')
kit.reset()
STEEL = lambda: mat('Steel', '#eef1f4', 0.4, 0.35)
FRAME = lambda: mat('Frame', '#c9d1d8', 0.45, 0.5)
DARK = lambda: mat('Dark', '#39424d', 0.6, 0.3)
GLASS = lambda: mat('Glass', '#8fc0e2', 0.1, 0.35, emit='#ffd9a0')
TGLASS = lambda: mat('TubeGlass', '#6fb2e0', 0.1, 0.35, emit='#7fd0ff')
MEMB = lambda: mat('Membrane', '#f6f7f8', 0.6)
ROOF = lambda: mat('Roof', '#f1f3f5', 0.5, 0.25)
CONC = lambda: mat('Concrete', '#d9d6cf', 0.8)
GOLD = lambda: mat('Gold', '#d9b25b', 0.3, 0.8)

A_T, B_T = 20.0, 22.0   # concourse tube half-width and height

def tube(parent, length, detail):
    # a concourse run along local X, centred on the origin
    bay = 27.0; n = max(2, round(length / bay)); bay = length / n
    box('TubeFloor', (length, A_T * 2 - 2, 6), (0, 0, 3), CONC(), parent)
    for i in range(n):
        x0 = -length / 2 + i * bay
        if i % 2 == 0: shell('Membrane', x0 + 0.6, x0 + bay - 0.6, A_T, B_T, MEMB(), parent, seg=14 if detail else 7, bulge=0.05 if detail else 0, thick=0.5 if detail else 0, nx=3 if detail else 1)
        else: shell('TubeGlass', x0 + 0.6, x0 + bay - 0.6, A_T * 0.98, B_T * 0.98, TGLASS(), parent, seg=14 if detail else 7, thick=0)
    for i in range(0, n + 1, 1 if detail else 4): arc_rib('Rib', -length / 2 + i * bay, A_T * 1.03, B_T * 1.03, 0.9 if detail else 1.4, STEEL(), parent, seg=14 if detail else 7)
    if detail:   # jet bridges on both sides, every third bay
        for i in range(2, n - 1, 3):
            for s in (-1, 1):
                x = -length / 2 + i * bay
                box('Bridge', (4, 30, 4), (x, s * (A_T + 15), 7), STEEL(), parent, 0.8)
                cyl('BridgeHead', 4, 4, 5, (x, s * (A_T + 31), 7), FRAME(), parent, 12)
                cyl('BridgeLeg', 0.8, 0.8, 5, (x, s * (A_T + 28), 2.5), DARK(), parent, 8)

def build(root, detail):
    # ---- concourses: H plan ----
    tube(group('BarEW', root), 1350, detail)
    for sx in (-1, 1): tube(group('Leg', root, (sx * 675, 0, 0), math.pi / 2), 932, detail)
    tube(group('LinkD', root, (0, 150, 0), math.pi / 2), 300, detail)
    for sx in (-1, 0, 1):   # glazed nodes where the tubes cross
        lathe('Node', [(34, 0), (36, 14), (30, 26), (16, 32), (0.5, 34)], TGLASS(), root, 24 if detail else 12, loc=(sx * 675, 0, 0))
    # ---- main terminal: glass hall under the big louvred canopy ----
    MY = 355
    box('Hall', (444, 111, 30), (0, MY, 15), GLASS(), root, 2)
    box('HallBase', (452, 119, 3), (0, MY, 1.5), CONC(), root)
    box('HallRoof', (448, 115, 1.5), (0, MY, 30.8), STEEL(), root)
    box('Canopy', (567, 210, 3.5), (0, MY + 15, 44), ROOF(), root, 1.2)
    box('Soffit', (560, 204, 0.8), (0, MY + 15, 41.9), DARK(), root)
    for i in range(8):
        x = -252 + i * 72
        beam('TrussTop', (x, MY + 15 - 104, 41), (x, MY + 15 + 104, 41), 1.6, STEEL(), root, 8)
        pts = [(x, MY + 15 - 104 + 208 * k / 8, 41 - 9 * math.sin(math.pi * k / 8)) for k in range(9)]
        for k in range(8):
            beam('TrussBot', pts[k], pts[k + 1], 1.3, STEEL(), root, 6)
            if detail and 0 < k < 8: beam('TrussWeb', pts[k], (x, pts[k][1] + (13 if k % 2 else -13), 41), 0.5, FRAME(), root, 5)
        for sy in (-1, 1):   # paired legs under each truss, 126 m apart
            for dx in (-7, 7): beam('TrussLeg', (x + dx * 0.2, MY + 15 + sy * 66, 0), (x + dx, MY + 15 + sy * 60, 38), 2.0, STEEL(), root, 10)
    if detail:
        for i in range(-270, 271, 6):   # louvre blades, with glazed strips over the trusses
            if abs((i + 36) % 72 - 36) < 7: continue
            box('Louvre', (0.7, 204, 2.4), (i, MY + 15, 46.2), STEEL(), root, rot=(0, math.radians(28), 0))
        for i in range(8): box('Skylight', (10, 190, 0.5), (-252 + i * 72, MY + 15, 45.9), TGLASS(), root)
        for i in range(60):
            x = -219 + i * 7.4
            for y in (MY - 55.8, MY + 55.8): box('Mullion', (0.5, 0.9, 28), (x, y, 15), FRAME(), root)
        for z in (9, 17, 25):
            for y in (MY - 55.9, MY + 55.9): box('Transom', (444, 0.6, 0.5), (0, y, z), FRAME(), root)
    # ---- landside: elevated kerb road, car parks, hotel, tower ----
    box('KerbDeck', (500, 26, 1.6), (0, MY + 78, 13), CONC(), root)
    for sx in (-1, 1):
        box('Ramp', (170, 22, 1.4), (sx * 330, MY + 78, 7), CONC(), root, rot=(0, sx * 0.075, 0))
        box('CarPark', (170, 95, 20), (sx * 190, MY + 200, 10), CONC(), root, 1)
        if detail:
            for k in range(5): box('ParkSlot', (171, 96, 1.6), (sx * 190, MY + 200, 3 + k * 4), DARK(), root)
    HW = lambda: mat('HotelWall', '#ebe6dc', 0.7)
    box('Hotel', (230, 34, 24), (0, MY + 330, 12), HW(), root, 1)
    box('HotelB', (230, 34, 24), (0, MY + 400, 12), HW(), root, 1)
    box('HotelAtrium', (150, 40, 26), (0, MY + 365, 13), GLASS(), root, 2)
    if detail:
        for k in range(6):
            for y in (MY + 312.8, MY + 417.2): box('HotelBand', (228, 0.6, 1.6), (0, y, 3.4 + k * 3.8), GLASS(), root)
    T = group('Tower', root, (-430, MY + 190, 0))
    nseg = 28 if detail else 14
    lathe('Shaft', [(8.5, 0), (8, 3), (6.2, 14), (5, 45), (4.5, 84), (4.6, 98), (5.8, 106), (9, 112), (13, 115.5), (14, 116.5)], STEEL(), T, nseg)
    lathe('CabGlass', [(14, 116.5), (15.2, 120), (15.4, 124.5), (13.6, 128)], GLASS(), T, nseg)
    lathe('CabRoof', [(14.2, 128), (14.5, 128.6), (13, 130.3), (8.8, 131.8), (3.6, 132.2), (0.05, 132.2)], STEEL(), T, nseg)
    lathe('Gallery', [(14.6, 115.8), (16.6, 115.8), (16.6, 116.6), (14.6, 116.6)], DARK(), T, nseg)
    cyl('Mast', 0.5, 0.2, 14, (0, 0, 139), DARK(), T, 8)
    # ---- midfield satellite SAT-1, about a kilometre south ----
    S1 = group('SAT1', root, (0, -1010, 0))
    tube(S1, 1000, detail)
    box('SatHall', (170, 120, 26), (0, 0, 13), GLASS(), S1, 2)
    for k in range(5):   # wave roof over the central hall
        shell('SatRoof', -100 + k * 40, -62 + k * 40, 72, 9 + 3 * math.sin(k * 1.3), ROOF(), S1, seg=10, thick=0.8, nx=1).location = (0, 0, 27)
    # ---- Thai sala pavilions flanking the kerb ----
    for sx in (-1, 1):
        P = group('Sala', root, (sx * 262, MY + 120, 0))
        box('SalaBase', (24, 24, 4), (0, 0, 2), CONC(), P, 0.8)
        for cx in (-8, 8):
            for cy in (-8, 8): cyl('SalaCol', 1.0, 0.8, 12, (cx, cy, 10), CONC(), P, 10)
        for k in range(3):
            w = 16 - k * 4.2; z0 = 16 + k * 6; h = 8.5; rows = []; bm = bmesh.new(); n = 6
            for i in range(n + 1):
                t = i / n; r = w * ((1 - t) ** 1.9 + 0.02 + 0.12 * (1 - t) ** 6)
                rows.append([bm.verts.new((r * cxx, r * cyy, z0 + h * t - 1.1 * (1 - t) ** 5)) for cxx, cyy in ((1, 1), (-1, 1), (-1, -1), (1, -1))])
            for i in range(n):
                for q in range(4): bm.faces.new((rows[i][q], rows[i][(q + 1) % 4], rows[i + 1][(q + 1) % 4], rows[i + 1][q]))
            bm.faces.new(rows[0][::-1])
            kit.obj_from_bm('SalaRoof', bm, GOLD(), P)
        cyl('Finial', 0.9, 0.05, 14, (0, 0, 42), GOLD(), P, 8)

lod0 = group('LOD0', None); build(lod0, True)
lod1 = group('LOD1', None); build(lod1, False)
m0 = kit.join_by_material(lod0); m1 = kit.join_by_material(lod1)
tris = lambda objs: sum(sum(len(p.vertices) - 2 for p in o.data.polygons) for o in objs)
try:
    for o in m1: o.hide_render = True
    kit.bake_ao(m0, samples=48, distance=18, floor=0.6)
    for o in m0: o.hide_render = True
    for o in m1: o.hide_render = False
    kit.bake_ao(m1, samples=32, distance=18, floor=0.6)
    for o in m0: o.hide_render = False
except Exception as e:
    print('AO skipped', e)
print('TRIS LOD0', tris(m0), 'LOD1', tris(m1))
print('EXPORTED', kit.export_glb(OUT), 'bytes')
