# Ganrich Advisory website

Source of https://ganrichadvisory.com (English at `/en`, Turkish at `/tr`).

- Stack: React 19 on [vinext](https://github.com/cloudflare/vinext) (Next.js App Router APIs on Vite), Tailwind 4, Cloudflare Workers with D1 (`DB`) and R2 (`DOCUMENTS`).
- Content lives in TypeScript files under `app/` (for example `guides-content.ts`, `solutions-content.ts`, `regulation-calendar.ts`). Routes are keyed in `app/advisory-routes.ts` and `app/content.ts`.
- The Worker entry is `worker/index.ts` (analytics, edge cache, 410 for removed pages, newsletter and lead APIs).
- Database migrations are in `drizzle/`.

## Working on it

```bash
npm ci
npm test          # builds, then runs every test in tests/
npm run typecheck
npm run lint
```

`npm run start` returns 500 locally because the `CF_VERSION_METADATA` binding is missing outside Cloudflare. To look at pages locally, serve `dist/server/index.js` through a small Node wrapper that calls `worker.fetch` and serves `dist/client` files first.

## Shipping

Every push to `main` builds and deploys production through Cloudflare Workers Builds, so a pull request is merged only after the owner approves it going live. Each site change is its own pull request. See [DEPLOYMENT.md](DEPLOYMENT.md) for the build, migrations, R2 uploads and the preview Worker, and [ROLLBACK.md](ROLLBACK.md) for going back.

## Editor identity

The PDF studio and editor APIs recognise an editor only through a verified Cloudflare Access token (`app/editor-auth.ts`, `EDITOR_AUTH=access`): RS256 signature, issuer (`ACCESS_TEAM_DOMAIN`), audience (`ACCESS_AUD`), expiry, and an email in `EDITOR_EMAILS`. The Worker deletes any incoming `oai-authenticated-user-*` headers left over from the old ChatGPT Sites hosting, so they cannot be spoofed.

## Other documents

- `docs/` holds reference notes on the PDF insight system, the privacy and trust centre, the site design system, the intelligence system and the DNS move from GoDaddy.
- `docs/archive/` keeps the handover and phase records from the ChatGPT Sites period (July to October 2026). They describe that era and are not current instructions.
