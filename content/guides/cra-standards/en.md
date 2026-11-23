---
path: insights/cra-compliance-without-harmonised-standards
title: CRA Compliance Without Harmonised Standards: What to Rely On
description: No CRA harmonised standard is cited yet and the deadlines are moving. What the Cyber Resilience Act lets Turkish manufacturers rely on until 11 December 2027.
h1: CRA compliance without harmonised standards: what can a Turkish manufacturer rely on?
---

If you make routers, industrial controllers, smart home devices, software or almost anything else with a digital element, and you sell into the EU, the Cyber Resilience Act (CRA) applies to you from 11 December 2027. Part of it already applies: since 11 September 2026, manufacturers must report actively exploited vulnerabilities (Regulation (EU) 2024/2847, Art. 71(2)).

The usual way to show compliance with an EU product law is a harmonised standard. For the CRA, those standards are late. This article sets out what the primary texts say about the delay, the new dates, and the routes a manufacturer can use while the standards are not there.

**Update, 18 November 2026.** The Commission's guidance on the application of the Cyber Resilience Act was published in the Official Journal on 17 November 2026 as C/2026/6013. It addresses, among other things, the Act's scope, the concept of «substantial modification», the support period and reporting obligations, and is not binding for economic operators. The Commission first published the guidance on its website on 27 July 2026.

## The standards are late: what the record shows

In February 2025 the Commission asked the European standardisation organisations (CEN, CENELEC and ETSI) for 41 standards in support of the CRA, known as M/606 (European Commission, CRA standardisation page). The request, Implementing Decision C(2025) 618 of 3 February 2025, set three adoption deadlines (C(2025) 618, Annex I):

- **30 August 2026** for items 1 and 15, the horizontal principles and vulnerability-handling standards;
- **30 October 2026** for items 16 to 41, the product-specific standards for important and critical products;
- **30 October 2027** for items 2 to 14, the standards on the individual essential requirements.

The first two dates have passed. According to Standards Drift, a standards-tracking site, as at 30 October 2026 no harmonised standard had been cited in the Official Journal for the CRA, ETSI had 18 work items (EN 304 617 to EN 304 642), and CEN-CENELEC's prEN 40000-1-1 and -1-2 had been at formal vote since 1 October 2026 (Standards Drift, 2 Nov 2026). We have not independently verified those status points; the deadline figures in that piece match the Commission's documents.

**Update, 17 November 2026.** CEN-CENELEC ratified EN 40000-1-1 and EN 40000-1-2 on 2 November 2026. Neither has been cited in the Official Journal, so neither yet gives a presumption of conformity under Article 27(1) (CEN-CENELEC project pages, accessed 17 Nov 2026).

## The new deadlines: adopted on 10 November 2026

The Commission has prepared an amendment to C(2025) 618. A draft implementing decision dated 23 September 2026 went to the Member States' Committee on Standards by written procedure between 16 September and 13 October 2026 (Comitology register, CMTD(2026)1607). It would replace Annex I with these deadlines:

- **items 1 and 15:** 30 November 2026;
- **items 16 to 41:** 31 January 2027;
- **items 2 to 14:** unchanged at 30 October 2027.

The draft cites a joint report of the standardisation organisations of 3 June 2026 as the reason for the change. It also says that if the organisations do not accept the amended request within one month, the decision stops applying and the February 2025 version continues (draft decision, Art. 2).

On 13 October 2026 the committee gave a positive opinion: 26 Member States in favour, none against, one abstention (voting sheet, registered 28 October 2026). A positive opinion is not adoption. On 3 November 2026 the register showed no adopted act.

**Update, 17 November 2026.** The Commission adopted the amendment on 10 November 2026 (Implementing Decision C(2026) 7861). It extends the deadlines for items 1 and 15 and for items 16 to 41 by three months, to the dates listed above; items 2 to 14 stay at 30 October 2027. Under its Article 2, the amendment stops applying if CEN, CENELEC or ETSI indicate within a month of receiving it that they do not accept it.

