import shutil
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

from pipeline.fonts import Font

SUBSET_TEXT = "".join(chr(c) for c in range(0x20, 0x7F)) + "“”"
SUBSET_FILE = "subset.woff2"


def woff2_name(source_file: str) -> str:
    return Path(source_file).stem + ".woff2"


def _fresh(output: Path, source: Path) -> bool:
    return output.exists() and output.stat().st_mtime >= source.stat().st_mtime


def _convert(source: Path, output: Path) -> None:
    if source.suffix.lower() == ".woff2":
        shutil.copyfile(source, output)
        return
    font = TTFont(source)
    font.flavor = "woff2"
    font.save(output)


def _subset(source: Path, output: Path) -> None:
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    font = subset.load_font(source, options)
    subsetter = subset.Subsetter(options)
    subsetter.populate(text=SUBSET_TEXT)
    subsetter.subset(font)
    subset.save_font(font, output, options)


def write_webfonts(font: Font, source_dir: Path, output_dir: Path) -> int:
    """Returns the number of files written."""
    output_dir.mkdir(parents=True, exist_ok=True)
    written = 0
    keep = {SUBSET_FILE, "meta.json"}
    for face in font.faces:
        source = source_dir / face.file
        output = output_dir / woff2_name(face.file)
        keep.add(output.name)
        if not _fresh(output, source):
            _convert(source, output)
            written += 1

    primary = source_dir / font.primary_file
    subset_output = output_dir / SUBSET_FILE
    if not _fresh(subset_output, primary):
        _subset(primary, subset_output)
        written += 1

    for path in output_dir.iterdir():
        if path.name not in keep:
            path.unlink()
    return written
