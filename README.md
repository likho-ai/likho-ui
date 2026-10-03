# @likho-ai/ui

The Likho design system: colour tokens for light and dark, and the React components every
Likho web app shares.

## Use in an app (Tailwind CSS v4)

Every version tag has a GitHub release with the built package attached:

```json
"@likho-ai/ui": "https://github.com/likho-ai/likho-ui/releases/download/v0.1.0/likho-ai-ui-0.1.0.tgz"
```

```css
/* app.css */
@import "tailwindcss";
@import "@likho-ai/ui/tokens.css";
@source "../node_modules/@likho-ai/ui/dist";
```

```tsx
import { Button, Mascot, Meter, StatusChip, Tag } from '@likho-ai/ui';

<Button variant="primary">Upload call</Button>
<StatusChip status="transcribing" />
<Meter label="Hindi" value={0.91} />
<Mascot pose="listening" />
```

Dark mode: put `class="dark"` on `<html>`. Components never mention a theme; every token has a
dark value.

## What is in it

| Piece | Notes |
| --- | --- |
| `tokens.css` | Page, surface, text, accent, status and brand colours as CSS variables (`--likho-*`), mapped to Tailwind names (`bg-surface`, `text-ink-2`, `border-line`, `rounded-card`, `font-deva` …). The palette follows goask.me in both modes |
| `Button` | `variant`: `primary` (violet-to-indigo), `secondary`, `ghost`; `size`: `md`, `sm`, `icon`; `asChild` gives a link the same look. Always at least 44 px tall |
| `StatusChip` | `new`, `queued`, `transcribing`, `done`, `failed`: a dot and a word, never colour alone |
| `Tag` | A small neutral label |
| `Meter` | One value from 0 to 1 with its label (language probability, progress); exposed as `role="meter"` |
| `Logo`, `LogoMark`, `Mascot` | The mark, the wordmark and the mascot in three poses (`idle`, `listening`, `done`) |
| `assets/` | The same artwork as SVG files |

Fonts are loaded by the app: DM Sans (interface and Hinglish), Noto Sans Devanagari (the
script layer, class `font-deva`), JetBrains Mono (timestamps).

## Work on it

```bash
pnpm install
pnpm test          # 51 tests: behaviour of each component, and colour contrast of the tokens
pnpm typecheck && pnpm lint
pnpm build         # dist/index.js, dist/index.d.ts, dist/tokens.css
pnpm preview       # a page showing every component in both themes
```

The token tests fail when a text colour drops below 4.5:1 against its background (3:1 for the
large headline) in either theme, so a palette change cannot silently make text unreadable.

## Next components (as the screens need them)

Card, Input, Select, Dialog, Table, Tabs, Toast, Dropzone, WaveformPlayer, SegmentLine,
NavBar. They follow shadcn/ui conventions (Radix primitives, `cva` variants, `cn`).
