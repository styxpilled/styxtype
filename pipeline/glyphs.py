from typing import Any

from fontTools.pens.boundsPen import BoundsPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

# Features the shaper applies by itself, or that only repeat other features.
SKIP_FEATURES = {"aalt", "ccmp", "locl", "rvrn", "init", "medi", "fina", "isol", "rlig", "rclt"}

SINGLE = 1
ALTERNATE = 3
EXTENSION = 7


def _subtables(lookup) -> list[tuple[int, Any]]:
    result = []
    for sub in lookup.SubTable:
        if lookup.LookupType == EXTENSION:
            result.append((sub.ExtensionLookupType, sub.ExtSubTable))
        else:
            result.append((lookup.LookupType, sub))
    return result


def _alternates(font: TTFont) -> dict[str, dict[str, list[str]]]:
    """Glyph name to {feature tag: alternate glyph names}."""
    result: dict[str, dict[str, list[str]]] = {}
    if "GSUB" not in font or not font["GSUB"].table.FeatureList:
        return result
    table = font["GSUB"].table
    for record in table.FeatureList.FeatureRecord:
        tag = record.FeatureTag
        if tag in SKIP_FEATURES:
            continue
        for index in record.Feature.LookupListIndex:
            for kind, sub in _subtables(table.LookupList.Lookup[index]):
                if kind == SINGLE:
                    pairs = ((src, [dst]) for src, dst in sub.mapping.items())
                elif kind == ALTERNATE:
                    pairs = sub.alternates.items()
                else:
                    continue
                for src, dsts in pairs:
                    known = result.setdefault(src, {}).setdefault(tag, [])
                    known.extend(d for d in dsts if d != src and d not in known)
    return {src: {t: d for t, d in tags.items() if d} for src, tags in result.items()}


def _metrics(font: TTFont, names: list[str | None]) -> list[int | None]:
    """Flat [advance, lsb, rsb, ...] per name. Null for glyphs the face does not have."""
    hmtx = font["hmtx"]
    glyph_set = font.getGlyphSet()
    flat: list[int | None] = []
    for name in names:
        if name is None or name not in glyph_set:
            flat += [None, None, None]
            continue
        advance = hmtx[name][0]
        pen = BoundsPen(glyph_set)
        glyph_set[name].draw(pen)
        if pen.bounds:
            x_min, _, x_max, _ = pen.bounds
            flat += [advance, round(x_min), round(advance - x_max)]
        else:
            flat += [advance, None, None]
    return flat


def _regular(font: TTFont) -> tuple[TTFont, dict[str, float] | None]:
    """A variable face at wght 400 (clamped), other axes at default. The UI draws this instance."""
    if "fvar" not in font:
        return font, None
    location = {a.axisTag: a.defaultValue for a in font["fvar"].axes}
    if "wght" in location:
        wght = next(a for a in font["fvar"].axes if a.axisTag == "wght")
        location["wght"] = min(max(400, wght.minValue), wght.maxValue)
    return instantiateVariableFont(font, location), location


def glyph_data(faces: list[TTFont], primary: TTFont, code_points: list[int]) -> dict[str, Any]:
    """Metrics per face, in `code_points` order, then the unencoded alternates.

    Alternates come from the primary face and point into that glyph order.
    """
    instances = [_regular(f) for f in faces]
    cmaps = [f.getBestCmap() for f in faces]
    primary_cmap = primary.getBestCmap()
    by_glyph = _alternates(primary)

    index = {primary_cmap[cp]: i for i, cp in enumerate(code_points) if cp in primary_cmap}
    extra: list[str] = []
    alternates: dict[str, dict[str, list[int]]] = {}
    for cp in code_points:
        tags = by_glyph.get(primary_cmap.get(cp, ""))
        if not tags:
            continue
        for tag, names in tags.items():
            for name in names:
                if name not in index:
                    index[name] = len(code_points) + len(extra)
                    extra.append(name)
            alternates.setdefault(str(cp), {})[tag] = [index[n] for n in names]

    return {
        "faces": [
            _metrics(font, [cmap.get(cp) for cp in code_points] + extra)
            for (font, _), cmap in zip(instances, cmaps)
        ],
        "locations": [location for _, location in instances],
        "alternates": alternates,
    }
