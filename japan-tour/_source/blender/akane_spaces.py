# Akane Sky Tokyo interiors for stay-tokyo.html, from research/hotel-deep-dive-spec.md 1.3-1.10:
#   lobby   1F lobby, home-study front desk, Lobby Lounge on the tower side facing a garden waterfall
#           and Tokyo Tower, the B1-32F atrium (its 8 glass lifts are drawn by the page) and a chandelier
#           of hundreds of small hanging mirrors at its foot
#   spa     B2 Spa & Fitness: 25 x 5 x 1.4 m pool, onsen, sauna, gym
#   lounge  32F Premium Club Lounge: window seats facing Tokyo Tower, buffet in the middle (2016 refit)
#   sky     33F Stellar Garden: warm-wood sky bar, tower-side seats in two rows, 11-seat counter
# Shells follow the real footprint, atrium and storeys (blender/akane_layout.json). The spa layout,
# the waterfall's size and place and every piece of furniture are not published (spec 1.10), so they
# are illustrative and the page says so.
# Output: public/models/akane-<id>.glb (page frame, y = metres above that space's floor) and
# public/models/akane-spaces.json (camera views, lamp, steam source).
# Run: blender -b --python blender/akane_spaces.py [-- lobby spa lounge sky]
import sys, os, json, math, random
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import bpy, bmesh
from mathutils import Vector, Matrix, geometry
import kit
from kit import mat, box, cyl, ball

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'public', 'models')
L = json.load(open(os.path.join(HERE, 'akane_layout.json')))
B = lambda pts: [(x, -z) for x, z in pts]  # page (x east, z south) -> Blender (x east, y north)

def area2(p):
    return sum(p[i][0] * p[(i + 1) % len(p)][1] - p[(i + 1) % len(p)][0] * p[i][1] for i in range(len(p))) / 2

RING, ATR, CORR = B(L['ring']), B(L['atrium']), B(L['corridor'])
assert area2(RING) > 0 and area2(ATR) > 0 and area2(CORR) > 0  # counter-clockwise from above
FL = {k: (y, h) for k, y, h in L['storeys']}
TT = (L['tokyoTower'][0], L['tokyoTower'][1])  # page x, z
AC = Vector((sum(p[0] for p in ATR) / len(ATR), sum(p[1] for p in ATR) / len(ATR)))  # same centroid the page's lifts use

# ---------------- geometry helpers ----------------
def offset(pts, d):
    """Move every edge of a convex CCW polygon outward by d (negative = inward)."""
    n = len(pts); out = []; lines = []
    for i in range(n):
        a, b = Vector(pts[i]), Vector(pts[(i + 1) % n]); t = (b - a).normalized()
        lines.append((a + Vector((t.y, -t.x)) * d, t))
    for i in range(n):
        (p, d1), (q, d2) = lines[i - 1], lines[i]
        s = ((q.x - p.x) * d2.y - (q.y - p.y) * d2.x) / (d1.x * d2.y - d1.y * d2.x)
        out.append(tuple(p + d1 * s))
    return out

def inside(pt, poly):
    x, y = pt; c = False
    for i in range(len(poly)):
        (x1, y1), (x2, y2) = poly[i], poly[i - 1]
        if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1: c = not c
    return c

def flat(name, outer, holes, z, m, parent, down=False):
    """A flat polygon with holes at height z, facing up (or down)."""
    loops = [[Vector((x, y, 0)) for x, y in outer]] + [[Vector((x, y, 0)) for x, y in h] for h in holes]
    pts = [v for l in loops for v in l]
    bm = bmesh.new(); vs = [bm.verts.new((v.x, v.y, z)) for v in pts]
    for t in geometry.tessellate_polygon(loops):
        try: f = bm.faces.new([vs[i] for i in t])
        except ValueError: continue
        f.normal_update()
        if (f.normal.z < 0) != down: f.normal_flip()
    return kit.obj_from_bm(name, bm, m, parent, smooth=False)

def walls(name, pts, z0, z1, m, parent, closed=True, face_in=True):
    """Vertical faces along a CCW polyline, facing into the polygon (or out of it)."""
    bm = bmesh.new(); n = len(pts)
    for i in range(n if closed else n - 1):
        a, b = pts[i], pts[(i + 1) % n]
        q = [bm.verts.new((a[0], a[1], z0)), bm.verts.new((b[0], b[1], z0)), bm.verts.new((b[0], b[1], z1)), bm.verts.new((a[0], a[1], z1))]
        bm.faces.new(q[::-1] if face_in else q)
    return kit.obj_from_bm(name, bm, m, parent, smooth=False)

def ring_band(name, outer, inner, z0, z1, m, parent):
    """A flat ring (outer polygon minus inner polygon, same vertex count) extruded from z0 to z1."""
    bm = bmesh.new(); n = len(outer)
    ob = [bm.verts.new((x, y, z0)) for x, y in outer]; ot = [bm.verts.new((x, y, z1)) for x, y in outer]
    ib = [bm.verts.new((x, y, z0)) for x, y in inner]; it = [bm.verts.new((x, y, z1)) for x, y in inner]
    for i in range(n):
        j = (i + 1) % n
        bm.faces.new((ob[i], ob[j], ot[j], ot[i])); bm.faces.new((ib[j], ib[i], it[i], it[j]))
        bm.faces.new((ot[i], ot[j], it[j], it[i])); bm.faces.new((ob[j], ob[i], ib[i], ib[j]))
    return kit.obj_from_bm(name, bm, m, parent, smooth=False)

def band(chain, d0, d1, trim0=0.0, trim1=0.0):
    """Strip along consecutive ring points (ring order), d0 to d1 metres in from the facade, cut square at
    both ends; trim0 / trim1 shorten the first / last face. Returns the CCW polygon: facade line, then back."""
    S = []
    for a, b in zip(chain, chain[1:]):
        a, b = Vector(a), Vector(b); t = (b - a).normalized(); S.append((a, b, t, Vector((t.y, -t.x))))
    def line(d):
        pts = [S[0][0] - S[0][3] * d + S[0][2] * trim0]
        for (a1, _, t1, n1), (a2, _, t2, n2) in zip(S, S[1:]):
            p, q = a1 - n1 * d, a2 - n2 * d
            s = ((q.x - p.x) * t2.y - (q.y - p.y) * t2.x) / (t1.x * t2.y - t1.y * t2.x)
            pts.append(p + t1 * s)
        _, b, t, n = S[-1]; pts.append(b - n * d - t * trim1)
        return pts
    return [tuple(v) for v in line(d0) + line(d1)[::-1]]

def face(i, j):
    a, b = Vector((*RING[i], 0)), Vector((*RING[j], 0)); t = (b - a).normalized(); n = Vector((t.y, -t.x, 0))
    return dict(a=a, t=t, n=n, len=(b - a).length, ang=math.atan2(t.y, t.x), out=math.atan2(n.y, n.x) - math.pi / 2)
NF, NWF, EF = face(7, 0), face(0, 1), face(5, 6)  # north (tower side), north-west corner, south-east
MITRE = 1 / math.tan(math.acos(-NF['t'].dot(NWF['t'])) / 2)  # how far along each face a corner mitre runs per metre of depth