Two points matter for planning. These dates are for the standards organisations to adopt standards, not for publication in the Official Journal. And none of them moves the CRA's own application dates.

## The CRA dates that have not moved

- **11 June 2026:** rules on notified bodies (Chapter IV) apply.
- **11 September 2026:** reporting obligations in Article 14 apply.
- **11 December 2027:** the rest of the regulation applies (Art. 71(2)).

Article 14 also reaches backwards. It applies to all in-scope products, including those placed on the market before 11 December 2027 (Art. 69(3)). Other requirements apply to those older products only if they undergo a substantial modification from that date (Art. 69(2)).

What Article 14 requires now: an early warning within 24 hours of becoming aware of an actively exploited vulnerability, a vulnerability notification within 72 hours, and a final report no later than 14 days after a corrective or mitigating measure is available. Notifications go to the coordinating CSIRT and ENISA through the single reporting platform (Art. 14(1)-(2)).

## Why a harmonised standard matters

A product that conforms to a harmonised standard whose reference is published in the Official Journal is presumed to meet the essential requirements that standard covers (Art. 27(1)). The Commission's own guidance on harmonised standards is clear on the other side: "The use of these standards remains voluntary. Manufacturers ... are free to choose another technical solution to demonstrate compliance" (European Commission, harmonised standards page, accessed 3 Nov 2026).

So a missing standard does not make compliance impossible. It removes a shortcut. What it costs you depends on your product's category.

## Route 1: default products, module A without standards

Most products with digital elements are neither "important" nor "critical". For them, the manufacturer can use internal control (module A) and assess conformity itself (Art. 32(1)(a)). The CRA's recitals say this also applies where a manufacturer chooses not to apply a harmonised standard in whole or in part.

The price is documentation. The technical documentation must list the standards, common specifications or certification schemes applied. Where none were applied, it must describe the solutions adopted to meet the essential requirements in Annex I, Parts I and II, and list the other technical specifications used (Annex VII, point 5). The recitals add that the manufacturer has to show in its documentation how compliance is reached otherwise.

In practice: build a requirement-by-requirement map from Annex I to your design, tests and processes, and keep the evidence.

## Route 2: important products, class I

For important products in class I (Annex III), self-assessment under module A is available only if the manufacturer applies harmonised standards, common specifications or a European cybersecurity certification scheme at assurance level at least "substantial". Where these are not applied, applied only in part, or do not exist, the product must go through a third-party route: EU-type examination (module B) plus module C, or full quality assurance (module H) (Art. 32(2)).

This is where the delay bites. Until a relevant standard is cited, a class I manufacturer should plan for a notified body. The rules on notified bodies have applied since 11 June 2026 (Art. 71(2)), so check early which bodies cover your product and how long their queues are.

## Route 3: class II and critical products

Class II products always need a third-party route (module B+C or H) or, where available, a certification scheme at level at least "substantial" (Art. 32(3)). Critical products in Annex IV follow Article 32(4). For these groups, the missing standards change the evidence a notified body will look at, not whether a notified body is involved.

## Two more fallbacks in the text

- **Common specifications.** The Commission may adopt common specifications by implementing act, but only under conditions: it has asked for a standard, and the request was not accepted, the standard was not delivered on time, or it does not comply with the request; and no reference is published or expected within a reasonable period (Art. 27(2)). Conformity with common specifications also gives a presumption of conformity (Art. 27(4)), and they are repealed once a harmonised standard's reference is published (Art. 27(6)). None has been adopted for the CRA as far as the sources we checked show; do not plan on one.
- **EU cybersecurity certification.** A certificate or statement under the Cybersecurity Act (Regulation (EU) 2019/881) can give a presumption of conformity where a scheme is specified for this purpose (Art. 27(8)-(9)).

## What a Turkish manufacturer should do now

1. **Classify each product:** default, important class I or II, or critical.
2. **Set up Article 14 reporting now:** who decides in 24 hours, who files in 72 hours, and how you reach the single reporting platform.
3. **Map Annex I** to your design, tests and processes, product by product.
4. **Write the technical documentation as if no standard will arrive in time,** following Annex VII, point 5.
5. **For class I and above, contact notified bodies** and plan for a third-party assessment.
6. **Track the dates:** 30 November 2026 and 31 January 2027 for the standards organisations, under the amendment adopted on 10 November 2026; and 11 December 2027 for the CRA itself.

