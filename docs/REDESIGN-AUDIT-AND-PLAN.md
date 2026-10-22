# Ganrich Advisory: audit and implementation plan (22 October 2026)

Backup: the untouched export is on the `backup/original` branch of `ahmedfurkangul/ganrich-advisory`, with a copy of the original ZIP at `/mnt/project-files/backups/`. All work happens on the `redesign/positioning-and-ux` branch. Nothing is deployed.

## 1. Audit summary

### What already works
- The architecture is sound: Vinext/Vite on Cloudflare Workers, App Router routes per language, bilingual route map, metadata, hreflang, sitemap, RSS, structured data, 404/500 handling, privacy centre and a governed PDF-report pipeline (D1 + R2).
- The six practice notes are good. They are dated, attributed, and sourced where they make factual claims, and the Türkiye–Gulf corridor note cites official sources.
- The visual language (warm paper, forest, bronze, serif display type, fine rules) is distinctive and worth keeping.
- 17 automated tests pass on the original build.

### What holds the site back
| Area | Finding |
|---|---|
| Positioning | "Clarity for consequential decisions" plus six equal capabilities across four macro-regions makes it hard to tell who Ganrich is for. Words like clarity, complexity, transformation and consequential repeat on almost every page. |
| Homepage | Nine sections and three abstract process strips (Signal → Choice, Evidence → Value, Frame → Mobilize). No audience, no engagement format, no founder, and no sample of the work. |
| Services | Six accordion rows. The "Explore this expertise" link goes back to the same page anchor. Visitors can't see scope, deliverables, client involvement, or poor-fit situations. |
| Credibility | Founder facts appear only on About, which uses a monogram and no photo. No explanation of who leads the work or how the relationship runs. |
| Markets | The public page shows internal planning text ("Content architecture", "Country and subregion tags · Dated sources…") and a note promising future verification. Four regions get one sentence each. |
| Insights | The articles are strong, but the hub reads like a feature list ("Executive reading modes"), and articles end in a generic per-region tab panel that says nothing specific. |
| Decision Lab | Decision Framer, Board Brief Builder, AI Value Lens and Market Compass write free-text business information into the URL (`?a0=…`, `?decision=…`, `?useCase=…`, `?m0=…`). The contact handoff also passes decision text in the URL. There are no worked examples, time estimates or output previews, and scoring formulas are not shown. |
| Contact | Seven required fields (organisation, region, interest and others) before anyone can say hello. Nothing explains who replies or what the first conversation covers. |
| Visual | The hero headline breaks "consequential" mid-word. Arrows (↗) appear on internal links, plus signs (+) on accordions, and ✓/− mixed elsewhere. Contrast of small 11px captions is low. |
| Code | `intelligence.tsx` contains dead copies of `BriefingTray`, `HeaderExplore` and `HomeIntelligenceModules`. Page components are concentrated in one 43KB `site.tsx`. |

## 2. Positioning (working version, to be confirmed)

**Statement.** Ganrich Advisory is a founder-led strategy advisory for owners and leadership teams of established companies in Türkiye who face a decision that will shape the next stage of the business: where to grow beyond Türkiye, how to run a company that has outgrown its founding structure, and where AI is worth the investment.

**Primary client.** The owner, CEO, or board of an established, owner-led or family-controlled Turkish company or group. The company is past start-up, commercially serious, and facing a decision that is too important to leave to habit, but does not need a large consulting team.

**Three trigger situations.**
1. *Expanding beyond Türkiye.* A Gulf (or other) market looks attractive, and the business must choose where, through which model (distributor, partner, own entity), and how much to commit before the evidence is in.
2. *Outgrowing the founding structure.* Decisions still route through the founder or family, and the next stage needs clear decision rights, governance and a working centre.
3. *Deciding where AI pays off.* Leadership is under pressure to "do AI" and needs to know which operating decisions and workflows would actually improve, and what must be true first.

**Approach (what is different).** The founder leads every engagement personally. The work is organised around one named decision, not a methodology. Research and AI tools widen and speed up the evidence work, while judgment, trade-offs and the recommendation stay with an accountable person. Every engagement ends in a document a board can act on.

**Messaging hierarchy.**
1. Who we help and with which decision (home hero, meta descriptions)
2. What an engagement involves and produces (Expertise → three engagement pages)
3. Why trust the thinking (founder evidence, sample deliverables, insights)
4. How to start (contact, with a low-friction form)

The three hypotheses from the brief are used as *situations we address*, not as claimed industry or regional track records.

## 3. Information architecture

Primary navigation: **Expertise · How we work · Insights · Decision Lab · About**, plus a persistent **Contact** button.

- `Markets` stays live (same URL) but becomes a focused *Türkiye → Gulf* corridor page with dated, sourced observations. It moves out of the primary nav into Expertise, the footer and the related links.
- "Selected work" is not used as a label because no approved client case material exists. **How we work** carries the working model and clearly labelled illustrative deliverables instead.

New routes (EN / TR):
- `/expertise/market-entry-decision-sprint` · `/uzmanlik/pazara-giris-karar-sprinti`
- `/expertise/operating-model-review` · `/uzmanlik/isletim-modeli-incelemesi`
- `/expertise/ai-value-diagnostic` · `/uzmanlik/yapay-zeka-deger-teshisi`
- `/how-we-work` · `/calisma-bicimimiz`

## 4. Implementation plan
1. Content model: a new `app/practice-content.ts` holds the engagement and situation content in both languages, and `routeMap` is extended.
2. Page modules: a new `app/practice.tsx` holds the Home, Expertise, engagement detail, How we work, Markets and About pages. They render on the server and are passed into the client layout as children. `site.tsx` keeps the layout, Insights, Contact and the router. Light shared data (engagement names, founder contact, first-conversation steps) is in `app/practice-core.ts`, and shared UI in `app/practice-ui.tsx`, to keep the client bundle within budget.
3. Decision Lab: no free text in URLs. Drafts are kept only if the visitor opts in, with a visible delete control. Contact handoff goes through `sessionStorage`. Each tool gets a worked example (fictional and labelled), a time estimate, progress, an explained scoring formula, print styles and a next step.
4. Contact: the required fields become name, email and a short description. Everything else is optional and progressively disclosed. The API is relaxed to match, with the database schema unchanged.
5. Visual system: an additive stylesheet with fluid type, balanced headline wrapping, a 44px minimum touch size, higher-contrast captions, consistent + (expand) and → (navigate, internal) / ↗ (external) symbols, and print styles.
6. Verification: build, update the tests to the new copy and new privacy guarantees, then check the main routes in both languages at 375/768/1024/1440 for overflow, keyboard focus and metadata.