def at(F, s, d, z=0.0):
    p = F['a'] + F['t'] * s - F['n'] * d
    return Vector((p.x, p.y, z))

def toward(p, q):  # rotation that turns a piece's front (+Y) from p toward q
    return math.atan2(q[1] - p[1], q[0] - p[0]) - math.pi / 2

def page(v, lift=0.0):  # Blender point -> page frame [x, y, z]
    return [round(v[0], 3), round(v[2] - lift, 3), round(-v[1], 3)]

TT_B = Vector((TT[0], -TT[1]))
FINS = [Vector((x, -z)) - Vector((nx, -nz)) * 0.55 for x, z, nx, nz in L['fins']] + [Vector(p) for p in RING]  # facade fins and corner columns

def tower_seat(F, d, ranges, posts):
    """The s along face F (at depth d) whose sight line to Tokyo Tower passes farthest from every post (fin,
    corner column, mullion) between the eye and just beyond the glass."""
    def clearance(s):
        e = at(F, s, d).to_2d(); v = (TT_B - e).normalized(); reach = d / max(0.2, v.dot(F['n'].to_2d())) + 2.0; best = 99.0
        for p in posts:
            w = p - e; along = w.dot(v)
            if 0 < along < reach: best = min(best, abs(v.x * w.y - v.y * w.x))
        return best
    cands = [s0 + i * 0.1 for s0, s1 in ranges for i in range(int(round((s1 - s0) * 10)) + 1)]
    best = max(cands, key=clearance)
    print('tower seat', round(best, 1), 'clearance', round(clearance(best), 2))
    return best

class Acc:
    """Many small parts in one mesh per material (doors, books, mirrors), built straight into bmesh."""
    def __init__(self): self.bms = {}
    def bm(self, m):
        if m.name not in self.bms: self.bms[m.name] = (m, bmesh.new())
        return self.bms[m.name][1]
    def box(self, m, c, size, rz=0.0, rx=0.0):
        bm = self.bm(m); R = Matrix.Rotation(rz, 3, 'Z') @ Matrix.Rotation(rx, 3, 'X')
        sx, sy, sz = (s / 2 for s in size)
        vs = [bm.verts.new(Vector(c) + R @ Vector((sx if i & 1 else -sx, sy if i & 2 else -sy, sz if i & 4 else -sz))) for i in range(8)]
        for f in ((0, 4, 6, 2), (1, 3, 7, 5), (0, 1, 5, 4), (2, 6, 7, 3), (0, 2, 3, 1), (4, 5, 7, 6)):
            bm.faces.new([vs[i] for i in f])
    def cyl(self, m, c, r, h, n=8):
        bm = self.bm(m); c = Vector(c)
        b = [bm.verts.new(c + Vector((r * math.cos(2 * math.pi * i / n), r * math.sin(2 * math.pi * i / n), -h / 2))) for i in range(n)]
        t = [bm.verts.new(v.co + Vector((0, 0, h))) for v in b]
        for i in range(n): bm.faces.new((b[i], b[(i + 1) % n], t[(i + 1) % n], t[i]))
        bm.faces.new(t); bm.faces.new(b[::-1])
    def disc(self, m, c, r, rz, rx=0.0, n=6, tag=0.0):
        """A vertical disc (normal along its local Y), with tag stored in the UV for the page's shader."""
        bm = self.bm(m); R = Matrix.Rotation(rz, 3, 'Z') @ Matrix.Rotation(rx, 3, 'X')
        f = bm.faces.new([bm.verts.new(Vector(c) + R @ Vector((r * math.cos(2 * math.pi * i / n), 0, r * math.sin(2 * math.pi * i / n)))) for i in range(n)])
        uv = bm.loops.layers.uv.verify()
        for l in f.loops: l[uv].uv = (tag, 0.5)
    def flush(self, parent):
        for name, (m, bm) in self.bms.items(): kit.obj_from_bm(name + 'Parts', bm, m, parent, smooth=False)
        self.bms = {}