Our [CRA readiness check](/en/decision-lab/cra-readiness-check) shows where your gaps are. For Article 14 processes, see [CRA incident readiness](/en/solutions/cra-incident-readiness). If EU customers are asking you security questions under NIS2, see [NIS2 supplier security](/en/solutions/nis2-supplier-security).

## FAQ

:::faq
### Are there harmonised standards for the CRA yet?
CEN-CENELEC ratified EN 40000-1-1 and EN 40000-1-2 on 2 November 2026, but as at 17 November 2026 neither has been cited in the Official Journal. Only cited standards give a presumption of conformity (Art. 27(1)).
### Did the CRA deadlines move?
No. The CRA applies from 11 December 2027; reporting has applied since 11 September 2026. Only the deadlines for the standards organisations changed, by a Commission decision of 10 November 2026.
### What are the new standards deadlines?
30 November 2026 for items 1 and 15, and 31 January 2027 for items 16 to 41; items 2 to 14 stay at 30 October 2027 (Implementing Decision C(2026) 7861, adopted 10 Nov 2026).
### Can we self-assess without a harmonised standard?
For default products, yes, under module A, with documentation describing the solutions you used. For important class I products, not without standards, common specifications or certification; otherwise a notified body is needed.
### Do products we already sell fall under the CRA?
Article 14 reporting applies to them already. Other requirements apply to products placed on the market before 11 December 2027 only if they are substantially modified from that date.
:::

:::sources Sources (accessed 18 November 2026)
- Regulation (EU) 2024/2847 (Cyber Resilience Act), OJ L, 20.11.2024 (Art. 14, 27, 32, 69, 71; Annex VII): https://eur-lex.europa.eu/eli/reg/2024/2847/oj/eng
- European Commission, Implementing Decision C(2025) 618 of 3 Feb 2025 (standardisation request, Annex I): https://ec.europa.eu/transparency/documents-register/api/files/C%282025%29618%5F1/de00000001069729?rendition=false
- Comitology register, CMTD(2026)1607, Committee on Standards: draft implementing decision (Ares(2026)9002280, 23 Sep 2026) and voting sheet (Ares(2026)10140870, 28 Oct 2026): https://ec.europa.eu/transparency/comitology-register/screen/documents/D118113/1?lang=en (draft; voting sheet ref. V118783/01)
- European Commission, Cyber Resilience Act standardisation (last update 31 Jul 2026): https://digital-strategy.ec.europa.eu/en/policies/cra-standardisation
- European Commission, Harmonised standards: https://single-market-economy.ec.europa.eu/single-market/goods/european-standards/harmonised-standards_en
- European Commission, Implementing Decision C(2026) 7861 of 10 Nov 2026 amending C(2025) 618 (Annex I replaced; Art. 2): https://ec.europa.eu/transparency/documents-register/detail?ref=C(2026)7861&lang=en
- CEN-CENELEC, project pages for EN 40000-1-1:2026 and EN 40000-1-2:2026 (date of ratification 2 Nov 2026), via CEN/CLC/JTC 13 published standards: https://standards.cencenelec.eu/ords/f?p=205:22:::::FSP_ORG_ID,FSP_LANG_ID:2307986,25
- Commission guidance on the application of the CRA, OJ C/2026/6013, 17.11.2026: https://eur-lex.europa.eu/eli/C/2026/6013/oj
- European Commission, publication of the CRA guidance, 27.07.2026: https://digital-strategy.ec.europa.eu/en/library/commission-publishes-new-guidance-support-timely-cyber-resilience-act-implementation
- Secondary: Standards Drift, "Cyber Resilience Act: the second harmonised standards deadline (30 October 2026) has passed", 2 Nov 2026: https://standardsdrift.com/analysis/the-second-cra-deadline/
:::
