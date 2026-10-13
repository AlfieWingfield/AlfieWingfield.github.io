# Plan: Alfie Wingfield — Personal CV / Research Website

## Context
Building a multi-page personal website for Alfie Wingfield. Second round of refinement fixes.

**Fixes required:**
1. **Research grid horizontal dividers** — the horizontal row-dividers inside the project grid must NOT touch the vertical centre line. Add `mx-6` (or a percentage gap) to the horizontal dividers within the grid so they stop short on each side, leaving a visible gap where they would meet the vertical line — matching the DashDigital WORK list style.
2. **About page column alignment** — the middle column ("Publication", "Event", "Award" in News; "Nature Biotechnology" etc. in Publications) must share the same grid column definition across all `TableRow` instances. Currently the grid proportions may differ per section. Fix by ensuring all `TableRow` components use identical `grid-cols` and that the middle column text is left-aligned consistently.
3. **Footer** — add a shared `Footer` component rendered on every page (inside the root layout, below `<Routes>`). Structure:
   - Section label: "Support & Affiliations" (same `SectionLabel` style — tiny uppercase tracking)
   - A horizontal row of 3+ logo placeholder boxes (small, e.g. `w-24 h-10 bg-neutral-100`), centred, with `gap-6` between them
   - Below that: a very subtle copyright line — `text-[10px] text-neutral-300 tracking-widest uppercase` — e.g. "© 2025 Alfie Wingfield"
   - Separated from page content above by a thin black `Divider`
   - Padded top/bottom with `py-10`

## Page Structure (React Router)

| Route | Page | Description |
|---|---|---|
| `/` | About | Landing page: name + photo header, then tabular sections |
| `/research` | Research | Project grid |
| `/other-works` | Other Works | List with image per entry |

## Visual Style

- **Background:** pure white `#ffffff`
- **Text:** near-black `#111111`
- **Dividers:** thin `1px` black lines (like DashDigital rows)
- **Heading font:** very bold, wide, uppercase — use `"Bebas Neue"` (Google Fonts) for display headings like RESEARCH / OTHER WORKS, `"Inter"` for body/nav/labels
- **Nav:** name (Alfie Wingfield) flush left, links (Research · Other Works · About) flush right — thin bottom border separating from content
- **Image placeholders:** `bg-neutral-100` grey boxes with fixed aspect ratios, no text inside

## Component Architecture

### Shared
- `Nav` — sticky top bar, name left, links right, 1px bottom border
- `PageHeading` — large display heading (Bebas Neue, ~120px), left-aligned, with optional superscript count
- `Divider` — `<hr>` thin 1px black line
- `TableRow` — three-column row: title left, detail/tags center, year right; `hover:bg-neutral-50`; separated by `Divider`
- `ImagePlaceholder` — grey box with aspect ratio prop

### About Page (`/`)
Top section (two-column):
- Left: `ImagePlaceholder` (square ~200px)
- Right: "Alfie Wingfield" as large heading, 2–3 lines of body text below (bio placeholder)

Then full-width sections each preceded by a section label + `Divider`:
- **Research Focus** — short paragraph placeholder
- **News + Updates** — `TableRow` list (title | venue | date)
- **Publications** — `TableRow` list (title | journal | year)
- **Presentations** — `TableRow` list (title | conference | year)
- **Posters** — `TableRow` list (title | event | year)

### Research Page (`/research`)
- `PageHeading` "RESEARCH"
- `Divider`
- 2-column CSS grid of project cards: `ImagePlaceholder` (16:9) + project title below in bold, thin divider between rows
- Section label "PREVIOUS PROJECTS"
- `Divider`
- Same 2-column grid, smaller cards

### Other Works Page (`/other-works`)
- `PageHeading` "OTHER WORKS"
- List of entries separated by `Divider`:
  - Each entry: two columns — left: project title (bold) + 2–3 lines of description text; right: `ImagePlaceholder` (4:3)

## Typography Tokens (theme.css)
- `--font-display: "Bebas Neue", sans-serif`
- `--font-body: "Inter", sans-serif`
- Fonts imported in `fonts.css` from Google Fonts

## Routing
Use React Router (`react-router-dom`) — already available in the environment. Wrap app in `<BrowserRouter>`, define `<Routes>` in `App.tsx`.

## Files to Create / Modify
- `src/styles/fonts.css` — Google Fonts imports
- `src/styles/theme.css` — update tokens, keep existing contract
- `src/app/App.tsx` — Router + Nav + page components (all in one file to start, or split into `src/app/pages/` if it gets large)

## Placeholder Content
Use realistic placeholder text matching the domain:
- Publication titles like "Scalable biosynthesis pathways in engineered organisms"
- Research projects like "Project: Carbon-neutral fermentation"
- Other Works like "ABC: Design intervention for lab environments"

## Verification
- All 3 routes render without errors
- Nav links navigate correctly between pages
- Thin divider lines match DashDigital reference
- Display headings use Bebas Neue bold uppercase
- Image placeholders render as grey boxes with correct aspect ratios
- TableRow columns align across all list sections
- Responsive: nav collapses gracefully at mobile width
