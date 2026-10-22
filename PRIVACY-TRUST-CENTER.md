# Ganrich Advisory Privacy + Trust Center

## Release record

- Version: 1.0
- Review date: 23 July 2026
- Scope: bilingual public website, interactive decision tools, PDF insight reader, editor-only PDF ingestion, and secure inquiry forms
- Publication rule: the PDF brief is the product and governance specification; public copy may state only verified current-site facts. Unknown legal or operational facts are not replaced with generic assumptions.

## Verified current-site data flow

| Surface | Current behaviour | Storage or transmission | Public statement |
|---|---|---|---|
| Language choice | Remembers EN/TR choice | Browser local storage | Essential user-requested preference |
| Privacy control | Records the visitor’s technology choice | Browser local storage | Essential consent-choice record |
| Briefing tray | Saves selected public materials when optional preferences are enabled | Browser local storage | Optional functional preference |
| Decision Framer | Saves a draft when optional preferences are enabled | Browser local storage | Optional functional preference |
| Reading mode | Remembers a reading view when optional preferences are enabled | Browser local storage | Optional functional preference |
| Contact form | Validated inquiry intake | First-party API to D1; hashed request fingerprint for rate limiting | Just-in-time notice and required privacy acknowledgement |
| Newsletter | Removed pending owner-approved ESP and consent process | No collection | No inactive form is shown |
| Private briefing | Validated briefing intake | First-party API to D1; hashed request fingerprint for rate limiting | Just-in-time notice and required privacy acknowledgement |
| Ask Ganrich | Removed pending a source-backed retrieval service | No collection | No simulated AI answer is shown |
| PDF reader | Delivers an approved PDF through a first-party API route | First-party document delivery | PDF remains the authoritative verification layer |
| PDF studio | Protected editorial workflow | D1 metadata and R2 document storage | Not represented as a public visitor flow |

The current code contains no analytics SDK, advertising pixel, behavioural-profile service, third-party media embed, or external public AI prompt call.

## Technology and consent inventory

| Category | Default | Current technologies | Control |
|---|---:|---|---|
| Essential | On | secure site delivery; language choice; privacy-choice record | Not switchable in the preference center |
| Functional | Off | briefing tray, Decision Framer drafts, reading mode | Accept optional / toggle |
| Analytics | Off | None deployed | Shown as not in use |
| Marketing | Off | None deployed | Shown as not in use |
| Third-party media | Off | None deployed | Shown as not in use |

Choosing “Essential only” removes the optional Ganrich browser-storage keys. Consent and notice are separate: visitors are not required to accept a privacy notice.

## Processing inventory and publication gaps

### Verified

- Current public-form fields, validation, first-party storage, and rate-limit controls.
- Browser-storage keys used by the public interface.
- Public Decision Lab browser-local behaviour.
- Absence of public analytics, advertising, and third-party embedded media in the current code.
- Bilingual routes, footer access, equal-weight privacy choices, and version labels.

### Not verified for public legal assertion

- Exact data-controller legal entity.
- Registered or postal address.
- KEP, dedicated rights email, or other formal application channel.
- DPO, representative, or Article 27 representative.
- Service-provider and subprocessor register.
- Hosting or processing locations.
- International-transfer mechanisms.
- Production CRM, newsletter, email, analytics, or AI suppliers.
- Record-level retention periods and deletion triggers.
- Governing law, forum, corporate registration, tax, and trade-register details.

These items remain publication gates. The public pages use explicit status notes, not bracketed placeholders.

## Jurisdiction matrix

| Regime | Current assessment | Action |
|---|---|---|
| Türkiye / Law No. 6698 | Material factual nexus: Turkish language, Türkiye market positioning, and Istanbul founder profile | Prepare final Article 10 notice and controller application channel when controller facts are verified |
| EU / GDPR | Applicability cannot be concluded from a general Europe market reference alone | Confirm establishment, targeting, monitoring, offering, representative, and transfer facts before making GDPR-specific claims |
| United Kingdom | Applicability not established | Assess only when UK establishment, targeting, monitoring, or relevant processing is confirmed |
| Switzerland | Applicability not established | Assess only when Swiss targeting or relevant processing is confirmed |
| Other markets | No universal legal claim | Perform country-specific review before local collection, campaigns, events, recruiting, or client portals |

## Retention framework

No numerical retention period is published without a verified operational record. Before activating any transmitting form, owners must document:

1. record type and system of record;
2. purpose and exact legal basis;
3. trigger that starts the retention period;
4. active-use period and archival period;
5. deletion or anonymisation method;
6. legal hold and dispute exceptions;
7. owner and evidence of periodic deletion.

## Marketing and IYS readiness

- Editorial marketing choice is separate, affirmative, and unchecked.
- The newsletter form is not published until an approved provider, sender identity, consent record, confirmation flow, and withdrawal process exist.
- Before activation: verify sender identity, channel, consent wording, evidence fields, withdrawal method, IYS obligations, suppression workflow, and vendor contracts.
- A privacy notice must not be converted into acceptance, membership, or bundled commercial-electronic-message consent.

## AI governance assessment

- Ask Ganrich is not published until a source-backed retrieval service and its data flow are approved.
- Public Decision Lab tools display their scope and input warning.
- No confidential, sensitive, privileged, restricted, or client-identifying input should be entered.
- Production AI requires an approved provider, data-flow assessment, retention setting, training-use position, transfer analysis, security review, incident route, human-review standard, and output labelling rule.
- Humans remain accountable for source verification, interpretation, advice, and decisions.

