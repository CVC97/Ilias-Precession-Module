"""Generate the module's vector figures (opaque white background for dark mode).
Usage: python3 tools/make_figures.py frontend/src/assets/images"""
import math, sys, os

OUT = sys.argv[1]
NAVY = 'rgb(21,50,104)'
OMEGA = 'rgb(0,145,200)'     # ω blue
LCOL = 'rgb(199,13,45)'      # L red
DCOL = 'rgb(37,105,81)'      # D green
GREY = 'rgb(135,135,134)'
FONT = 'font-family="Helvetica, Arial, sans-serif"'


def svg(w, h, body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">\n'
            f'<defs>{markers()}</defs>\n'
            f'<rect width="{w}" height="{h}" fill="white"/>\n{body}\n</svg>\n')


def markers():
    out = ''
    for name, col in [('navy', NAVY), ('omega', OMEGA), ('L', LCOL), ('D', DCOL), ('grey', GREY)]:
        out += (f'<marker id="arr-{name}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" '
                f'orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="{col}"/></marker>')
    return out


def arrow(x1, y1, x2, y2, col, name, w=5, dash=''):
    d = f' stroke-dasharray="{dash}"' if dash else ''
    return (f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{col}" stroke-width="{w}"{d} '
            f'marker-end="url(#arr-{name})"/>')


def text(x, y, s, col=NAVY, size=22, anchor='start', style='italic', weight='bold'):
    return (f'<text x="{x}" y="{y}" fill="{col}" font-size="{size}" font-style="{style}" font-weight="{weight}" '
            f'text-anchor="{anchor}" {FONT}>{s}</text>')


def vec_label(x, y, s, col, size=24, anchor='start'):
    """Symbol with a small arrow above it (vector notation)."""
    w = size * 0.55
    ax = x if anchor == 'start' else x - w / 2 if anchor == 'middle' else x - w
    return (text(x, y, s, col, size, anchor) +
            f'<line x1="{ax}" y1="{y - size * 0.95}" x2="{ax + w}" y2="{y - size * 0.95}" stroke="{col}" '
            f'stroke-width="1.6" marker-end="url(#arr-{"L" if col == LCOL else "omega" if col == OMEGA else "D" if col == DCOL else "navy"})"/>')


