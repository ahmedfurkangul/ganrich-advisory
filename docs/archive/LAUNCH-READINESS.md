# Ganrich Advisory — Launch Readiness

Date: 24 July 2026

Release type: private launch candidate; production unchanged

Brand decision: **Ganrich Advisory**

This release reconciles the implemented site against the master prompt. It closes the remaining safe technical gaps and turns every fact-, vendor-, legal-, or owner-dependent item into an explicit release gate. Nothing below should be read as legal advice.

## 1. Change inventory

| Page / element | Current before this release | Proposed / implemented | Rationale |
|---|---|---|---|
| Insights directory | Search field was visible but did not filter results | Functional, locale-aware EN/TR search across title, summary, type, region, and topic; filters combine with search | Removes a misleading control and makes six launch articles easier to use |
| Insights empty state | No response when a query returned nothing | Restrained bilingual no-results state with one clear reset action | Makes the interaction complete without adding visual density |
| PDF insight metadata | Dynamic report pages had no report-specific metadata | Runtime title, description, canonical, robots, Open Graph, X card, and RSS discovery | Gives governed PDF reports an indexable editorial identity |
| PDF insight structured data | Verification page had no machine-readable report record | `Report`, `Organization`, and `BreadcrumbList` graph for publicly published reports only | Separates the authoritative document from the editorial page while preserving provenance |
| Dynamic report discovery | Static sitemap could not include D1-backed reports | Dedicated runtime report sitemap; valid empty response when the database is unavailable | Lets approved reports enter discovery without breaking local or degraded environments |
| Dynamic report syndication | RSS contained only the six core articles | EN/TR feeds also include publicly published, non-private PDF insights and degrade safely when D1 is unavailable | Keeps approved research discoverable through the existing Ganrich Brief feed |
| PDF access policy | Published-state access did not distinguish public, gated, briefing, and private models | Fully ungated PDFs retain the reader; gated models route to a briefing; private records require editor access and remain out of discovery | Makes the editorial access choice enforceable rather than decorative |
| Baseline response policy | Browser security policy relied on platform defaults | `nosniff`, strict-origin referrer policy, restricted camera/microphone/geolocation/payment; API routes marked noindex | Adds low-risk protection without imposing a brittle content-security policy |
| Footer stylesheet | Removed newsletter still had dead CSS | Newsletter-only CSS removed | Keeps the shipped system aligned with the visible product |
| System documentation | Still described newsletter and Ask Ganrich as live conversion paths | Live and future-gated paths now clearly separated | Prevents the implementation record from overstating capability |
| Release governance | Open items were distributed across phase documents | One owner-facing gate register below | Makes the production decision auditable |
| Release execution | Technical and human checks were documented but not consolidated | Repeatable technical preflight plus an unsigned owner/legal/accessibility/operations sign-off record | Prevents a passing build from being mistaken for authority to deploy |

## 2. Final bilingual copy added in this release

| Element | English | Türkçe |
|---|---|---|
| Search label | Search | Ara |
| Search placeholder | Search insights | İçgörülerde ara |
| Empty-state eyebrow | No matches | Eşleşme yok |
| Empty-state headline | No perspective matches this search. | Bu aramayla eşleşen bir perspektif yok. |
| Reset action | Clear search → | Aramayı temizleyin → |
| Missing-report metadata | Report unavailable | Rapor kullanılamıyor |

The wording is operational rather than promotional. No new claim, statistic, credential, client, or outcome is introduced.

## 3. Master-prompt reconciliation

### Implemented

| Requirement | Status | Evidence |
|---|---|---|
| One brand name | Complete | `Ganrich Advisory` across public copy, metadata, schema, logo use, domain, and copyright |
| Placeholder removal | Complete | No prospect-facing publication, author, prototype, email, or LinkedIn placeholders |
| Six launch articles | Complete | Six distinct EN articles and six native-quality TR counterparts with dates, authorship, applicability, frameworks, board questions, and tool handoffs |
| Distinct insight links | Complete | Each article card routes to its own localized page |
| Decision-first architecture | Complete | Four entry decisions and the decision spine remain primary |
| AI + human judgement stance | Complete | Applied-AI copy remains bounded; tools declare preliminary scope |
| Founder layer | Complete within verified evidence | Ahmed Furkan Gul profile, role, sourced career/academic context, LinkedIn and academic profile |
| Decision Lab v2 | Complete for approved scope | Five live tools, URL state, print/PDF workflow, contextual handoff, EN/TR, command palette, and consent-aware briefing |
| Regional content | Complete | Four distinct regional views in both languages |
| Compliance architecture | Complete for current-site facts | Privacy Center, preferences, privacy/KVKK, cookies, rights, AI transparency, terms/vendor/update notices |
| Accessibility and mobile system | Automated gate complete | Keyboard semantics, focus, 44px targets, reduced motion, responsive reflow, semantic source code |
| Performance budget | Automated gate complete | Marketing-page JavaScript tested at or below 150 KiB gzip |
| Technical SEO | Complete for static and governed report routes | Canonicals, hreflang for verified pairs, sitemap, report sitemap, RSS, schema, OG cards, robots, 404/500 |
| Analytics architecture | Ready but off | Consent-gated, allow-listed, cookieless adapter remains disabled |