# ---------------- materials ----------------
def mats():
    M = {}
    def add(key, *a, two=False, **k):
        M[key] = mat(*a, **k)
        if two: M[key].use_backface_culling = False
    add('stone', 'LobbyStone', '#d8cfc1', rough=0.32)
    add('oak', 'LoungeOak', '#9b7553', rough=0.5)
    add('walnut', 'Walnut', '#5a3b28', rough=0.45)
    add('dark', 'DarkWood', '#2f2119', rough=0.5)
    add('ceil', 'Ceiling', '#f1ebe1', rough=0.9)
    add('slab', 'SlabEdge', '#ece6dc', rough=0.7)
    add('corr', 'CorridorWall', '#e3d6c3', rough=0.85)
    add('door', 'Door', '#7a5a42', rough=0.5)
    add('cove', 'Cove', '#fff2dc', rough=0.5, emit='#ffd7a0', strength=2.6)
    add('lamp', 'LampGlow', '#fff4e2', rough=0.5, emit='#ffe0b0', strength=3.2, two=True)
    add('sky', 'Skylight', '#f6f8fa', rough=0.6, emit='#eef4ff', strength=1.6, two=True)
    add('rail', 'RailGlass', '#cfe2ec', rough=0.05, metal=0.1, alpha=0.28)
    add('iglass', 'InnerGlass', '#d9ecf5', rough=0.03, alpha=0.07)
    add('mull', 'Mullion', '#3a3631', rough=0.4, metal=0.6)
    add('brass', 'Brass', '#b8945a', rough=0.3, metal=0.85)
    add('chrome', 'Chrome', '#d9dde2', rough=0.12, metal=1.0)
    add('mirror', 'Mirror', '#f4f6f8', rough=0.1, metal=0.75, two=True)
    add('wire', 'Wire', '#d9d4ca', rough=0.4, metal=0.8)
    add('fabA', 'FabricSand', '#c9b79c', rough=0.9)
    add('fabB', 'FabricMoss', '#5d6b4f', rough=0.9)
    add('fabC', 'FabricRust', '#a3583b', rough=0.9)
    add('fabD', 'FabricInk', '#2f3a4c', rough=0.9)
    add('leather', 'Leather', '#2f4a3a', rough=0.55)
    add('marble', 'Marble', '#ece8e2', rough=0.2)
    add('leaf', 'Leaf', '#4f7a46', rough=0.8)
    add('leaf2', 'LeafDark', '#335c38', rough=0.8)
    add('bark', 'Bark', '#5a4636', rough=0.9)
    add('pot', 'Pot', '#3a3936', rough=0.6)
    for i, c in enumerate(['#7a2e2a', '#2c4a6b', '#d8c9a8', '#3d5a3c', '#6b4a2e', '#1f2430']): add(f'book{i}', f'Book{i}', c, rough=0.8)
    add('shop', 'ShopGlow', '#fff3df', rough=0.6, emit='#ffd9a6', strength=1.4)
    add('bread', 'Bread', '#c08a4e', rough=0.8)
    add('rock', 'Rock', '#4a4743', rough=0.85)
    add('fall', 'FallWater', '#e4f4ff', rough=0.1, emit='#cfe9ff', strength=0.4, alpha=0.78)
    add('pond', 'PondWater', '#1d3440', rough=0.05, metal=0.3)
    add('lawn', 'Lawn', '#7d9a5a', rough=1.0)
    add('gravel', 'Gravel', '#bdb5a8', rough=1.0)
    # spa
    add('spaFloor', 'SpaStone', '#b8ab97', rough=0.6)
    add('spaWall', 'SpaWall', '#8a8174', rough=0.8)
    add('spaCeil', 'SpaCeiling', '#3d3129', rough=0.8)
    add('slat', 'SlatWood', '#6e5039', rough=0.6)
    add('tile', 'PoolTile', '#9fd3d6', rough=0.3)
    add('lane', 'LaneMark', '#1f3f66', rough=0.4)
    add('water', 'PoolWater', '#5fb6c4', rough=0.02, metal=0.1, alpha=0.5)
    add('coping', 'Coping', '#e6e0d5', rough=0.5)
    add('under', 'UnderLight', '#e9fbff', rough=0.3, emit='#bff4ff', strength=4.0)
    add('ropeA', 'RopeWhite', '#f2f2ee', rough=0.5)
    add('ropeB', 'RopeBlue', '#2e64b0', rough=0.5)
    add('teak', 'Teak', '#8b5f3c', rough=0.55)
    add('towel', 'Towel', '#f4f1ea', rough=0.95)
    add('lightwall', 'LightWall', '#fff1d9', rough=0.6, emit='#ffdcae', strength=1.5)
    add('fin', 'Fin', '#5b4230', rough=0.6)
    add('hinoki', 'Hinoki', '#d9bd8f', rough=0.55)
    add('bathstone', 'BathStone', '#5b5650', rough=0.7)
    add('onsen', 'OnsenWater', '#b9b48f', rough=0.03, alpha=0.82)
    add('ember', 'Ember', '#ff8a4a', rough=0.6, emit='#ff6a2a', strength=3.0)
    add('gym', 'GymDark', '#26292d', rough=0.5, metal=0.3)
    add('screen', 'Screen', '#9ad7ff', rough=0.3, emit='#7fc8ff', strength=1.2)
    add('glassP', 'GlassPartition', '#d7ecf2', rough=0.03, alpha=0.16)
    # club lounge and sky bar
    add('clubFloor', 'ClubWood', '#7c5c44', rough=0.5)
    add('clubCeil', 'ClubCeiling', '#efe6d8', rough=0.9)
    add('clubWall', 'ClubWall', '#cbbca5', rough=0.85)
    add('rug', 'Rug', '#b9a58a', rough=1.0)
    add('food', 'Food', '#e9b274', rough=0.7, emit='#ffcf8a', strength=0.5)
    add('rope', 'Rope', '#a68a62', rough=0.9)
    add('barFloor', 'BarWood', '#5e3d29', rough=0.45)
    add('barCeil', 'BarCeiling', '#3f2b1f', rough=0.7)
    add('barWall', 'BarWall', '#4a3324', rough=0.6)
    add('step', 'StepWood', '#734c33', rough=0.5)
    add('back', 'BackGlow', '#8a6a4a', rough=0.6, emit='#ffb565', strength=0.4)
    for i, (c, e) in enumerate([('#c9772e', '#ff9a3c'), ('#3f7a52', '#5fd08a'), ('#d8d2c0', '#fff1c8'), ('#7a2b3a', '#d0485e')]):
        add(f'bottle{i}', f'Bottle{i}', c, rough=0.15, emit=e, strength=0.6)
    add('candle', 'Candle', '#ffe2a8', rough=0.5, emit='#ffb860', strength=4.0)
    return M

# ---------------- furniture (each piece in its own frame, front = +Y) ----------------
def place(par, p, rz): return kit.group('Piece', par, loc=(p[0], p[1], p[2] if len(p) > 2 else 0), rot_z=rz)

def armchair(par, p, rz, F, frame):
    e = place(par, p, rz)
    box('Seat', (0.72, 0.64, 0.18), (0, 0.02, 0.4), F, e, 0.06, seg=1)
    box('Back', (0.72, 0.18, 0.5), (0, -0.3, 0.66), F, e, 0.06, rot=(0.18, 0, 0), seg=1)
    for s in (-1, 1): box('Arm', (0.12, 0.62, 0.24), (s * 0.39, -0.02, 0.46), F, e, 0.04, seg=1)
    box('Base', (0.8, 0.66, 0.26), (0, -0.01, 0.17), frame, e, 0.02, seg=1)

def side_table(par, p, r, h, top, leg, candle=None):
    cyl('Top', r, r, 0.04, (p[0], p[1], (p[2] if len(p) > 2 else 0) + h), top, par, 24)
    cyl('Stem', 0.035, 0.035, h, (p[0], p[1], (p[2] if len(p) > 2 else 0) + h / 2), leg, par, 8)
    if candle: cyl('Candle', 0.035, 0.035, 0.07, (p[0], p[1], (p[2] if len(p) > 2 else 0) + h + 0.055), candle, par, 8)

def stool(par, p, M):
    cyl('StoolSeat', 0.2, 0.2, 0.07, (p[0], p[1], 0.76), M['leather'], par, 16)
    cyl('StoolStem', 0.03, 0.03, 0.74, (p[0], p[1], 0.38), M['brass'], par, 8)
    cyl('StoolRing', 0.17, 0.17, 0.02, (p[0], p[1], 0.3), M['brass'], par, 16)

def plant(par, p, h, M):
    cyl('Pot', 0.24, 0.18, 0.42, (p[0], p[1], 0.21), M['pot'], par, 16)
    for i in range(5):
        a = i * 1.26
        ball('Leaf', 0.24, (p[0] + 0.15 * math.cos(a), p[1] + 0.15 * math.sin(a), 0.5 + h * (0.4 + 0.12 * (i % 3))), M['leaf'], par, 1, scale=(1, 1, 1.6))

def tree(par, p, h, M, rnd):
    cyl('Trunk', 0.12 * h / 6, 0.2 * h / 6, h * 0.55, (p[0], p[1], h * 0.275), M['bark'], par, 8)
    for i in range(5):
        a, r = rnd.uniform(0, 6.3), h * rnd.uniform(0.12, 0.22)
        ball('Crown', h * rnd.uniform(0.17, 0.24), (p[0] + r * math.cos(a), p[1] + r * math.sin(a), h * rnd.uniform(0.62, 0.85)), M['leaf' if i % 2 else 'leaf2'], par, 1)

def pendant(par, p, z_ceil, drop, M, r=0.16):
    cyl('Cord', 0.006, 0.006, drop, (p[0], p[1], z_ceil - drop / 2), M['dark'], par, 4)
    ball('Globe', r, (p[0], p[1], z_ceil - drop - r * 0.8), M['lamp'], par, 2)

def seat_pairs(par, F, s0, s1, step, d, z, M, fabrics, tables=True, candle=False):
    """Pairs of armchairs side by side facing the window along face F, with a small table between."""
    s, i, n = s0, 0, 0
    while s <= s1 + 1e-6:
        c = at(F, s, d, z); f = fabrics[i % len(fabrics)]
        for k in (-1, 1): armchair(par, c + F['t'] * (k * 0.5), F['out'], f, M['dark'])
        if tables: side_table(par, at(F, s, d - 0.75, z), 0.24, 0.5, M['marble'], M['brass'], M['candle'] if candle else None)
        s += step; i += 1; n += 2
    return n