def disk(cx, cy, rx, ry, sense):
    """Horizontal disk seen obliquely from above, with a rotation arrow on the front rim.
    sense=+1: counter-clockwise seen from above (front rim moves right)."""
    th = 14
    body = (f'<path d="M{cx - rx},{cy} L{cx - rx},{cy + th} A{rx},{ry} 0 0 0 {cx + rx},{cy + th} L{cx + rx},{cy} z" '
            f'fill="rgb(200,205,212)" stroke="{NAVY}" stroke-width="2"/>'
            f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="rgb(230,233,238)" stroke="{NAVY}" stroke-width="2"/>')
    # rotation arrow along the front rim, slightly outside
    pts = []
    for k in range(0, 41):
        t = math.radians(120 - k * 60 / 40)  # from 120° to 60° (front = 90°, screen-down)
        pts.append((cx + (rx + 16) * math.cos(t), cy + th + (ry + 14) * math.sin(t)))
    if sense < 0:
        pts.reverse()
    path = 'M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in pts)
    body += f'<path d="{path}" fill="none" stroke="{NAVY}" stroke-width="3.5" marker-end="url(#arr-navy)"/>'
    return body


def write(name, content):
    with open(os.path.join(OUT, name), 'w') as f:
        f.write(content)


# ── p2: ω along the axis, right-hand rule ─────────────────────────────────
cx, cy = 200, 230
b = f'<line x1="{cx}" y1="{cy + 80}" x2="{cx}" y2="{cy - 10}" stroke="{GREY}" stroke-width="4"/>'
b += disk(cx, cy, 130, 38, +1)
b += arrow(cx, cy, cx, 60, OMEGA, 'omega', 6)
b += vec_label(cx + 14, 82, 'ω', OMEGA)
b += text(cx + 150, cy + 70, 'Drehsinn', NAVY, 17, 'end', 'normal', 'normal')
write('p2_rotation/omega_vektor.svg', svg(400, 330, b))

# ── p2: L = I ω, both along the axis ───────────────────────────────────────
b = f'<line x1="{cx}" y1="{cy + 80}" x2="{cx}" y2="{cy - 10}" stroke="{GREY}" stroke-width="4"/>'
b += disk(cx, cy, 130, 38, +1)
b += arrow(cx + 10, cy, cx + 10, 130, OMEGA, 'omega', 5)
b += arrow(cx - 10, cy, cx - 10, 40, LCOL, 'L', 7)
b += vec_label(cx + 24, 150, 'ω', OMEGA)
b += vec_label(cx - 26, 62, 'L', LCOL, anchor='end')
b += text(cx + 150, cy + 70, 'L = I ω', NAVY, 18, 'end', 'italic', 'normal')
write('p2_rotation/drehimpuls_vektor.svg', svg(400, 330, b))

# ── p2 question: disk turning clockwise seen from above → ω points down ───
cx, cy = 150, 150
options = {
    1: (cx, cy, cx, 25),            # up
    2: (cx, cy, cx, 285),           # down (correct)
    3: (cx - 70, cy - 48, cx + 80, cy - 48),   # tangential along the back rim
    4: (cx, cy, cx + 128, cy + 40),  # radial, in the disk plane
}
for k, (x1, y1, x2, y2) in options.items():
    b = f'<line x1="{cx}" y1="{cy - 70}" x2="{cx}" y2="{cy + 120}" stroke="{GREY}" stroke-width="4" stroke-dasharray="6 6"/>'
    b += disk(cx, cy, 110, 32, -1)
    b += arrow(x1, y1, x2, y2, OMEGA, 'omega', 6)
    write(f'p2_rotation/omega_frage_{k}.svg', svg(300, 300, b))

# ── p3: physical pendulum ─────────────────────────────────────────────────
cx, cy, R, d, phi = 160, 140, 105, 70, math.radians(28)
px, py = cx + d * math.sin(phi), cy + d * math.cos(phi)
b = f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="rgb(230,233,238)" stroke="{NAVY}" stroke-width="3"/>'
b += f'<line x1="{cx}" y1="{cy}" x2="{cx}" y2="{cy + R + 20}" stroke="{GREY}" stroke-width="2" stroke-dasharray="6 5"/>'
b += f'<line x1="{cx}" y1="{cy}" x2="{px:.1f}" y2="{py:.1f}" stroke="{NAVY}" stroke-width="3"/>'
b += f'<circle cx="{cx}" cy="{cy}" r="7" fill="{NAVY}"/>'
b += f'<circle cx="{px:.1f}" cy="{py:.1f}" r="15" fill="rgb(212,160,40)" stroke="{NAVY}" stroke-width="2"/>'
ar = 30
b += (f'<path d="M{cx},{cy + ar} A{ar},{ar} 0 0 0 {cx + ar * math.sin(phi):.1f},{cy + ar * math.cos(phi):.1f}" '
      f'fill="none" stroke="{NAVY}" stroke-width="2"/>')
b += text(cx + 3, cy + ar + 17, 'φ', NAVY, 18)
b += text(cx + d / 2 * math.sin(phi) + 10, cy + d / 2 * math.cos(phi) - 4, 'd', NAVY, 20)
b += arrow(px, py + 16, px, py + 120, DCOL, 'D', 4)
b += text(px + 10, py + 110, 'm', DCOL, 19) + text(px + 27, py + 116, 'p', DCOL, 13, style='italic') + text(px + 38, py + 110, 'g', DCOL, 19)
b += text(cx - 12, cy - 14, 'Radachse', NAVY, 15, 'end', 'normal', 'normal')
b += text(cx + R + 10, py + 5, 'Pendelgewicht', NAVY, 15, 'start', 'normal', 'normal')
b += f'<line x1="{cx + R + 8}" y1="{py:.1f}" x2="{px + 17:.1f}" y2="{py:.1f}" stroke="{GREY}" stroke-width="1.5"/>'
write('p3_pendulum/pendel_skizze.svg', svg(400, 380, b))

# ── p7: path of the axle end, released vs guided ──────────────────────────
W, H = 640, 300
b = ''
for row, (y0, label, cusps) in enumerate([(70, 'losgelassen ohne Anfangsbewegung', True),
                                         (210, 'sanft in die Präzession geführt', False)]):
    b += text(20, y0 - 30, label, NAVY, 22, 'start', 'normal', 'bold')
    b += f'<line x1="20" y1="{y0}" x2="{W - 20}" y2="{y0}" stroke="{GREY}" stroke-width="1.5" stroke-dasharray="5 5"/>'
    pts = []
    for k in range(0, 601):
        t = k / 600 * 4 * math.pi
        if cusps:
            # cycloid with cusps at the release height
            x = 30 + (t - math.sin(t)) * 45
            y = y0 + (1 - math.cos(t)) * 22
        else:
            x = 30 + t * 45
            y = y0 + 3 + 2 * math.sin(3 * t)
        pts.append((x, y))
    path = 'M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in pts)
    b += f'<path d="{path}" fill="none" stroke="{LCOL}" stroke-width="3"/>'
b += arrow(W - 170, H - 18, W - 40, H - 18, NAVY, 'navy', 2.5)
b += text(W - 180, H - 12, 'Präzessionswinkel', NAVY, 19, 'end', 'normal', 'normal')
write('p7_measurement/achsenbahn.svg', svg(W, H, b))
print('ok')
