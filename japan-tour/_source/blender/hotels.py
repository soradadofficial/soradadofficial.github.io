# Exteriors of the two tower hotels (fictional properties): public/models/hotel-<id>.glb
# Typology follows ordinary practice for city hotels: a double-loaded slab of ~4 m room bays on a
# podium with lobby and restaurants, plant and a sky bar at the crown. Run:
#   blender -b --python blender/hotels.py
# Blender frame: X along the facade, +Y = the side the guest rooms look out from, Z up.
# The curtain wall is single-sided, so a room placed just inside it sees straight out.
import bpy, math, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import kit
from kit import mat, box, cyl, group

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'models')
HOTELS = {
    # width, depth, floors, floor height, podium floors, accent colour
    'tokyo': dict(w=58, d=22, floors=38, fh=3.7, podium=3, glass='#7fa8c9', fin='#e9edf2', accent='#c9a24a', crown='sky'),
    'osaka': dict(w=46, d=20, floors=21, fh=3.5, podium=2, glass='#8fb5a6', fin='#f1ede4', accent='#3f8f7d', crown='step'),
}

def build(root, h, detail):
    w, d, n, fh = h['w'], h['d'], h['floors'], h['fh']
    H = n * fh; pz = h['podium'] * 5.0
    GL = mat('Facade', h['glass'], 0.12, 0.45, emit='#ffd9a0'); FIN = mat('Fin', h['fin'], 0.5, 0.2)
    DK = mat('Spandrel', '#2c3440', 0.4, 0.4); ST = mat('Stone', '#d9d4cb', 0.8); AC = mat('Accent', h['accent'], 0.35, 0.7)
    # podium with a glazed lobby and porte-cochere on the entrance side (-Y)
    box('Podium', (w + 26, d + 22, pz), (0, -4, pz / 2), ST, root, 0.6)
    box('Lobby', (w * 0.6, 0.6, pz - 1.2), (0, -4 - (d + 22) / 2 - 0.2, pz / 2), GL, root)
    box('Canopy', (w * 0.5, 9, 0.5), (0, -4 - (d + 22) / 2 - 4.5, 5.2), AC, root, 0.15)
    for sx in (-1, 1): cyl('CanopyCol', 0.35, 0.35, 5, (sx * w * 0.22, -4 - (d + 22) / 2 - 8, 2.5), FIN, root, 10)
    box('PodiumRoof', (w + 27, d + 23, 0.6), (0, -4, pz + 0.3), FIN, root)
    # tower: glass slab with solid end walls
    box('Tower', (w, d, H), (0, 0, pz + H / 2), GL, root, 0.4)
    for sx in (-1, 1): box('EndWall', (1.2, d + 0.6, H + 2), (sx * (w / 2 + 0.3), 0, pz + H / 2 + 1), FIN, root, 0.2)
    if detail:
        for k in range(n):   # spandrel bands at every slab
            for sy in (-1, 1): box('Band', (w, 0.25, 0.75), (0, sy * (d / 2 + 0.05), pz + k * fh + 0.4), DK, root)
        bays = round(w / 4.0)
        for i in range(bays + 1):   # fins on the 4 m room module
            for sy in (-1, 1): box('FinV', (0.28, 0.5, H), (-w / 2 + i * w / bays, sy * (d / 2 + 0.2), pz + H / 2), FIN, root)
    else:
        for k in range(0, n, 4):
            for sy in (-1, 1): box('Band', (w, 0.25, 1.2), (0, sy * (d / 2 + 0.05), pz + k * fh + 0.4), DK, root)
    # crown
    top = pz + H
    if h['crown'] == 'sky':
        box('SkyBar', (w - 6, d - 3, 6.5), (0, 0, top + 3.25), GL, root, 0.5)
        box('SkyRoof', (w - 2, d + 1, 0.7), (0, 0, top + 6.9), FIN, root, 0.2)
        box('CrownLight', (w - 1.6, d + 1.4, 0.25), (0, 0, top + 7.4), mat('CrownGlow', '#fff1d6', 0.9, 0, emit='#ffb37a', strength=1.0), root)
        cyl('Mast', 0.3, 0.12, 16, (w * 0.3, 0, top + 15), FIN, root, 8)
    else:
        box('Step1', (w * 0.7, d - 2, 5), (0, 0, top + 2.5), GL, root, 0.4)
        box('Step2', (w * 0.4, d - 5, 4), (0, 0, top + 7), FIN, root, 0.4)
        box('CrownLight', (w * 0.72, d - 1.6, 0.25), (0, 0, top + 5.1), mat('CrownGlow', '#fff1d6', 0.9, 0, emit='#7fe0c8', strength=1.0), root)
    box('Plant', (10, 8, 3), (-w * 0.25, 0, top + 1.5), DK, root)

for hid, h in HOTELS.items():
    kit.reset()
    lod0 = group('LOD0', None); build(lod0, h, True)
    lod1 = group('LOD1', None); build(lod1, h, False)
    m0 = kit.join_by_material(lod0); m1 = kit.join_by_material(lod1)
    try:
        for o in m1: o.hide_render = True
        kit.bake_ao(m0, samples=32, distance=8, floor=0.65)
        for o in m0: o.hide_render = True
        for o in m1: o.hide_render = False
        kit.bake_ao(m1, samples=24, distance=8, floor=0.65)
    except Exception as e:
        print('AO skipped', e)
    tris = lambda objs: sum(sum(len(p.vertices) - 2 for p in o.data.polygons) for o in objs)
    print('HOTEL', hid, tris(m0), tris(m1), kit.export_glb(os.path.join(OUT, f'hotel-{hid}.glb')), 'bytes')
