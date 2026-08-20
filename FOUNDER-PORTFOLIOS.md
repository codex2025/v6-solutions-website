# Adding a founder portfolio

One markdown file per founder. No code changes, ever.

1. Copy `shyamalan-v.md` to `<your-slug>.md`.
   **The filename must match the `slug:` field** — the glob loader derives the
   entry id from the filename, and `/team/<slug>/` is built from it.
2. Replace the content. Every section is optional: delete the `awards:` block
   and the Awards band simply does not render. No empty shells.
3. Add a photo next to your file and point `photo:` at it (`./your-slug.jpg`).
   Leave `photo:` out entirely if you don't have one yet — you get an initials
   avatar instead. **Do not point it at a file that doesn't exist; the build fails.**
4. `npm run build`. Your page is at `/team/<your-slug>/`.

## Your three accent colours

```yaml
portfolio:
  theme:
    accent:  '#2B6FFF'   # primary — buttons, links, timeline nodes
    accent2: '#00C49A'   # secondary — gradient partner, eyebrows
    accent3: '#FFCB5B'   # tertiary — third stop on the timeline gradient
```

These are **your** colours, not the company's. Pick something that isn't
Shyamalan's blue/green — that is the whole point of "same template, custom
build". They feed CSS custom properties, so changing these three values
restyles your entire page.

## Rules that are not negotiable

- **Never invent anything.** No fake stats, no fake awards, no fake client
  names. CLAUDE.md: honest "coming soon" beats fake proof.
- **Numbers are snapshots.** If you list metrics, they get a visible "accurate
  as of <date>" line. Update them or delete them — do not let them rot silently.
- **No personal phone numbers.** Personal email is your call, but the company
  default is business email only (decision 1.13).
- **Colours must pass contrast.** Anything you put on the cream `about:` band
  needs to be dark enough to read — neon accents that look great on the dark
  sections drop to ~2:1 there. Check before you commit.

## What the template will not do

- **No JavaScript.** The page ships 0 KB of it, and that is a hard requirement
  (~50KB budget for the whole site, audience on mid-range Android over 4G).
  No 3D canvas, no scroll libraries, no hydrated widgets.
- **No live API data.** The build is static. Anything live needs a Cloudflare
  Pages Function — ask first.
- **No contact form** until a Web3Forms/Formspree key exists. Links only.

## Full field reference

`src/content.config.ts` is the source of truth — the `portfolio` schema there is
commented field by field, and the build tells you exactly what is wrong if a
field is missing or malformed.
