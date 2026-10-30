"""Generate the module's vector figures (opaque white background for dark mode).
Colours follow the simulation: ω uni-blau-1, L uni-blau-3, D physik-gelb, ω_P / precession jura-rot,
forces and the figure axis graphite.
Usage: python3 tools/make_figures.py frontend/src/assets/images"""
import math, sys, os

OUT = sys.argv[1]
NAVY = 'rgb(21,50,104)'       # text, outlines
OMEGA = 'rgb(21,50,104)'      # ω: uni-blau-1
LCOL = 'rgb(0,145,200)'       # L: uni-blau-3
DCOL = 'rgb(253,166,66)'      # D: physik-gelb (arrows)
DTEXT = 'rgb(214,118,16)'     # D: darker shade for text on white
PCOL = 'rgb(199,13,45)'       # ω_P, precession: jura-rot
GRAPH = 'rgb(59,59,58)'       # graphite: figure axis, forces, rotation sense
GREY = 'rgb(135,135,134)'     # construction lines
LIGHT = 'rgb(200,205,212)'    # apparatus shading
PALE = 'rgb(230,233,238)'
STAND = 'rgb(21,50,104)'
FONT = 'font-family="Helvetica, Arial, sans-serif"'

COLOURS = {'navy': NAVY, 'L': LCOL, 'D': DCOL, 'P': PCOL, 'graph': GRAPH, 'grey': GREY}


def svg(w, h, body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">\n'
            f'<defs>{markers()}</defs>\n'
            f'<rect width="{w}" height="{h}" fill="white"/>\n{body}\n</svg>\n')


def markers():
    out = ''
    for name, col in COLOURS.items():
        out += (f'<marker id="arr-{name}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" '
                f'orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{col}"/></marker>')
    return out


def key_of(col):
    return next(k for k, c in COLOURS.items() if c == col)


def arrow(x1, y1, x2, y2, col, w=5, dash=''):
    d = f' stroke-dasharray="{dash}"' if dash else ''
    return (f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{col}" stroke-width="{w}"{d} '
            f'stroke-linecap="round" marker-end="url(#arr-{key_of(col)})"/>')


def line(x1, y1, x2, y2, col, w=2, dash=''):
    d = f' stroke-dasharray="{dash}"' if dash else ''
    return f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{col}" stroke-width="{w}"{d}/>'


def polyline(pts, col, w=2, dash='', end_arrow=False, fill='none', opacity=1):
    d = f' stroke-dasharray="{dash}"' if dash else ''
    m = f' marker-end="url(#arr-{key_of(col)})"' if end_arrow else ''
    p = ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts)
    return (f'<polyline points="{p}" fill="{fill}" stroke="{col}" stroke-width="{w}"{d}{m} '
            f'stroke-linejoin="round" stroke-linecap="round" opacity="{opacity}"/>')


def polygon(pts, fill, stroke='none', w=1.5, fill_opacity=1):
    p = ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts)
    return (f'<polygon points="{p}" fill="{fill}" fill-opacity="{fill_opacity}" stroke="{stroke}" '
            f'stroke-width="{w}" stroke-linejoin="round"/>')


def text(x, y, s, col=NAVY, size=22, anchor='start', style='italic', weight='bold'):
    return (f'<text x="{x:.1f}" y="{y:.1f}" fill="{col}" font-size="{size}" font-style="{style}" font-weight="{weight}" '
            f'text-anchor="{anchor}" {FONT}>{s}</text>')


def vec_label(x, y, sym, col, size=24, anchor='start', sub=None, text_col=None):
    """Symbol with a small arrow above it (vector notation), optional subscript."""
    tc = text_col or col
    s = sym + (f'<tspan font-size="{size * 0.62:.0f}" dy="{size * 0.25:.0f}">{sub}</tspan>' if sub else '')
    w = size * 0.55
    full = w + (size * 0.4 if sub else 0)
    ax = x if anchor == 'start' else x - full / 2 if anchor == 'middle' else x - full
    return (text(x, y, s, tc, size, anchor) +
            f'<line x1="{ax:.1f}" y1="{y - size * 0.95:.1f}" x2="{ax + w:.1f}" y2="{y - size * 0.95:.1f}" stroke="{tc}" '
            f'stroke-width="1.6" marker-end="url(#arr-{key_of(col)})"/>')


