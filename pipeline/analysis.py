"""Derived data for filters: OS/2 classes, PANOSE, monospace, scripts, auto-tags."""

from collections import Counter
from dataclasses import dataclass
from typing import TYPE_CHECKING

from fontTools import unicodedata
from fontTools.ttLib import TTFont

if TYPE_CHECKING:
    from pipeline.fonts import Face

VIETNAMESE = set("ĂăÂâĐđÊêÔôƠơƯư" "ẠạẢảẤấẦầẨẩẪẫẬậẮắẰằẲẳẴẵẶặẸẹẺẻẼẽẾếỀềỂểỄễỆệỈỉỊịỌọỎỏỐốỒồỔổỖỗỘộỚớỜờỞởỠỡỢợỤụỦủỨứỪừỬửỮữỰựỲỳỴỵỶỷỸỹ")
CYRILLIC = {*range(0x0410, 0x0450), 0x0401, 0x0451}
GREEK = {*range(0x0391, 0x03A2), *range(0x03A3, 0x03AA), *range(0x03B1, 0x03CA)}
LATIN_EXT_A = set(range(0x0100, 0x0180))

# Share of a set that a font must cover to get the tag.
COVERAGE = 0.9
# Other scripts need this many characters.
MIN_SCRIPT_CHARS = 20
# Latin is in every font; Common and Inherited are punctuation and marks.
SKIP_SCRIPTS = {"Latn", "Zyyy", "Zinh", "Zzzz"}

# Grouped scripts: tag and the sets that decide it.
SCRIPT_SETS = {
    "latin-ext": LATIN_EXT_A,
    "vietnamese": {ord(c) for c in VIETNAMESE},
    "cyrillic": CYRILLIC,
    "greek": GREEK,
}
SCRIPT_CODES = {"Cyrl": "cyrillic", "Grek": "greek"}


@dataclass(frozen=True)
class Analysis:
    weight_class: int
    width_class: int
    panose: tuple[int, ...]
    monospace: bool
    # ISO 15924 code to number of characters.
    script_chars: dict[str, int]
    scripts: tuple[str, ...]
    properties: tuple[str, ...]


def _monospace(font: TTFont) -> bool:
    if font["post"].isFixedPitch:
        return True
    cmap = font.getBestCmap()
    hmtx = font["hmtx"]
    advances = {hmtx[cmap[c]][0] for c in range(0x21, 0x7F) if c in cmap}
    advances.discard(0)
    return len(advances) == 1


def _script_chars(charset: set[int]) -> dict[str, int]:
    counts = Counter(unicodedata.script(chr(c)) for c in charset)
    return dict(counts.most_common())


def _scripts(charset: set[int], script_chars: dict[str, int]) -> tuple[str, ...]:
    tags = {
        tag
        for tag, required in SCRIPT_SETS.items()
        if len(required & charset) / len(required) >= COVERAGE
    }
    for code, count in script_chars.items():
        if code not in SKIP_SCRIPTS and code not in SCRIPT_CODES and count >= MIN_SCRIPT_CHARS:
            tags.add(unicodedata.script_name(code).lower().replace("_", "-"))
    return tuple(sorted(tags))


def _weights(faces: "tuple[Face, ...]") -> tuple[int, int]:
    values = [w for f in faces for w in (f.weight if isinstance(f.weight, tuple) else (f.weight,))]
    return min(values), max(values)


def _widths(faces: "tuple[Face, ...]") -> tuple[float, float]:
    """font-stretch percent, from the wdth axis or the OS/2 width class."""
    by_class = [50, 62.5, 75, 87.5, 100, 112.5, 125, 150, 200]
    values: list[float] = []
    for face in faces:
        wdth = next((a for a in face.axes if a.tag == "wdth"), None)
        values += [wdth.min, wdth.max] if wdth else [by_class[min(max(face.width, 1), 9) - 1]]
    return min(values), max(values)


def _properties(faces: "tuple[Face, ...]", monospace: bool) -> tuple[str, ...]:
    tags: set[str] = set()
    variable = any(f.axes for f in faces)
    if variable:
        tags.add("variable")
    if any(f.italic for f in faces):
        tags.add("italic")
    if monospace:
        tags.add("monospace")

    has_wght = any(a.tag == "wght" for f in faces for a in f.axes)
    if len(faces) == 1 and not variable:
        tags.add("single-style")
    elif len(faces) >= 4 or has_wght:
        tags.add("family")

    light, heavy = _weights(faces)
    if light <= 300:
        tags.add("light")
    if heavy >= 800:
        tags.add("heavy")
    narrow, wide = _widths(faces)
    if narrow <= 87.5:
        tags.add("condensed")
    if wide >= 112.5:
        tags.add("wide")
    return tuple(sorted(tags))


def analyze(faces: "tuple[Face, ...]", primary: TTFont, charset: set[int]) -> Analysis:
    os2 = primary.get("OS/2")
    monospace = _monospace(primary)
    script_chars = _script_chars(charset)
    return Analysis(
        weight_class=os2.usWeightClass if os2 else 400,
        width_class=os2.usWidthClass if os2 else 5,
        panose=tuple(vars(os2.panose).values()) if os2 else (),
        monospace=monospace,
        script_chars=script_chars,
        scripts=_scripts(charset, script_chars),
        properties=_properties(faces, monospace),
    )
