# Ganrich Advisory redesign — 22 October 2026

The bilingual site now gives equal prominence to three audiences: Turkish mid-market businesses considering Gulf expansion, founder-led groups professionalizing management, and industrial teams adopting AI.

## Implemented
- Editorial homepage with concise experience, three audience paths, three scoped services, illustrative work, founder delivery approach, one insight and one tool.
- Dedicated market-entry, operating-model and AI-value service pages in English and Turkish.
- Interactive sample decision memos, explicitly fictional, with print/PDF support.
- Four original bilingual Decision Notes, related engagement links, sitemap and RSS inclusion.
- Rewritten regional page focused on the questions behind Türkiye–Gulf expansion.
- Worked examples, timing and output guidance for decision tools, plus a starting-tool selector.
- Free-text tool inputs removed from browser URLs. Explicit session-only transfer into contact expires after 15 minutes and is consumed on arrival. Framer retains its disclosed functional-consent local draft feature.
- Contact requires name, email, decision description and privacy acknowledgment. Organization, role and region are optional. Existing inquiry endpoint retained.
- Mobile contact action, corrected intermediate-width menu, responsive memo layouts and non-hyphenating headlines.
- Updated homepage social previews. Route-specific metadata and bilingual alternates preserved.

## Content requiring owner materials
The existing working Gmail address remains because a domain name alone does not establish a mailbox. No scheduling URL or response-time commitment has been invented. Real client results, testimonials and a founder portrait need owner-supplied approved material. Proposed engagement timing is agreed during scoping. Regional content is a decision framework; it makes no newly researched economic claims.

## Source map
- app/advisory.tsx: homepage and shared editorial components
- app/advisory-details.tsx: services, sample memos, regional content, engagement formats
- app/advisory-content.ts: bilingual service definitions
- app/advisory-note-content.ts: bilingual editorial notes
- app/advisory-notes.tsx: note presentation
- app/marketing-pages.tsx: expertise, insights, about
- app/contact-experience.tsx and app/decision-handoff.tsx: inquiry experience
- app/intelligence.tsx: Decision Lab
- app/globals.css: shared design and responsive styles

## Development
Use the pinned package lock with Node 22 or later. Run npm install, npm run dev for local development; npm run test builds and runs rendered-route checks. Hosting uses Vinext on Cloudflare, with existing D1 and R2 bindings. Secrets and runtime data are deliberately excluded from source exports. Existing production submissions were not sent during QA.
