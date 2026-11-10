# Phase 3 — Design system, Threshold language, and social cards

Status: implemented as a private review candidate. Production is unchanged.

## 1. Change inventory

| Page / element | Previous state | Implemented state | Rationale |
|---|---|---|---|
| Global tokens | A short implicit palette and two font aliases | Named colour, typography, spacing, duration, and easing tokens with compatibility aliases | Makes the existing system deliberate and maintainable without visually resetting it |
| Body and secondary text | `#918a80` stone and `#987d66` bronze appeared at small sizes on warm paper | Text colours moved to AA-capable `#6f6a62` and `#765f4d`; original bronze remains a decorative-only token | Corrects small-text contrast while preserving the established palette |
| Dark editorial surfaces | One bronze token served light and dark contexts | Dark surfaces scope the accent to `#c8ad94` | Keeps the accent legible on forest and ink backgrounds |
| Homepage hero | Animated multi-node network | One architectural Threshold: two arcs, a gate, an axis, and four points | Reduces visual noise and turns the selected logo idea into a repeatable brand language |
| Interior page heroes | Typography only | A quiet, low-opacity Threshold glyph | Extends the graphic language without increasing content density |
| Motion | Mixed hard-coded timings | Fast 160 ms, standard 240 ms, slow 300 ms, one standard easing curve; reduced-motion override retained | Motion remains functional and subdued |
| Social sharing | One generic card for every page; legacy image showed the old name | 38 EN/TR page-specific 1200 × 630 cards, including six bilingual articles | Each shared page now communicates its own subject and the current Ganrich Advisory brand |
| Social metadata | Every route referenced `/og.png` | Metadata selects the matching language, page, or article card | Prevents generic or mismatched link previews |
| Dark mode | Not present | Intentionally not added | The warm-paper editorial identity is stronger and more coherent as the launch default |

## 2. Final design copy — EN / TR

| Use | English | Türkçe |
|---|---|---|
| Home social headline | Clarity for consequential decisions. | Kritik kararlar için netlik. |
| Decision spine | Signal · Interpretation · Choice · Action | Sinyal · Yorum · Tercih · Uygulama |
| Expertise | The decision comes first. | Önce karar gelir. |
| Markets | Context changes the answer. | Bağlam, yanıtı değiştirir. |
| Insights | Ideas made for use. | Kullanılmak için geliştirilen fikirler. |
| Decision Lab | Work on the decision. | Karar üzerinde çalışın. |
| Contact | Share the context. We will come prepared. | Bağlamı paylaşın. Biz hazırlıklı gelelim. |
| Trust | Trust should be designed into the experience. | Güven, deneyimin içine tasarlanmalıdır. |

Article-card titles use the approved article titles already published in the Phase 2 content source.

## 3. Design tokens

### Colour

| Token | Value | Role |
|---|---:|---|
| `--color-paper` | `#f3f0e9` | Primary warm-paper background |
| `--color-surface` | `#fbfaf7` | Elevated editorial surface |
| `--color-ink` | `#121513` | Primary text and dark canvas |
| `--color-forest` | `#21302a` | Brand field, emphasis, and controls |
| `--color-body` | `#3f4643` | Long-form and secondary body text |
| `--color-muted` | `#6f6a62` | Small secondary text on paper |
| `--color-rule` | `#d8d1c5` | Dividers and quiet structure |
| `--color-accent` | `#765f4d` | Small accent text on paper |
| `--color-accent-decorative` | `#987d66` | Motif lines and non-text decoration |
| `--color-accent-on-dark` | `#c8ad94` | Small accent text on forest or ink |

### WCAG contrast verification

| Foreground / background | Ratio | Result |
|---|---:|---|
| Ink / paper | 16.15:1 | AAA |
| Forest / paper | 12.13:1 | AAA |
| Body / paper | 8.51:1 | AAA |
| Muted / paper | 4.71:1 | AA |
| Accent / paper | 5.25:1 | AA |
| Accent-on-dark / forest | 6.48:1 | AA |
| Accent-on-dark / ink | 8.63:1 | AAA |

Ratios were calculated using WCAG relative luminance. Decorative bronze is not assigned to essential small text on light surfaces.

### Typography

Selected launch pairing:

- Display: Iowan Old Style, then Palatino and Georgia fallbacks.
- Text and interface: Inter, then Helvetica Neue and Arial fallbacks.
- Reason: editorial authority with no external font request, zero layout shift, and strong performance.

Alternative after an owner licensing/hosting decision:

- Display: Newsreader.
- Text and interface: Manrope.
- This alternative is not loaded in the review build.

The fluid type tokens run from caption to hero display. Existing component sizes remain where they carry intentional editorial hierarchy; tokens now provide the shared baseline for future components.

### Spacing and motion

- Spacing tokens: 4, 8, 12, 16, 24, 32, 48, 64, and 96 px.
- Motion tokens: 160 ms fast, 240 ms standard, 300 ms slow.
- Easing: `cubic-bezier(.2,.7,.2,1)`.
- The Threshold reacts by no more than 12 px to pointer position.
- `prefers-reduced-motion: reduce` removes the reaction and collapses animation/transition durations.

## 4. Component and asset specification

### `ThresholdField`

- CSS-rendered; no client-side drawing library.
- Elements: outer learning arc, inner evidence arc, central gate, vertical decision axis, four bronze points.
- Used once as the homepage signature visual.
- Marked `aria-hidden` because it is decorative.

### `ThresholdGlyph`

- A reduced form used in interior page heroes.
- Low opacity and absolutely positioned so it never changes reading order or content geometry.

### Social-card system

- Source master: `public/og/ganrich-advisory-master.png`.
- Reproducible generator: `scripts/generate-og-cards.mjs`.
- Command: `npm run og:generate`.
- Output: 38 cards at 1200 × 630 under `public/og/en` and `public/og/tr`.
- Page metadata selects cards by page kind; article metadata selects cards by article slug.
- The Threshold motif is isolated from the generated master and composed into each deterministic derivative.

## 5. Open owner decisions

1. Approve the system-font launch pairing, or fund/self-host a licensed editorial font before production.
2. Confirm whether the article publication date of 24 July 2026 should remain the launch date.
3. Confirm that dark mode should remain out of scope; the recommendation is to keep the paper-led single theme.
4. Approve the private Phase 3 review version before production deployment.

