import io
import math
from html import escape

import uharfbuzz as hb
from fontTools.pens.basePen import BasePen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

# Box in em, baseline at ASCENT from the top. Matches the list entry line box (line-height 1.25).
ASCENT = 0.95
DESCENT = 0.3
UNITS_PER_EM = 100
# List font size in px, for the optical size axis (like `font-optical-sizing: auto`).
OPTICAL_SIZE = 22


class _RelativePathPen(BasePen):
    """Relative path commands on an integer grid. Rounds absolute points, so errors do not add up."""

    def __init__(self, glyph_set):
        super().__init__(glyph_set)
        self.parts: list[str] = []
        self.current = (0, 0)
        self.start = (0, 0)

    def _emit(self, command: str, *points) -> None:
        cx, cy = self.current
        text = ""
        for x, y in points:
            for n in (round(x) - cx, round(y) - cy):
                text += ("" if n < 0 or not text else " ") + str(n)
        self.current = (round(points[-1][0]), round(points[-1][1]))
        self.parts.append(command + text)

    def _moveTo(self, pt):
        self._emit("m", pt)
        self.start = self.current

    def _lineTo(self, pt):
        x, y = round(pt[0]), round(pt[1])
        if (x, y) == self.current:
            return
        if y == self.current[1]:
            self.parts.append(f"h{x - self.current[0]}")
        elif x == self.current[0]:
            self.parts.append(f"v{y - self.current[1]}")
        else:
            self._emit("l", pt)
            return
        self.current = (x, y)

    def _curveToOne(self, p1, p2, p3):
        self._emit("c", p1, p2, p3)

    def _qCurveToOne(self, p1, p2):
        self._emit("q", p1, p2)

    def _closePath(self):
        self.parts.append("z")
        self.current = self.start

    _endPath = _closePath


def _location(font: TTFont) -> dict[str, float]:
    """Axis values a browser uses for `font-weight: 400` at the list size."""
    if "fvar" not in font:
        return {}
    wanted = {"wght": 400, "opsz": OPTICAL_SIZE}
    return {
        a.axisTag: min(max(wanted[a.axisTag], a.minValue), a.maxValue)
        for a in font["fvar"].axes
        if a.axisTag in wanted
    }


def name_path(font: TTFont, text: str) -> tuple[str, float]:
    """Returns SVG path data for `text` and its advance width in em, rounded up to the path grid."""
    location = _location(font)
    sfnt = io.BytesIO()
    flavor = font.flavor
    font.flavor = None
    font.save(sfnt)
    font.flavor = flavor

    hb_font = hb.Font(hb.Face(sfnt.getvalue()))
    hb_font.set_variations(location)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(hb_font, buf)

    scale = UNITS_PER_EM / font["head"].unitsPerEm
    glyph_set = font.getGlyphSet(location=location or None)
    order = font.getGlyphOrder()
    pen = _RelativePathPen(glyph_set)
    x = 0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        dx = (x + pos.x_offset) * scale
        dy = ASCENT * UNITS_PER_EM - pos.y_offset * scale
        glyph_set[order[info.codepoint]].draw(TransformPen(pen, (scale, 0, 0, -scale, dx, dy)))
        x += pos.x_advance
    return "".join(pen.parts), math.ceil(x * scale) / UNITS_PER_EM


def sprite(paths: dict[str, tuple[str, float]]) -> str:
    """One SVG with a symbol per slug, for `<use href="names.svg#slug">`."""
    height = round((ASCENT + DESCENT) * UNITS_PER_EM)
    symbols = "".join(
        f'<symbol id="{escape(slug)}" viewBox="0 0 {round(width * UNITS_PER_EM)} {height}">'
        f'<path d="{d}"/></symbol>'
        for slug, (d, width) in paths.items()
    )
    return f'<svg xmlns="http://www.w3.org/2000/svg">{symbols}</svg>'