def sym_label(x, y, sym, col, size=20, sub=None, anchor='start', style='italic', weight='bold'):
    s = sym + (f'<tspan font-size="{size * 0.65:.0f}" dy="{size * 0.25:.0f}">{sub}</tspan>' if sub else '')
    return text(x, y, s, col, size, anchor, style, weight)


def convex_hull(points):
    pts = sorted(set((round(x, 2), round(y, 2)) for x, y in points))
    if len(pts) < 3:
        return pts

    def cross(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    lower, upper = [], []
    for p in pts:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)
    for p in reversed(pts):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)
    return lower[:-1] + upper[:-1]


# ── 3D helpers: right-handed x, y, z (z up), oblique view from the front ─────

def projector(cx, cy, scale, az_deg, el_deg):
    az, el = math.radians(az_deg), math.radians(el_deg)

    def P(p):
        x, y, z = p
        xr = x * math.cos(az) - y * math.sin(az)
        depth = x * math.sin(az) + y * math.cos(az)
        X = xr
        Y = z * math.cos(el) + depth * math.sin(el)
        return (cx + scale * X, cy - scale * Y)
    return P


def add(a, b): return tuple(i + j for i, j in zip(a, b))
def mul(a, s): return tuple(i * s for i in a)
def norm(a):
    n = math.sqrt(sum(i * i for i in a))
    return tuple(i / n for i in a)
def cross3(a, b): return (a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0])


def basis(axis):
    a = norm(axis)
    helper = (0, 0, 1) if abs(a[2]) < 0.9 else (1, 0, 0)
    u = norm(cross3(a, helper))
    v = cross3(a, u)
    return a, u, v


def circle3d(center, axis, radius, n=96, t0=0.0, t1=2 * math.pi):
    a, u, v = basis(axis)
    return [add(center, add(mul(u, radius * math.cos(t)), mul(v, radius * math.sin(t))))
            for t in (t0 + (t1 - t0) * k / n for k in range(n + 1))]


def cone(P, apex, axis, half_deg, slant, col, fill_opacity, rim_w=2.5):
    """Open cone: translucent body (convex hull of apex and rim), rim and silhouette lines."""
    a = norm(axis)
    h = slant * math.cos(math.radians(half_deg))
    r = slant * math.sin(math.radians(half_deg))
    rim = [P(p) for p in circle3d(add(apex, mul(a, h)), a, r)]
    ap = P(apex)
    hull = convex_hull(rim + [ap])
    out = polygon(hull, col, fill_opacity=fill_opacity)
    out += polyline(rim, col, rim_w)
    # silhouette: hull edges that touch the apex
    k = hull.index(min(hull, key=lambda q: (q[0] - ap[0]) ** 2 + (q[1] - ap[1]) ** 2))
    for nb in (hull[k - 1], hull[(k + 1) % len(hull)]):
        out += line(ap[0], ap[1], nb[0], nb[1], col, 1.8)
    return out


def write(name, content):
    path = os.path.join(OUT, name)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        f.write(content)


