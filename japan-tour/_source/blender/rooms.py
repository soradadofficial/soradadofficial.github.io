# Builds every guest-room interior as public/rooms/<id>.glb and writes public/rooms/rooms.json
# (room size and camera presets per section, in the site's frame: x right, y up, window toward -z).
# Run:  blender -b --python blender/rooms.py [-- room-id ...]
# Blender frame while modelling: X right, +Y = window wall, Z up, origin at the floor centre.
import bpy, math, os, sys, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import kit
from kit import mat, box, soft, cyl, ball, beam, lathe, plane

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'rooms')

ROOMS = {
    # Tokyo skyline hotel
    'tk-deluxe': dict(style='western', pal='city', w=5.2, d=6.4, bed='king'),
    'tk-twin': dict(style='western', pal='city', w=5.6, d=6.8, bed='twin'),
    'tk-corner': dict(style='western', pal='city', w=8.4, d=8.2, bed='king', living=True),
    'tk-sky': dict(style='western', pal='city', w=10.4, d=10.2, bed='king', living=True, tub_view=True),
    # Hakone lakeside ryokan
    'hk-washitsu': dict(style='washitsu', w=5.6, d=6.2, sleep='futon', bath='none'),
    'hk-onsen': dict(style='washitsu', w=6.4, d=6.6, sleep='futon', bath='onsen'),
    'hk-wayo': dict(style='washitsu', w=7.6, d=7.2, sleep='lowbed', bath='onsen'),
    'hk-hanare': dict(style='washitsu', w=9.6, d=8.6, sleep='lowbed', bath='onsen_large', living=True),
    # Kawaguchiko Fuji-view resort
    'kw-superior': dict(style='western', pal='resort', w=5.4, d=6.6, bed='twin'),
    'kw-deluxe': dict(style='western', pal='resort', w=6.0, d=7.4, bed='king', balcony=True),
    'kw-onsen': dict(style='western', pal='resort', w=8.2, d=8.6, bed='king', living=True, balcony=True, tub_view=True),
    'kw-sky': dict(style='western', pal='resort', w=11.0, d=10.6, bed='king', living=True, balcony=True, tub_view=True),
    # Kyoto machiya inn
    'ky-kura': dict(style='machiya', w=4.6, d=6.0),
    'ky-niwa': dict(style='machiya', w=5.8, d=7.2, living=True),
    'ky-maisonette': dict(style='machiya', w=8.2, d=9.0, living=True, big=True),
    # Osaka castle-view hotel
    'os-standard': dict(style='western', pal='castle', w=4.6, d=5.8, bed='queen'),
    'os-castle': dict(style='western', pal='castle', w=5.2, d=6.6, bed='king'),
    'os-family': dict(style='western', pal='castle', w=6.6, d=7.2, bed='family'),
    'os-suite': dict(style='western', pal='castle', w=8.6, d=9.0, bed='king', living=True),
}
PAL = {
    'city': dict(wall='#ece8e1', accent='#2f3a4c', wood='#6b4a36', fabric='#3f4f6b', throw='#c9a24a', floor='#8a6a50', rug='#d9d2c4'),
    'resort': dict(wall='#f1ece2', accent='#7a5a40', wood='#9a6f4a', fabric='#7d8f78', throw='#d98aa3', floor='#b08a62', rug='#e8dccb'),
    'castle': dict(wall='#efe9df', accent='#3f6a5e', wood='#5a3d2c', fabric='#5c4a6e', throw='#d9b25b', floor='#7a5a44', rug='#dcd3c6'),
}
G = None  # current parent

def M(name, *a, **k): return mat(name, *a, **k)

# ---------------- furniture ----------------
def bed(cx, cy, width, P, head_x=1):
    # head against the wall at +X (head_x = 1); 2.05 m long
    L = 2.05; x = cx
    box('BedBase', (L, width, 0.32), (x, cy, 0.2), M('wood', P['wood'], 0.55), G, 0.03)
    soft('Mattress', (L - 0.06, width - 0.06, 0.26), (x, cy, 0.47), M('linen', '#f7f4ee', 0.85), G, puff=0.25)
    soft('Duvet', (L * 0.62, width + 0.04, 0.16), (x - L * 0.16, cy, 0.63), M('duvet', '#fbfaf6', 0.9), G, puff=0.45)
    box('Runner', (0.5, width + 0.06, 0.035), (x - L * 0.34, cy, 0.71), M('throw', P['throw'], 0.8), G, 0.01)
    n = 2 if width >= 1.4 else 1
    for i in range(n):
        py = cy + (i - (n - 1) / 2) * (width / n)
        soft('Pillow', (0.42, width / n - 0.12, 0.2), (x + L / 2 - 0.3, py, 0.68), M('linen', '#f7f4ee', 0.85), G, rot=(0, -0.25, 0), puff=0.8)
        soft('Cushion', (0.14, 0.42, 0.4), (x + L / 2 - 0.58, py, 0.74), M('fabric', P['fabric'], 0.9), G, rot=(0, -0.35, 0), puff=0.7)

def nightstand(x, y, P, lamp=True):
    box('Nightstand', (0.45, 0.5, 0.5), (x, y, 0.25), M('wood', P['wood'], 0.55), G, 0.02)
    box('Drawer', (0.02, 0.42, 0.16), (x - 0.23, y, 0.34), M('woodDark', '#3a2a20', 0.5), G)
    if lamp:
        cyl('LampBase', 0.07, 0.05, 0.28, (x, y, 0.64), M('brass', '#b9975a', 0.3, 0.8), G, 14)
        cyl('LampShade', 0.17, 0.12, 0.24, (x, y, 0.9), M('lamp', '#fff1d6', 0.9, 0, emit='#ffd9a0', strength=2.2), G, 18, caps=False)