### Intentionally withheld because evidence is missing

| Requirement | Status | What is required |
|---|---|---|
| Client proof vignettes | **Blocking evidence gap** | Four to six owner-approved engagements with factual situation, decision, work performed, measurable result, confidentiality treatment, and permission |
| Additional team members | **Blocking evidence gap** | Verified names, roles, biographies, profile destinations, consent, and portrait rights |
| Founder photography | Optional evidence gap | Owner-supplied professional image plus confirmed web usage rights; current monogram treatment remains valid |
| Legal entity details | **Launch gate** | Registered legal name, registered address, registration/tax identifiers where publication is required, governing law, and counsel approval |
| Telephone and response-time commitment | Owner decision | Verified number and an operationally supportable service commitment |
| Formal data-rights channel | **Launch gate** | Controller identity and secure KVKK/GDPR application channel approved by counsel |

### Vendor- or legal-decision gates

| Capability | Current state | Required before activation |
|---|---|---|
| The Ganrich Brief newsletter | Removed from public UI | ESP, DPA, sender identity/domain, double opt-in, EN/TR confirmation and withdrawal copy, consent-record model, retention rule, IYS/KVKK/GDPR review |
| Ask Ganrich | Removed from public UI | Approved source corpus, retrieval provider, privacy/security assessment, support/refusal rules, human-review standard, retention rule, monitoring |
| Analytics transmission | Disabled | Provider and endpoint, lawful-basis/consent decision, data map, retention, DPA, owner-approved event set, production verification |
| Scheduling | Not connected | Provider, availability owner, privacy review, localized acknowledgement |
| CRM/email notifications | Adapter boundary only | Provider credentials, field mapping, access roles, retention, failure/retry ownership |
| Search-console verification | Not configured in code | Google/Bing ownership tokens and owner approval |

## 4. Component and operational specifications

### Insights search

- Client-side and immediate; no query is transmitted.
- Uses Turkish-aware or British-English-aware case normalization.
- Search and topic filter intersect.
- Reset returns to all topics and an empty query.
- The status message is announced through `role="status"`.

### Governed PDF reports

- Only records with `status = published` and a non-private access model are indexable and exposed in the report sitemap.
- Unpublished preview metadata is `noindex`, `nofollow`, and `noarchive`.
- A language alternate is not invented because the data model does not yet contain a verified translation-pair relationship.
- The PDF remains the authoritative source; the page remains the editorial experience; the embedded reader remains the verification layer.
- The embedded document endpoint is public only for fully ungated records. Gated records show the approved web analysis and a request path; private records require an authenticated editor.
- Report schema is emitted only on published pages.

### Response policy

- Baseline headers apply across the application.
- API routes explicitly opt out of search indexing.
- HSTS and a restrictive Content Security Policy are not set in application code in this release; both require production-host and third-party-resource validation.

### Release validation

The automated gate covers:

1. build and type correctness;
2. lint;
3. bilingual rendered content and metadata;
4. route inventory and principal internal-link membership;
5. sitemap, report sitemap, feeds, robots, and true 404;
6. structured data and social assets;
7. privacy and inquiry boundaries;
8. Decision Lab state/export/handoff behavior;
9. security/indexing headers;
10. marketing JavaScript budget.

## 5. Owner decisions required before production approval

1. **[Verified need; owner input missing] Legal identity:** provide the registered entity name, address, registration details, governing law, and counsel-approved public wording.
2. **[Verified need; owner input missing] Data rights:** approve a formal secure application channel and controller wording.
3. **[Verified need; owner input missing] Proof:** decide whether to provide factual anonymized engagement vignettes or launch without a proof section.
4. **[High confidence] Newsletter:** keep absent for launch, or select an ESP and complete the consent work above.
5. **[High confidence] Analytics:** keep disabled for launch, or approve a provider and complete privacy review.
6. **[Owner decision] Direct contact:** confirm whether `furkangul@gmail.com` should remain the public contact or be replaced by a domain mailbox.
7. **[Owner decision] Production:** explicitly approve deployment of the reviewed Sites version after the final manual checks below.

## 6. Final manual release checks

These require a human or production environment and are not represented as automated proof:

- review EN/TR copy and every legal notice with the owner and qualified counsel;
- submit real contact and briefing inquiries, verify authorized access, retention, notification, and deletion;
- complete VoiceOver/NVDA keyboard and screen-reader passes;
- test current Safari, Chrome, Firefox, and Edge at mobile and desktop widths;
- verify every PDF’s rights, source notes, page controls, download, and published status;
- validate DNS, TLS, apex/`www` redirects, canonical host, and the production custom domain;
- run production Lighthouse/WebPageTest and confirm LCP/CLS from real traffic conditions;
- submit both sitemaps after ownership verification;
- back up D1/R2 and document recovery ownership.

## 7. Release recommendation

The implementation is suitable for a **private launch-candidate review**. It should not be represented as fully launch-cleared until the legal identity and data-rights gates are resolved, owner-selected vendor capabilities remain off or are approved, and the manual release checks are signed off.
