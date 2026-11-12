import re
from dataclasses import dataclass
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.ttLib import TTFont

from pipeline.analysis import Analysis, analyze
from pipeline.catalog import Designer, Entry, FileOverride, License

FONT_EXTENSIONS = {".ttf", ".otf", ".woff", ".woff2"}

NAME_COPYRIGHT = 0
NAME_VERSION = 5
NAME_DESIGNER = 9
NAME_DESCRIPTION = 10
NAME_DESIGNER_URL = 12
NAME_LICENSE = 13
NAME_LICENSE_URL = 14

LICENSE_URLS = {
    "OFL-1.1": "https://openfontlicense.org",
    "Apache-2.0": "https://www.apache.org/licenses/LICENSE-2.0",
}


@dataclass(frozen=True)
class Axis:
    tag: str
    name: str
    min: float
    default: float
    max: float


@dataclass(frozen=True)
class Instance:
    name: str
    coordinates: dict[str, float]


@dataclass(frozen=True)
class Face:
    file: str
    weight: int | tuple[int, int]
    italic: bool
    width: int
    axes: tuple[Axis, ...]
    instances: tuple[Instance, ...]
    features: tuple[str, ...]


@dataclass(frozen=True)
class Metrics:
    units_per_em: int
    ascender: int
    descender: int
    x_height: int | None
    cap_height: int | None


@dataclass(frozen=True)
class Font:
    entry: Entry
    faces: tuple[Face, ...]
    primary_file: str
    designers: tuple[Designer, ...]
    license: License
    copyright: str | None
    description: str | None
    version: str | None
    metrics: Metrics
    charset: tuple[tuple[int, int], ...]
    features: tuple[str, ...]
    # Names from the font for stylistic sets (ssXX) and character variants (cvXX).
    feature_names: dict[str, str]
    analysis: Analysis


class FontError(Exception):
    pass


def _name(font: TTFont, name_id: int) -> str | None:
    value = (font["name"].getDebugName(name_id) or "").strip()
    return value or None


def _glyph_bounds(glyph_set, glyph_name: str) -> tuple[float, float, float, float] | None:
    pen = BoundsPen(glyph_set)
    glyph_set[glyph_name].draw(pen)
    return pen.bounds


def _features(font: TTFont) -> set[str]:
    tags: set[str] = set()
    for table in ("GSUB", "GPOS"):
        if table in font and font[table].table.FeatureList:
            tags.update(r.FeatureTag for r in font[table].table.FeatureList.FeatureRecord)
    return tags


def _feature_names(font: TTFont) -> dict[str, str]:
    names: dict[str, str] = {}
    if "GSUB" not in font or not font["GSUB"].table.FeatureList:
        return names
    for record in font["GSUB"].table.FeatureList.FeatureRecord:
        params = record.Feature.FeatureParams
        name_id = getattr(params, "UINameID", None) or getattr(params, "FeatUILabelNameID", None)
        # Sinistre: "name : Celtic". Outfit: ss01 named "ss01".
        name = re.sub(r"^name\s*:\s*", "", _name(font, name_id) or "", flags=re.I) if name_id else ""
        if name and name != record.FeatureTag:
            names.setdefault(record.FeatureTag, name)
    return names


def _read_face(path: Path, font: TTFont, override: FileOverride | None) -> Face:
    os2 = font.get("OS/2")
    axes: list[Axis] = []
    instances: list[Instance] = []
    if "fvar" in font:
        fvar = font["fvar"]
        for a in fvar.axes:
            axes.append(Axis(a.axisTag, _name(font, a.axisNameID) or a.axisTag, a.minValue, a.defaultValue, a.maxValue))
        for i in fvar.instances:
            instances.append(Instance(_name(font, i.subfamilyNameID) or "", dict(i.coordinates)))

    weight: int | tuple[int, int] = os2.usWeightClass if os2 else 400
    if wght := next((a for a in axes if a.tag == "wght"), None):
        weight = (round(wght.min), round(wght.max))
    # Some fonts set only the angle, not the style flags.
    italic = (
        bool(os2 and os2.fsSelection & 1)
        or bool(font["head"].macStyle & 2)
        or font["post"].italicAngle != 0
    )

    if override:
        weight = override.weight if override.weight is not None else weight
        italic = override.italic if override.italic is not None else italic

    return Face(
        file=path.name,
        weight=weight,
        italic=italic,
        width=os2.usWidthClass if os2 else 5,
        axes=tuple(axes),
        instances=tuple(instances),
        features=tuple(sorted(_features(font))),
    )


def _charset(font: TTFont) -> set[int]:
    glyph_set = font.getGlyphSet()
    return {cp for cp, glyph in font.getBestCmap().items() if _glyph_bounds(glyph_set, glyph) is not None}


def _ranges(code_points: set[int]) -> tuple[tuple[int, int], ...]:
    ranges: list[list[int]] = []
    for cp in sorted(code_points):
        if ranges and ranges[-1][1] == cp - 1:
            ranges[-1][1] = cp
        else:
            ranges.append([cp, cp])
    return tuple((a, b) for a, b in ranges)