def sofa(x, y, length, P, rot=0.0):
    e = bpy.data.objects.new('Sofa', None); kit.scene.collection.objects.link(e); e.parent = G; e.location = (x, y, 0); e.rotation_euler = (0, 0, rot)
    F = M('fabric', P['fabric'], 0.9)
    box('SofaBase', (length, 0.9, 0.22), (0, 0, 0.2), F, e, 0.05)
    n = max(2, round(length / 0.75))
    for i in range(n):
        sx = (i - (n - 1) / 2) * (length - 0.3) / n
        soft('Seat', ((length - 0.3) / n - 0.02, 0.68, 0.2), (sx, -0.06, 0.4), F, e, puff=0.5)
        soft('Back', ((length - 0.3) / n - 0.02, 0.22, 0.46), (sx, 0.32, 0.62), F, e, rot=(-0.14, 0, 0), puff=0.5)
    for s in (-1, 1):
        box('Arm', (0.16, 0.9, 0.5), (s * (length / 2 - 0.08), 0, 0.36), F, e, 0.06)
        cyl('Leg', 0.025, 0.02, 0.1, (s * (length / 2 - 0.12), -0.36, 0.05), M('woodDark', '#3a2a20', 0.5), e, 8)
        cyl('Leg', 0.025, 0.02, 0.1, (s * (length / 2 - 0.12), 0.36, 0.05), M('woodDark', '#3a2a20', 0.5), e, 8)
    soft('Throw', (0.42, 0.14, 0.4), (length / 2 - 0.5, 0.14, 0.62), M('throw', P['throw'], 0.8), e, rot=(-0.2, 0, 0.2), puff=0.8)

def armchair(x, y, P, rot=0.0):
    e = bpy.data.objects.new('Chair', None); kit.scene.collection.objects.link(e); e.parent = G; e.location = (x, y, 0); e.rotation_euler = (0, 0, rot)
    F = M('fabric2', P['accent'], 0.9)
    soft('Seat', (0.66, 0.66, 0.22), (0, 0, 0.36), F, e, puff=0.5)
    soft('Back', (0.66, 0.2, 0.52), (0, 0.3, 0.62), F, e, rot=(-0.18, 0, 0), puff=0.5)
    for s in (-1, 1):
        box('Arm', (0.1, 0.62, 0.3), (s * 0.36, 0, 0.42), F, e, 0.04)
        for t in (-1, 1): cyl('Leg', 0.022, 0.016, 0.26, (s * 0.3, t * 0.28, 0.13), M('brass', '#b9975a', 0.3, 0.8), e, 8)

def round_table(x, y, r, h, P):
    cyl('TableTop', r, r, 0.035, (x, y, h), M('stone', '#d9d4cc', 0.3), G, 28)
    cyl('TableStem', 0.03, 0.03, h, (x, y, h / 2), M('brass', '#b9975a', 0.3, 0.8), G, 10)
    cyl('TableFoot', r * 0.6, r * 0.6, 0.02, (x, y, 0.01), M('brass', '#b9975a', 0.3, 0.8), G, 24)

def plant(x, y, h=1.2):
    cyl('Pot', 0.2, 0.15, 0.36, (x, y, 0.18), M('pot', '#2f2f33', 0.6), G, 16)
    for i in range(6):
        a = i * 1.05
        ball('Leaf', 0.2, (x + 0.16 * math.cos(a), y + 0.16 * math.sin(a), 0.5 + h * (0.35 + 0.1 * (i % 3))), M('leaf', '#4f7a4a', 0.8), G, 1, scale=(1, 1, 1.5))

def tub(x, y, P, rot=0.0, stone=False):
    e = bpy.data.objects.new('Tub', None); kit.scene.collection.objects.link(e); e.parent = G; e.location = (x, y, 0); e.rotation_euler = (0, 0, rot)
    body = M('tubStone', '#6f6a62', 0.7) if stone else M('ceramic', '#fbfbf9', 0.15)
    box('TubBody', (1.7, 0.8, 0.56), (0, 0, 0.28), body, e, 0.12, seg=3)
    box('TubWater', (1.46, 0.56, 0.02), (0, 0, 0.562), M('water', '#7fc4cf', 0.05, 0.2, emit='#5fb0c0', strength=0.4), e)
    cyl('Tap', 0.02, 0.02, 0.3, (0.7, 0.3, 0.7), M('chrome', '#d7dbe0', 0.15, 1.0), e, 8)

def vanity(x, y, length, P, rot=0.0):
    e = bpy.data.objects.new('Vanity', None); kit.scene.collection.objects.link(e); e.parent = G; e.location = (x, y, 0); e.rotation_euler = (0, 0, rot)
    box('VanityBase', (length, 0.5, 0.7), (0, 0, 0.45), M('wood', P['wood'], 0.55), e, 0.02)
    box('VanityTop', (length + 0.04, 0.54, 0.04), (0, 0, 0.82), M('stone', '#d9d4cc', 0.3), e, 0.01)
    for sx in ((-length / 4, length / 4) if length > 1.3 else (0,)):
        lathe('Basin', [(0.02, 0.86), (0.17, 0.87), (0.2, 0.95), (0.21, 0.97)], M('ceramic', '#fbfbf9', 0.15), e, 20, loc=(sx, 0, 0))
        cyl('Faucet', 0.014, 0.014, 0.22, (sx, 0.2, 0.95), M('chrome', '#d7dbe0', 0.15, 1.0), e, 8)
    box('Mirror', (length, 0.03, 0.9), (0, 0.26, 1.5), M('mirror', '#cfe0ea', 0.03, 1.0), e, 0.01)
    box('MirrorGlow', (length + 0.06, 0.01, 0.04), (0, 0.26, 2.0), M('cove', '#fff1d6', 0.9, 0, emit='#ffd9a0', strength=3), e)

def art(x, y, z, w, h, P, rot=0.0):
    e = bpy.data.objects.new('Art', None); kit.scene.collection.objects.link(e); e.parent = G; e.location = (x, y, z); e.rotation_euler = (0, 0, rot)
    box('Frame', (w, 0.04, h), (0, 0, 0), M('woodDark', '#3a2a20', 0.5), e, 0.005)
    box('Canvas', (w - 0.08, 0.045, h - 0.08), (0, 0, 0), M('canvas', '#f2ead8', 0.9), e)
    box('Ink1', (w * 0.5, 0.05, h * 0.18), (-w * 0.1, 0, -h * 0.15), M('fabric2', P['accent'], 0.9), e)
    cyl('Ink2', h * 0.16, h * 0.16, 0.05, (w * 0.2, 0, h * 0.15), M('throw', P['throw'], 0.8), e, 24, rot=(math.pi / 2, 0, 0))

