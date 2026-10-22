# Review decisions: facts and approvals still needed

Last updated 22 October 2026. Everything below is either live on the `redesign/positioning-and-ux` branch as a proposal or deliberately left out until the owner confirms it. Nothing here has been deployed.

## Confirmed by the owner (22 October 2026)

| Item | Where it is used |
|---|---|
| Founder portrait supplied | `public/people/ahmed-furkan-gul.webp` / `.jpg` (900×1125), home, engagement pages, How we work, About |
| Tay Group title: "Chief Strategy and Business Development Officer" | Founder facts, About, home proof strip, meta description |
| Engagement names: Market Entry Decision Sprint, Operating Model Review, AI Value Diagnostic (TR: Pazara Giriş Karar Sprinti, İşletim Modeli İncelemesi, Yapay Zekâ Değer Teşhisi) | Navigation, footer, engagement pages, contact topics |
| Public contact address: `furkangul@ganrichadvisory.com` | Footer, contact page, error pages, RSS author, briefing form fallback, release preflight |

## Decisions the owner still needs to make

1. **Positioning.** The site is built on the recommended option: owners and leadership teams of established Turkish companies, three situations (expansion beyond Türkiye, outgrowing the founding structure, AI value). The decision card in the project thread is still open. A different choice changes the home hero, the meta descriptions and the situations block, not the architecture.
2. **Engagement scope.** Each engagement page lists who it is for and not for, typical questions, five process steps, what the client provides and six deliverables. These are proposals written from the brief and the published insights, not from past engagements. Please confirm or edit them in `app/practice-content.ts`.
3. **"Ahmed Furkan Gul reads every message and replies personally."** This appears on the contact page and in the first-conversation steps. Keep it only if it is true in practice.
4. **Response time.** Not shown anywhere. Supply a timeframe (for example "within two working days") if you want it shown.
5. **Scheduling.** No booking link exists, so none was added. If you use a real scheduling page (Calendly, Cal.com, Google Calendar appointment page), send the URL and it can be added next to the email address.
6. **Fees language.** Pages say "Scope and fees are agreed in writing after a first conversation" and the first-conversation steps no longer say the first call is free. Confirm whether the first conversation is free of charge; if it is, that can be stated.
7. **Geography.** Structured data `areaServed` was narrowed from four macro-regions to Türkiye and the Gulf Cooperation Council. The Markets page says Europe, wider MENA and Africa are supported "when they arise in a client's agenda" without published commentary. Confirm both.
8. **Istanbul base.** The hero eyebrow and About say "Istanbul". This was already in the original footer; confirm it should be prominent.
9. **AI and client information.** How we work says "whether AI tools may be used with your information is agreed with you at the start." Confirm that this matches your practice, and update the AI transparency page if you have a stricter rule.

## Proposals kept out of the public site

These came up in the brief or the audit but are not supported by verified material, so they are not published:

- Client names, logos, testimonials, case studies, outcome figures or "selected work". The site shows clearly labelled fictional excerpts instead (valve-maker memo, decision-rights map, AI triage).
- Team members, associates, partner firms, offices outside Istanbul, awards or certifications.
- Prices, day rates, engagement durations or package tiers.
- A response-time promise, a booking widget, or a newsletter sign-up.
- Market statistics or country commentary beyond the four dated, sourced corridor observations on the Markets page.
- Proposed future editorial topics (not published): "Distributor, partner or own entity: choosing the first Gulf route", "Which decisions should stay with the founder", "Setting a baseline before an AI pilot".

## Email and domain

`furkangul@ganrichadvisory.com` replaced the previous Gmail address on 22 October 2026 at the owner's request. Delivery to that mailbox was not tested from this environment. Before release, send a test message to it and check SPF, DKIM and DMARC for `ganrichadvisory.com` so replies do not land in spam.

## Not verified in this environment

- **D1 inquiry storage.** Locally there is no `DB` binding, so a contact submission returns the API's "could not be stored securely" error. The form shows that error, keeps the visitor's text and offers the direct email address. The relaxed validation (name, email, description of at least 20 characters, privacy acknowledgement) was checked in code and by test, not against a live database. The table schema is unchanged; optional fields are stored as empty strings.
- **R2 documents and the PDF studio login.** Untouched by this redesign and not exercised.
- **Production deployment, DNS, Cloudflare settings and analytics.** Not touched.
- **Release preflight "Build is not older than source".** Fails locally because several original files carry modification times later than the build (they were extracted from the ZIP with future timestamps), not because the build is stale. All other preflight checks pass.
