# Phase 4 — Decision Lab v2

Status: implemented as a private review candidate. Production is unchanged.

## 1. Change inventory

| Page / element | Previous state | Implemented state | Rationale |
|---|---|---|---|
| Decision Lab | Three live tools and a marketing-page roadmap accordion | Five live tools and a restrained link to a dedicated changelog | Makes live capability clear and moves future promises into a governed record |
| Decision Atlas | Read only the `decision` deep link; no export or contextual contact handoff | Validated decision, region, urgency, and maturity URL state; print export; saved pathway; prefilled contact handoff | Makes a pathway shareable and actionable |
| Decision Framer | Consent-aware local draft and print action | Validated inputs, full URL state, local draft, print/email, Board Brief handoff, and contextual contact handoff | Preserves work across devices/links and connects framing to the next decision artefact |
| Market Entry Compass | Editable assumptions and directional comparison | Validated market names and non-zero weights, full URL state, print export, scope note, and contextual contact handoff | Prevents invalid calculations and makes assumptions portable |
| Board Brief Builder | Roadmap item | Live bilingual one-page decision-memo builder | Highest-value bridge from exploration to a board-quality discussion |
| AI Value Lens | Roadmap item | Live bilingual value/readiness assessment | Focuses AI discussion on operating value, evidence, adoption, and accountable risk control |
| Briefing Tray | Consent-aware local save and print | Added “email this to me” mailto handoff containing saved links and working note | Makes the existing local briefing usable without transmitting data to Ganrich |
| Command palette | Tools, insights, and one regional page | All main pages, six expertise areas, five tools, six articles, markets, contact, about, and trust | Makes ⌘K a genuine site-wide index |
| Contact form | Blank form for every entry path | Accepts a tool, decision, context, and validated expertise field from Decision Lab links | Keeps the conversation contextual without hidden profiling |
| Social metadata | Phase 3 page cards | Six additional EN/TR cards for the two tools and changelog | Maintains page-specific sharing parity |

## 2. Final copy — EN / TR

| Use | English | Türkçe |
|---|---|---|
| Board Brief Builder hero | Make the decision visible on one page. | Kararı tek sayfada görünür kılın. |
| Board writing principle | Write for the decision, not the archive. | Arşiv için değil, karar için yazın. |
| AI Value Lens hero | Begin with value. Test readiness. Keep judgment accountable. | Değerle başlayın. Hazırlığı sınayın. Muhakemeyi sorumlu tutun. |
| High-direction result | Prioritize a controlled test. | Kontrollü testi önceliklendirin. |
| Middle-direction result | Validate the value case. | Değer vakasını doğrulayın. |
| Low-direction result | Strengthen the foundations. | Temelleri güçlendirin. |
| Contextual CTA | Discuss this decision. | Bu kararı görüşün. |
| Shared scope | This tool structures user-entered information for preliminary exploration. It does not provide a Ganrich recommendation, verify the evidence, or replace professional, legal, investment, or accountable executive judgment. | Bu araç, kullanıcı tarafından girilen bilgileri ön keşif amacıyla yapılandırır. Ganrich önerisi sunmaz, kanıtı doğrulamaz; profesyonel, hukuki, yatırım veya sorumlu yönetici muhakemesinin yerine geçmez. |

## 3. Component specifications

### URL state

- Decision Atlas: `decision`, `region`, `urgency`, `maturity`.
- Decision Framer: `a0`–`a9`, with 700-character bounds.
- Market Entry Compass: `m0`, `m1`, `s0`, `s1`, `w`.
- Board Brief Builder: named memo fields, each bounded to 1,200 characters.
- AI Value Lens: `useCase`, `scores`.
- URLs contain only user-entered or selected state. The interfaces warn against confidential input.

### Export

- All five tools expose the browser’s print flow, allowing native “Save as PDF”.
- Print CSS removes navigation, inputs, command overlays, and action controls.
- Decision Framer, Board Brief Builder, and the Briefing Tray also provide explicit email-to-self links.

### Board Brief Builder

- Eight fields: decision, recommendation, why now, alternatives, evidence and uncertainty, risks and controls, action, owner and timing.
- Four required fields: decision, recommendation, evidence, and action.
- Output is structured as a one-page memorandum and remains explicitly preliminary.

### AI Value Lens

- Five user-scored dimensions: decision value, repeatability, data readiness, adoption readiness, and risk controllability.
- Transparent directional weighting: 30 / 20 / 20 / 15 / 15.
- Output bands organize the next discussion; they do not claim a validated business case.
- Every result states the next evidence to build before scale.

### Lead handoff

- Each result creates a contact URL containing the tool name, decision, and concise context.
- The contact form validates any expertise preselection against the published expertise list.
- No contact details are stored until the visitor submits the existing privacy-acknowledged form.

### Changelog

- Records the five live tools and their current capability.
- Keeps Scenario Studio, Transformation Pulse, Operating Model Lens, and Portfolio Prioritizer under evaluation.
- No release dates or capabilities are promised for roadmap items.

## 4. Open owner decisions

1. Confirm whether “Board Brief Builder” should remain the public product name or use “Board Memo Builder”.
2. Confirm whether the AI Value Lens weighting should remain transparent and fixed, or become owner-editable in a later version.
3. Decide whether emailed briefing content should remain a device-generated mailto action or move to a consented server-side email service.
4. Approve the private Phase 4 review version before production deployment.

