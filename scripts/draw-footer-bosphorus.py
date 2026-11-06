# Draws public/brand/footer-bosphorus-v1.svg: python3 scripts/draw-footer-bosphorus.py public/brand/footer-bosphorus-v1.svg
import math, random, sys
random.seed(7)
W, H = 1600, 320
HZ = 236  # waterline
P = []  # path strings
def f(x): return f"{x:.1f}".rstrip('0').rstrip('.')
def line(pts, w=1.0, o=None):
    d = "M" + " L".join(f"{f(x)} {f(y)}" for x, y in pts)
    P.append(f'<path d="{d}" stroke-width="{w}"' + (f' opacity="{o}"' if o else '') + '/>')
def closed(pts, w=1.0, fill=True):
    d = "M" + " L".join(f"{f(x)} {f(y)}" for x, y in pts) + "Z"
    P.append(f'<path d="{d}" stroke-width="{w}"' + (' fill="#f3f0e9"' if fill else '') + '/>')
CLEAR = []  # boxes where water hatching is left out (ships)

# ridge helper: list of (x,y) heights; hatch below with vertical lines
def ridge(x0, x1, base, amp, seed, step=6, hatch=True, w=0.9):
    rnd = random.Random(seed)
    pts = []; y = base
    for i, x in enumerate(range(x0, x1 + 1, 8)):
        t = (x - x0) / (x1 - x0)
        env = math.sin(math.pi * t) ** 0.7
        y = base - amp * env - 6 * math.sin(x / 37 + seed) - rnd.uniform(0, 3)
        pts.append((x, y))
    line(pts, w)
    if hatch:
        for x in range(x0 + 3, x1, step):
            # interpolate
            j = min(len(pts) - 2, (x - x0) // 8); (ax, ay), (bx, by) = pts[j], pts[j + 1]
            yy = ay + (by - ay) * (x - ax) / (bx - ax)
            if HZ - yy > 4: line([(x, yy + 3), (x, HZ - 1)], 0.45, 0.7)
    def hgt(x):
        x = min(max(x, x0), x1 - 1); j = min(len(pts) - 2, int((x - x0) // 8)); (ax, ay), (bx, by) = pts[j], pts[j + 1]
        return ay + (by - ay) * (x - ax) / (bx - ax)
    return hgt

# Asian shore hills (right, distant)
asia = ridge(960, 1600, HZ - 4, 58, 3, step=5, w=0.7)
# European hills (left) under the skyline
europe = ridge(0, 940, HZ - 2, 34, 1, step=7)

def dome(cx, base, r, w=1.0):
    pts = [(cx + r * math.cos(a), base - r * 0.9 * math.sin(a)) for a in [math.pi * k / 24 for k in range(25)]]
    closed(pts, w)
    line([(cx, base - r * 0.9), (cx, base - r * 0.9 - r * 0.35)], 0.8)  # finial
    for k in range(1, 6):  # engraved shading on dome
        a0 = math.pi * (0.55 + k * 0.07)
        line([(cx + r * 0.95 * math.cos(a0), base - r * 0.85 * math.sin(a0)), (cx + r * 0.95 * math.cos(a0), base - 1)], 0.4, 0.8)

def minaret(x, base, h, w=1.0):
    closed([(x - 2.2, base), (x - 2.2, base - h), (x - 3.2, base - h), (x, base - h - h * 0.16), (x + 3.2, base - h), (x + 2.2, base - h), (x + 2.2, base)], w)
    for frac in (0.55, 0.8):  # balconies
        y = base - h * frac; line([(x - 4.2, y), (x + 4.2, y)], 0.8)

def mosque(cx, base, s):
    # body
    closed([(cx - 60 * s, base + 8), (cx - 60 * s, base - 22 * s), (cx + 60 * s, base - 22 * s), (cx + 60 * s, base + 8)], 1.0)
    for x in range(int(cx - 56 * s), int(cx + 56 * s), 5):
        line([(x, base - 20 * s), (x, base - 2)], 0.35, 0.6)
    dome(cx - 38 * s, base - 22 * s, 11 * s); dome(cx + 38 * s, base - 22 * s, 11 * s)
    dome(cx - 22 * s, base - 30 * s, 14 * s); dome(cx + 22 * s, base - 30 * s, 14 * s)
    line([(cx - 34 * s, base - 22 * s), (cx - 34 * s, base - 30 * s), (cx + 34 * s, base - 30 * s), (cx + 34 * s, base - 22 * s)])
    dome(cx, base - 30 * s, 30 * s, 1.1)
    for dx, hh in ((-70, 96), (-56, 82), (56, 82), (70, 96)):
        minaret(cx + dx * s, base, hh * s)

def houses(x0, x1, ground, seed, skip=(), scale=1.0, w0=0.7):
    rnd = random.Random(seed); x = x0
    while x < x1:
        w = rnd.uniform(9, 18) * scale; h = rnd.uniform(8, 20) * scale
        if not any(a <= x <= b for a, b in skip):
            base = ground(x + w / 2) + 3
            closed([(x, base), (x, base - h), (x + w / 2, base - h - rnd.uniform(2, 5) * scale), (x + w, base - h), (x + w, base)], w0)
            if rnd.random() < .7: line([(x + w * .35, base - h * .55), (x + w * .35, base - h * .55 + 3 * scale)], 0.6)
        x += w + rnd.uniform(0, 3)

def tower(cx, base):  # Galata-like tower
    h = 74; r = 8
    closed([(cx - r, base + 6), (cx - r, base - h), (cx + r, base - h), (cx + r, base + 6)], 1.0)
    line([(cx - r - 2, base - h), (cx + r + 2, base - h)], 1.0)
    line([(cx - r - 1, base - h), (cx, base - h - 26), (cx + r + 1, base - h)], 1.0)
    line([(cx, base - h - 26), (cx, base - h - 32)], 0.8)
    for y in range(int(base - h + 6), int(base), 7): line([(cx + 2, y), (cx + r - 1, y)], 0.4, 0.8)
    for y in (base - h + 12, base - h + 30): line([(cx - 2, y), (cx - 2, y + 5)], 0.8)

houses(1380, 1590, asia, 12, scale=0.75, w0=0.55)
houses(10, 930, europe, 11, skip=((168, 332), (452, 490), (588, 692)))
mosque(250, HZ - 22, 1.0)
mosque(640, HZ - 18, 0.62)
tower(470, HZ - 26)

# Bosphorus suspension bridge (right-centre), deck above water
bx0, bx1, deck = 900, 1460, HZ - 40
t1, t2 = 1000, 1360; top = deck - 70
for tx in (t1, t2):
    line([(tx - 4, HZ - 2), (tx - 3, top), (tx + 3, top), (tx + 4, HZ - 2)], 1.1)
    line([(tx - 3.5, deck - 30), (tx + 3.5, deck - 30)], 0.8)
line([(bx0, deck), (bx1, deck)], 1.2); line([(bx0, deck + 3), (bx1, deck + 3)], 0.6)
def cable(x):  # main cable
    if x < t1: return top + (deck - 4 - top) * ((t1 - x) / (t1 - bx0)) ** 1.1
    if x > t2: return top + (deck - 4 - top) * ((x - t2) / (bx1 - t2)) ** 1.1
    u = (x - (t1 + t2) / 2) / ((t2 - t1) / 2); return deck - 6 - (deck - 6 - top) * u * u
line([(x, cable(x)) for x in range(bx0, bx1 + 1, 6)], 1.0)
for x in range(bx0 + 12, bx1, 12):
    if abs(x - t1) > 5 and abs(x - t2) > 5: line([(x, cable(x) + 1), (x, deck)], 0.35)

# water: engraved horizontal hatching, denser and longer towards the bottom
CLEAR += [(552, HZ + 2, 672, HZ + 40), (1084, HZ + 6, 1286, HZ + 62)]
def clear(x, y): return any(a <= x <= c and b <= y <= d for a, b, c, d in CLEAR)
rnd = random.Random(5)
y = HZ + 2; gap = 7.0
while y < H:
    x = rnd.uniform(-20, 20)
    while x < W:
        seg = rnd.uniform(30, 140) * (0.6 + (y - HZ) / (H - HZ))
        xs = [xx for xx in range(int(x), int(x + seg), 4) if not clear(xx, y)]
        if xs and not clear(x, y) and not clear(x + seg, y): line([(x, y), (x + seg, y + rnd.uniform(-0.4, 0.4))], 0.45 + 0.3 * (y - HZ) / (H - HZ))
        x += seg + rnd.uniform(6, 40) * (1.2 - (y - HZ) / (H - HZ))
    gap = max(4.2, gap * 0.93); y += gap
line([(0, HZ), (W, HZ)], 0.9)

def ferry(x, y):  # classic city ferry
    closed([(x, y), (x + 8, y + 9), (x + 92, y + 9), (x + 100, y)], 1.0)
    line([(x + 14, y), (x + 14, y - 9), (x + 86, y - 9), (x + 86, y)], 0.9)
    for wx in range(int(x + 18), int(x + 84), 7): line([(wx, y - 6), (wx + 3, y - 6)], 0.8)
    line([(x + 44, y - 9), (x + 44, y - 21), (x + 52, y - 21), (x + 52, y - 9)], 1.0)
    for k in range(3): line([(x - 6 - k * 22, y + 6 + k * 2), (x - 26 - k * 22, y + 6 + k * 2)], 0.5)

def cargo(x, y):  # container ship: the trade route
    closed([(x, y - 2), (x + 10, y + 12), (x + 176, y + 12), (x + 190, y - 6)], 1.1)
    line([(x + 12, y - 2), (x + 186, y - 2)], 0.7)
    rnd2 = random.Random(9)
    for i in range(10):
        hh = rnd2.choice([1, 2, 2, 3])
        for k in range(hh):
            cx = x + 20 + i * 13; cy = y - 2 - (k + 1) * 7
            line([(cx, cy + 7), (cx, cy), (cx + 12, cy), (cx + 12, cy + 7)], 0.7)
            line([(cx + 4, cy + 1.5), (cx + 4, cy + 5.5)], 0.35)
    line([(x + 158, y - 2), (x + 158, y - 26), (x + 176, y - 26), (x + 176, y - 2)], 1.0)
    line([(x + 166, y - 26), (x + 166, y - 34)], 0.9)
    for k in range(3): line([(x + 200 + k * 26, y + 8 + k * 2), (x + 222 + k * 26, y + 8 + k * 2)], 0.5)

ferry(560, HZ + 26)
cargo(1090, HZ + 46)

def gull(x, y, s=1):
    line([(x - 7 * s, y - 2 * s), (x - 3 * s, y - 4 * s), (x, y), (x + 3 * s, y - 4 * s), (x + 7 * s, y - 2 * s)], 0.8)
for gx, gy, s in ((760, 70, 1), (790, 58, .8), (1180, 96, .9), (360, 52, .7)): gull(gx, gy, s)

svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" fill="none" stroke="#21302a" stroke-linecap="round" stroke-linejoin="round">'
       + "".join(P) + "</svg>")
open(sys.argv[1], "w").write(svg)
print(len(svg), "bytes", len(P), "paths")
