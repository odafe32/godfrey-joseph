# Conventions — web/ frontend

React 19 + TypeScript + Vite + Tailwind CSS 3 + Framer Motion + react-router-dom.

## Shared components — always prefer these over hand-rolled markup

- **`PillButton`** (`src/components/PillButton.tsx`) — the only CTA/link button style.
  - `variant="gold"` — primary action (gold gradient, white text)
  - `variant="solid"` — paper pill, dark text (on dark surfaces)
  - `variant="outline"` — white outline (on dark surfaces)
  - `variant="outlineInk"` — dark outline (on light surfaces)
  - `arrow` adds the rotating circular chip; `size="sm"` for compact card CTAs.
  - `/`-prefixed `href` renders a router `Link`; `http` links auto-open in a new tab.
- **`SectionHeader`** (`src/components/SectionHeader.tsx`) — the eyebrow chip +
  display `h2` + gold underline bar at the top of every section.
  Props: `eyebrow`, `title`, `description?`, `align?` (`center` default).

## Typography

- `font-display` = Barlow Condensed — headings (`h1`/`h2` auto via base CSS) and buttons.
- `font-sans` = Montserrat — body copy.

## Color tokens

Blue `#3d5a8c` / navy `#1e2f4d` headings & links · gold `#d4a017`→`#b8860b` gradient for
buttons, underlines, icons, accents · dark gold `#9a6f00` for gold text on light bg ·
ink `#0d0d0f` / paper `#f8f5ef` · dark-mode surfaces `#0d0d0f`/`#141414`, dark-mode
blue `#8fb4e8`, dark-mode gold `#e9c766`.

## Dark mode

Every section must include `dark:` variants (dark surface `#141414`, white text,
`#8fb4e8`/`#e9c766` accents). `darkMode: "class"` via ThemeToggle.

## Routing

Routes live in `src/pages/`. Topbar links: hash ids scroll on `/`, `/path` routes use
`Link`. New sections need `id="…"` anchors; new pages need a Route in `App.tsx`.

## Verify

`npx tsc -b --force` before considering changes done.
