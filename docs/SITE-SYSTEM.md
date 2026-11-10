# Ganrich Advisory Website System

## 1. Creative concept

**The Strategic Signal** presents Ganrich as a quiet, senior advisory practice that finds meaning inside complexity. Fine lines, intersecting evidence paths, editorial typography, and generous space create the feeling of a contemporary strategy journal. The distinctive visual moment is a restrained signal field: the organization of evidence before a consequential choice.

## 2. Brand and visual direction

- Position: strategic judgment + regional fluency + applied AI + practical execution.
- Preferred tagline: “Clarity for consequential decisions.” / “Kritik kararlar için netlik.”
- Personality: measured, perceptive, discreet, cosmopolitan, and precise.
- Visual language: warm paper, deep forest, fine rules, asymmetric editorial grids, abstract evidence graphics, and no conventional consulting stock imagery.
- Voice: short decision-led headlines, specific arguments, explicit trade-offs, no promotional clichés.

## 3. Final sitemap

- `/en` and `/tr`
- Expertise / Uzmanlık
- Markets / Coğrafyalar
- Insights / İçgörüler
- One web-native insight template in both languages
- About / Hakkımızda
- Contact / İletişim
- Privacy / Gizlilik
- Legal notice / Yasal bilgilendirme
- KVKK

The content model supports future expertise-detail, regional, country, report, person, and case-study pages without launching empty sections now.

## 4. Design tokens

- Color: `--ivory`, `--white`, `--ink`, `--forest`, `--slate`, `--stone`, `--sand`, `--bronze`
- Type: `--serif`, `--sans`
- Layout: `--gutter`, `--section`; 12-column desktop compositions and recomposed 6-column/tablet or single-column/mobile layouts
- Spacing: 8-point-based values, expressed responsively with `clamp()`
- Borders: 1px; radius generally 0–4px; shadows intentionally absent

## 5. Typography and color

The serif stack uses Iowan Old Style, Palatino, and Georgia; the sans stack uses Inter and native Helvetica/Arial fallbacks. These stacks support Turkish glyphs without a render-blocking font request. Warm ivory is the default field; deep forest is reserved for judgment/AI/CTA moments; bronze is used only for signals, indices, and metadata.

## 6. Desktop and mobile architecture

Desktop uses broad asymmetry: headline fields span 7–8 columns, annotations sit in narrower columns, and editorial matrices use fine horizontal rules. Tablet shifts large modules to 6-column compositions. Mobile removes sticky reading navigation, turns hover-dependent information into native disclosure controls, stacks CTAs, and keeps target sizes at 44px or greater.

## 7. Homepage design

The homepage follows one argument: consequential decision → execution-oriented clarity → six decision capabilities → AI plus senior judgment → regional context → usable insight → representative leadership questions → calm contact invitation. The hero signal field is CSS-based, lightweight, pointer-responsive, and static under reduced-motion preferences.

## 8. Reusable page templates

- Decision-led page hero
- Expertise editorial matrix with native keyboard-accessible disclosures
- Regional perspective list with source/verification note
- Editorial publication index with working topic filters and bilingual search
- Web-native report article with thesis, findings, framework, implications, and method note
- About belief/principles and verified founder profile
- Senior-conversation contact form
- Counsel-review legal page template

## 9–10. Bilingual copy and UI system

English and Turkish copy live together in `app/content.ts` and `app/site.tsx`. Navigation, metadata, forms, validation-required labels, AI notices, confirmation messages, and deliberately incomplete legal notices are localized. The language switch maps each page to its localized route and stores the user’s explicit preference. Flags are never used. The root uses English as the x-default; no browser-language redirect is forced.

## 11. Insights and report template

The hub supports topic filters, functional bilingual search, editorial proportions, source status, and language status. Six bilingual founder-authored practice notes have distinct routes, publication dates, authorship, executive thesis, findings, accessible framework graphics, leadership implications, method/content status, and focused contact CTAs. Client evidence and performance outcomes are not asserted.

## 12. AI feature UX and technical architecture

### Ask Ganrich

The public interface has been removed until a source-backed retrieval service, approved content index, privacy assessment, and human-review standard exist.

Production API boundary:

1. Validate language, consent, input length, and abuse/rate-limit signals.
2. Retrieve only approved, published, language-aware Ganrich content.
3. Return answer segments with immutable source IDs, anchors, language, and confidence/support status.
4. Refuse when sources do not support an answer.
5. Log aggregate events only under the applicable consent state; do not retain conversation content by default.
6. Keep retrieval, generation, analytics, and CRM adapters isolated and configured through server-side environment variables.

Suggested response schema: `{ answer, implications[], sources[{id,title,url,anchor,language}], related[], supportStatus, disclaimer }`.

### Decision framing tool

The functional first version gathers a decision, market, and uncertainty, then produces a clearly preliminary brief. Production adds time horizon, intended outcome, approved related-insight retrieval, optional email delivery, consent state, and CRM context. It must never label output as a final recommendation.

