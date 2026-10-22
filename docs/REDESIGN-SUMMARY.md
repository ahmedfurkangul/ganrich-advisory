# Ganrich Advisory redesign: summary and handoff

Branch `redesign/positioning-and-ux`, 22 October 2026. The original export is preserved on `backup/original`. Nothing has been deployed. The audit and plan are in [REDESIGN-AUDIT-AND-PLAN.md](REDESIGN-AUDIT-AND-PLAN.md); the open owner decisions are in [REVIEW-DECISIONS.md](REVIEW-DECISIONS.md).

## Positioning

**Statement.** Ganrich Advisory is a founder-led strategy advisory for owners and leadership teams of established companies in Türkiye who face a decision that will shape the next stage of the business: where to grow beyond Türkiye, how to run a company that has outgrown its founding structure, and where AI is worth the investment.

**Why this positioning.** The original site offered six equal capabilities across four macro-regions under "Clarity for consequential decisions", so a visitor could not tell who it was for or what they would buy. The founder's verifiable background (corporate strategy and business development at Tay Group, decision research, an academic post in Istanbul) and the strongest published notes (market entry, the Türkiye–Gulf corridor, family-holding operating models, AI value in industrials) all point at the same buyer: an established Turkish owner-led company at a turning point. The three situations name that buyer's problems without claiming a track record.

**Messaging order.** Who we help and with which decision → what an engagement involves and produces → why trust the thinking (founder, illustrative deliverables, signed insights) → how to start (a short contact form). AI appears as a research method on How we work and in the Decision Lab, not as the headline.

## Navigation

Expertise · How we work · Insights · Decision Lab · About, plus a Contact button that stays visible at every width.

- **Expertise** leads to the three engagement pages, so the old accordion links that looped back to the same anchor are gone. The six original capabilities remain under "Other areas", each linking to a related engagement or to contact.
- **How we work** replaces a "Selected work" item: there is no approved client material, so it shows the working model and three clearly labelled fictional deliverable excerpts.
- **Markets** keeps its URL but is now the Türkiye → Gulf corridor page. It left the primary nav and is linked from the footer, the Market Entry engagement and the search palette.
- **Decision Lab** stays in the primary nav, because it is the site's most distinctive free resource.

## What changed

| Area | Change |
|---|---|
| Home | Eight parts: hero with audience and three decisions, proof strip, three situations, three engagements, fictional memo excerpt, founder with portrait, featured briefing and a tool, next step. The old process strips and region tabs are gone. |
| Engagement pages (new, EN/TR) | Situation, decision supported, fit and poor fit, questions, process, client participation, deliverables with an illustrative exhibit, boundaries, who leads it, related reading and tools, contact action pre-selecting the topic. |
| How we work (new, EN/TR) | Working model, evidence-to-recommendation flow with AI as a research tool, three illustrative deliverables, founder, next step. |
| Markets | Internal planning text removed. Four dated observations (Sep 2023 to Oct 2025) linked to official sources, client questions, and three implications labelled as Ganrich interpretation. |
| About | Portrait, corporate experience separated from Ganrich client work, research and academic role, working model and principles. |
| Insights | Editorial stance, featured corridor briefing, topic filters with `aria-pressed`, search. Articles lost the generic region tabs and gained a related engagement and a contact action. |
| Contact | Required: name, email, short description, privacy acknowledgement. Optional: organisation, role, topic, markets. Topic pre-selects from `?topic=`. Tool summaries arrive through this tab's session storage and can be removed before sending. Success state takes focus; errors keep the text and offer direct email. |
| Decision Lab | No visitor text in URLs (the Atlas keeps only a question number). Drafts only after "Keep a draft on this device", deleted when unticked. Worked examples with fictional inputs, time estimates, who-it-helps, progress, field hints, output preview, scoring formulas and thresholds shown and labelled as working assumptions, copy summary, print, Framer → Board Brief handoff, related engagement. Changelog entry dated 22 October 2026. |
| Inquiry API | Contact needs name, email, description ≥ 20 characters and privacy acknowledgement. The private briefing form keeps its stricter rules. Schema unchanged. |
| Visual system | `app/practice.css`: new header, page sections, tables, exhibits, forms and lab components; no automatic hyphenation of headings; balanced wrapping; 44px controls; → internal, ↗ external, + expand; print styles. |
| Metadata | New titles and descriptions for every changed page, new kinds for the four new routes, regenerated social cards (62), narrowed `areaServed`, new root description. |
| Privacy notice | Cookie notice explains opt-in drafts and tab-only handoff. "Essential only" now also deletes the new draft keys. |
| Code structure | Practice pages render on the server (`app/practice.tsx`) and are passed into the client layout, which keeps the marketing JavaScript within budget. Light shared data is in `app/practice-core.ts`; shared UI in `app/practice-ui.tsx`; full engagement content in `app/practice-content.ts`. Dead duplicates removed from `app/intelligence.tsx`. |

## Verification (run on 22 October 2026)

- `npm test`: build plus 18 tests, all passing. Tests were updated to the new copy and now also assert that tool code never writes visitor text into query strings, that drafts and handoffs use the expected storage, and that the contact form requires only name, email, description and privacy acknowledgement.
- Marketing JavaScript on `/en`: about 149 KB gzip against the 150 KB budget in the tests. There is little headroom left.
- TypeScript: no new errors (the existing Cloudflare binding type errors remain). ESLint: clean on `app/`.
- Browser checks (Playwright, Chromium) at 375, 768, 1024 and 1440 px on 27 EN/TR routes: no horizontal page overflow, no runtime errors, no automatically hyphenated headings. Wide tables scroll inside their own labelled region.
- Interaction checks: AI Value Lens example and score; draft opt-in, restore after reload and deletion on opt-out; handoff to contact with topic pre-selected and URL free of text; contact submission error path keeps text; Decision Framer → Board Brief handoff; Market Compass example; Atlas URL holds only the question number.
- Keyboard: skip link first, visible focus ring on every stop, mobile menu moves focus into the menu and closes on Escape with focus returned, disclosures open with Enter.
- Release preflight: 9 of 10 checks pass; see REVIEW-DECISIONS.md for why the build-freshness check fails locally.

Not verified: D1 storage of a real inquiry, R2, the PDF studio login, email delivery to the new address, and anything in production. See REVIEW-DECISIONS.md.

## Run it locally

Requires Node.js 22.13 or later.

```bash
git clone https://github.com/ahmedfurkangul/ganrich-advisory.git
cd ganrich-advisory
git checkout redesign/positioning-and-ux
npm ci
npm run dev        # development server with simulated bindings
# or
npm run build && npm run start   # production build on http://localhost:3000
npm test           # build + rendered HTML tests
npm run release:preflight
```

Locally the contact form cannot store inquiries (there is no D1 database), so it shows its error state; this is expected.

To regenerate social cards after changing their copy in `scripts/generate-og-cards.mjs`: `node scripts/generate-og-cards.mjs`.
