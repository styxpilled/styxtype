# Catalog

One TOML file per font: `<slug>.toml`. Font files go in `fonts/<slug>/` (not in git).

The pipeline reads designer, license, copyright, description and file styles from the font files. Fields here override those values. Only `name` and `category` are required.

```toml
name = "Fraunces"
category = "serif" # serif, sans, slab, mono, script, blackletter, display
tags = ["soft", "old-style"]
source = "https://github.com/undercasetype/Fraunces"
license = { id = "OFL-1.1", url = "https://openfontlicense.org" }
copyright = "..."
description = "..."

[[designers]]
name = "Undercase Type"
url = "https://undercase.xyz"

# Only when the font data is wrong:
[files."Fraunces-Italic.ttf"]
italic = true
weight = [100, 900] # or a single weight: 400
```

- Slug and tags: lowercase letters, digits and single hyphens.
- License id: SPDX id where one exists, else a custom id with a `url` to the license text.
