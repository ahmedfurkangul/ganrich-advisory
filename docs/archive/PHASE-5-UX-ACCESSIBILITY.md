# Phase 5 — UI, accessibility, and performance

Status: implemented as a private review candidate. Production is unchanged.

## 1. Change inventory

| Page / element | Previous state | Implemented state | Rationale |
|---|---|---|---|
| Marketing-page JavaScript | Homepage loaded Decision Lab, long-form intelligence, trust-center, and PDF-workspace implementations | Route-specific workspaces are lazy-loaded; homepage uses small shell components for exploration, saved briefings, privacy control, and published-report cards | Keeps the editorial experience light while preserving the deeper tools |
| Performance budget | No regression guard for marketing JavaScript | Automated build test caps compressed JavaScript referenced by `/en` at 150 KiB | Turns the Phase 5 target into an enforceable release condition |
| Expertise accordions | Native disclosure controls without an explicit state relationship | Native `<details>` retains keyboard behaviour and now exposes `aria-expanded` and `aria-controls` | Makes open/closed state and controlled content explicit to assistive technology |
| Homepage regional selector | Click-selectable visual tabs | Complete tablist, tab, and tabpanel relationships with roving focus and Arrow, Home, and End key support | Meets the expected keyboard interaction model for tabs |
| Article regional lens | Click-selectable visual tabs | Same complete keyboard and ARIA tab pattern as the homepage | Establishes one predictable regional-selector behaviour |
| Command palette | Opened by button or ⌘/Ctrl+K; Escape closed without restoring focus | Trigger exposes state and target; open focuses search; Escape, close, and backdrop return focus to the trigger | Preserves the user’s position before and after the modal |
| Briefing Tray | Drawer lacked dialog semantics and focus restoration | Labelled modal dialog; open focuses close control; Escape and dismissal restore trigger focus | Makes the saved-workspace surface operable without a pointer |
| Cookie preferences | Labelled dialog without Escape handling or focus restoration | Open captures the invoker; close and Escape restore it; first dialog control receives focus | Brings the consent surface in line with the other modal interactions |
| Mobile controls | Several quiet editorial controls were below the 44 px target | Buttons, form controls, nav links, tabs, disclosure summaries, and modal close controls receive a 44 px minimum target | Improves touch accuracy without adding visual density |
| Long headings and anchored sections | Long bilingual headings could wrap awkwardly; sticky navigation could cover anchors | Safe heading wrapping and sticky-header scroll offsets | Protects Turkish and English layouts at narrow widths |
| Overlay behaviour | Long modals could propagate scroll into the page | Modal backdrops contain overscroll | Keeps mobile overlay behaviour stable |

## 2. Final copy — EN / TR

No new marketing claims or substantive editorial copy were introduced. The only new user-facing state is the route-loading fallback.

| Use | English | Türkçe |
|---|---|---|
| Route loading | Preparing the workspace… | Çalışma alanı hazırlanıyor… |

Existing labels, claims, disclaimers, navigation, and CTAs remain unchanged.

## 3. Component specifications

### Route-level delivery

- The homepage statically loads the brand experience plus small interaction shells.
- Decision Lab tools, long-form intelligence pages, private briefing, trust pages, and the PDF workspace are separate route-level chunks.
- Published PDF cards use a small fetch-only component; the reader and governance studio are not loaded on the Insights index.
- Lazy routes remain server-rendered. The rendered-route test verifies representative EN/TR tools and articles.

### Measured JavaScript budget

- Build: Vinext production build.
- Route checked: `/en`.
- Method: collect unique JavaScript assets referenced in server-rendered HTML and gzip each built asset.
- Result: **150,431 bytes / 146.9 KiB compressed**.
- Budget: **153,600 bytes / 150 KiB compressed**.
- Regression protection: `tests/rendered-html.test.mjs`.

This is a build-output budget, not a field-performance claim. LCP and CLS require controlled lab and real-user measurement after an approved deployment; no unmeasured score is asserted here.

### Keyboard interaction

- Tabs: Arrow Right/Down advances, Arrow Left/Up reverses, Home selects the first tab, and End selects the last tab.
- Exactly one tab is in the sequential focus order.
- Selected tabs control a labelled, focusable tabpanel.
- Native expertise summaries remain activatable by Enter and Space.
- Command, briefing, and privacy dialogs contain keyboard focus, support Escape, and return focus deterministically.

### Mobile and motion

- Interactive targets are at least 44 px in height while the visual styling remains restrained.
- Long headings use natural wrapping and hyphenation rather than forced clipping.
- Tables in the Market Entry Compass retain horizontal overflow on narrow screens.
- Existing `prefers-reduced-motion` behaviour remains active and disables non-essential motion.
- Print styles continue to suppress navigation, inputs, overlays, and action controls for tool export.

### Accessibility scope

- Existing skip link, landmarks, semantic headings, form labels, visible focus treatment, and reduced-motion support remain intact.
- Phase 5 adds explicit disclosure, tab, and dialog relationships.
- Automated source and render tests passed. A production-domain WCAG 2.2 AA audit with screen-reader and field-performance testing remains a launch QA activity.

## 4. Open owner decisions

1. Approve the private Phase 5 review version before production deployment.
2. Choose the production performance-monitoring approach after Phase 6 analytics/privacy decisions; no analytics have been enabled.
3. Confirm the screen-reader/browser matrix for final launch QA. Recommended minimum: VoiceOver/Safari, NVDA/Chrome, keyboard-only Safari/Chrome, iOS Safari, and Android Chrome.
4. Decide whether the mobile header should retain the current compact section rail or move those links into a single menu after stakeholder usability review.
