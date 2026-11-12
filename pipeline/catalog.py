import re
import tomllib
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

CATEGORIES = ("serif", "sans", "slab", "mono", "script", "blackletter", "display")
SLUG = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
URL = re.compile(r"^https?://\S+$")


@dataclass(frozen=True)
class Designer:
    name: str
    url: str | None = None


@dataclass(frozen=True)
class License:
    id: str | None = None
    url: str | None = None


@dataclass(frozen=True)
class FileOverride:
    weight: int | tuple[int, int] | None = None
    italic: bool | None = None


@dataclass(frozen=True)
class Entry:
    slug: str
    name: str
    category: str
    tags: tuple[str, ...] = ()
    source: str | None = None
    designers: tuple[Designer, ...] | None = None
    license: License | None = None
    copyright: str | None = None
    description: str | None = None
    specimen: str | None = None
    files: dict[str, FileOverride] = field(default_factory=dict)


class CatalogError(Exception):
    def __init__(self, errors: list[str]):
        super().__init__("\n".join(errors))
        self.errors = errors


class _Checker:
    def __init__(self, file: Path):
        self.file = file
        self.errors: list[str] = []

    def fail(self, where: str, message: str) -> None:
        self.errors.append(f"{self.file.name}: {where}: {message}")

    def keys(self, where: str, data: dict[str, Any], allowed: set[str]) -> None:
        for key in data.keys() - allowed:
            self.fail(where, f"unknown key '{key}'")

    def string(self, where: str, value: Any, pattern: re.Pattern[str] | None = None) -> str | None:
        if value is None:
            return None
        if not isinstance(value, str) or not value.strip():
            self.fail(where, "must be a non-empty string")
            return None
        if pattern and not pattern.match(value):
            self.fail(where, f"invalid value '{value}'")
            return None
        return value

    def table(self, where: str, value: Any) -> dict[str, Any] | None:
        if value is None:
            return None
        if not isinstance(value, dict):
            self.fail(where, "must be a table")
            return None
        return value

    def array(self, where: str, value: Any) -> list[Any] | None:
        if value is None:
            return None
        if not isinstance(value, list):
            self.fail(where, "must be an array")
            return None
        return value


def _weight(c: _Checker, where: str, value: Any) -> int | tuple[int, int] | None:
    def valid(w: Any) -> bool:
        # bool is a subclass of int
        return isinstance(w, int) and not isinstance(w, bool) and 1 <= w <= 1000

    if value is None:
        return None
    if valid(value):
        return value
    if isinstance(value, list) and len(value) == 2 and all(map(valid, value)) and value[0] <= value[1]:
        return (value[0], value[1])
    c.fail(where, "must be a weight (1-1000) or a range [min, max]")
    return None


def parse_entry(file: Path) -> Entry:
    c = _Checker(file)
    slug = file.stem
    if not SLUG.match(slug):
        c.fail("file name", "slug must be lowercase letters, digits and single hyphens")

    try:
        data = tomllib.loads(file.read_text(encoding="utf-8"))
    except tomllib.TOMLDecodeError as e:
        raise CatalogError([f"{file.name}: {e}"]) from e

    c.keys("root", data, {"name", "category", "tags", "source", "designers", "license", "copyright", "description", "specimen", "files"})

    name = c.string("name", data.get("name"))
    if name is None and "name" not in data:
        c.fail("name", "required")

    category = data.get("category")
    if category not in CATEGORIES:
        c.fail("category", f"must be one of {', '.join(CATEGORIES)}")

    tags: list[str] = []
    for i, tag in enumerate(c.array("tags", data.get("tags")) or []):
        if (t := c.string(f"tags[{i}]", tag, SLUG)) is not None:
            tags.append(t)

    designers: list[Designer] | None = None
    if (raw := c.array("designers", data.get("designers"))) is not None:
        designers = []
        for i, d in enumerate(raw):
            where = f"designers[{i}]"
            if (d := c.table(where, d)) is None:
                continue
            c.keys(where, d, {"name", "url"})
            d_name = c.string(f"{where}.name", d.get("name"))
            d_url = c.string(f"{where}.url", d.get("url"), URL)
            if d_name is None:
                c.fail(f"{where}.name", "required")
                continue
            designers.append(Designer(d_name, d_url))

    license_ = None
    if (raw := c.table("license", data.get("license"))) is not None:
        c.keys("license", raw, {"id", "url"})
        license_ = License(c.string("license.id", raw.get("id")), c.string("license.url", raw.get("url"), URL))

    files: dict[str, FileOverride] = {}
    for file_name, raw in (c.table("files", data.get("files")) or {}).items():
        where = f"files.{file_name}"
        if (raw := c.table(where, raw)) is None:
            continue
        c.keys(where, raw, {"weight", "italic"})
        italic = raw.get("italic")
        if italic is not None and not isinstance(italic, bool):
            c.fail(f"{where}.italic", "must be true or false")
            italic = None
        files[file_name] = FileOverride(_weight(c, f"{where}.weight", raw.get("weight")), italic)

    source = c.string("source", data.get("source"), URL)
    copyright_ = c.string("copyright", data.get("copyright"))
    description = c.string("description", data.get("description"))
    specimen = c.string("specimen", data.get("specimen"))

    if c.errors:
        raise CatalogError(c.errors)

    return Entry(
        slug=slug,
        name=name or "",
        category=category,
        tags=tuple(tags),
        source=source,
        designers=tuple(designers) if designers is not None else None,
        license=license_,
        copyright=copyright_,
        description=description,
        specimen=specimen,
        files=files,
    )


def load_catalog(directory: Path) -> list[Entry]:
    entries: list[Entry] = []
    errors: list[str] = []
    for file in sorted(directory.glob("*.toml")):
        try:
            entries.append(parse_entry(file))
        except CatalogError as e:
            errors.extend(e.errors)
    if errors:
        raise CatalogError(errors)
    return entries