## 13. Lead-generation flows

1. Start a conversation → contextual form → secure endpoint → CRM adapter → localized acknowledgement.
2. Insight → request full briefing → progressive profile (name, work email, organization, role/interest, privacy acknowledgement) → immediate asset → related insight → optional meeting.
3. Decision brief → optional self-email → related content → request a discussion.

Two additional flows remain deliberately unavailable: newsletter subscription requires an approved ESP, double opt-in, consent-record design, sender identity, and withdrawal process; Ask Ganrich requires an approved source index, privacy assessment, and human-review standard.

Every flow should pass source, campaign, topic, region, language, consent state, and referrer metadata without hard-coding a vendor.

## 14. CMS model

Content types: Global Settings, Navigation, Page, Expertise, Region, Insight, Report, Case Study, Person, Author, Downloadable Asset, Chart/Data Visualization, CTA, Form, Newsletter, Legal Page, and SEO Metadata.

Shared fields: English/Turkish title, slug, summary, body; translation status; publication status; author; reviewer; publication/last-reviewed dates; region/topic/sector tags; related expertise/insights; featured flag; localized SEO title/description; social image; source notes; asset; gate state; CTA configuration.

Workflow: **Draft → Review → Translation Review → Approved → Published → Scheduled Review**. Machine translation is never auto-published. Charts additionally require source, date, unit, definition, accessible table, and rights status. Regional content supports country and subregion taxonomies.

## 15. SEO metadata framework

Each localized route supplies a title, description, production canonical, English/Turkish hreflang, x-default, RSS discovery link, Open Graph image, X card, and locale. Organization/ProfessionalService and BreadcrumbList structured data are present across the site; verified insight pages add Article and Person records. Sitemap and robots resolve to the verified production domain, `https://ganrichadvisory.com`.

## 16. Analytics event plan

Current allow-listed events: `language_switched`, `expertise_viewed`, `region_selected`, `insight_viewed`, `decision_tool_started`, `decision_tool_completed`, `contact_started`, and `contact_submitted`. Future events for report depth, approved AI retrieval, scheduling, or newsletter must be added only when those product surfaces and their consent basis are live.

Primary measures, if an analytics provider is later approved: qualified lead conversion by source/language/region; report-to-contact conversion; returning readers; and depth of insight use. Do not collect optional analytics before consent where consent is required.

The Phase 6 implementation provides a server-side, cookieless analytics adapter that is disabled by default. It can transmit only when `NEXT_PUBLIC_ANALYTICS_MODE=cookieless`, the existing privacy record contains explicit analytics consent, and an owner-approved server endpoint is configured. It sends an allow-listed event name, pathname without query data, interface language, and event time; it does not send cookies, contact details, user-entered tool state, or client identifiers.

## 17. Accessibility and performance checklist

- Semantic headings, landmarks, native details/tab/form controls, skip link, visible focus, descriptive links
- No information communicated only through color; status updates use live regions
- 44px+ interactive targets where practical; mobile form fields and menu remain reachable
- Reduced-motion fallback; no scroll hijacking, autoplay, carousels, 3D libraries, or video
- Contrast checked against ivory/white/forest fields
- Turkish copy stress-tested in responsive CSS
- No remote font dependency; social image is the only substantial raster asset
- Core content server-rendered; interactive modules isolated to the client surface
- Every future numerical chart must include a text/table alternative

## 18–19. Implementation and deployment

The implementation uses React, TypeScript, vinext, reusable content primitives, localized metadata, dynamic bilingual routes, responsive CSS, and Cloudflare-compatible output. Copy `.env.example` to the deployment environment and keep the verified production domain. The secure inquiry endpoint is live in the application architecture; email, CRM, analytics, scheduling, newsletter, and AI adapters remain owner/vendor approval gates. Legal wording must be supplied or approved by qualified counsel.

## 20. Final QA against acceptance criteria

- Boutique strategy positioning, restrained visual system, and no software-startup tropes: implemented.
- English/Turkish parity and native Turkish editorial copy: implemented for all launched routes.
- AI role is framed as acceleration under senior judgment: implemented.
- Six expertise areas and four non-stereotyped regional views: implemented.
- Web-native insight, source status, report gating path, and AI/decision-tool concepts: implemented.
- Three or more live conversion paths: contact, private executive briefing, contextual Decision Lab handoff, and decision-brief self-email.
- No fabricated clients, credentials, testimonials, outcomes, offices, or data: verified; unavailable facts are withheld rather than exposed as prospect-facing placeholders.
- Responsive, keyboard-accessible, reduced-motion-aware interaction: implemented.
- Bilingual SEO, canonical/hreflang, sitemap, robots, structured data, and social card: implemented; production domain remains an environment setting.
- CMS, analytics, privacy, and integration architecture: specified above; external systems intentionally remain adapter boundaries until vendors and credentials are approved.
