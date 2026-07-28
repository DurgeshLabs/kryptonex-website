<div align="center">

<img src="public/icon.svg" width="72" alt="Kryptonex" />

# Kryptonex

**Break it. Understand it. Defend it.**

The official website for **Kryptonex** — the cybersecurity & Capture-the-Flag community at the
School of Technology and Research, Dnyaan Prasad Global University (DPGU), Pune.

<sub>Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP · Lucide</sub>

</div>

---

## What this is

Kryptonex began as STR's first Tech & Innovation Club and has narrowed to one ownable mission:
cybersecurity, ethical hacking and CTF. This site is the club's public front door — the learning
ladder, the season calendar, the council, the flagship **Digital Fortress** inter-college CTF, and
the recruitment funnel.

Everything the site displays is **data-driven**: the stats band, command palette, timeline, roster
and FAQ all derive from JSON files in `src/data`. Update the data, and the whole site updates.

## Quick start

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000>.

| Script              | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Dev server with Fast Refresh                        |
| `npm run build`     | Static export to `out/`                             |
| `npm run lint`      | ESLint (`next/core-web-vitals` + `next/typescript`) |
| `npm run typecheck` | `tsc --noEmit`                                      |

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Fonts, metadata, JSON-LD, global shell
│   ├── page.tsx            # Section composition + FAQPage schema
│   ├── not-found.tsx       # Terminal-styled 404
│   ├── robots.ts           # robots.txt (static)
│   ├── sitemap.ts          # sitemap.xml (static)
│   └── globals.css         # Design tokens, utilities, keyframes
├── components/
│   ├── layout/             # Navbar, Footer, FloatingDock, CommandPalette, Shell, ThemeToggle
│   ├── sections/           # The 15 page sections + TopicsBand
│   ├── ui/                 # Button, LinkButton, Card, TiltCard, Badge, Section, Accordion,
│   │                       # AnimatedText, Counter, Terminal
│   └── fx/                 # CustomCursor, Globe, NeuralField, Backgrounds (grid/blobs/code rain),
│                           # LoadingScreen, ScrollProgress, PageTransition
├── data/                   # events · team · roadmap · ctf-journey · faq · testimonials · gallery
├── lib/                    # site config, hooks, utils
└── types/                  # Shared domain types
```

## Editing the content

All content lives in `src/data`. No component changes are needed for routine updates.

| File                | Drives                                              |
| ------------------- | --------------------------------------------------- |
| `events.json`       | Events timeline, filters, stats, command palette     |
| `team.json`         | Council grid, team filters, search, member count     |
| `roadmap.json`      | The 12-track learning ladder and the topics band     |
| `ctf-journey.json`  | The six-stage CTF progression                        |
| `faq.json`          | FAQ accordion **and** the `FAQPage` structured data   |
| `testimonials.json` | The auto-advancing quote carousel                    |
| `gallery.json`      | Gallery tiles and the lightbox                       |

### Placeholders to replace

A few things are deliberately marked as placeholders rather than invented:

1. **Recruitment form** — `site.links.recruitment` in `src/lib/site.ts` currently opens a
   pre-filled email to the council. Set `NEXT_PUBLIC_RECRUITMENT_URL`, or edit the value, once the
   real form URL exists.
2. **Social links** — the LinkedIn / Instagram / Discord / GitHub URLs in `src/lib/site.ts` are
   placeholders. Point them at the club's real handles.
3. **Gallery** — tiles render generated artwork, not photographs. As the season is documented,
   replace `Plate` in `src/components/sections/Gallery.tsx` with `next/image` tiles and add the
   image paths to `gallery.json`.
4. **Testimonials** — seeded with the council's own statements about the programme, attributed as
   such rather than as personal quotes. Swap in real member quotes after the first full season.

The learning ladder's twelve topics are derived from the club brief (Linux → networking → web →
forensics → malware, plus the workshop calendar); adjust freely in `roadmap.json`.

## Design system

Dark is the canonical theme; light is fully supported and persists across visits.

| Token       | Dark                    | Role                                         |
| ----------- | ----------------------- | -------------------------------------------- |
| `--bg`      | `#050505`               | Page background                              |
| `--surface` | `#101010`               | Cards and panels                             |
| `--border`  | `rgba(255,255,255,.08)` | Hairlines                                    |
| `--neon`    | `#3d8bff`               | Primary accent — interactive, glow            |
| `--violet`  | `#8b5cf6`               | Secondary accent — gradients                  |
| `--emerald` | `#22c55e`               | Success and defensive tracks                  |
| `--gold`    | `#d1a550`               | DPGU Sand Brown — Digital Fortress, flagship  |
| `--crimson` | `#e0453f`               | DPGU Red Brown — identity, offensive tracks   |

Gold and crimson are the university's official brand colours (`#d1a550` / `#b22b2f` from the STR
Brand & Identity Guidelines, lifted for legibility on dark surfaces). Typography is **Inter**, also
per the brand guidelines, with **JetBrains Mono** reserved for terminal, code and metadata. The
DPGU lockup always renders on a white plate, as the guidelines require.

## Accessibility & performance

- Every animation respects `prefers-reduced-motion` — canvases unmount entirely, the boot screen
  is skipped, and transitions collapse.
- The custom cursor only mounts on fine-pointer devices, and hides the native cursor only while it
  is actually active.
- Canvas effects pause via `IntersectionObserver` when off-screen and cap DPR at 2.
- Skip-to-content link, focus-visible rings, semantic landmarks, `aria-*` on all interactive
  controls, and an `sr-only` copy of every animated heading.
- Static export, fonts self-hosted via `next/font`, no runtime image optimisation needed.

## Keyboard shortcuts

| Keys            | Action                      |
| --------------- | --------------------------- |
| `⌘K` / `Ctrl+K` | Toggle the command palette  |
| `/`             | Open the command palette    |
| `↑` `↓`         | Move through results        |
| `↵`             | Run the selected command    |
| `Esc`           | Close palette / mobile menu |

## Deployment — GitHub Pages

The site builds to a fully static export (`output: "export"`), so Pages can serve it with no
server.

`.github/workflows/deploy.yml` runs on every push to `main`: it lints, typechecks, builds with the
correct `basePath` for the repository, and publishes `out/`.

**One-time setup in the repository:**

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab).

The workflow reads the base path from `actions/configure-pages`, so a project site
(`user.github.io/kryptonex`) and a user site (`user.github.io`) both work without edits.

### Deploying elsewhere

`out/` is plain static files — drop it on Vercel, Netlify, Cloudflare Pages or any static host.
Leave `NEXT_PUBLIC_BASE_PATH` unset when serving from a domain root.

### Environment variables

| Variable                      | Purpose                                | Default                   |
| ----------------------------- | -------------------------------------- | ------------------------- |
| `NEXT_PUBLIC_BASE_PATH`       | Sub-path the site is served from       | _(none — served at root)_ |
| `NEXT_PUBLIC_SITE_URL`        | Canonical URL for metadata and sitemap | `https://kryptonex.club`  |
| `NEXT_PUBLIC_RECRUITMENT_URL` | Recruitment form link                  | mailto the council        |

## Ethics

Everything Kryptonex teaches happens inside sanctioned labs, CTF ranges, or a bug bounty
programme's published scope and safe-harbour terms. Testing systems without permission is not part
of this club.

---

<div align="center">
<sub>Built by the Kryptonex council · School of Technology and Research · Dr. D. Y. Patil Unitech Society, Pune</sub>
</div>