def inner_glass(par, line, z0, z1, M, A, step=1.8):
    """Thin interior glazing with mullions along a facade line (the tower's own glass faces outward only).
    Returns the mullion positions."""
    posts = []
    for a, b in zip(line, line[1:]):
        a, b = Vector(a), Vector(b); L_ = (b - a).length; t = (b - a).normalized(); ang = math.atan2(t.y, t.x)
        m = (a + b) / 2
        A.box(M['iglass'], (m.x, m.y, (z0 + z1) / 2), (L_, 0.02, z1 - z0), ang)
        for k in range(int(L_ // step) + 1):
            p = a + t * (k * L_ / max(1, int(L_ // step)))
            A.box(M['mull'], (p.x, p.y, (z0 + z1) / 2), (0.07, 0.1, z1 - z0), ang); posts.append(p.copy())
    return posts

def open_walls(name, poly, n_facade, z0, z1, m, par):
    """Walls on every edge but the facade (the first n_facade - 1 edges of a band polygon)."""
    return walls(name, poly[n_facade - 1:] + [poly[0]], z0, z1, m, par, closed=False)

# ---------------- spaces ----------------
def build_lobby(root, M, rnd):
    A = Acc(); BASE = offset(RING, -2.4)
    flat('Floor', BASE, [ATR], 0.0, M['stone'], root)
    chain = [RING[7], RING[0], RING[1]]
    flat('LoungeFloor', band(chain, 2.45, 9.0, 3.0, 4.0), [], 0.006, M['oak'], root)
    flat('Ceiling', BASE, [CORR], 4.6, M['ceil'], root, down=True)
    inner_glass(root, BASE + [BASE[0]], 0.0, 4.6, M, A, 2.4)
    lit_in, lit_out = offset(BASE, -0.8), offset(CORR, 0.6)
    for x in range(-30, 31, 3):  # downlights on a 3 m grid
        for y in range(-30, 31, 3):
            if inside((x + 0.5, y + 0.5), lit_in) and not inside((x + 0.5, y + 0.5), lit_out):
                A.cyl(M['lamp'], (x + 0.5, y + 0.5, 4.58), 0.1, 0.03, 12)

    # the atrium: B1 floor, then a slab edge, glass rail, lit soffit and a corridor wall with doors per storey
    yb = FL[-1][0]
    flat('B1Floor', CORR, [], yb, M['stone'], root)
    walls('B1Wall', CORR, yb, -0.4, M['corr'], root)
    for a, b in zip(CORR, CORR[1:] + CORR[:1]):  # B1 restaurant fronts
        a, b = Vector(a), Vector(b); t = (b - a).normalized(); n = Vector((t.y, -t.x)); L_ = (b - a).length
        for k in range(int(L_ // 6)):
            p = a + t * ((k + 0.5) * L_ / int(L_ // 6)) - n * 0.06
            A.box(M['shop'], (p.x, p.y, yb + 1.5), (3.2, 0.04, 2.7), math.atan2(t.y, t.x))
            A.box(M['dark'], (p.x, p.y, yb + 3.0), (3.6, 0.1, 0.3), math.atan2(t.y, t.x))
    A.box(M['pond'], (AC.x, AC.y, yb + 0.03), (12.0, 3.2, 0.06))
    for dx in (-7.6, 7.6):
        A.box(M['dark'], (AC.x + dx, AC.y, yb + 0.25), (1.6, 1.6, 0.5)); plant(root, (AC.x + dx, AC.y), 1.6, M)
    for k in [1] + list(range(2, 34)):
        y, h = FL[k]
        ring_band(f'Edge{k}', CORR, ATR, y - 0.4, y - (0.01 if k == 1 else 0.0), M['slab'], root)
        ring_band(f'Soffit{k}', offset(ATR, 0.02), offset(ATR, -0.03), y - 0.48, y - 0.4, M['cove'], root)
        if k == 33: break
        ring_band(f'Rail{k}', ATR, offset(ATR, -0.03), y, y + 1.1, M['rail'], root)
        ring_band(f'Hand{k}', offset(ATR, 0.05), offset(ATR, -0.08), y + 1.1, y + 1.16, M['brass'], root)
        if k == 1: continue
        walls(f'Corr{k}', CORR, y, y + h - 0.4, M['corr'], root)
        for a, b in zip(CORR, CORR[1:] + CORR[:1]):
            a, b = Vector(a), Vector(b); t = (b - a).normalized(); n = Vector((t.y, -t.x)); L_ = (b - a).length; ang = math.atan2(t.y, t.x)
            nd = max(1, int(L_ // 4.2))
            for j in range(nd):
                p = a + t * ((j + 0.5) * L_ / nd) - n * 0.03
                A.box(M['door'], (p.x, p.y, y + 1.05), (0.95, 0.05, 2.1), ang)
                q = p + t * (L_ / nd / 2)
                if j < nd - 1: A.box(M['lamp'], (q.x, q.y, y + 1.9), (0.14, 0.05, 0.22), ang)
    flat('Skylight', ATR, [], FL[33][0] - 0.42, M['sky'], root, down=True)

    # Lobby Lounge on the tower side: two rows of paired armchairs, a curved bay banquette in the corner
    fab = [M['fabA'], M['fabB'], M['fabA'], M['fabC']]
    seats = seat_pairs(root, NF, 5.0, 29.0, 3.0, 3.9, 0, M, fab) + seat_pairs(root, NF, 6.5, 29.0, 3.0, 6.4, 0, M, fab[::-1])
    seats += seat_pairs(root, NWF, 8.0, 11.0, 3.0, 3.9, 0, M, fab) + seat_pairs(root, NWF, 8.0, 11.0, 3.0, 6.4, 0, M, fab[::-1])
    corner = Vector(band(chain, 7.4, 7.4)[1])  # point 7.4 m in from both faces of the corner
    a0, a1 = math.atan2(NF['n'].y, NF['n'].x), math.atan2(NWF['n'].y, NWF['n'].x)
    for i in range(7):  # a curved bay seat wrapping the corner glass
        a = a0 - 0.45 + (a1 - a0 + 0.9) * (i + 0.5) / 7; r = Vector((math.cos(a), math.sin(a)))
        p = corner + r * 3.4
        e = place(root, (p.x, p.y, 0), a - math.pi / 2)
        box('Bench', (0.92, 0.7, 0.42), (0, 0, 0.21), M['walnut'], e, 0.03, seg=1)
        box('Cushion', (0.9, 0.62, 0.14), (0, 0.02, 0.48), M['fabD'], e, 0.05, seg=1)
        box('BenchBack', (0.92, 0.2, 0.62), (0, -0.32, 0.72), M['fabD'], e, 0.06, rot=(0.15, 0, 0), seg=1)
        if i % 2 == 0:
            q = corner + r * 4.35; side_table(root, (q.x, q.y), 0.3, 0.45, M['marble'], M['brass'])
    seats += 7 * 2
    plant(root, at(NF, 3.2, 5.0), 1.8, M); plant(root, at(NWF, 13.2, 5.0), 1.8, M)

    # front desk styled like a home study, just inside the south entrance on the left
    dc = Vector((-8.0, -18.0))
    e = place(root, (dc.x, dc.y, 0), -math.pi / 2)  # desk front faces east, toward arriving guests
    box('Desk', (5.4, 0.9, 1.0), (0, 0, 0.5), M['walnut'], e, 0.03, seg=1)
    box('DeskTop', (5.6, 1.0, 0.05), (0, 0, 1.03), M['leather'], e, 0.01)
    for sx in (-1.8, 0, 1.8):
        cyl('LampStem', 0.02, 0.02, 0.36, (sx, -0.25, 1.24), M['brass'], e, 8)
        box('LampShade', (0.36, 0.14, 0.08), (sx, -0.25, 1.44), M['leather'], e, 0.03, seg=1)
        box('LampGlow', (0.3, 0.1, 0.01), (sx, -0.25, 1.395), M['lamp'], e)
    shelf_x = dc.x - 2.3
    box('Bookcase', (0.12, 7.2, 3.6), (shelf_x, dc.y, 1.8), M['dark'], root)
    for k in (-1, 1): box('BookcaseSide', (0.42, 0.06, 3.6), (shelf_x + 0.15, dc.y + k * 3.57, 1.8), M['dark'], root)
    for row in range(6):
        z = 0.32 + row * 0.56; yy = dc.y - 3.45
        while yy < dc.y + 3.45:
            w = rnd.uniform(0.03, 0.07); hgt = rnd.uniform(0.3, 0.46)
            A.box(M[f'book{rnd.randrange(6)}'], (shelf_x + 0.2, yy + w / 2, z + hgt / 2), (0.24, w * 0.92, hgt))
            yy += w + (0.25 if rnd.random() < 0.04 else 0.0)
        A.box(M['walnut'], (shelf_x + 0.21, dc.y, z - 0.02), (0.3, 7.0, 0.04))
    for k in (-1, 1): armchair(root, (dc.x + 3.0, dc.y + k * 1.3, 0), math.pi / 2, M['fabC'], M['dark'])

    # shop and bakery along the east glass
    sc = at(EF, 14.0, 5.2)
    e = place(root, sc, EF['out'] + math.pi)  # counter front faces into the lobby
    box('ShopCounter', (4.2, 0.8, 0.95), (0, 0, 0.475), M['walnut'], e, 0.03, seg=1)
    box('ShopCase', (4.0, 0.7, 0.36), (0, 0, 1.13), M['iglass'], e)
    for i in range(14): box('Loaf', (0.22, 0.12, 0.08), (-1.7 + i * 0.26, 0, 1.0), M['bread'], e, 0.03, seg=1)
    box('ShopShelf', (5.0, 0.4, 2.4), (0, -1.6, 1.2), M['shop'], e)
    for i in range(3): plant(root, at(EF, 9.5 + i * 1.6, 3.4), 1.0, M)

    # the Lobby Lounge camera sits on the line to Tokyo Tower, where that line leaves the lobby between two
    # of the base's stone piers (same rhythm as akane_tower.py)
    piers = []
    for i in range(len(BASE)):
        a, b = Vector(BASE[i]), Vector(BASE[(i + 1) % len(BASE)]); n_ = max(1, int((b - a).length // 7.2))
        piers += [a.lerp(b, k / n_) for k in range(n_ + 1)]
    def clearance(s):
        e = at(NF, s, 7.8); d = (Vector((TT_B.x, TT_B.y, 0)) - e).normalized(); lam = (7.8 - 2.4) / d.dot(NF['n'])
        c = (e + d * lam).to_2d(); return min((c - p).length for p in piers)
    s_eye = max([24.0 + i * 0.1 for i in range(81)], key=clearance)
    print('lounge eye s', round(s_eye, 1), 'pier clearance', round(clearance(s_eye), 2))
    # garden north of the tower: lawn, the waterfall the lounge faces (place and size illustrative), trees
    seat = at(NF, s_eye, 7.8)
    wf = seat + (Vector((TT_B.x, TT_B.y, 0)) - seat).normalized() * 24.0
    flat('Lawn', [(wf.x + 15 * math.cos(a / 24 * 6.283), wf.y + 2 + 11 * math.sin(a / 24 * 6.283)) for a in range(24)], [], 0.03, M['lawn'], root)
    e = place(root, wf, toward(wf, seat))
    for i in range(7):  # rough granite face, stacked
        x = -3.0 + i * 1.0
        box('Rock', (1.2, 1.4, rnd.uniform(2.3, 2.9)), (x, -0.4, 1.3), M['rock'], e, 0.12, rot=(0, rnd.uniform(-0.06, 0.06), rnd.uniform(-0.15, 0.15)), seg=1)
    box('Lip', (3.9, 0.6, 0.16), (0, 0.3, 2.5), M['rock'], e, 0.05, seg=1)
    box('Fall', (3.6, 0.04, 2.4), (0, 0.62, 1.3), M['fall'], e)
    cyl('Pond', 3.6, 3.6, 0.2, (0, 2.2, 0.1), M['pond'], e, 40)
    for i in range(14):
        a = math.pi * (1.05 + i / 13 * 0.9) - math.pi
        box('Edge', (0.8, 0.55, 0.32), (3.7 * math.cos(a), 2.2 + 3.7 * math.sin(a), 0.16), M['rock'], e, 0.1, rot=(0, 0, a + rnd.uniform(-0.3, 0.3)), seg=1)
    box('Foam', (3.8, 1.0, 0.03), (0, 1.1, 0.22), M['fall'], e)
    for x in (-1.2, 0, 1.2): cyl('Uplight', 0.08, 0.08, 0.04, (x, 1.4, 0.21), M['lamp'], e, 10)
    for i in range(10):  # trees to either side, so the line from the lounge to Tokyo Tower stays open
        side = 1 if i % 2 else -1
        tree(e, (side * rnd.uniform(5.5, 11.0), -rnd.uniform(0.0, 6.0)), rnd.uniform(5.0, 8.0), M, rnd)
    A.flush(root)

    # the mirror chandelier: its own node so the page can sway it; the UV carries a per-mirror random tag
    # strings of small mirrors hung from an oval ring, longest in the middle, so their ends draw an
    # inverted dome like a tree crown seen from below
    forest = kit.group('Forest', None, loc=(AC.x, AC.y, 0))
    F = Acc(); strings = 0; TOP = 8.6
    while strings < 140:
        x, y = rnd.uniform(-1, 1), rnd.uniform(-1, 1); r2 = x * x + y * y
        if r2 > 1: continue
        X, Y, low = x * 6.4, y * 2.8, 2.0 + 3.8 * r2 + rnd.uniform(-0.25, 0.25)
        F.box(M['wire'], (X, Y, (low + TOP) / 2), (0.008, 0.008, TOP - low))
        z, k = low, 0
        while z < TOP - 0.5 and k < 10:
            F.disc(M['mirror'], (X, Y, z), rnd.uniform(0.07, 0.11), rnd.uniform(0, 6.283), rnd.uniform(-0.12, 0.12), 6, rnd.random())
            z += rnd.uniform(0.26, 0.4); k += 1
        strings += 1
    for i in range(40):  # the oval ring and its suspension cables
        a0, a1 = i / 40 * 6.2832, (i + 1) / 40 * 6.2832
        pa, pb = Vector((6.7 * math.cos(a0), 3.05 * math.sin(a0), TOP)), Vector((6.7 * math.cos(a1), 3.05 * math.sin(a1), TOP))
        F.box(M['brass'], (pa + pb) / 2, ((pb - pa).length + 0.02, 0.05, 0.05), math.atan2(pb.y - pa.y, pb.x - pa.x))
    for a in (0.4, 2.74, 3.54, 5.88):
        F.box(M['wire'], (6.7 * math.cos(a), 3.05 * math.sin(a), TOP + 15), (0.012, 0.012, 30))
    F.flush(forest)  # one mesh already, parented in the chandelier's own frame (not joined)
    views = dict(
        arrive=(Vector((0.6, -21.5, 1.6)), Vector((AC.x, AC.y, 4.4))),
        forest=(Vector((AC.x + 1.0, AC.y - 10.5, 1.6)), Vector((AC.x - 1.0, AC.y, 5.4))),
        atrium=(Vector((AC.x + 3.0, AC.y + 2.2, yb + 1.6)), Vector((AC.x - 1.0, AC.y, 60.0))),
        lounge=(at(NF, s_eye, 7.8, 1.45), Vector((TT_B.x, TT_B.y, 55.0))),
        desk=(Vector((dc.x + 4.2, dc.y - 0.6, 1.6)), Vector((dc.x - 2.0, dc.y + 0.4, 1.4))),
    )
    return forest, views, Vector((AC.x, AC.y + 9, 4.0)), None, seats

def build_spa(root, M, rnd):
    A = Acc(); chain = [RING[7], RING[0], RING[1]]; H = 4.6
    hall = band(chain, 0.6, 13.6, 0.8, 2.0)
    pc = at(NF, 18.6, 6.6); t, n = NF['t'], NF['n']
    pool = [tuple(pc + t * sx * 12.5 - n * sy * 2.5)[:2] for sx, sy in ((-1, -1), (1, -1), (1, 1), (-1, 1))]
    if area2(pool) < 0: pool.reverse()
    flat('Deck', hall, [pool], 0.0, M['spaFloor'], root)
    walls('Walls', hall, 0.0, H, M['spaWall'], root)
    flat('Ceiling', hall, [], H, M['spaCeil'], root, down=True)
    for d in [1.2 + i * 0.5 for i in range(25)]:  # timber slats under the ceiling, mitred at the corner
        a, b = at(NF, 1.0, d, H - 0.12), at(NF, NF['len'] - MITRE * d - 0.1, d, H - 0.12)
        A.box(M['slat'], (a + b) / 2, ((b - a).length, 0.07, 0.14), NF['ang'])
        a, b = at(NWF, MITRE * d + 0.1, d, H - 0.12), at(NWF, 15.4, d, H - 0.12)
        A.box(M['slat'], (a + b) / 2, ((b - a).length, 0.07, 0.14), NWF['ang'])
    for s in range(3, 34, 3):
        for d in (2.0, 11.0): A.cyl(M['lamp'], at(NF, s, d, H - 0.22), 0.09, 0.03, 12)
    # the 25 x 5 x 1.4 m pool
    walls('Basin', pool, -1.4, 0.0, M['tile'], root)
    flat('BasinFloor', pool, [], -1.4, M['tile'], root)
    flat('Water', pool, [], -0.1, M['water'], root)
    ring_band('Coping', offset(pool, 0.35), pool, -0.02, 0.025, M['coping'], root)
    for sy in (-1.25, 1.25):
        A.box(M['lane'], pc - n * sy + Vector((0, 0, -1.385)), (23.0, 0.25, 0.01), NF['ang'])
        for sx in (-11.5, 11.5): A.box(M['lane'], pc + t * sx - n * sy + Vector((0, 0, -1.385)), (0.25, 1.0, 0.01), NF['ang'])
    for i in range(56):
        A.box(M['ropeA' if (i // 2) % 2 else 'ropeB'], pc + t * (-12.27 + i * 0.446) + Vector((0, 0, -0.08)), (0.4, 0.1, 0.1), NF['ang'])
    for i in range(8):
        for sy in (-2.47, 2.47): A.box(M['under'], pc + t * (-10.5 + i * 3.0) - n * sy + Vector((0, 0, -0.7)), (0.32, 0.04, 0.18), NF['ang'])
    for sy in (-1.6, 1.6):
        for z in (0.5, 0.9): A.box(M['chrome'], pc + t * 12.2 - n * sy + Vector((0, 0, z - 0.4)), (0.05, 0.05, 1.3 if z < 0.7 else 0.05), NF['ang'])
    # loungers facing the pool, and the backlit timber "forest" wall behind them
    for s in [7.0 + i * 2.5 for i in range(9)]:
        e = place(root, at(NF, s, 11.3), NF['out'])
        box('Lounger', (0.72, 1.95, 0.26), (0, 0, 0.22), M['teak'], e, 0.03, seg=1)
        box('Pad', (0.66, 1.3, 0.08), (0, 0.3, 0.39), M['towel'], e, 0.03, seg=1)
        box('BackRest', (0.66, 0.7, 0.08), (0, -0.62, 0.62), M['towel'], e, 0.03, rot=(0.75, 0, 0), seg=1)
        if s % 5 < 1: side_table(root, at(NF, s + 1.25, 11.6), 0.2, 0.42, M['marble'], M['teak'])
    a, b = at(NF, 4.6, 13.52, 2.25), at(NF, 28.0, 13.52, 2.25)
    A.box(M['lightwall'], (a + b) / 2, ((b - a).length, 0.03, 3.9), NF['ang'])
    for i in range(6, 53):
        A.box(M['fin'], at(NF, 1.8 + i * 0.5, 13.3, 2.25), (0.09, 0.28, 3.9 - (i * 7 % 5) * 0.12), NF['ang'])
    # gym behind glass at the east end
    a, b = at(NF, 4.5, 0.7, H / 2), at(NF, 4.5, 13.5, H / 2)
    A.box(M['glassP'], (a + b) / 2, (0.03, (b - a).length, H), NF['ang'])
    for d in (2.4, 5.0, 7.6, 10.2):
        e = place(root, at(NF, 2.4, d), NF['ang'] - math.pi / 2)  # runners face the pool
        box('Belt', (0.8, 1.9, 0.2), (0, 0, 0.12), M['gym'], e, 0.03, seg=1)
        for sx in (-0.38, 0.38): box('Post', (0.06, 0.08, 1.2), (sx, 0.85, 0.7), M['gym'], e)
        box('Console', (0.8, 0.2, 0.35), (0, 0.85, 1.35), M['gym'], e, 0.03, seg=1)
        box('Display', (0.4, 0.01, 0.22), (0, 0.74, 1.38), M['screen'], e)
    # onsen in the north-west corner: stone bath, hinoki wall, spout; wash places and a sauna
    oc = at(NWF, 9.5, 6.6); ot, on = NWF['t'], NWF['n']
    e = place(root, oc, NWF['out'])  # local X along the face, +Y toward the facade
    for sx, sy, w, d_ in ((0, -1.95, 6.9, 0.5), (0, 1.95, 6.9, 0.5), (-3.25, 0, 0.5, 3.4), (3.25, 0, 0.5, 3.4)):
        box('Rim', (w, d_, 0.55), (sx, sy, 0.275), M['bathstone'], e, 0.08, seg=1)
    box('BathBed', (6.0, 3.4, 0.08), (0, 0, 0.04), M['bathstone'], e)
    box('Hot', (6.0, 3.4, 0.02), (0, 0, 0.44), M['onsen'], e)
    for x, y, s in ((-3.3, 1.9, 0.8), (3.1, 2.0, 0.6), (3.3, -1.8, 0.7), (-2.6, -2.1, 0.55)):
        box('Boulder', (s, s * 0.9, s * 0.7), (x, y, 0.5 + s * 0.2), M['rock'], e, 0.15, rot=(0.1, 0.2, rnd.uniform(0, 3)), seg=1)
    cyl('Spout', 0.12, 0.12, 0.6, (0, 2.2, 0.85), M['rock'], e, 10, rot=(math.pi / 2.4, 0, 0))
    box('SpoutFall', (0.22, 0.02, 0.5), (0, 1.86, 0.68), M['fall'], e)
    a, b = at(NWF, 5.0, 0.66, 1.9), at(NWF, 14.2, 0.66, 1.9)
    A.box(M['hinoki'], (a + b) / 2, ((b - a).length, 0.06, 3.4), NWF['ang'])
    a, b = at(NWF, 5.0, 0.75, 0.06), at(NWF, 14.2, 0.75, 0.06)
    A.box(M['cove'], (a + b) / 2, ((b - a).length, 0.06, 0.05), NWF['ang'])
    for i in range(4):  # wash places along the wall
        p = at(NWF, 1.6 + i * 0.95, 0.95)
        A.cyl(M['hinoki'], p - on * 0.0 + Vector((0, 0, 0.18)), 0.17, 0.36, 12)
        A.cyl(M['hinoki'], p + on * 0.2 + Vector((0, 0, 0.48)), 0.12, 0.16, 12)
        A.box(M['mirror'], at(NWF, 1.6 + i * 0.95, 0.63, 1.25), (0.5, 0.02, 0.7), NWF['ang'])
        A.cyl(M['chrome'], at(NWF, 1.6 + i * 0.95, 0.68, 1.75), 0.04, 0.05, 10)
    sc = at(NWF, 13.8, 2.3); e = place(root, sc, NWF['out'])  # back to the outer wall, glass front facing the bath
    box('SaunaBack', (3.0, 0.1, 2.4), (0, 1.45, 1.2), M['hinoki'], e)
    for sx in (-1.5, 1.5): box('SaunaSide', (0.1, 3.0, 2.4), (sx, 0, 1.2), M['hinoki'], e)
    box('SaunaRoof', (3.1, 3.1, 0.1), (0, 0, 2.45), M['hinoki'], e)
    box('SaunaGlass', (3.0, 0.03, 2.4), (0, -1.5, 1.2), M['glassP'], e)
    box('BenchLow', (2.8, 0.6, 0.06), (0, 0.35, 0.45), M['hinoki'], e)
    box('BenchHigh', (2.8, 0.6, 0.06), (0, 1.0, 0.9), M['hinoki'], e)
    box('Heater', (0.5, 0.5, 0.6), (-1.1, -0.9, 0.3), M['gym'], e)
    for i in range(9): ball('Ember', 0.06, (-1.1 + (i % 3 - 1) * 0.13, -0.9 + (i // 3 - 1) * 0.13, 0.64), M['ember'], e, 1)
    box('SaunaGlow', (2.8, 0.04, 0.04), (0, 1.38, 0.5), M['cove'], e)
    plant(root, at(NWF, 15.0, 11.5), 1.4, M); plant(root, at(NF, 5.5, 12.6), 1.4, M)
    A.flush(root)
    views = dict(
        pool=(at(NF, 5.6, 6.6, 1.6), at(NF, 31.0, 6.6, 0.0)),
        deck=(at(NF, 30.5, 11.9, 1.5), at(NF, 12.0, 4.0, -0.2)),
        onsen=(at(NWF, 14.0, 11.2, 1.75), at(NWF, 8.6, 5.6, 0.3)),
        sauna=(at(NWF, 13.8, 6.6, 1.55), at(NWF, 13.8, 1.6, 0.9)),
    )
    return None, views, at(NF, 18.6, 6.6, 3.8), page(oc + Vector((0, 0, 0.5))), 0

def build_lounge(root, M, rnd):
    A = Acc(); H = 2.75
    poly = band([RING[7], RING[0]], 1.3, 7.8, 8.4, 2.2)
    flat('Floor', poly, [], 0.0, M['clubFloor'], root)
    flat('Ceiling', poly, [], H, M['clubCeil'], root, down=True)
    open_walls('Walls', poly, 2, 0.0, H, M['clubWall'], root)
    mull = inner_glass(root, poly[:2], 0.0, H, M, A, 3.0)
    flat('Runner', band([RING[7], RING[0]], 1.5, 3.4, 9.0, 2.6), [], 0.008, M['rug'], root)
    seats = seat_pairs(root, NF, 10.0, 33.0, 2.3, 2.5, 0, M, [M['fabB'], M['fabA']])
    bc = at(NF, 21.0, 5.9); e = place(root, bc, NF['out'])
    box('Buffet', (6.0, 1.0, 0.9), (0, 0, 0.45), M['walnut'], e, 0.03, seg=1)
    box('BuffetTop', (6.1, 1.1, 0.05), (0, 0, 0.92), M['marble'], e, 0.01)
    for i in range(10): box('Tray', (0.44, 0.3, 0.06), (-2.6 + i * 0.58, 0.05, 0.98), M['food'], e, 0.02, seg=1)
    box('Guard', (6.0, 0.02, 0.4), (0, 0.42, 1.25), M['glassP'], e)
    for x in (-2.0, 0, 2.0): pendant(e, (x, 0), H, 0.7, M, 0.13)
    dc = at(NF, 11.2, 6.4); e = place(root, dc, NF['out'])
    box('CheckIn', (2.4, 0.7, 1.0), (0, 0, 0.5), M['walnut'], e, 0.03, seg=1)
    box('CheckInTop', (2.5, 0.8, 0.04), (0, 0, 1.02), M['marble'], e)
    for k in (-0.6, 0.6): armchair(root, at(NF, 11.2 + k, 5.0), NF['out'] + math.pi, M['fabC'], M['dark'])
    sw = at(NF, 32.2, 5.4); e = place(root, sw, NF['out'])  # the tree-swing chair of the club floors' park theme
    for sx in (-0.32, 0.32): cyl('Rope', 0.012, 0.012, H - 0.45, (sx, 0, 0.45 + (H - 0.45) / 2), M['rope'], e, 6)
    box('SwingSeat', (0.8, 0.45, 0.05), (0, 0, 0.45), M['oak'], e, 0.01)
    box('SwingPad', (0.74, 0.4, 0.06), (0, 0, 0.5), M['fabA'], e, 0.02, seg=1)
    for c in (14.5, 26.5):  # branch-like ceiling fixtures
        root_p = at(NF, c, 4.6, H - 0.05)
        for i in range(7):
            a = i * 0.9 + 0.3; tip = root_p + Vector((1.6 * math.cos(a), 1.1 * math.sin(a), -0.32 - 0.06 * (i % 3)))
            kit.beam('Branch', root_p, tip, 0.02, M['bark'], root, 6)
            ball('Bud', 0.06, tip, M['lamp'], root, 1)
    for s in (9.4, 16.5, 25.5): plant(root, at(NF, s, 7.2), 1.3, M)
    for s in range(11, 34, 3): A.cyl(M['lamp'], at(NF, s, 3.6, H - 0.02), 0.07, 0.02, 10)
    A.flush(root)
    views = dict(
        window=(at(NF, tower_seat(NF, 5.6, [(23.0, 31.0)], FINS + mull), 5.6, 1.45), Vector((TT_B.x, TT_B.y, 110.0 - FL[32][0]))),
        buffet=(at(NF, 14.0, 3.6, 1.6), at(NF, 22.0, 5.9, 0.8)),
        swing=(at(NF, 26.0, 3.4, 1.5), at(NF, 32.2, 5.6, 0.9)),
    )
    return None, views, at(NF, 21.0, 4.4, 2.3), None, seats

def build_sky(root, M, rnd):
    A = Acc(); H = 3.15; chain = [RING[7], RING[0], RING[1]]
    poly = band(chain, 0.7, 10.6, 1.2, 1.5)
    flat('Floor', poly, [], 0.0, M['barFloor'], root)
    flat('Ceiling', poly, [], H, M['barCeil'], root, down=True)
    open_walls('Walls', poly, 3, 0.0, H, M['barWall'], root)
    mull = inner_glass(root, poly[:3], 0.0, H, M, A, 3.0)
    for d in [1.4 + i * 0.6 for i in range(15)]:  # warm timber slats parallel to the glass
        for F, s0, s1 in ((NF, 1.3, NF['len'] - MITRE * d - 0.1), (NWF, MITRE * d + 0.1, NWF['len'] - 1.6)):
            a, b = at(F, s0, d, H - 0.1), at(F, s1, d, H - 0.1)
            A.box(M['slat'], (a + b) / 2, ((b - a).length, 0.06, 0.12), F['ang'])
    plat = band(chain, 3.4, 6.0, 1.2, 1.5)
    flat('Tier', plat, [], 0.3, M['step'], root)
    walls('TierRiser', plat[:3], 0.0, 0.3, M['step'], root, closed=False, face_in=False)
    walls('TierGlow', band(chain, 3.38, 3.38, 1.2, 1.5)[:3], 0.05, 0.09, M['cove'], root, closed=False, face_in=False)
    fab = [M['fabD'], M['fabC']]
    seats = seat_pairs(root, NF, 3.0, 33.0, 2.5, 2.0, 0, M, fab, candle=True) + seat_pairs(root, NWF, 3.5, 13.5, 2.5, 2.0, 0, M, fab, candle=True)
    seats += seat_pairs(root, NF, 3.5, 32.0, 2.5, 4.9, 0.3, M, fab[::-1], candle=True) + seat_pairs(root, NWF, 4.0, 13.0, 3.0, 4.9, 0.3, M, fab[::-1], candle=True)
    bc = at(NF, 18.0, 7.7); e = place(root, bc, NF['out'])
    box('Counter', (9.0, 0.75, 1.08), (0, 0, 0.54), M['walnut'], e, 0.03, seg=1)
    box('CounterTop', (9.2, 0.9, 0.05), (0, 0.05, 1.1), M['marble'], e, 0.01)
    box('CounterGlow', (8.8, 0.02, 0.03), (0, 0.39, 0.12), M['cove'], e)
    cyl('FootRail', 0.025, 0.025, 8.6, (0, 0.55, 0.22), M['brass'], e, 8, rot=(0, math.pi / 2, 0))
    for i in range(11): stool(root, at(NF, 18.0 - 4.0 + i * 0.8, 6.75), M); seats += 1
    a, b = at(NF, 12.5, 10.55, 1.6), at(NF, 23.5, 10.55, 1.6)
    A.box(M['back'], (a + b) / 2, ((b - a).length, 0.03, 1.9), NF['ang'])
    for z in (1.0, 1.45, 1.9):
        a, b = at(NF, 13.0, 10.35, z), at(NF, 23.0, 10.35, z)
        A.box(M['walnut'], (a + b) / 2, ((b - a).length, 0.3, 0.03), NF['ang'])
        for i in range(44):
            A.cyl(M[f'bottle{rnd.randrange(4)}'], at(NF, 13.2 + i * 0.22, 10.35, z + 0.15), 0.035, rnd.uniform(0.22, 0.32), 8)
    for F, s0, s1 in ((NF, 4.0, 33.0), (NWF, 4.5, 13.0)):
        s = s0
        while s <= s1:
            pendant(root, at(F, s, 4.9), H, 0.95, M, 0.12); s += 3.0
    for i in range(4): pendant(root, at(NF, 15.0 + i * 2.0, 7.7), H, 0.75, M, 0.14)
    plant(root, at(NF, 1.8, 3.0), 1.4, M)
    A.flush(root)
    views = dict(
        tower=(at(NF, tower_seat(NF, 4.9, [(26.0, 27.0), (29.0, 30.0)], FINS + mull), 4.9, 1.45), Vector((TT_B.x, TT_B.y, 120.0 - FL[33][0]))),
        bar=(at(NF, 11.6, 6.3, 1.6), at(NF, 21.0, 9.4, 1.05)),
        room=(at(NF, 8.0, 9.3, 1.7), at(NF, 27.0, 1.2, 0.9)),
    )
    return None, views, at(NF, 18.0, 7.0, 2.6), None, seats

SPACES = dict(lobby=(1, build_lobby), spa=(-2, build_spa), lounge=(32, build_lounge), sky=(33, build_sky))
want = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else list(SPACES)
meta_path = os.path.join(OUT, 'akane-spaces.json')
meta = json.load(open(meta_path)) if os.path.exists(meta_path) else {}
for sid in want:
    k, fn = SPACES[sid]
    kit.reset(); M = mats(); rnd = random.Random(7)
    root = bpy.data.objects.new('Space', None); kit.scene.collection.objects.link(root)
    extra, views, lamp, steam, seats = fn(root, M, rnd)
    meshes = kit.join_by_material(root) + (list(extra.children) if extra else [])
    size = kit.export_glb(os.path.join(OUT, f'akane-{sid}.glb'))
    tris = sum(sum(len(p.vertices) - 2 for p in o.data.polygons) for o in meshes)
    meta[sid] = dict(k=k, seats=seats, lamp=page(lamp), steam=steam, views={v: dict(eye=page(e), look=page(l)) for v, (e, l) in views.items()})
    print('SPACE', sid, tris, 'tris', size, 'bytes', seats, 'seats')
json.dump(meta, open(meta_path, 'w'), indent=1)
