import json
import shutil
import sys
from dataclasses import asdict
from pathlib import Path
from typing import Any

from fontTools.ttLib import TTFont

from pipeline.catalog import CatalogError, load_catalog
from pipeline.fonts import Font, FontError, gaps, read_font
from pipeline.glyphs import glyph_data
from pipeline.previews import name_path, sprite
from pipeline.webfonts import woff2_name, write_webfonts

ROOT = Path(__file__).resolve().parent.parent
CATALOG = ROOT / "catalog"
FONTS = ROOT / "fonts"
INDEX = ROOT / "src" / "lib" / "generated" / "index.json"
STATIC = ROOT / "static" / "fonts"


def _write(path: Path, data: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")


def _index(font: Font) -> dict[str, Any]:
    e = font.entry
    return {"slug": e.slug, "name": e.name, "category": e.category, "tags": list(e.tags)}


def _weight_range(font: Font) -> list[int]:
    weights = [w for f in font.faces for w in (f.weight if isinstance(f.weight, tuple) else (f.weight,))]
    return [min(weights), max(weights)]


def _filters(font: Font) -> dict[str, Any]:
    return {
        "license": font.license.id,
        "designers": [d.name for d in font.designers],
        "weights": _weight_range(font),
        "italic": any(f.italic for f in font.faces),
        "variable": any(f.axes for f in font.faces),
        "axes": sorted({a.tag for f in font.faces for a in f.axes}),
        "features": list(font.features),
        "scripts": list(font.analysis.scripts),
        "properties": list(font.analysis.properties),
    }


def _meta(font: Font) -> dict[str, Any]:
    e = font.entry
    return {
        **_index(font),
        "source": e.source,
        "designers": [asdict(d) for d in font.designers],
        "license": asdict(font.license),
        "copyright": font.copyright,
        "description": font.description,
        "specimen": e.specimen,
        "version": font.version,
        "metrics": asdict(font.metrics),
        "primary": woff2_name(font.primary_file),
        "faces": [{**asdict(f), "file": woff2_name(f.file)} for f in font.faces],
        "features": list(font.features),
        "feature_names": font.feature_names,
        "analysis": asdict(font.analysis),
        "charset": font.charset,
    }


def main() -> int:
    try:
        entries = load_catalog(CATALOG)
    except CatalogError as e:
        print(f"Catalog has {len(e.errors)} error(s):", file=sys.stderr)
        for error in e.errors:
            print(f"  {error}", file=sys.stderr)
        return 1

    fonts: list[Font] = []
    errors: list[str] = []
    for entry in entries:
        directory = FONTS / entry.slug
        if not directory.is_dir():
            errors.append(f"{entry.slug}: missing directory {directory.relative_to(ROOT)}")
            continue
        try:
            fonts.append(read_font(entry, directory))
        except FontError as e:
            errors.append(str(e))
    if errors:
        print(f"Fonts have {len(errors)} error(s):", file=sys.stderr)
        for error in errors:
            print(f"  {error}", file=sys.stderr)
        return 1

    slugs = {f.entry.slug for f in fonts}
    if FONTS.is_dir():
        for directory in FONTS.iterdir():
            if directory.is_dir() and directory.name not in slugs:
                print(f"warning: fonts/{directory.name} has no catalog file")

    primaries = {f.entry.slug: TTFont(FONTS / f.entry.slug / f.primary_file) for f in fonts}
    paths = {f.entry.slug: name_path(primaries[f.entry.slug], f.entry.name) for f in fonts}
    _write(INDEX, [{**_index(f), "name_width": paths[f.entry.slug][1]} for f in fonts])
    (STATIC / "names.svg").write_text(sprite(paths), encoding="utf-8")
    _write(STATIC / "filters.json", {f.entry.slug: _filters(f) for f in fonts})
    written = 0
    for font in fonts:
        _write(STATIC / font.entry.slug / "meta.json", _meta(font))
        code_points = [cp for a, b in font.charset for cp in range(a, b + 1)]
        faces = [TTFont(FONTS / font.entry.slug / f.file) for f in font.faces]
        _write(STATIC / font.entry.slug / "glyphs.json", glyph_data(faces, primaries[font.entry.slug], code_points))
        written += write_webfonts(font, FONTS / font.entry.slug, STATIC / font.entry.slug)
    for directory in STATIC.iterdir():
        if directory.is_dir() and directory.name not in slugs:
            shutil.rmtree(directory)

    for font in fonts:
        if missing := gaps(font):
            print(f"gap: {font.entry.slug}: {', '.join(missing)}")
    print(f"Wrote {len(fonts)} font(s), {written} webfont file(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