## Official source register

Checked 23 July 2026.

- KVKK, Principle Decision 2026/347 announcement: <https://www.kvkk.gov.tr/Icerik/8710/veri-sorumlulari-tarafindan-acik-riza-ve-aydinlatma-metinlerinin-ayri-ayri-duzenlenmesi-gerektigi-hakkinda-kisisel-verileri-koruma-kurulunun-18-02-2026-tarihli-ve-2026-347-sayili-ilke-kararina-iliskin-kamuoyu-duyurusu>
- KVKK, Communiqué on the Notice Obligation: <https://www.kvkk.gov.tr/Icerik/4132/aydinlatma-yukumlulugunun-yerine-getirilmesinde-uyulacak-usul-ve-esaslar-hakkinda-teblig>
- KVKK, Guide on Cookie Practices: <https://www.kvkk.gov.tr/Icerik/7353/Cerez-Uygulamalari-Hakkinda-Rehber>
- KVKK, Cookie Decision 2023/1645: <https://www.kvkk.gov.tr/Icerik/7765/2023-1645>
- KVKK, Cookie Decision 2022/229: <https://www.kvkk.gov.tr/Icerik/7275/2022-229>
- KVKK, standard-contract notification module: <https://www.kvkk.gov.tr/Icerik/8043/Standart-Sozlesme-Bildirim-Modulu-Hakkinda-Kamuoyu-Duyurusu>
- KVKK, controller application and complaint guidance: <https://www.kvkk.gov.tr/Icerik/5358/Kamuoyu-Duyurusu>
- KVKK, complaint procedure guidance: <https://www.kvkk.gov.tr/Icerik/6938/Kurumumuza-Yapilan-Sikayetlerin-Usul-Sartlarina-Iliskin-Kamuoyu-Duyurusu>
- GDPR: <https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng>
- EDPB, Guidelines 05/2020 on consent: <https://www.edpb.europa.eu/documents/guideline/guidelines-052020-on-consent-under-regulation-2016679_en>
- EDPB, Cookie Banner Taskforce report: <https://www.edpb.europa.eu/documents/task-force-report/report-of-the-work-undertaken-by-the-cookie-banner-taskforce_en>
- EU AI Act: <https://eur-lex.europa.eu/eli/reg/2024/1689/>

The brief referred to a 21 July 2026 announcement concerning third-party marketing data. No matching official KVKK source was located as of 23 July 2026. Do not rely on or cite that proposition until the official instrument is identified.

## Claim-control matrix

| Claim type | Evidence required | Publication owner |
|---|---|---|
| Controller identity and contact | corporate record and counsel approval | Founder / counsel |
| Processing purpose and legal basis | record of processing activities and workflow evidence | Process owner / counsel |
| Vendor, location, or transfer | executed contract, technical flow, and transfer assessment | Security / procurement / counsel |
| Retention period | approved schedule and system deletion capability | Record owner |
| AI provider behaviour | contract, configuration, system test, and privacy/security review | AI product owner |
| Cookie or tracking claim | production scan, code review, tag-manager review, and consent test | Web owner |
| Marketing consent | channel workflow, proof fields, withdrawal and suppression test | Marketing / counsel |

## QA and launch readiness

- [x] EN and TR trust routes render.
- [x] Privacy banner has equal-weight Accept optional, Essential only, and Manage choices actions.
- [x] Optional technologies default off.
- [x] Preference center is keyboard operable and uses semantic controls.
- [x] Public notice and consent are not bundled.
- [x] Contact and briefing forms use a validated first-party endpoint and show just-in-time notices.
- [x] Unsupported public Ask Ganrich and Signal Room experiences are removed.
- [x] Footer provides persistent trust links without expanding the primary navigation.
- [x] Material policy update is versioned and dated.
- [ ] Controller identity and formal application channels verified.
- [x] Production-form endpoint, input validation, bot trap, hashed fingerprint, and rate limiting implemented.
- [ ] Inquiry monitor, recipients, retention, and deletion process assigned and verified.
- [ ] Production vendor and transfer register approved.
- [ ] Counsel approves jurisdiction-specific notices and website terms.
- [ ] Accessibility audit with keyboard, screen reader, zoom, contrast, reduced motion, and focus testing completed on the deployed production build.
- [ ] Production technology scan reconciled against this inventory before public launch and after each material release.

## Counsel issue list

1. Confirm controller entity, establishment, registration, registered address, and formal contact/KEP channels.
2. Approve the Article 10 notice and Article 11 rights text against the live processing inventory.
3. Confirm exact legal bases without using consent as a catch-all.
4. Approve form-specific just-in-time notices before any endpoint is enabled.
5. Confirm controller response and escalation procedure for rights requests.
6. Confirm vendor roles, international transfers, standard-contract filings, and public disclosure level.
7. Confirm IYS and commercial-electronic-message requirements before newsletter activation.
8. Confirm GDPR, UK GDPR, Swiss FADP, representative, and local-market triggers before targeted activity.
9. Confirm terms, governing law, forum, intellectual-property language, and professional-services disclaimers.
10. Review EU AI Act transparency obligations before enabling external AI interaction or publishing materially AI-generated public-interest content.
