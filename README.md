<div align="center">

<img src="public/icon.svg" width="72" alt="Kryptonex" />

# Kryptonex

**Build. Learn. Innovate. Lead.**

The official website for **Kryptonex** — the student innovation community at the School of
Technology and Research, Dnyaan Prasad Global University (DPGU), Pune.

<sub>Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide</sub>

</div>

---

## What this is

Kryptonex is the student community where builders become founders, cybersecurity professionals,
AI engineers and innovators. This site is its public front door — announcements, the event
calendar, the learning path, member projects, the resource library, the council and recruitment.

A multi-page Next.js application with twelve routes and an eleven-section landing page.
Everything it displays is **data-driven**: the stats band, command palette, event timeline,
roster, projects and resources all derive from JSON files in `src/data`. Update the data, and the
whole site updates.

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

## Routes

| Route            | What it is                                                |
| ---------------- | --------------------------------------------------------- |
| `/`              | Landing page — hero, announcements, events, why, mission,  |
|                  | numbers, gallery, partners, resources, team, newsletter    |
| `/about`         | Story, mission and vision, learning path, numbers          |
| `/events`        | Full calendar, filterable by time, type and keyword        |
| `/announcements` | Everything currently open                                  |
| `/gallery`       | Filterable masonry grid with a lightbox                    |
| `/resources`     | The resource library by category                           |
| `/projects`      | What members have built                                    |
| `/hall-of-fame`  | Recognition categories and criteria                        |
| `/team`          | Leadership plus the searchable full roster                 |
| `/blog`          | Writeups and field notes                                   |
| `/join`          | The recruitment process and track selection                |
| `/contact`       | Enquiries, sponsorship and speaking                        |

## Project structure

```
src/
├── app/                    # One directory per route + layout, sitemap, robots, 404
├── components/
│   ├── layout/             # Navbar, AnnouncementBar, Footer, CommandPalette, Shell, ThemeToggle
│   ├── sections/           # Landing sections and the shared explorers (events, team, gallery)
│   ├── ui/                 # Button, LinkButton, Card, Badge, Section, Accordion, Counter, …
│   └── fx/                 # PageBackdrop, NeuralField, ScrollProgress
├── data/                   # All content as JSON
├── lib/                    # site config + navigation, hooks, utils
└── types/                  # Shared domain types
```

## Editing the content

All content lives in `src/data`. No component changes are needed for routine updates.

| File                    | Drives                                              |
| ----------------------- | --------------------------------------------------- |
| `announcements.json`    | Sticky ticker, announcements section and page        |
| `events.json`           | Landing timeline, `/events` explorer, palette        |
| `domains.json`          | Hero track pills, `/join` track picker, palette      |
| `learning-path.json`    | The eight-stage learning journey                     |
| `semester-roadmap.json` | The month-by-month semester plan                     |
| `community-stats.json`  | The animated counters                                |
| `projects.json`         | Featured projects and `/projects`                    |
| `hall-of-fame.json`     | Recognition categories and criteria                  |
| `resources.json`        | The resource library                                 |
| `partners.json`         | The partner marquee                                  |
| `team.json`             | Leadership grid and the searchable roster            |
| `gallery.json`          | Gallery tiles and the lightbox                       |
| `blog.json`             | The blog index                                       |

### Placeholders to replace

A few things are deliberately marked as placeholders rather than invented:

1. **Recruitment form** — `site.links.recruitment` in `src/lib/site.ts` currently opens a
   pre-filled email to the council. Set `NEXT_PUBLIC_RECRUITMENT_URL`, or edit the value, once the
   real form URL exists.
2. **Social links** — the LinkedIn / Instagram / Discord / GitHub URLs in `src/lib/site.ts` are
   placeholders. Point them at the community's real handles.
3. **Gallery** — tiles render generated artwork, not photographs. As each event is documented,
   replace `GalleryPlate` in `src/components/ui/GalleryPlate.tsx` with `next/image` tiles and add
   the image paths to `gallery.json`.
4. **Testimonials** — seeded with the council's own statements about the programme, attributed as
   such rather than as personal quotes. Swap in real member, alumni and faculty quotes once the
   first full season is documented.
5. **Community numbers** — `community-stats.json` carries the figures supplied by the council
   (250+ members, 18 events, and so on). Verify them before launch; they are the site's most
   quotable claims.
6. **Partners** — `partners.json` lists the organisations named by the council. Confirm each
   relationship before publishing, and add logo assets when they are available.
7. **Projects** — `repo` and `demo` are optional on every project. Cards show "Repo on release"
   until a link is added, so nothing points at a dead URL.
8. **Newsletter** — the form composes an email to the council rather than posting to an endpoint,
   because the site is a static export. Swap in a real form action when one exists.
9. **Team socials** — the leadership cards show inert social icons. Add per-member handles to
   `team.json` and wire them up in `LeadershipTeam.tsx` when they're collected.

## Design system

Dark is the canonical theme; light is fully supported and persists across visits. The palette is
deliberately restrained — one accent that carries meaning, with the university's brand colours
reserved for identity moments.

| Token       | Dark                    | Role                                        |
| ----------- | ----------------------- | ------------------------------------------- |
| `--bg`      | `#050505`               | Page background                             |
| `--surface` | `#101012`               | Cards and panels                            |
| `--border`  | `rgba(255,255,255,.08)` | Hairlines                                   |
| `--accent`  | `#4d8dff`               | The single primary accent                   |
| `--emerald` | `#34c76a`               | Live / open status                          |
| `--gold`    | `#d1a550`               | DPGU Sand Brown — flagship events           |
| `--crimson` | `#d94b45`               | DPGU Red Brown — identity                   |

Gold and crimson come from the STR Brand & Identity Guidelines (`#d1a550` / `#b22b2f`, lifted for
legibility on dark surfaces). Typography is **Inter**, also per the brand guidelines, with
**JetBrains Mono** reserved for metadata, code and eyebrow labels. The DPGU lockup always renders
on a white plate, as the guidelines require.

## Accessibility & performance

- Every animation respects `prefers-reduced-motion` — canvases unmount entirely and transitions
  collapse.
- The native cursor is used throughout; there is no custom cursor layer.
- The hero's particle canvas pauses via `IntersectionObserver` when off-screen and caps DPR at 2.
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

The security track happens inside sanctioned labs, CTF ranges, or a bug bounty programme's
published scope and safe-harbour terms. Testing systems without permission is not part of this
community.

---

<div align="center">
<sub>Built by the Kryptonex council · School of Technology and Research · Dr. D. Y. Patil Unitech Society, Pune</sub>
</div>
