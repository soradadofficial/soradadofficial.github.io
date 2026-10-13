# Ground support equipment for the airport page: public/models/gse.glb
# One root node per vehicle (Tug, Dispenser, Catering, BaggageTug, Cart, Bus), metres, nose toward -Y
# in Blender (= +z in the site), origin on the ground under the vehicle's centre.
# Sizes are typical for the type, not a specific product. Run: blender -b --python blender/gse.py
import bpy, math, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import kit
from kit import mat, box, cyl, group

kit.reset()
Y = lambda: mat('GseYellow', '#f2c230', 0.5, 0.1); W = lambda: mat('GseWhite', '#f1f1ee', 0.5, 0.1); K = lambda: mat('GseDark', '#25282d', 0.7)
G = lambda: mat('GseGlass', '#1d2a38', 0.15, 0.5); B = lambda: mat('GseBlue', '#2f6fb3', 0.5, 0.1); S = lambda: mat('GseSteel', '#c9ced6', 0.35, 0.7)

def wheels(p, xs, ys, r=0.45, w=0.3):
    for x in xs:
        for y in ys: cyl('Wheel', r, r, w, (x, y, r), K(), p, 14, rot=(0, math.pi / 2, 0))

t = group('Tug', None)            # towbarless pushback tractor: low and heavy
box('Body', (2.6, 6.2, 0.9), (0, 0, 0.85), Y(), t, 0.15); box('Cab', (1.3, 1.6, 0.9), (-0.5, 1.4, 1.7), W(), t, 0.12); box('CabGlass', (1.34, 1.2, 0.5), (-0.5, 1.4, 1.8), G(), t)
wheels(t, (-1.25, 1.25), (-2.0, 2.0), 0.6, 0.45)

d = group('Dispenser', None)      # hydrant dispenser: pumps from the pit under the stand, carries no fuel
box('Chassis', (2.3, 7.0, 0.5), (0, 0, 0.9), K(), d); box('Cab', (2.3, 1.8, 1.7), (0, -2.5, 1.95), W(), d, 0.15); box('CabGlass', (2.34, 0.9, 0.7), (0, -2.9, 2.2), G(), d)
box('Module', (2.2, 3.6, 1.2), (0, 0.8, 1.75), B(), d, 0.1); box('Platform', (2.0, 1.6, 0.15), (0, 2.6, 2.6), S(), d)
for sx in (-0.7, 0.7): cyl('Lift', 0.08, 0.08, 1.5, (sx, 2.6, 1.85), S(), d, 8)
cyl('HoseReel', 0.5, 0.5, 1.4, (0, 0.8, 2.6), K(), d, 14, rot=(0, math.pi / 2, 0))
wheels(d, (-1.1, 1.1), (-2.3, 2.3))

c = group('Catering', None)       # high-lift catering truck: box body raised on a scissor lift
box('Chassis', (2.4, 7.6, 0.5), (0, 0, 0.9), K(), c); box('Cab', (2.4, 1.8, 1.7), (0, -2.9, 1.95), W(), c, 0.15); box('CabGlass', (2.44, 0.9, 0.7), (0, -3.3, 2.2), G(), c)
box('Van', (2.5, 5.2, 2.4), (0, 0.9, 4.6), W(), c, 0.08); box('VanStripe', (2.54, 5.2, 0.4), (0, 0.9, 4.2), B(), c)
for sy in (-0.8, 2.4):
    for sx in (-0.9, 0.9): box('Scissor', (0.12, 2.6, 0.12), (sx, sy, 2.3), S(), c, rot=(0.9 if sy < 0 else -0.9, 0, 0))
wheels(c, (-1.15, 1.15), (-2.6, 2.4))

bt = group('BaggageTug', None)
box('Body', (1.4, 3.0, 0.9), (0, 0, 0.8), W(), bt, 0.12); box('Seat', (1.2, 0.9, 0.7), (0, 0.6, 1.5), K(), bt, 0.08); wheels(bt, (-0.65, 0.65), (-1.0, 1.0), 0.35, 0.25)
ct = group('Cart', None)
box('Deck', (1.5, 3.0, 0.15), (0, 0, 0.6), S(), ct)
for k, col in enumerate(('#b5583a', '#3f6b8f', '#5a7f4a', '#8a6a3a')): box('Bag', (0.6, 0.6, 0.45), (-0.35 + (k % 2) * 0.7, -0.7 + (k // 2) * 1.3, 0.92), mat('Bag' + str(k), col, 0.8), ct, 0.06)
box('Canopy', (1.6, 3.1, 0.08), (0, 0, 1.9), W(), ct)
for sx in (-0.72, 0.72):
    for sy in (-1.4, 1.4): cyl('Post', 0.03, 0.03, 1.25, (sx, sy, 1.28), S(), ct, 6)
wheels(ct, (-0.7, 0.7), (-1.1, 1.1), 0.25, 0.18)

b = group('Bus', None)            # apron bus for remote stands
box('Body', (2.9, 13.5, 2.6), (0, 0, 1.75), W(), b, 0.3); box('Glass', (2.94, 12.4, 1.1), (0, 0, 2.15), G(), b); box('Stripe', (2.95, 13.5, 0.3), (0, 0, 1.0), B(), b)
wheels(b, (-1.35, 1.35), (-4.5, 4.5), 0.5, 0.35)

path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'models', 'gse.glb')
for root in (t, d, c, bt, ct, b): kit.join_by_material(root)
print('EXPORTED', kit.export_glb(path), 'bytes')
