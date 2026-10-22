# Ganrich Website — Phase 1 Change Inventory

Baseline: publicly deployed version immediately before the 23 July 2026 rebuild  
Phase status: implementation branch; not published  
Editorial locale: English (UK) and Turkish

## Naming audit before change

| Surface | Current occurrence | Proposed | Rationale | Confidence |
| --- | --- | --- | --- | --- |
| Runtime pages, metadata, structured data, logo alt text and copyright | `Ganrich Advisory` | Keep `Ganrich Advisory` | Matches the domain, approved Threshold logo, footer, Decision Lab and the owner’s prior explicit naming decision | High — sourced from existing production assets and owner direction |
| Automated tests | Five stale assertions expect `Ganrich Consulting` | Replace with `Ganrich Advisory` | Tests must validate the public brand rather than preserve an obsolete name | High |
| Source files under `app/` | No prospect-visible `Ganrich Consulting` occurrence found | No global blind replacement required | The naming split described in the brief has already been corrected in runtime source; only stale validation remains | High |

Decision: **Ganrich Advisory** is the working brand name for Phase 1. This does not assert a legal-entity name.

## Change inventory

| Page / element | Current | Proposed Phase 1 change | Rationale |
| --- | --- | --- | --- |
| Home / insight cards | All three cards show publication placeholders and open the same article | Add author and date; give each card its own English and Turkish article URL | Removes unfinished cues and repairs a material navigation defect |
| Insights / publication list | `[DATE]` shown publicly | Show `23 July 2026 · Ahmed Furkan Gul` / `23 Temmuz 2026 · Ahmed Furkan Gul` | Uses known author identity and a dated publication record without inventing external evidence |
| Insight article | One hard-coded article with placeholder author/date, “provisional” status and a missing review date | Render the selected article from bilingual content data; remove staging language; retain an explicit conceptual-methodology limitation | A finished editorial page can still be transparent about evidence without looking unfinished |
| Insights / Ask Ganrich | Simulated answer presented as an interface preview | Remove from public rendering | No source-backed retrieval service is connected; a simulated AI answer would outrun credibility |
| Insights / Signal Room | Public route labelled editorial prototype | Remove from public navigation and command search until three dated, sourced signals exist | The master brief requires a real quarterly signal product, not a labelled prototype |
| Decision Lab / Market Entry Compass | Labelled “prototype”; neutral inputs described as placeholders | Keep the functioning user-input tool, remove prototype terminology, and retain the scope/evidence disclaimer | The tool operates locally and makes no unsupported market claim |
| Contact form | Structures input locally but does not transmit | Send validated submissions to secure D1 storage with anti-spam and rate-limit controls | Turns the primary conversion path into an operational channel |
| Private briefing form | Structures input locally but does not transmit | Send the briefing context to the same secure inquiry endpoint | Makes the high-intent funnel real without inventing a CRM integration |
| Footer / The Ganrich Brief | Simulated subscription form | Remove the form until an ESP, sender identity, data-processing terms and double-opt-in flow are approved | The required compliant subscription cannot be completed responsibly without an owner-selected provider |
| About introduction | Says the firm “is being built” | State the current founder-led advisory proposition directly | Removes a launch-readiness cue while preserving measured positioning |
| Privacy and KVKK pages | Describe contact, newsletter and briefing experiences as prototypes | Describe operational inquiry processing, browser-local preferences and the direct privacy channel accurately | Public privacy content must match live data flows |
| Insights / editor entry | Public “Add PDF Insight” link | Remove from public UI; keep authenticated editorial routes | Administration should not appear in prospect navigation |
| Metadata | First article description calls the perspective provisional | Use finished article-specific title and standfirst | Search and social surfaces must not expose staging language |

## Final Phase 1 editorial copy

| Element | English | Turkish |
| --- | --- | --- |
| About proposition | Ganrich Advisory is an independent strategy, transformation, and applied-AI advisory for leaders working across complex regional and organisational contexts. | Ganrich Advisory, karmaşık bölgesel ve kurumsal bağlamlarda çalışan liderler için bağımsız strateji, dönüşüm ve uygulamalı yapay zekâ danışmanlığı sunar. |
| Inquiry success | Your inquiry has been received. We will review the context before responding. | Talebiniz alındı. Yanıt vermeden önce paylaştığınız bağlamı inceleyeceğiz. |
| Inquiry privacy note | Your details are stored securely to review and respond to this inquiry. Do not include confidential or sensitive information. | Bilgileriniz bu talebi incelemek ve yanıtlamak amacıyla güvenli biçimde saklanır. Gizli veya hassas bilgi eklemeyin. |
| Market Compass scope | Directional comparison based only on your inputs. Validate every assumption before commitment. | Yalnızca girdilerinize dayalı yön gösterici karşılaştırma. Taahhütten önce her varsayımı doğrulayın. |
| Insight applicability | Use this when the leadership team needs to convert a broad issue into an explicit choice and evidence threshold. | Liderlik ekibinin geniş bir konuyu açık bir tercihe ve kanıt eşiğine dönüştürmesi gerektiğinde kullanın. |

## Component and data changes

- Add bilingual insight slugs, publication metadata and article-specific editorial content.
- Make article route detection and language switching work for all three launch perspectives.
- Add a D1-backed `/api/inquiries` endpoint and generated migration.
- Replace local-only contact and briefing handlers with validated async submission.
- Remove the newsletter component rather than expose an inactive form.
- Remove public Signal Room and editorial-entry links.
- Update metadata, sitemap and tests for the new article routes.

## Owner decisions required

1. **Newsletter provider — blocking.** Select an ESP such as Brevo, Mailchimp, Kit or another approved provider; provide a verified sender/domain and approve its data-processing terms. Only then can EN/TR double opt-in emails and consent records be connected.
2. **Legal identity — blocking for legal-detail completion.** Confirm the registered legal entity name, registered address, registration identifiers and formal KVKK/GDPR application channel. `Ganrich Advisory` is treated as the public brand only.
3. **Inquiry operations.** Assign the person who will monitor D1 inquiry records and define the retention period. Automatic email notifications require an approved transactional-email provider.
4. **Response-time commitment.** No response-time promise is added until the operating owner approves one.
5. **Editorial approval.** The three Phase 1 perspectives are conceptual, founder-authored practice notes with no external dataset. Confirm whether they may be published now or should remain in review until the six-article Phase 2 set is complete.
