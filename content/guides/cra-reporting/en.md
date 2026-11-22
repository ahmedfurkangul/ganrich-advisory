---
path: insights/cra-reporting-white-goods-refrigeration
title: CRA Reporting for Refrigeration and White-Goods Exporters
description: ENISA and the Commission’s 4 Nov 2026 joint statement on refrigeration cyber incidents: CRA Art. 14 reporting since 11 Sep. What Turkish exporters must do.
h1: CRA Reporting for Refrigeration and White-Goods Exporters
---

*Source check: 7 November 2026 (Europe/Istanbul). General information, not a product-specific legal opinion.*

A refrigeration incident is not automatically a reporting duty for every refrigerator manufacturer. But manufacturers of in-scope products with digital elements cannot wait for the CRA’s main requirements in December 2027 before preparing to report. **Article 14 reporting has applied since 11 September 2026.** The first questions are whether your product is in scope, whether a reportable event affects its security, and when you became aware. [CRA, Arts. 2, 14, 69 and 71; adopted 23 October 2024](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)

## What ENISA actually confirmed

The [ENISA–Commission joint statement of 4 November 2026](https://www.enisa.europa.eu/news/joint-statement-on-cyber-incidents-in-refrigeration-systems-across-the-eu) reports cybersecurity incidents affecting commercial refrigeration systems and similar devices in several EU Member States since 11 October, with another wave on 1–2 November. It advises organisations to mitigate exposure in affected systems and points them to national CSIRT advisories.

That statement is verified, but it is not a product recall or a list of affected brands. It identifies no manufacturer, country of origin or attack method. It does not establish that Turkish white-goods manufacturers or household refrigerators were targeted. “White goods” is this article’s audience framing, not an incident attribution. The statement recalls existing CRA and NIS2 obligations; it does not create a new reporting deadline. [ENISA, 4 November 2026](https://www.enisa.europa.eu/news/joint-statement-on-cyber-incidents-in-refrigeration-systems-across-the-eu)

## Which refrigeration products are in scope?

**Law.** Article 2(1) covers products with digital elements made available on the EU market whose intended purpose or reasonably foreseeable use includes a direct or indirect logical or physical data connection to a device or network. The definition includes hardware, software, separately marketed components and qualifying remote data processing. The manufacturer is the entity that develops or has the product developed or manufactured and markets it under its own name or trademark. Being based in Türkiye does not, by itself, remove that role. [CRA, Arts. 2(1), 3(1)–(2), 3(13) and 3(22)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)

**Application to this sector.** A networked commercial cabinet, connected domestic refrigerator or separately marketed controller can meet that test. These are examples derived from the legal criteria, not a statutory list. Wi-Fi is not the only relevant connection: check service interfaces and indirect connections too. Conversely, a purely mechanical appliance with no qualifying digital product or data connection is not brought into scope simply because it provides refrigeration. A product’s cloud function belongs in the assessment where the manufacturer designs it or is responsible for it and its absence would prevent a product function. [CRA, Arts. 2(1) and 3(1)–(2), recitals 9–12](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)

**Exclusions need their own check.** Article 2 excludes products covered by the medical-device and in-vitro diagnostic-device regulations, products covered by Regulation (EU) 2019/2144, aviation products certified under Regulation (EU) 2018/1139, and marine equipment within Directive 2014/90/EU. It also excludes same-specification spare parts replacing identical components, exclusively national-security/defence products and products specifically designed for classified information. Delegated Regulation (EU) 2025/1535 additionally excludes products within Regulation (EU) No 168/2013, except the specified L1e vehicles designed to pedal. These are not blanket exemptions for every vehicle-related component or every spare part. [CRA, Art. 2](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847); [Delegated Regulation, adopted 29 July 2025, Art. 1](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32025R1535)

Non-commercial free and open-source software is not treated as a market supply merely because its code is available. That does not exempt a commercial appliance incorporating open-source components. Open-source software stewards have a separate regime; their Article 24(3) reporting duties start on 11 December 2027, not September 2026. [CRA, Art. 3(22), recitals 18–19, Arts. 24 and 71](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847); [Commission guidance, 27 July 2026, Section 3](https://ec.europa.eu/newsroom/dae/redirection/document/131456)

## Reporting applies to legacy products too

Article 71(2) sets 11 December 2027 as the general application date, with Article 14 applying from 11 September 2026 and Chapter IV on notified bodies from 11 June 2026. Article 69(3) expressly brings earlier in-scope products into Article 14 reporting. For other requirements, Article 69(2) provides that pre-11 December 2027 products become subject where substantially modified from that date. Do not turn the reporting exception into a claim that all legacy products already require CRA conformity assessment. [CRA, Arts. 69 and 71](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)

**Non-binding guidance.** Paragraph 210 of the Commission’s 27 July 2026 guidance says reporting continues after the support period ends. Paragraph 217 distinguishes an old vulnerability from prior awareness of its active exploitation: active exploitation already known before 11 September 2026 need not be reported retrospectively; awareness arising after that date can trigger reporting even if the vulnerability itself was already known. [Commission guidance, Section 9.1](https://ec.europa.eu/newsroom/dae/redirection/document/131456)

## Two reporting tracks, not one generic incident form

An **actively exploited vulnerability** requires reliable evidence of exploitation by a malicious actor in a system without its owner’s permission. Mere technical exploitability or a good-faith test is not the same thing. A **severe incident** is assessed separately: Article 14(5) covers actual or potential adverse effects on protection of sensitive or important data/functions, or actual or potential introduction or execution of malicious code in the product or a user’s network and information systems. [CRA, Art. 3(42), Art. 14(5), recital 68](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)

| Stage | Actively exploited vulnerability: Art. 14(2) | Severe incident: Art. 14(4) |
| --- | --- | --- |
| Early warning | Without undue delay, within 24 hours of awareness; affected Member States where applicable | Same clock; also state whether unlawful or malicious acts are suspected |
| Notification | Without undue delay, within 72 hours of awareness; product, exploit/vulnerability and available corrective or mitigating measures | Same clock; incident nature, initial assessment and available corrective or mitigating measures |
| Final report | No later than 14 days after a corrective or mitigating measure becomes available | Within one month after submission of the incident notification |

The 72-hour and final stages apply unless the relevant information has already been provided. Final vulnerability reports cover severity/impact, available malicious-actor information and the fix; final incident reports cover severity/impact, likely threat or root cause, and applied/ongoing mitigation. A coordinator CSIRT may request an intermediate update under Article 14(6). **The 72 hours run from awareness, not 72 hours after the early warning.** [CRA, Art. 14(2), (4) and (6)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)

**Guidance, not an extra waiting period.** The Commission describes awareness as reasonable certainty after an immediate initial assessment. It calls for prompt investigation and progressively updated reports, not waiting for a complete forensic investigation. Record the awareness time and the evidence behind it. [Commission guidance, paragraphs 213–215](https://ec.europa.eu/newsroom/dae/redirection/document/131456)

ENISA’s FAQ also warns that the current SRP 72-hour counter uses 48 hours after early-warning submission and can show an earlier due time. Platform reminders do not replace the legal clock. [ENISA FAQ, displayed update 15 October 2026, Q26](https://www.enisa.europa.eu/topics/product-security/vulnerability-services/eu-incident-response-and-cyber-crisis-management/single-reporting-platform-srp/frequently-asked-questions)

## A third-party component needs product-level analysis

A component vulnerability that is technically exploitable is not automatically an actively exploited vulnerability in your product. The Commission’s non-binding paragraph 218 says manufacturers report actively exploited vulnerabilities contained in their own product. It then explains that if the component vulnerability cannot be exploited in that product, **or has not been exploited in that product**, it is not subject to mandatory reporting for that manufacturer on that basis. Component presence or an external advisory alone does not settle the question; document the product-specific evidence and assess the separate severe-incident test. [Commission guidance, paragraph 218](https://ec.europa.eu/newsroom/dae/redirection/document/131456); [CRA, Art. 14](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)

Article 15 provides for voluntary reporting in the Regulation. **It is not a live voluntary SRP route:** ENISA’s FAQ, Q4 and Q27, says that functionality remains for a future phase. Do not submit a non-reportable vulnerability as a mandatory report just to use the platform. This does not remove any separately applicable vulnerability-handling duties; those have their own dates and transitional rules. [CRA, Arts. 13, 15, 69 and 71](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847); [ENISA FAQ, 15 October 2026](https://www.enisa.europa.eu/topics/product-security/vulnerability-services/eu-incident-response-and-cyber-crisis-management/single-reporting-platform-srp/frequently-asked-questions)

## Where a Turkish manufacturer reports

Use the SRP and the coordinator CSIRT determined under Article 14(7). The EU main establishment is where product-cybersecurity decisions are predominantly taken; if it cannot be determined, use the EU establishment with the most employees. Without an EU main establishment, apply this order using available information:

1. Member State of the authorised representative acting for the highest number of the manufacturer’s products;
2. failing that, the importer placing the highest number on the market;
3. failing that, the distributor making the highest number available;
4. failing that, the Member State with the highest number of users.

This is not a free choice of the most convenient authority. Notifications are normally simultaneously accessible to ENISA; Article 16(2) provides a narrow exception for full details of a 72-hour vulnerability notification in particularly exceptional circumstances. Dissemination restrictions are not permission to postpone the manufacturer’s reporting. [CRA, Arts. 14(7) and 16(2)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847); [Delegated Regulation (EU) 2026/881, adopted 11 December 2025, recital 2 and Arts. 1, 3–5](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32026R0881)

**Operational guidance.** ENISA advises registering on the SRP and initiating CSIRT validation only when a notification is needed. Prepare personal MFA-enabled EU Login accounts beforehand. Validation runs in parallel and does not prevent submission while pending. The platform’s **Assigned Representative** is a user role, not the CRA’s **authorised representative**, which is an EU-established person with a written manufacturer mandate. [ENISA FAQ, 15 October 2026, Q9](https://www.enisa.europa.eu/topics/product-security/vulnerability-services/eu-incident-response-and-cyber-crisis-management/single-reporting-platform-srp/frequently-asked-questions); [CRA, Art. 3(15)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847)

## What to prepare before the next alert

**Our operational recommendation, not additional law:** maintain one product/security record containing the scope rationale, versions and components, awareness evidence, reporting track, coordinator-CSIRT rationale, responsible person and deputy, and separate deadline calculations. Rehearse both the vulnerability and severe-incident tracks.

Prepare user notices as well as authority reports. Article 14(8) requires informing impacted users and, where appropriate, all users, including necessary mitigation/corrective measures. The Commission’s guidance calls for proportionate, risk-based disclosure; this is not an instruction to publish sensitive exploit details indiscriminately. [CRA, Art. 14(8)](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847); [Commission guidance, paragraphs 219–221](https://ec.europa.eu/newsroom/dae/redirection/document/131456)

Assess NIS2 separately where the organisation falls under that Directive; the joint statement does not make every refrigerator maker a NIS2 entity or say an SRP report replaces all other reporting. [ENISA, 4 November 2026](https://www.enisa.europa.eu/news/joint-statement-on-cyber-incidents-in-refrigeration-systems-across-the-eu) For readiness support, see [CRA incident readiness](/en/solutions/cra-incident-readiness) and the [CRA readiness check](/en/decision-lab/cra-readiness-check). Conformity and standards are a separate workstream: [CRA compliance without harmonised standards](/en/insights/cra-compliance-without-harmonised-standards).

## FAQ

:::faq
### When did CRA reporting start?
On 11 September 2026, under Article 71(2), second sentence, and Article 69(3) of Regulation (EU) 2024/2847. The ENISA–Commission joint statement of 4 November 2026 recalls the same date.
### How long do I have for the early warning?
Without undue delay and in any event within 24 hours of becoming aware of an actively exploited vulnerability or a severe incident (Art. 14(2)(a) and 14(4)(a)).
### Is the final-report deadline the same for vulnerabilities and severe incidents?
No. For actively exploited vulnerabilities it is no later than 14 days after a corrective or mitigating measure is available; for severe incidents it is within one month after the incident notification is submitted (Art. 14(2)(c) and 14(4)(c)).
### Where does a Turkey-based manufacturer notify?
If there is no main establishment in the Union, follow Article 14(7): the coordinator CSIRT of the Member State of the authorised representative, importer, distributor or largest user base, in that order, via the SRP with simultaneous access for ENISA.
### Does the joint statement single out Turkish white-goods makers?
No. It describes incidents in commercial refrigeration systems and similar devices and names no manufacturers, brands or countries of origin. The Article 14 reminder is addressed to manufacturers of products with digital elements on the EU market generally.
### Are the main CRA cybersecurity requirements already mandatory?
No. Per the statement and Article 71(2), those apply from 11 December 2027. What is live now is Article 14 (and, since 11 June 2026, Chapter IV on notified bodies).
:::

## Primary sources and dates

- [Regulation (EU) 2024/2847](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX:32024R2847): adopted 23 October 2024; Official Journal publication 20 November 2024. Articles cited above are law. [EUR-Lex document status and corrections](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32024R2847) were also checked.
- [ENISA–Commission joint statement](https://www.enisa.europa.eu/news/joint-statement-on-cyber-incidents-in-refrigeration-systems-across-the-eu): published 4 November 2026. Evidence of reported incidents, not company attribution.
- [Commission CRA reporting page](https://digital-strategy.ec.europa.eu/en/policies/cra-reporting): no publication/update date displayed in the retrieved text; operational summary, checked 7 November 2026.
- [Commission guidance library page](https://digital-strategy.ec.europa.eu/en/library/commission-publishes-new-guidance-support-timely-cyber-resilience-act-implementation) and [C(2026) 5252 annex](https://ec.europa.eu/newsroom/dae/redirection/document/131456): published 27 July 2026; non-binding guidance, especially Section 9.1.
- [ENISA SRP FAQ](https://www.enisa.europa.eu/topics/product-security/vulnerability-services/eu-incident-response-and-cyber-crisis-management/single-reporting-platform-srp/frequently-asked-questions): displays “Updated: 15 October 2026”; Q4/Q27 voluntary route, Q9 registration, Q26 counters. [SRP overview](https://www.enisa.europa.eu/cra-srp) separately notes a 4 November 2026 v1.3 upgrade and ongoing documentation updates; re-check instructions when reporting.
- [Delegated Regulation (EU) 2025/1535](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32025R1535): adopted 29 July 2025; OJ 29 October 2025. [Delegated Regulation (EU) 2026/881](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32026R0881): adopted 11 December 2025; OJ 20 April 2026.

All sources accessed 7 November 2026 (Europe/Istanbul). Access dates are not publication dates. Incident investigations, attribution and individual product exposure were not independently established here.