def disk(cx, cy, rx, ry, sense):
    """Horizontal disk seen obliquely from above, with a rotation arrow on the front rim.
    sense=+1: counter-clockwise seen from above (front rim moves right)."""
    th = 14
    body = (f'<path d="M{cx - rx},{cy} L{cx - rx},{cy + th} A{rx},{ry} 0 0 0 {cx + rx},{cy + th} L{cx + rx},{cy} z" '
            f'fill="{LIGHT}" stroke="{NAVY}" stroke-width="2"/>'
            f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{PALE}" stroke="{NAVY}" stroke-width="2"/>')
    pts = []
    for k in range(0, 41):
        t = math.radians(120 - k * 60 / 40)  # from 120° to 60° (front = 90°, screen-down)
        pts.append((cx + (rx + 16) * math.cos(t), cy + th + (ry + 14) * math.sin(t)))
    if sense < 0:
        pts.reverse()
    body += polyline(pts, GRAPH, 3.5, end_arrow=True)
    return body


# ── p2: ω along the axis, right-hand rule ─────────────────────────────────
cx, cy = 200, 230
b = line(cx, cy + 80, cx, cy - 10, GREY, 4)
b += disk(cx, cy, 130, 38, +1)
b += arrow(cx, cy, cx, 60, OMEGA, 6)
b += vec_label(cx + 14, 82, 'ω', OMEGA)
b += text(cx + 150, cy + 70, 'Drehsinn', GRAPH, 17, 'end', 'normal', 'normal')
write('p2_rotation/omega_vektor.svg', svg(400, 330, b))

# ── p2: L = I ω, both along the axis ───────────────────────────────────────
b = line(cx, cy + 80, cx, cy - 10, GREY, 4)
b += disk(cx, cy, 130, 38, +1)
b += arrow(cx + 10, cy, cx + 10, 130, OMEGA, 5)
b += arrow(cx - 10, cy, cx - 10, 40, LCOL, 7)
b += vec_label(cx + 24, 150, 'ω', OMEGA)
b += vec_label(cx - 26, 62, 'L', LCOL, anchor='end')
b += text(cx + 150, cy + 70, 'L = I ω', NAVY, 18, 'end', 'italic', 'normal')
write('p2_rotation/drehimpuls_vektor.svg', svg(400, 330, b))

# ── p2 question: disk turning clockwise seen from above → ω points down ───
cx, cy = 150, 150
options = {
    1: (cx, cy, cx, 25),                      # up
    2: (cx, cy, cx, 285),                     # down (correct)
    3: (cx - 70, cy - 48, cx + 80, cy - 48),  # tangential along the back rim
}
for k, (x1, y1, x2, y2) in options.items():
    b = line(cx, cy - 70, cx, cy + 120, GREY, 4, '6 6')
    b += disk(cx, cy, 110, 32, -1)
    b += arrow(x1, y1, x2, y2, OMEGA, 6)
    write(f'p2_rotation/omega_frage_{k}.svg', svg(300, 300, b))

# ── p3: physical pendulum ─────────────────────────────────────────────────
cx, cy, R, d, phi = 160, 140, 105, 70, math.radians(28)
px, py = cx + d * math.sin(phi), cy + d * math.cos(phi)
b = f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="{PALE}" stroke="{NAVY}" stroke-width="3"/>'
b += line(cx, cy, cx, cy + R + 20, GREY, 2, '6 5')
b += line(cx, cy, px, py, NAVY, 3)
b += f'<circle cx="{cx}" cy="{cy}" r="7" fill="{NAVY}"/>'
b += f'<circle cx="{px:.1f}" cy="{py:.1f}" r="15" fill="rgb(212,160,40)" stroke="{NAVY}" stroke-width="2"/>'
ar = 30
b += (f'<path d="M{cx},{cy + ar} A{ar},{ar} 0 0 0 {cx + ar * math.sin(phi):.1f},{cy + ar * math.cos(phi):.1f}" '
      f'fill="none" stroke="{NAVY}" stroke-width="2"/>')
b += text(cx + 3, cy + ar + 17, 'φ', NAVY, 18)
b += text(cx + d / 2 * math.sin(phi) + 10, cy + d / 2 * math.cos(phi) - 4, 'd', NAVY, 20)
b += arrow(px, py + 16, px, py + 120, GRAPH, 4)
b += sym_label(px + 10, py + 110, 'm', GRAPH, 19, sub='p') + text(px + 37, py + 110, 'g', GRAPH, 19)
b += text(cx - 12, cy - 14, 'Radachse', NAVY, 15, 'end', 'normal', 'normal')
b += text(cx + R + 10, py + 5, 'Pendelgewicht', NAVY, 15, 'start', 'normal', 'normal')
b += line(cx + R + 8, py, px + 17, py, GREY, 1.5)
write('p3_pendulum/pendel_skizze.svg', svg(400, 380, b))

# ── p7: path of the axle end, released vs guided (grey like the sim's trail) ─
W, H = 640, 300
TRAIL = 'rgb(110,110,110)'
b = ''
for row, (y0, label, cusps) in enumerate([(70, 'losgelassen ohne Anfangsbewegung', True),
                                         (210, 'sanft in die Präzession geführt', False)]):
    b += text(20, y0 - 30, label, NAVY, 22, 'start', 'normal', 'bold')
    b += line(20, y0, W - 20, y0, GREY, 1.5, '5 5')
    pts = []
    for k in range(0, 601):
        t = k / 600 * 4 * math.pi
        if cusps:
            x = 30 + (t - math.sin(t)) * 45          # cycloid with cusps at the release height
            y = y0 + (1 - math.cos(t)) * 22
        else:
            x = 30 + t * 45
            y = y0 + 3 + 2 * math.sin(3 * t)
        pts.append((x, y))
    b += polyline(pts, TRAIL, 3.5)
b += arrow(W - 170, H - 18, W - 40, H - 18, NAVY, 2.5)
b += text(W - 180, H - 12, 'Präzessionswinkel', NAVY, 19, 'end', 'normal', 'normal')
write('p7_measurement/achsenbahn.svg', svg(W, H, b))


# ── p4: three axes; decomposition of ω and L (lab-like: I_⊥ > I about the figure axis) ─
W, H = 500, 500
ox, oy = 70, 420                       # origin = pivot
I_fig, I_perp = 1.0, 2.2               # schematic ratio, not the lab value
k_L = 1.25                             # drawing scale of L relative to ω
om, ang = 230, math.radians(35)        # |ω| in px, angle of ω from the figure axis
w1, w2 = om * math.cos(ang), om * math.sin(ang)
L1, L2 = k_L * I_fig * w1, k_L * I_perp * w2
b = ''
# axes
b += arrow(ox, oy, ox, 40, GRAPH, 2.5)
b += text(ox + 8, 40, 'Figurenachse', GRAPH, 16, 'start', 'normal', 'bold')
b += arrow(ox, oy, W - 20, oy, GRAPH, 2.5)
b += text(W - 20, oy + 48, 'senkrecht zur Figurenachse', GRAPH, 15, 'end', 'normal', 'normal')
# construction lines
b += line(ox + w2, oy - w1, ox + w2, oy, GREY, 1.4, '4 4') + line(ox + w2, oy - w1, ox, oy - w1, GREY, 1.4, '4 4')
b += line(ox + L2, oy - L1, ox + L2, oy, GREY, 1.4, '4 4') + line(ox + L2, oy - L1, ox, oy - L1, GREY, 1.4, '4 4')
# ω components (thin arrows on the axes)
b += arrow(ox + 1, oy, ox + 1, oy - w1, OMEGA, 3)
b += arrow(ox, oy - 1, ox + w2, oy - 1, OMEGA, 3)
b += sym_label(ox - 12, oy - w1 / 2, 'ω', OMEGA, 19, sub='1', anchor='end')
b += sym_label(ox + w2 / 2, oy + 26, 'ω', OMEGA, 19, sub='2', anchor='middle')
# L components as ticks
b += line(ox - 8, oy - L1, ox + 8, oy - L1, LCOL, 3) + line(ox + L2, oy - 8, ox + L2, oy + 8, LCOL, 3)
b += sym_label(ox - 12, oy - L1 + 6, 'L', LCOL, 19, sub='1', anchor='end')
b += sym_label(ox + L2, oy + 26, 'L', LCOL, 19, sub='2', anchor='middle')
# the vectors
b += arrow(ox, oy, ox + w2, oy - w1, OMEGA, 5)
b += arrow(ox, oy, ox + L2, oy - L1, LCOL, 6)
b += vec_label(ox + w2 + 12, oy - w1 + 22, 'ω', OMEGA, 22)
b += vec_label(ox + L2 + 8, oy - L1 - 4, 'L', LCOL, 22, anchor='end')
for k, (col, desc) in enumerate([(OMEGA, 'ω: momentane Drehachse'), (LCOL, 'L: Drehimpulsachse')]):
    y = 52 + 24 * k
    b += line(W - 225, y - 5, W - 205, y - 5, col, 4) + text(W - 197, y, desc, col, 14, 'start', 'normal', 'bold')
write('p4_gyroscope/kreiselachsen.svg', svg(W, H, b))


# ── p5: precession sketch, (a) general tilt θ, (b) the lab gyroscope ─────────
W, H = 900, 470
b = ''
# (a) L on a cone around the vertical
P = projector(200, 350, 200, 0, 24)
theta, phi0, dphi = math.radians(55), math.radians(0), math.radians(30)
Lv = (math.sin(theta) * math.cos(phi0), math.sin(theta) * math.sin(phi0), math.cos(theta))
Lv2 = (math.sin(theta) * math.cos(phi0 + dphi), math.sin(theta) * math.sin(phi0 + dphi), math.cos(theta))
centre = (0, 0, math.cos(theta))
o = P((0, 0, 0))
b += text(30, 40, '(a)', NAVY, 22, 'start', 'normal', 'bold')
b += line(*o, *P((0, 0, 1.25)), GREY, 2, '7 6')
rimpts = [P(p) for p in circle3d(centre, (0, 0, 1), math.sin(theta))]
b += polygon(convex_hull(rimpts + [o]), LCOL, fill_opacity=0.06)
b += polyline(rimpts, GREY, 2, '6 5')
c2, t1, t2 = P(centre), P(Lv), P(Lv2)
b += line(*c2, *t1, GREY, 1.6) + line(*c2, *t2, GREY, 1.6)
arc = [P(add(centre, mul((math.cos(a), math.sin(a), 0), 0.32 * math.sin(theta))))
       for a in (phi0 + dphi * k / 20 for k in range(21))]
b += polyline(arc, NAVY, 1.8)
b += sym_label(arc[10][0] + 10, arc[10][1] + 2, 'dφ', NAVY, 18)
b += sym_label((c2[0] + t1[0]) / 2 + 10, (c2[1] + t1[1]) / 2 + 22, 'L sin θ', GREY, 16, anchor='middle', style='italic', weight='normal')
# θ arc at the pivot
tarc = [P(mul((math.sin(a) * math.cos(phi0), math.sin(a) * math.sin(phi0), math.cos(a)), 0.22))
        for a in (theta * k / 20 for k in range(21))]
b += polyline(tarc, NAVY, 1.8) + sym_label(tarc[8][0] + 6, tarc[8][1] - 4, 'θ', NAVY, 18)
b += arrow(*o, *P(Lv2), LCOL, 3, '7 5')
b += arrow(*o, *P(Lv), LCOL, 5.5)
b += vec_label(t1[0] + 8, t1[1] + 26, 'L', LCOL, 22)
b += arrow(*t1, *t2, DCOL, 4.5)
b += vec_label(t1[0] + 14, t1[1] - 26, 'dL = D dt', DCOL, 18, text_col=DTEXT)
b += arrow(*P((0, 0, 0.95)), *P((0, 0, 1.3)), PCOL, 5)
b += vec_label(P((0, 0, 1.3))[0] + 12, P((0, 0, 1.3))[1] + 18, 'ω', PCOL, 22, sub='P')
b += f'<circle cx="{o[0]:.1f}" cy="{o[1]:.1f}" r="5" fill="{NAVY}"/>'

# (b) lab gyroscope; x along the axle (wheel at −x), y into the page, z up
P = projector(650, 230, 560, -28, 16)
o = P((0, 0, 0))
b += text(470, 40, '(b)', NAVY, 22, 'start', 'normal', 'bold')
# stand
base = [(-0.10, -0.07, -0.30), (0.10, -0.07, -0.30), (0.10, 0.07, -0.30), (-0.10, 0.07, -0.30)]
b += polygon([P(p) for p in base], 'rgb(213,223,236)', STAND, 1.5)
b += line(*P((0, 0, -0.30)), *P((0, 0, -0.02)), STAND, 7)
# precession path of the wheel centre (clockwise seen from above, ω_P down)
path = [P(p) for p in circle3d((0, 0, 0), (0, 0, 1), 0.30, n=160)]
b += polyline(path, PCOL, 1.8, '6 5', opacity=0.8)
near = [P((0.30 * math.cos(a), 0.30 * math.sin(a), 0)) for a in (math.radians(-60 - 40 * k / 20) for k in range(21))]
b += polyline(near, PCOL, 2.6, end_arrow=True)
# wheel at x = −0.12 in the y-z plane
wc = (-0.12, 0, 0)
back = [P(p) for p in circle3d(add(wc, (-0.015, 0, 0)), (1, 0, 0), 0.12)]
front = [P(p) for p in circle3d(add(wc, (0.015, 0, 0)), (1, 0, 0), 0.12)]
b += polygon(convex_hull(back + front), LIGHT, NAVY, 1.5)
b += polygon(front, PALE, NAVY, 1.8)
b += f'<circle cx="{P(add(wc, (0.016, 0, 0)))[0]:.1f}" cy="{P(add(wc, (0.016, 0, 0)))[1]:.1f}" r="5" fill="{GREY}"/>'
# spin arrow on the front face: L along −x, the top of the wheel moves into the page (+y)
spin = [P(add(wc, (0.02, 0.085 * math.cos(t), 0.085 * math.sin(t)))) for t in (math.radians(130 - 80 * k / 20) for k in range(21))]
b += polyline(spin, GRAPH, 2.6, end_arrow=True)
# axle
b += line(*P((-0.17, 0, 0)), *P((0.30, 0, 0)), GRAPH, 5)
# counterweight
cw = [add((0.17, 0, 0), (dx, dy, dz)) for dx in (-0.025, 0.025) for dy in (-0.03, 0.03) for dz in (-0.03, 0.03)]
b += polygon(convex_hull([P(p) for p in cw]), 'rgb(160,167,178)', NAVY, 1.5)
# bearing block and pivot
blk = [add((0, 0, 0), (dx, dy, dz)) for dx in (-0.02, 0.02) for dy in (-0.02, 0.02) for dz in (-0.03, 0.01)]
b += polygon(convex_hull([P(p) for p in blk]), STAND, STAND, 1)
# add-on weight in the notch at x = r = 0.27, string 0.10 m
notch = (0.27, 0, 0)
b += line(*P(notch), *P((0.27, 0, -0.10)), GRAPH, 1.5)
for k in range(3):
    z = -0.10 - 0.012 * k
    disc = [P(p) for p in circle3d((0.27, 0, z), (0, 0, 1), 0.022)]
    b += polygon(disc, 'rgb(90,96,108)', GRAPH, 1)
b += arrow(*P((0.27, 0, -0.15)), *P((0.27, 0, -0.27)), GRAPH, 3.5)
b += sym_label(P((0.27, 0, -0.24))[0] + 10, P((0.27, 0, -0.24))[1], 'm', GRAPH, 19, sub='z') + \
     text(P((0.27, 0, -0.24))[0] + 37, P((0.27, 0, -0.24))[1], 'g', GRAPH, 19)
# lever arm r above the axle
r1, r2 = P((0, 0, -0.055)), P((0.27, 0, -0.055))
b += line(*r1, *r2, GRAPH, 1.4) + line(r1[0], r1[1] - 6, r1[0], r1[1] + 6, GRAPH, 1.4) + line(r2[0], r2[1] - 6, r2[0], r2[1] + 6, GRAPH, 1.4)
b += sym_label((r1[0] + r2[0]) / 2, (r1[1] + r2[1]) / 2 + 22, 'r', GRAPH, 19, anchor='middle')
# vectors: vertical axis with ω_P (down), L through the wheel, D into the page
b += line(*P((0, 0, 0.02)), *P((0, 0, 0.30)), GREY, 2, '7 6')
b += arrow(*P((0, 0, 0.29)), *P((0, 0, 0.12)), PCOL, 5)
b += vec_label(P((0, 0, 0.27))[0] + 14, P((0, 0, 0.27))[1] + 4, 'ω', PCOL, 22, sub='P')
b += arrow(*o, *P((-0.30, 0, 0)), LCOL, 6)
b += vec_label(P((-0.30, 0, 0))[0] - 6, P((-0.30, 0, 0))[1] - 14, 'L', LCOL, 22, anchor='end')
b += arrow(*o, *P((0, 0.20, 0)), DCOL, 5.5)
b += vec_label(P((0, 0.20, 0))[0] + 10, P((0, 0.20, 0))[1] - 2, 'D', DCOL, 22, text_col=DTEXT)
write('p5_precession/praezession_skizze.svg', svg(W, H, b))


# ── p6: the three cones of the force-free lab gyroscope ────────────────────
# L fixed (vertical). Lab-like order: ω lies between the figure axis and L, so the
# Gangpolkegel rolls on the outside of the Rastpolkegel. Angles are schematic.
W, H = 600, 600
P = projector(250, 430, 230, -30, 14)
alpha, gamma = 34.0, 21.0              # figure axis and ω, angle from L
beta = alpha - gamma                   # ω from the figure axis
e3 = (math.sin(math.radians(alpha)), 0, math.cos(math.radians(alpha)))
om = (math.sin(math.radians(gamma)), 0, math.cos(math.radians(gamma)))
Lz = (0, 0, 1)
apex = (0, 0, 0)
NUT, SPACE, BODY = GRAPH, LCOL, OMEGA
b = ''
b += cone(P, apex, Lz, alpha, 1.0, NUT, 0.10)
b += cone(P, apex, Lz, gamma, 1.25, SPACE, 0.16)
b += cone(P, apex, e3, beta, 1.45, BODY, 0.14)
o = P(apex)
b += arrow(*o, *P(mul(e3, 1.62)), GRAPH, 2.5, '8 6')
b += arrow(*o, *P(mul(om, 1.58)), OMEGA, 4.5)
b += arrow(*o, *P(mul(Lz, 1.55)), LCOL, 6)
tip = P(mul(e3, 1.62))
b += text(tip[0] + 6, tip[1] + 4, 'Figurenachse', GRAPH, 16, 'start', 'normal', 'bold')
tip = P(mul(om, 1.58))
b += vec_label(tip[0] - 4, tip[1] - 10, 'ω', OMEGA, 22, anchor='middle')
tip = P(mul(Lz, 1.55))
b += vec_label(tip[0] - 12, tip[1] + 8, 'L', LCOL, 22, anchor='end')
b += f'<circle cx="{o[0]:.1f}" cy="{o[1]:.1f}" r="5" fill="{NAVY}"/>'
# legend
lx, ly = 30, 482
for k, (col, op, name, desc) in enumerate([(LCOL, None, 'L', 'Drehimpulsachse (raumfest)'),
                                           (OMEGA, None, 'ω', 'momentane Drehachse'),
                                           (NUT, 0.25, 'Nutationskegel', 'Figurenachse um L'),
                                           (SPACE, 0.30, 'Rastpolkegel', 'ω um L, raumfest'),
                                           (BODY, 0.28, 'Gangpolkegel', 'ω um die Figurenachse, körperfest')]):
    col_x = lx
    y = ly + 22 * k
    if op is None:
        b += line(col_x, y - 6, col_x + 18, y - 6, col, 4)
        b += text(col_x + 26, y, f'{name}: {desc}', col, 14, 'start', 'normal', 'bold')
    else:
        b += f'<rect x="{col_x}" y="{y - 13}" width="18" height="14" fill="{col}" fill-opacity="{op}" stroke="{col}" stroke-width="2"/>'
        b += (f'<text x="{col_x + 26}" y="{y}" font-size="14" {FONT}><tspan fill="{col}" font-weight="bold">{name}:</tspan>'
              f'<tspan fill="{GRAPH}"> {desc}</tspan></text>')
write('p6_nutation/kreiselkegel.svg', svg(W, H, b))
print('ok')