def _metrics(font: TTFont) -> Metrics:
    os2 = font.get("OS/2")
    cmap = font.getBestCmap()
    glyph_set = font.getGlyphSet()

    def measured(char: str) -> int | None:
        glyph = cmap.get(ord(char))
        bounds = _glyph_bounds(glyph_set, glyph) if glyph else None
        return round(bounds[3]) if bounds else None

    x_height = getattr(os2, "sxHeight", 0) or measured("x")
    cap_height = getattr(os2, "sCapHeight", 0) or measured("H")
    hhea = font["hhea"]
    return Metrics(font["head"].unitsPerEm, hhea.ascent, hhea.descent, x_height, cap_height)


def _split_designers(text: str) -> list[str]:
    return [d for d in re.split(r"\s*(?:,|&|\band\b)\s*", text) if d]


def _detect_license(description: str | None, url: str | None) -> str | None:
    text = f"{description or ''} {url or ''}"
    if re.search(r"open font license|scripts\.sil\.org/OFL|openfontlicense\.org", text, re.I):
        return "OFL-1.1"
    if re.search(r"apache license", text, re.I):
        return "Apache-2.0"
    return None


def _detect_license_file(directory: Path) -> str | None:
    for path in directory.iterdir():
        if path.suffix.lower() in FONT_EXTENSIONS or not path.is_file():
            continue
        if found := _detect_license(path.read_text(encoding="utf-8", errors="ignore")[:2000], None):
            return found
    return None


def _distance_to_regular(face: Face) -> int:
    if isinstance(face.weight, tuple):
        low, high = face.weight
        weight_distance = 0 if low <= 400 <= high else min(abs(low - 400), abs(high - 400))
    else:
        weight_distance = abs(face.weight - 400)
    return weight_distance + (10_000 if face.italic else 0)


def read_font(entry: Entry, directory: Path) -> Font:
    paths = sorted(p for p in directory.iterdir() if p.suffix.lower() in FONT_EXTENSIONS)
    if not paths:
        raise FontError(f"{entry.slug}: no font files in {directory}")
    unknown = entry.files.keys() - {p.name for p in paths}
    if unknown:
        raise FontError(f"{entry.slug}: overrides for missing files: {', '.join(sorted(unknown))}")

    loaded = [(p, TTFont(p)) for p in paths]
    faces = [_read_face(p, f, entry.files.get(p.name)) for p, f in loaded]

    seen: dict[tuple, str] = {}
    for face in faces:
        key = (face.weight, face.italic, face.width)
        if key in seen:
            raise FontError(f"{entry.slug}: {face.file} and {seen[key]} are the same face {key}")
        seen[key] = face.file

    primary_index = min(range(len(faces)), key=lambda i: _distance_to_regular(faces[i]))
    primary = loaded[primary_index][1]

    designers = entry.designers
    if designers is None:
        names = _split_designers(_name(primary, NAME_DESIGNER) or "")
        url = _name(primary, NAME_DESIGNER_URL) if len(names) == 1 else None
        designers = tuple(Designer(n, url) for n in names)

    license_text = _name(primary, NAME_LICENSE)
    license_url = _name(primary, NAME_LICENSE_URL)
    license_id = (
        (entry.license and entry.license.id)
        or _detect_license(license_text, license_url)
        or _detect_license_file(directory)
    )
    license_url = (entry.license and entry.license.url) or LICENSE_URLS.get(license_id or "") or license_url

    charset: set[int] = set()
    features: set[str] = set()
    for _, f in loaded:
        charset |= _charset(f)
    feature_names: dict[str, str] = {}
    for face in faces:
        features.update(face.features)
    for _, f in loaded:
        for tag, name in _feature_names(f).items():
            feature_names.setdefault(tag, name)
    # A name used for several features is a placeholder (Aboensis: "Name:").
    repeated = {n for n in feature_names.values() if list(feature_names.values()).count(n) > 1}
    feature_names = {t: n for t, n in feature_names.items() if n not in repeated}

    sorted_faces = tuple(sorted(faces, key=lambda f: (f.italic, f.weight if isinstance(f.weight, int) else f.weight[0])))
    return Font(
        entry=entry,
        primary_file=faces[primary_index].file,
        faces=sorted_faces,
        designers=designers,
        license=License(license_id, license_url),
        copyright=entry.copyright or _name(primary, NAME_COPYRIGHT),
        description=entry.description or _name(primary, NAME_DESCRIPTION),
        version=_name(primary, NAME_VERSION),
        metrics=_metrics(primary),
        charset=_ranges(charset),
        features=tuple(sorted(features)),
        feature_names=dict(sorted(feature_names.items())),
        analysis=analyze(sorted_faces, primary, charset),
    )


def gaps(font: Font) -> list[str]:
    missing = []
    if not font.designers:
        missing.append("designers")
    if not font.license.id:
        missing.append("license id")
    if not font.license.url:
        missing.append("license url")
    if not font.description:
        missing.append("description")
    if not font.entry.source:
        missing.append("source")
    return missing
