# Phase 6 — SEO and technical discovery

Status: implemented as a private review candidate. Production is unchanged.

## 1. Change inventory

| Page / element | Previous state | Implemented state | Rationale |
|---|---|---|---|
| Canonicals and metadata base | Dynamic host produced correct links on production but preview and local hosts could become canonical | Every canonical, social URL, feed URL, schema identifier, robots reference, and sitemap location resolves to `https://ganrichadvisory.com` | Prevents preview hosts from entering the search index |
| HTML language | Root HTML was initially `en`; Turkish was corrected only after hydration | Request-level language is set before server rendering for `/en` and `/tr` | Gives search engines and assistive technology the correct document language immediately |
| Hreflang | EN, TR, and x-default existed in page metadata | Retained on pages and added as language alternates within the XML sitemap | Creates two consistent discovery layers |
| Sitemap | Included localized routes but fell back to localhost and lacked alternate-language records | Production-only URLs, localized alternates, article dates, category URLs, priorities, and appropriate update frequencies | Makes the sitemap safe to submit directly |
| Robots | Allowed the whole site and referenced the environment-dependent sitemap | Production sitemap and host; API and private PDF-studio routes excluded | Keeps public content discoverable without indexing operational endpoints |
| Structured data | ProfessionalService on general pages; Article on insight pages; Person on About | Organization/ProfessionalService and BreadcrumbList on localized pages; verified articles add Article and Person; About adds Person | Completes the required Organization, Article, BreadcrumbList, and Person layer |
| Insight taxonomy | Topic filters changed the current view but had no durable URLs | Five bilingual category URLs, visible taxonomy navigation, canonical metadata, hreflang, sitemap records, and category social cards | Creates clean, shareable thematic discovery paths |
| The Ganrich Brief | No RSS feed | English and Turkish RSS 2.0 feeds plus a root English feed, metadata discovery links, footer access, and six verified articles per language | Supports readers and distribution systems without adding an email vendor |
| Social cards | Page-specific cards for existing routes | Ten additional category-specific EN/TR cards | Preserves per-page social-preview parity |
| Unknown URLs | Styled “not available” content could return HTTP 200 | True HTTP 404 with noindex and bilingual house-voice recovery paths | Prevents soft-404 indexing |
| Runtime errors | No dedicated user-facing boundary | Local and global bilingual error boundaries with retry and direct recovery | Keeps failure states deliberate and useful |
| Analytics | No tracking code | Disabled-by-default cookieless server adapter, allow-listed events, pathname-only payload, and existing-consent-record gate | Provides a privacy-first implementation path without activating tracking |

No published editorial or legal content was removed.

## 2. Final copy — EN / TR

| Use | English | Türkçe |
|---|---|---|
| Applied AI category | Decision-led perspectives on AI value, evidence, operating readiness, and accountable adoption. | Yapay zekâ değeri, kanıt, kurumsal hazırlık ve sorumlu benimseme üzerine karar odaklı bakışlar. |
| Transformation category | Perspectives on moving transformation from reported activity to governed, measurable value. | Dönüşümü raporlanan faaliyetten yönetilen ve ölçülebilir değere taşıyan bakışlar. |
| Growth category | Frameworks for growth choices, commitment sequencing, capital concentration, and strategic learning. | Büyüme tercihleri, taahhüt sıralaması, sermaye yoğunlaşması ve stratejik öğrenme çerçeveleri. |
| Regional expansion category | Context-specific perspectives on cross-border growth, market entry, and regional economic corridors. | Sınır ötesi büyüme, pazara giriş ve bölgesel ekonomik koridorlara ilişkin bağlama özgü bakışlar. |
| Operating model category | Perspectives on decision rights, governance, accountability, and organizational transition. | Karar hakları, yönetişim, hesap verebilirlik ve kurumsal geçiş üzerine bakışlar. |
| RSS title | The Ganrich Brief | Ganrich Bülteni |
| 404 headline | The page is not here. | Bu sayfa burada değil. |
| Local error headline | The page could not be prepared. | Sayfa hazırlanamadı. |
| Global error headline | The experience could not be loaded. | Deneyim yüklenemedi. |

## 3. Component specifications

### Metadata and discovery

- Canonical origin: `https://ganrichadvisory.com`.
- Every localized page emits canonical, EN/TR/x-default hreflang, RSS alternate, Open Graph, and X metadata.
- Article social metadata includes publication date, modification date, and verified author URL.
- Cookie-preference utility pages remain followable but are marked noindex.
- The sitemap uses article publication dates only where a verified date exists; it does not fabricate update dates for evergreen pages.

### Structured data graph

- `Organization` + `ProfessionalService`: stable site identity, logo, founder relationship, description, and areas served.
- `BreadcrumbList`: home, optional section parent, and current page.
- `Article`: headline, thesis, publication date, language, category, author, publisher, image, and canonical page.
- `Person`: Ahmed Furkan Gul, founder role, Ganrich relationship, LinkedIn, and academic profile.
- Structured JSON escapes `<` before insertion.
- No company social profile is asserted until a company-page URL is verified.

### Taxonomy

- Categories: Applied AI, Transformation, Growth, Regional expansion, Operating model.
- Turkish labels and slugs are written natively.
- Category pages contain only verified launch articles whose editorial topic matches the category.
- The existing on-page filters remain a reading convenience; category URLs are the durable SEO layer.

### RSS

- `/feed.xml`: English default.
- `/en/feed.xml`: English.
- `/tr/feed.xml`: Turkish.
- Each item includes canonical URL, title, thesis, author, topic, and verified publication date.
- Feed responses use RSS content type and six-hour shared-cache freshness.

### Privacy-first analytics readiness

- Default mode: `off`.
- Activation requires `NEXT_PUBLIC_ANALYTICS_MODE=cookieless`.
- Transmission also requires `analytics: true` in the existing privacy preference record.
- Allowed payload: allow-listed event, pathname without query parameters, interface language, and event time.
- Excluded: cookies, IP fields, contact details, user-entered Decision Lab state, referrer, campaign identifiers, device identifiers, and behavioural profiles.
- The server adapter forwards only to a future owner-approved endpoint. With no endpoint, it stores nothing.
- No analytics are enabled in this review version.

### Validation

- Production build and lint pass.
- Thirteen render and source tests pass.
- Homepage JavaScript remains inside the Phase 5 budget at **153,009 bytes / 149.4 KiB compressed**.
- Automated coverage verifies production canonicals, schema, category routes, RSS, sitemap, robots, true 404 status, localized HTML language, analytics gating, and social assets.

## 4. Open owner decisions

1. Approve the private Phase 6 review version before production deployment.
2. Decide whether analytics should remain off or proceed to provider, legal-basis, retention, consent-copy, and data-processing review. The adapter must not be enabled before that decision.
3. Supply the verified Ganrich Advisory company-page URL if it should be added to Organization structured data; the founder’s personal LinkedIn is intentionally not presented as the company profile.
4. Complete Google Search Console and Bing Webmaster verification after the approved version is public. Verification tokens are owner-controlled and have not been invented.
5. Decide whether published, database-managed PDF reports should be added to the XML sitemap automatically in a later release. The six editorial launch articles and five categories are included now.