def shell_room(w, d, h, P, floor_mat, window=True, wall='wall'):
    W = M(wall, P['wall'], 0.9)
    box('Floor', (w, d, 0.1), (0, 0, -0.05), floor_mat, G)
    box('Ceiling', (w, d, 0.1), (0, 0, h + 0.05), M('ceiling', '#f6f3ee', 0.9), G)
    box('WallL', (0.12, d, h), (-w / 2 - 0.06, 0, h / 2), W, G)
    box('WallR', (0.12, d, h), (w / 2 + 0.06, 0, h / 2), W, G)
    box('WallB', (w, 0.12, h), (0, -d / 2 - 0.06, h / 2), W, G)
    box('Door', (0.95, 0.05, 2.1), (w / 2 - 0.8, -d / 2 + 0.03, 1.05), M('wood', P['wood'], 0.55), G, 0.01)
    box('Skirting', (w, 0.02, 0.1), (0, -d / 2 + 0.01, 0.05), M('woodDark', '#3a2a20', 0.5), G)
    if window:
        box('Glass', (w, 0.02, h), (0, d / 2, h / 2), M('glass', '#cfe6ff', 0.05, 0.0, alpha=0.1), G)
        n = max(2, round(w / 1.7))
        for i in range(n + 1):
            box('Mullion', (0.06, 0.08, h), (-w / 2 + i * w / n, d / 2, h / 2), M('frameDark', '#2a2d33', 0.4, 0.6), G)
        box('Head', (w, 0.1, 0.08), (0, d / 2, h - 0.04), M('frameDark', '#2a2d33', 0.4, 0.6), G)
        box('Sill', (w, 0.1, 0.06), (0, d / 2, 0.03), M('frameDark', '#2a2d33', 0.4, 0.6), G)

