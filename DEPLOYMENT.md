# Deployment

The site runs on Cloudflare Workers in Furkan's Cloudflare account. ganrichadvisory.com has been served by the Worker `ganrich-advisory` since 22 October 2026; `www` redirects to the apex. For going back, see [ROLLBACK.md](ROLLBACK.md). The DNS move from GoDaddy is recorded in [docs/GODADDY-DNS.md](docs/GODADDY-DNS.md).

## Environments

| Environment | Worker | Address | D1 | R2 |
|---|---|---|---|---|
| Local / tests | `ganrich-advisory` | `npm test` | placeholder (`site-creator-d1`) | local |
| `preview` | `ganrich-preview` | https://ganrich-preview.ahmedfurkangul.workers.dev (behind Access) | `ganrich-preview-db` | `ganrich-preview-docs` |
| `production` | `ganrich-advisory` | https://ganrichadvisory.com | `ganrich-prod-db` | `ganrich-prod-docs` |

All bindings and variables are in [`wrangler.jsonc`](wrangler.jsonc). `CLOUDFLARE_ENV` picks the environment at build time; never edit `dist/` by hand.

## Production: automatic deploys (Cloudflare Workers Builds, since 7 Nov 2026)

The production Worker is connected to this repository (Workers & Pages → ganrich-advisory → Settings → Builds). **Every push to `main` builds and deploys production**, so a pull request is merged only after Furkan's go-live.

- Build command: `npm test && CLOUDFLARE_ENV=production npm run build`. If a test fails, nothing deploys.
- Deploy command: `bash scripts/deploy-if-latest.sh` (recommended; until it is set in the dashboard it is still `npx wrangler deploy`). The script deploys only if the built commit is still the tip of `main`. Workers Builds can finish builds out of order or rebuild an older commit later; on 9 Nov 2026 a late build of an older `main` replaced newer live changes.
- Preview builds for other branches are off.
- D1 migrations are **not** applied automatically. Before merging a PR that adds a file in `drizzle/`, apply it: `npx wrangler d1 migrations apply DB --env production --remote --config wrangler.jsonc`.
- R2 uploads for new whitepapers are a separate step too. Do them before merging the PR that links to them.
- After merging several PRs, check that the live version is the build of the newest `main` commit (Deployments tab, or the Cloudflare API). If a merge did not start a build, start one from the Builds tab.

On Furkan's Mac, the wrangler login sees more than one Cloudflare account. Run wrangler from the repository folder and set `CLOUDFLARE_ACCOUNT_ID` for non-interactive commands; running it from the home folder can pick the wrong account.

## Preview

```bash
git checkout <branch>
npm ci
scripts/deploy.sh preview      # or: npm run deploy:preview
```

The script checks the working tree is clean, runs `npm test` and `npm run typecheck`, builds for preview, applies D1 migrations to the preview database and deploys with the commit id as the version message. Preview pages are behind Cloudflare Access, so only signed-in editors can see them.

## Secrets

Secrets are set with `npx wrangler secret put NAME --env production` (or `--env preview`); names and descriptions are in [`.env.example`](.env.example). Production uses the Resend keys for inquiry alerts and newsletter confirmations, the newsletter contacts key, the Resend segment ids and the Resend webhook secret. Never write secret values into the repository or a chat.

## Email

- Contact, download and readiness-check forms write to D1 (`inquiries`) and send an alert through Resend to `INQUIRY_NOTIFY_TO`.
- The weekly newsletter (Pazar Notu / Sunday Brief) uses double opt-in (`subscribers`), syncs confirmed subscribers to Resend segments and receives unsubscribes through the signed webhook `/api/newsletter/resend-webhook`.

## Traffic analytics

- The Worker logs each page view to D1 `page_views` after responding (`worker/traffic.ts`). No cookies and no IP addresses; the visitor code rotates daily (`analytics_salts`). The browser beacon `/api/lead-event` records `seen`, CTA, form and readiness-check events.
- Retention is enforced by `purgeExpiredRecords` in `worker/traffic.ts`.
- Dashboard: `/en/insights/pdf-studio/analytics` and `/tr/icgoruler/pdf-studyosu/analitik`, behind the same Access app as the PDF studio.
- To stop logging, set the Worker variable `ANALYTICS_LOGGING=off`.

## Editor identity

The editor is recognised only by a verified Cloudflare Access session ([`app/editor-auth.ts`](app/editor-auth.ts)): `EDITOR_AUTH=access`, `ACCESS_TEAM_DOMAIN`, `ACCESS_AUD` (the Access app protecting the studio paths) and `EDITOR_EMAILS`. Without a valid token the studio answers 404 and the editor APIs 401.