# ---------------- room styles ----------------
def western(r):
    P = PAL[r['pal']]; w, d, h = r['w'], r['d'], 2.9
    shell_room(w, d, h, P, M('floor', P['floor'], 0.45))
    for i in range(int(w / 0.18)):   # floorboard joints
        box('Joint', (0.006, d, 0.004), (-w / 2 + (i + 0.5) * 0.18, 0, 0.002), M('woodDark', '#3a2a20', 0.5), G)
    # bathroom block, back-left, glazed toward the room
    bw, bd = min(2.7, w * 0.44), min(3.1, d * 0.42)
    bx0, by0 = -w / 2, -d / 2
    box('BathFloor', (bw, bd, 0.02), (bx0 + bw / 2, by0 + bd / 2, 0.01), M('tile', '#cfd3d6', 0.25), G)
    box('BathGlass', (bw, 0.02, 2.3), (bx0 + bw / 2, by0 + bd, 1.15), M('glass', '#cfe6ff', 0.05, 0.0, alpha=0.1), G)
    box('BathWall', (0.08, bd - 1.0, h), (bx0 + bw, by0 + (bd - 1.0) / 2, h / 2), M('wall', P['wall'], 0.9), G)
    box('BathFrame', (bw, 0.05, 0.05), (bx0 + bw / 2, by0 + bd, 2.3), M('frameDark', '#2a2d33', 0.4, 0.6), G)
    vanity(bx0 + 0.27, by0 + bd / 2, min(1.6, bd - 0.6), P, rot=-math.pi / 2)
    if not r.get('tub_view'): tub(bx0 + bw / 2 + 0.1, by0 + 0.46, P)
    else:
        box('ShowerGlass', (0.02, 1.2, 2.1), (bx0 + bw - 1.1, by0 + 0.6, 1.05), M('glass', '#cfe6ff', 0.05, 0.0, alpha=0.1), G)
        cyl('RainHead', 0.14, 0.14, 0.02, (bx0 + bw - 0.5, by0 + 0.5, 2.2), M('chrome', '#d7dbe0', 0.15, 1.0), G, 18)
    lathe('Toilet', [(0.16, 0), (0.2, 0.3), (0.22, 0.4), (0.2, 0.42), (0.05, 0.42)], M('ceramic', '#fbfbf9', 0.15), G, 18, loc=(bx0 + bw - 0.35, by0 + bd - 0.45, 0))
    # wardrobe and luggage bench in the entry
    box('Wardrobe', (0.6, 1.6, 2.3), (w / 2 - 0.3, -d / 2 + 2.0, 1.15), M('wood', P['wood'], 0.55), G, 0.01)
    box('WardrobeGap', (0.01, 0.01, 2.2), (w / 2 - 0.61, -d / 2 + 2.0, 1.15), M('woodDark', '#3a2a20', 0.5), G)
    # bed wall (head at +X) with slatted feature panel
    kind = r['bed']; by = max(0.2, by0 + bd + 1.25) if kind != 'family' else max(0.4, by0 + bd + 1.5)
    bx = w / 2 - 1.05
    span = {'queen': 2.6, 'king': 3.2, 'twin': 3.6, 'family': 4.2}[kind]
    box('HeadPanel', (0.06, span, 1.5), (w / 2 - 0.03, by, 1.0), M('accent', P['accent'], 0.7), G, 0.01)
    for i in range(int(span / 0.12)):
        box('Slat', (0.03, 0.05, 1.5), (w / 2 - 0.075, by - span / 2 + (i + 0.5) * 0.12, 1.0), M('wood', P['wood'], 0.55), G)
    box('HeadCove', (0.04, span, 0.03), (w / 2 - 0.08, by, 1.8), M('cove', '#fff1d6', 0.9, 0, emit='#ffd9a0', strength=3), G)
    if kind in ('king', 'queen'):
        bwid = 1.9 if kind == 'king' else 1.6
        bed(bx, by, bwid, P); nightstand(w / 2 - 0.26, by - bwid / 2 - 0.36, P); nightstand(w / 2 - 0.26, by + bwid / 2 + 0.36, P)
    else:
        bwid = 1.15 if kind == 'twin' else 1.45
        bed(bx, by - bwid / 2 - 0.28, bwid, P); bed(bx, by + bwid / 2 + 0.28, bwid, P); nightstand(w / 2 - 0.26, by, P)
    box('Rug', (2.6, span + 0.4, 0.015), (bx - 0.5, by, 0.008), M('rug', P['rug'], 1.0), G, 0.005)
    box('Bench', (0.42, 1.3, 0.42), (bx - 1.36, by, 0.21), M('fabric2', P['accent'], 0.9), G, 0.05)
    # TV wall opposite the bed
    tvx = -w / 2 + 0.02 if by > by0 + bd + 0.3 else bx0 + bw + 0.06
    box('Console', (0.4, 1.9, 0.45), (-w / 2 + 0.22, max(by, by0 + bd + 1.05), 0.3), M('wood', P['wood'], 0.55), G, 0.015)
    box('TV', (0.04, 1.35, 0.78), (-w / 2 + 0.04, max(by, by0 + bd + 1.05), 1.35), M('screen', '#0c0d10', 0.2, 0.3), G, 0.008)
    art(-w / 2 + 0.03, d / 2 - 1.6, 1.5, 1.0, 0.7, P, rot=math.pi / 2)
    # window zone
    wy = d / 2
    if r.get('living'):
        sofa(-w / 4 - 0.2, wy - 2.6, min(2.6, w * 0.3), P, rot=math.pi)
        round_table(-w / 4 - 0.2, wy - 1.55, 0.42, 0.4, P)
        armchair(-w / 4 + 1.5, wy - 1.5, P, rot=2.2)
        armchair(-w / 4 - 1.9, wy - 1.5, P, rot=-2.2)
        box('LivingRug', (3.4, 2.6, 0.015), (-w / 4 - 0.2, wy - 1.9, 0.008), M('rug', P['rug'], 1.0), G, 0.005)
        cyl('Pendant', 0.3, 0.22, 0.22, (-w / 4 - 0.2, wy - 1.6, h - 0.5), M('lamp', '#fff1d6', 0.9, 0, emit='#ffd9a0', strength=2.2), G, 24, caps=False)
        cyl('PendantCord', 0.006, 0.006, 0.4, (-w / 4 - 0.2, wy - 1.6, h - 0.2), M('frameDark', '#2a2d33', 0.4, 0.6), G, 6)
        box('Desk', (1.5, 0.6, 0.04), (w / 2 - 0.9, wy - 0.5, 0.74), M('wood', P['wood'], 0.55), G, 0.01)
        for sx in (-0.68, 0.68): box('DeskLeg', (0.04, 0.5, 0.72), (w / 2 - 0.9 + sx, wy - 0.5, 0.36), M('frameDark', '#2a2d33', 0.4, 0.6), G)
        armchair(w / 2 - 0.9, wy - 1.25, P, rot=math.pi)
    else:
        armchair(-w / 4, wy - 1.0, P, rot=2.6)
        round_table(-w / 4 + 0.8, wy - 0.8, 0.28, 0.5, P)
        box('Desk', (0.5, 1.3, 0.04), (-w / 2 + 0.27, wy - 2.4, 0.74), M('wood', P['wood'], 0.55), G, 0.01)
    plant(w / 2 - 0.4, wy - 0.4)
    for s in (-1, 1):   # curtains gathered at both ends of the window
        plane('Curtain', 0.9, h - 0.1, (s * (w / 2 - 0.5), wy - 0.14, h / 2), M('curtain', '#d8d0c2', 0.95), G, rot=(math.pi / 2, 0, 0), wave=0.05, cuts=14)
    box('CurtainTrack', (w, 0.05, 0.04), (0, wy - 0.14, h - 0.02), M('frameDark', '#2a2d33', 0.4, 0.6), G)
    if r.get('tub_view') and not r.get('balcony'):
        box('TubPlinth', (2.3, 1.3, 0.14), (w / 4 + 0.4, wy - 0.85, 0.07), M('stone', '#d9d4cc', 0.3), G, 0.02)
        tub(w / 4 + 0.4, wy - 0.85, P)
    if r.get('balcony'):
        bdp = 1.9
        box('Balcony', (w, bdp, 0.12), (0, wy + bdp / 2, -0.06), M('deck', '#8c6a4c', 0.7), G)
        box('Rail', (w, 0.02, 1.05), (0, wy + bdp, 0.52), M('glass', '#cfe6ff', 0.05, 0.0, alpha=0.1), G)
        box('RailTop', (w, 0.05, 0.04), (0, wy + bdp, 1.06), M('frameDark', '#2a2d33', 0.4, 0.6), G)
        armchair(-w / 4, wy + 0.9, P, rot=2.9); armchair(-w / 4 + 1.4, wy + 0.9, P, rot=-2.9)
        round_table(-w / 4 + 0.7, wy + 1.2, 0.26, 0.45, P)
        if r.get('tub_view'):
            lathe('Rotenburo', [(0.02, 0.06), (0.62, 0.06), (0.74, 0.3), (0.78, 0.62), (0.72, 0.62), (0.66, 0.14), (0.02, 0.14)], M('hinoki', '#c79a62', 0.6), G, 28, loc=(w / 4 + 0.6, wy + 0.95, 0))
            cyl('RotenWater', 0.7, 0.7, 0.02, (w / 4 + 0.6, wy + 0.95, 0.52), M('water', '#7fc4cf', 0.05, 0.2, emit='#5fb0c0', strength=0.4), G, 28)
    for i in range(4):   # downlights
        cyl('Downlight', 0.07, 0.07, 0.01, ((i % 2 - 0.5) * w * 0.5, (i // 2 - 0.5) * d * 0.5, h - 0.006), M('cove', '#fff1d6', 0.9, 0, emit='#ffd9a0', strength=3), G, 14)
    return dict(
        bed=dict(eye=(-w / 2 + 0.8, by - 1.5 if by - 1.5 > by0 + bd + 0.2 else by + 1.6, 1.55), look=(w / 2 - 1.0, by, 0.75)),
        bath=dict(eye=(bx0 + bw + 0.9, by0 + bd + 0.9, 1.55), look=(bx0 + bw / 2 - 0.3, by0 + bd / 2 - 0.2, 0.9)),
        living=dict(eye=(w / 2 - 0.7, wy - 4.2 if r.get('living') else wy - 3.0, 1.55), look=(-w / 4, wy - 1.2, 0.7)),
        view=dict(eye=(0, wy - 1.3, 1.5), look=(0, wy + 40, 1.9)),
    )

def tatami(x0, y0, x1, y1):
    T = M('tatami', '#c9c08a', 0.95); E = M('tatamiEdge', '#3b3a2a', 0.9)
    nx = max(1, round((x1 - x0) / 1.82)); ny = max(1, round((y1 - y0) / 0.91))
    mw, mh = (x1 - x0) / nx, (y1 - y0) / ny
    for i in range(nx):
        for j in range(ny):
            cx, cy = x0 + (i + 0.5) * mw, y0 + (j + 0.5) * mh
            box('Mat', (mw - 0.01, mh - 0.01, 0.05), (cx, cy, 0.025), T, G, 0.006)
            for s in (-1, 1): box('MatEdge', (mw - 0.01, 0.035, 0.052), (cx, cy + s * (mh / 2 - 0.02), 0.026), E, G)

def futon(x, y, P=None, low=False):
    z = 0.05 + (0.3 if low else 0)
    if low: box('Platform', (2.15, 1.25, 0.3), (x, y, 0.2), M('hinoki', '#c79a62', 0.6), G, 0.02)
    soft('Shikibuton', (2.0, 1.05, 0.12), (x, y, z + 0.06), M('linen', '#f7f4ee', 0.85), G, puff=0.3)
    soft('Kakebuton', (1.35, 1.12, 0.14), (x - 0.3, y, z + 0.17), M('indigo', '#4f6a96', 0.9), G, puff=0.5)
    soft('MakuraPillow', (0.3, 0.5, 0.12), (x + 0.8, y, z + 0.16), M('linen', '#f7f4ee', 0.85), G, puff=0.8)

def shoji(cx, cy, length, h, along_x=True):
    Wd = M('hinokiDark', '#6b4430', 0.6); Pp = M('washi', '#fff3dc', 0.95, 0, emit='#ffcf8a', strength=0.5)
    sz = (length, 0.02, h) if along_x else (0.02, length, h)
    box('Washi', sz, (cx, cy, h / 2), Pp, G)
    n = max(2, round(length / 0.45))
    for i in range(n + 1):
        o = -length / 2 + i * length / n
        box('Kumiko', (0.025, 0.04, h) if along_x else (0.04, 0.025, h), (cx + o, cy, h / 2) if along_x else (cx, cy + o, h / 2), Wd, G)
    for k in range(5):
        z = 0.02 + k * (h - 0.04) / 4
        box('KumikoH', (length, 0.04, 0.025) if along_x else (0.04, length, 0.025), (cx, cy, z), Wd, G)

def low_table(x, y, P, n=4):
    Wd = M('hinokiDark', '#6b4430', 0.6)
    box('Zataku', (1.3, 0.85, 0.05), (x, y, 0.34), Wd, G, 0.012)
    for sx in (-0.55, 0.55):
        for sy in (-0.34, 0.34): box('ZatakuLeg', (0.07, 0.07, 0.32), (x + sx, y + sy, 0.16), Wd, G, 0.01)
    for i, (sx, sy) in enumerate(((0, -0.85), (0, 0.85), (-1.05, 0), (1.05, 0))[:n]):
        soft('Zabuton', (0.58, 0.58, 0.09), (x + sx, y + sy, 0.1), M('zabuton', '#7d2f3c', 0.9), G, puff=0.6)
    lathe('Teapot', [(0.01, 0.37), (0.08, 0.37), (0.1, 0.42), (0.08, 0.48), (0.03, 0.49)], M('iron', '#23262b', 0.5, 0.6), G, 16, loc=(x - 0.2, y, 0))
    for k in range(2):
        lathe('Cup', [(0.01, 0.37), (0.035, 0.37), (0.045, 0.43)], M('ceramic', '#fbfbf9', 0.15), G, 12, loc=(x + 0.15 + k * 0.14, y + 0.1 - k * 0.2, 0))

def washitsu(r):
    w, d, h = r['w'], r['d'], 2.6
    P = dict(wall='#e9dfc9', wood='#c79a62', accent='#6b4430', fabric='#5c78a8', throw='#7d2f3c', floor='#c9c08a', rug='#e8dccb')
    Wd = M('hinokiDark', '#6b4430', 0.6)
    shell_room(w, d, h, P, M('subfloor', '#8a7a5a', 0.9), window=False, wall='plaster')
    eng = 1.25   # engawa veranda strip inside the window
    tatami(-w / 2, -d / 2, w / 2, d / 2 - eng)
    box('Engawa', (w, eng, 0.05), (0, d / 2 - eng / 2, 0.025), M('hinoki', P['wood'], 0.6), G)
    for i in range(int(w / 0.14)):
        box('Plank', (0.004, eng, 0.004), (-w / 2 + (i + 0.5) * 0.14, d / 2 - eng / 2, 0.052), Wd, G)
    # timber frame: posts, tie rail, ceiling battens
    for x in (-w / 2 + 0.06, w / 2 - 0.06):
        for k in range(int(d / 1.8) + 1):
            box('Hashira', (0.1, 0.1, h), (x, -d / 2 + 0.06 + k * (d - 0.12) / int(d / 1.8), h / 2), Wd, G)
    box('Nageshi', (w, 0.05, 0.09), (0, -d / 2 + 0.03, 1.95), Wd, G); box('NageshiL', (0.05, d, 0.09), (-w / 2 + 0.03, 0, 1.95), Wd, G); box('NageshiR', (0.05, d, 0.09), (w / 2 - 0.03, 0, 1.95), Wd, G)
    for i in range(int(w / 0.45)):
        box('Batten', (0.03, d, 0.03), (-w / 2 + (i + 0.5) * 0.45, 0, h - 0.015), Wd, G)
    shoji(-w / 2 + 0.07, 0.3, d * 0.5, 1.9, along_x=False)
    # sliding glass onto the deck, shoji leaves parked at the sides
    box('Glass', (w, 0.02, h), (0, d / 2, h / 2), M('glass', '#cfe6ff', 0.05, 0.0, alpha=0.1), G)
    for i in range(5): box('Frame', (0.06, 0.07, h), (-w / 2 + i * w / 4, d / 2, h / 2), Wd, G)
    box('FrameTop', (w, 0.08, 0.08), (0, d / 2, h - 0.04), Wd, G)
    for s in (-1, 1): shoji(s * (w / 2 - 0.5), d / 2 - eng - 0.02, 0.95, 1.95)
    # tokonoma alcove at the back right
    box('TokoFloor', (1.9, 0.75, 0.16), (w / 2 - 1.05, -d / 2 + 0.38, 0.08), M('hinokiDark', '#6b4430', 0.6), G, 0.01)
    box('TokoPost', (0.12, 0.12, h), (w / 2 - 2.05, -d / 2 + 0.72, h / 2), M('bark', '#4a3526', 0.9), G, 0.03)
    box('Scroll', (0.5, 0.01, 1.3), (w / 2 - 1.05, -d / 2 + 0.02, 1.35), M('canvas', '#f2ead8', 0.9), G)
    box('ScrollInk', (0.1, 0.015, 0.8), (w / 2 - 1.05, -d / 2 + 0.022, 1.35), M('iron', '#23262b', 0.5, 0.6), G)
    lathe('Vase', [(0.01, 0.16), (0.07, 0.16), (0.1, 0.28), (0.05, 0.42), (0.06, 0.46)], M('celadon', '#9db8a4', 0.3), G, 16, loc=(w / 2 - 0.5, -d / 2 + 0.4, 0))
    beam('Branch', (w / 2 - 0.5, -d / 2 + 0.4, 0.46), (w / 2 - 0.75, -d / 2 + 0.45, 0.95), 0.008, M('bark', '#4a3526', 0.9), G, 5)
    for k in range(5): ball('Blossom', 0.05, (w / 2 - 0.55 - k * 0.045, -d / 2 + 0.42 + (k % 2) * 0.04, 0.6 + k * 0.08), M('sakura', '#ffb6cb', 0.8), G, 1)
    # sleeping area at the back left, table in the middle
    low = r['sleep'] == 'lowbed'
    fx = -w / 2 + 1.3
    futon(fx, -d / 2 + 1.0, low=low); futon(fx, -d / 2 + 2.3, low=low)
    ball('Andon', 0.16, (fx + 1.4, -d / 2 + 0.4, 0.3), M('washi', '#fff3dc', 0.95, 0, emit='#ffcf8a', strength=0.5), G, 2, scale=(1, 1, 1.6))
    tx, ty = (w / 4 if w > 6 else 0.6), 0.2
    low_table(tx, ty, P)
    if r.get('living'):
        sofa(-w / 4 + 0.6, d / 2 - eng - 1.1, 2.2, dict(P, fabric='#8a8f78'), rot=math.pi)
    for s in (-1, 1):   # legless chairs on the veranda
        soft('Zaisu', (0.5, 0.5, 0.08), (s * 0.6, d / 2 - 0.62, 0.1), M('zabuton', '#7d2f3c', 0.9), G, puff=0.6)
        box('ZaisuBack', (0.5, 0.05, 0.42), (s * 0.6, d / 2 - 0.62 - s * 0.0 - 0.27, 0.32), Wd, G, 0.02, rot=(-0.2, 0, 0))
    box('VerandaTable', (0.45, 0.45, 0.3), (0, d / 2 - 0.62, 0.2), Wd, G, 0.02)
    # washroom nook by the entrance
    vanity(-w / 2 + 0.3, -d / 2 + (d - eng) * 0.78, 1.0, P, rot=-math.pi / 2)
    # deck, fence wings and the open-air bath
    dk = 2.8 if r['bath'] != 'onsen_large' else 3.6
    box('Deck', (w + 0.6, dk, 0.12), (0, d / 2 + dk / 2, -0.06), M('deck', '#8c6a4c', 0.7), G)
    for i in range(int((w + 0.6) / 0.16)):
        box('DeckGap', (0.006, dk, 0.004), (-w / 2 - 0.3 + (i + 0.5) * 0.16, d / 2 + dk / 2, 0.002), Wd, G)
    for s in (-1, 1):
        for k in range(int(dk / 0.09)):
            cyl('Bamboo', 0.03, 0.03, 1.7, (s * (w / 2 + 0.25), d / 2 + 0.05 + k * 0.09, 0.85), M('bamboo', '#b9a45c', 0.6), G, 6)
        box('FenceRail', (0.05, dk, 0.05), (s * (w / 2 + 0.25), d / 2 + dk / 2, 1.5), Wd, G)
    bxp, byp = w / 4, d / 2 + dk / 2 + 0.1
    if r['bath'] == 'onsen':
        lathe('Rotenburo', [(0.02, 0.06), (0.74, 0.06), (0.86, 0.3), (0.9, 0.66), (0.83, 0.66), (0.77, 0.14), (0.02, 0.14)], M('hinoki', P['wood'], 0.6), G, 30, loc=(bxp, byp, 0))
        cyl('RotenWater', 0.82, 0.82, 0.02, (bxp, byp, 0.56), M('water', '#7fc4cf', 0.05, 0.2, emit='#5fb0c0', strength=0.4), G, 30)
    elif r['bath'] == 'onsen_large':
        box('StoneBath', (3.2, 2.0, 0.5), (bxp - 0.3, byp, 0.25), M('tubStone', '#6f6a62', 0.7), G, 0.12, seg=3)
        box('StoneWater', (2.86, 1.66, 0.02), (bxp - 0.3, byp, 0.502), M('water', '#7fc4cf', 0.05, 0.2, emit='#5fb0c0', strength=0.4), G)
        for k in range(7):
            a = k * 0.9
            ball('Rock', 0.28 + 0.1 * (k % 3), (bxp - 0.3 + 1.9 * math.cos(a), byp + 1.25 * math.sin(a), 0.16), M('rock', '#7d776c', 0.9), G, 1, scale=(1, 0.8, 0.7))
    if r['bath'] != 'none':
        lathe('Bucket', [(0.01, 0.0), (0.13, 0.0), (0.15, 0.2), (0.14, 0.2), (0.12, 0.02)], M('hinoki', P['wood'], 0.6), G, 14, loc=(bxp - 1.3, byp - 0.6, 0))
        box('Stool', (0.32, 0.24, 0.2), (bxp - 1.3, byp - 0.1, 0.1), M('hinoki', P['wood'], 0.6), G, 0.02)
    else:
        soft('DeckSeat', (0.6, 0.6, 0.1), (0.4, d / 2 + 1.2, 0.3), M('zabuton', '#7d2f3c', 0.9), G, puff=0.6)
        box('DeckBench', (1.6, 0.5, 0.25), (0.4, d / 2 + 1.2, 0.13), Wd, G, 0.02)
    # garden accents: stone lantern, rocks, a clipped pine
    lx, ly = -w / 4 - 0.4, d / 2 + dk - 0.5
    cyl('LanternPost', 0.07, 0.09, 0.6, (lx, ly, 0.3), M('rock', '#7d776c', 0.9), G, 8)
    box('LanternBox', (0.26, 0.26, 0.22), (lx, ly, 0.72), M('washi', '#fff3dc', 0.95, 0, emit='#ffcf8a', strength=0.5), G, 0.02)
    cyl('LanternCap', 0.26, 0.02, 0.16, (lx, ly, 0.92), M('rock', '#7d776c', 0.9), G, 6)
    for k in range(3): ball('Pine', 0.3 - k * 0.05, (-w / 2 + 0.5, d / 2 + dk - 0.4, 0.5 + k * 0.32), M('leaf', '#4f7a4a', 0.8), G, 1, scale=(1.3, 1.3, 0.6))
    cyl('PineTrunk', 0.04, 0.05, 1.1, (-w / 2 + 0.5, d / 2 + dk - 0.4, 0.5), M('bark', '#4a3526', 0.9), G, 6)
    has = r['bath'] != 'none'
    return dict(
        bed=dict(eye=(fx + 2.6, -d / 2 + 3.6, 1.35), look=(fx, -d / 2 + 1.5, 0.3)),
        bath=dict(eye=(bxp - 2.2, d / 2 - 0.5, 1.5), look=(bxp, byp, 0.4)) if has else dict(eye=(0.4, -d / 2 + 2.0, 1.4), look=(-w / 2 + 0.3, -d / 2 + (d - eng) * 0.78, 0.9)),
        living=dict(eye=(-w / 2 + 0.9, d / 2 - eng - 0.4, 1.35), look=(tx, ty, 0.3)),
        view=dict(eye=(0, d / 2 - eng - 0.5, 1.25), look=(0, d / 2 + 40, 1.6)),
    )

def machiya(r):
    w, d, h = r['w'], r['d'], 2.7
    P = dict(wall='#d9c8a4', wood='#8a5a3c', accent='#3a2a20', fabric='#6a6f5c', throw='#b5583a', floor='#5a4030', rug='#d8cdb8')
    Wd = M('hinokiDark', '#4a3024', 0.6); Hn = M('hinoki', '#c79a62', 0.6)
    shell_room(w, d, h, P, M('floor', P['floor'], 0.5), window=False, wall='earth')
    for i in range(int(w / 0.15)):
        box('Joint', (0.005, d, 0.004), (-w / 2 + (i + 0.5) * 0.15, 0, 0.002), M('woodDark', '#2a1c14', 0.5), G)
    for k in range(int(d / 0.9)):   # exposed beams
        box('Beam', (w, 0.12, 0.16), (0, -d / 2 + 0.45 + k * 0.9, h - 0.08), Wd, G, 0.01)
    box('Ridge', (0.16, d, 0.2), (0, 0, h - 0.24), Wd, G, 0.01)
    for x in (-w / 2 + 0.06, w / 2 - 0.06):
        for k in range(int(d / 1.8) + 1): box('Post', (0.11, 0.11, h), (x, -d / 2 + 0.06 + k * (d - 0.12) / int(d / 1.8), h / 2), Wd, G)
    # raised tatami sleeping platform at the back
    pd = min(3.0, d * 0.42); pw = w if not r.get('big') else w * 0.55
    px0 = -w / 2
    box('Dais', (pw, pd, 0.28), (px0 + pw / 2, -d / 2 + pd / 2, 0.14), Hn, G, 0.01)
    e = bpy.data.objects.new('DaisTop', None); kit.scene.collection.objects.link(e); e.parent = G; e.location = (0, 0, 0.28)
    global_G = G
    set_parent(e); tatami(px0 + 0.05, -d / 2 + 0.05, px0 + pw - 0.05, -d / 2 + pd - 0.05)
    futon(px0 + 1.25, -d / 2 + 0.85);
    if pw > 3.4: futon(px0 + 1.25, -d / 2 + 2.05)
    set_parent(global_G)
    ball('PaperLamp', 0.2, (px0 + pw - 0.5, -d / 2 + 0.5, 0.6), M('washi', '#fff3dc', 0.95, 0, emit='#ffcf8a', strength=0.5), G, 2, scale=(1, 1, 1.3))
    # step chest and noren by the door
    for k in range(3): box('Tansu', (0.5, 0.75, 0.45), (w / 2 - 0.3, -d / 2 + 1.5 + k * 0.75, 0.225 + k * 0.0), Wd, G, 0.01)
    for k in range(2): box('Tansu2', (0.5, 0.75, 0.45), (w / 2 - 0.3, -d / 2 + 1.5 + k * 0.75, 0.675), Wd, G, 0.01)
    for k in range(3): plane('Noren', 0.3, 0.8, (w / 2 - 1.12 + k * 0.32, -d / 2 + 0.12, 1.75), M('indigo', '#33466e', 0.9), G, rot=(math.pi / 2, 0, 0), wave=0.012, cuts=4)
    # living corner: low sofa, chabudai, floor lamp
    ly = d / 2 - 2.0
    if r.get('living'):
        sofa(-w / 2 + 1.5, ly + 0.2, 2.0, P, rot=math.pi / 2)
        low_table(-w / 2 + 3.0 if w > 5.5 else 0.3, ly + 0.2, P, n=2)
    else:
        low_table(0.2, ly + 0.2, P, n=2)
    art(w / 2 - 0.03, ly, 1.45, 0.9, 0.6, P, rot=-math.pi / 2)
    # hinoki bath nook, back right, behind a slatted screen
    if r.get('big'):
        box('BathFloor', (w - pw - 0.1, pd, 0.04), (px0 + pw + (w - pw) / 2, -d / 2 + pd / 2, 0.02), M('slate', '#4c5055', 0.5), G)
        box('HinokiTub', (1.5, 0.9, 0.62), (px0 + pw + (w - pw) / 2, -d / 2 + 0.6, 0.31), Hn, G, 0.04)
        box('HinokiWater', (1.34, 0.74, 0.02), (px0 + pw + (w - pw) / 2, -d / 2 + 0.6, 0.622), M('water', '#7fc4cf', 0.05, 0.2, emit='#5fb0c0', strength=0.4), G)
        for k in range(int((w - pw) / 0.12)):
            box('Screen', (0.04, 0.04, 2.0), (px0 + pw + 0.1 + k * 0.12, -d / 2 + pd, 1.0), Wd, G)
        bath_eye = (px0 + pw + 0.4, -d / 2 + pd + 1.6, 1.5); bath_look = (px0 + pw + (w - pw) / 2, -d / 2 + 0.6, 0.5)
    else:
        box('HinokiTub', (1.3, 0.8, 0.6), (w / 2 - 0.8, -d / 2 + pd + 0.9, 0.3), Hn, G, 0.04)
        box('HinokiWater', (1.14, 0.64, 0.02), (w / 2 - 0.8, -d / 2 + pd + 0.9, 0.602), M('water', '#7fc4cf', 0.05, 0.2, emit='#5fb0c0', strength=0.4), G)
        lathe('Bucket', [(0.01, 0.0), (0.13, 0.0), (0.15, 0.2), (0.14, 0.2), (0.12, 0.02)], Hn, G, 14, loc=(w / 2 - 1.7, -d / 2 + pd + 0.7, 0))
        bath_eye = (-0.6, -d / 2 + pd + 2.3, 1.5); bath_look = (w / 2 - 0.8, -d / 2 + pd + 0.9, 0.4)
    # koshi lattice front with a clear opening onto the pocket garden
    box('Glass', (w, 0.02, h), (0, d / 2, h / 2), M('glass', '#cfe6ff', 0.05, 0.0, alpha=0.1), G)
    op = min(2.4, w * 0.45)
    for k in range(int(w / 0.09)):
        x = -w / 2 + (k + 0.5) * 0.09
        if abs(x) < op / 2: continue
        box('Koshi', (0.035, 0.05, h), (x, d / 2 - 0.05, h / 2), Wd, G)
    box('KoshiTop', (w, 0.08, 0.1), (0, d / 2 - 0.05, h - 0.05), Wd, G); box('KoshiSill', (w, 0.14, 0.06), (0, d / 2 - 0.05, 0.03), Wd, G)
    for s in (-1, 1): box('KoshiJamb', (0.08, 0.08, h), (s * op / 2, d / 2 - 0.05, h / 2), Wd, G)
    # tsuboniwa pocket garden
    gd = 2.6
    box('Moss', (w, gd, 0.1), (0, d / 2 + gd / 2, -0.05), M('moss', '#5f7f45', 1.0), G)
    for s in (-1, 1): box('GardenWall', (0.12, gd, 1.5), (s * (w / 2 + 0.06), d / 2 + gd / 2, 0.75), M('earth', P['wall'], 0.9), G)
    ball('MossMound', 0.9, (-w / 4, d / 2 + 1.5, -0.35), M('moss', '#5f7f45', 1.0), G, 2, scale=(1.4, 1, 0.6))
    for k in range(4): cyl('Stone', 0.26, 0.24, 0.06, (0.3 + k * 0.1 * (-1) ** k, d / 2 + 0.4 + k * 0.55, 0.03), M('rock', '#7d776c', 0.9), G, 10)
    lx, ly2 = w / 4, d / 2 + 1.7
    cyl('LanternPost', 0.08, 0.1, 0.7, (lx, ly2, 0.35), M('rock', '#7d776c', 0.9), G, 8)
    box('LanternBox', (0.3, 0.3, 0.24), (lx, ly2, 0.84), M('washi', '#fff3dc', 0.95, 0, emit='#ffcf8a', strength=0.5), G, 0.02)
    cyl('LanternCap', 0.3, 0.02, 0.18, (lx, ly2, 1.06), M('rock', '#7d776c', 0.9), G, 6)
    cyl('MapleTrunk', 0.035, 0.05, 1.5, (-w / 4 - 0.2, d / 2 + 1.7, 0.75), M('bark', '#4a3526', 0.9), G, 6)
    for k in range(6):
        a = k * 1.1
        ball('Maple', 0.32, (-w / 4 - 0.2 + 0.4 * math.cos(a), d / 2 + 1.7 + 0.4 * math.sin(a), 1.5 + 0.12 * (k % 3)), M('maple', '#c2452d', 0.8), G, 1, scale=(1, 1, 0.6))
    cyl('Tsukubai', 0.24, 0.2, 0.3, (w / 4 + 0.7, d / 2 + 0.8, 0.15), M('rock', '#7d776c', 0.9), G, 12)
    return dict(
        bed=dict(eye=(px0 + pw * 0.5 + 1.6, -d / 2 + pd + 1.9, 1.5), look=(px0 + 1.25, -d / 2 + 1.0, 0.45)),
        bath=dict(eye=bath_eye, look=bath_look),
        living=dict(eye=(w / 2 - 0.8, -d / 2 + pd + 0.9 if r.get('big') else 0.0, 1.5), look=(-w / 2 + 2.0, ly + 0.3, 0.4)),
        view=dict(eye=(0, d / 2 - 1.6, 1.3), look=(0, d / 2 + 30, 1.3)),
    )

def set_parent(p):
    global G
    G = p

STYLES = dict(western=western, washitsu=washitsu, machiya=machiya)
want = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else list(ROOMS)
meta_path = os.path.join(OUT, 'rooms.json')
meta = json.load(open(meta_path)) if os.path.exists(meta_path) else {}
to_site = lambda v: [round(v[0], 3), round(v[2], 3), round(-v[1], 3)]   # Blender (x, y, z) -> glTF (x, z, -y)
for rid in want:
    r = ROOMS[rid]
    kit.reset()
    root = bpy.data.objects.new('Room', None); kit.scene.collection.objects.link(root)
    set_parent(root)
    views = STYLES[r['style']](r)
    meshes = kit.join_by_material(root)
    try: kit.bake_ao(meshes, samples=48, distance=1.0, floor=0.5)
    except Exception as e: print('AO skipped', e)
    size = kit.export_glb(os.path.join(OUT, rid + '.glb'))
    tris = sum(sum(len(p.vertices) - 2 for p in o.data.polygons) for o in meshes)
    meta[rid] = dict(w=r['w'], d=r['d'], h=2.9 if r['style'] == 'western' else 2.6, style=r['style'], views={k: dict(eye=to_site(v['eye']), look=to_site(v['look'])) for k, v in views.items()})
    print('ROOM', rid, tris, 'tris', size, 'bytes')
os.makedirs(OUT, exist_ok=True)
json.dump(meta, open(meta_path, 'w'), indent=1)
