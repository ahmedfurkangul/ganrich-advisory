# vinext-starter

A clean full-stack starter running on
[vinext](https://github.com/cloudflare/vinext), with optional Cloudflare D1 and
Drizzle support.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

This starter does not use `wrangler.jsonc`.

## Included Shape

- edit site code under `app/`
- `.openai/hosting.json` declares optional Sites D1 and R2 bindings
- `vite.config.ts` simulates declared bindings for local development
- `db/schema.ts` starts intentionally empty
- `examples/d1/` contains an optional D1 example surface
- `drizzle.config.ts` supports local migration generation when needed

## Editor Identity

The PDF studio and the PDF APIs recognise an editor only through
`app/editor-auth.ts`. The `EDITOR_AUTH` variable picks the source:

- `access`: a Cloudflare Access token (`Cf-Access-Jwt-Assertion` header or
  `CF_Authorization` cookie). Its RS256 signature, issuer
  (`ACCESS_TEAM_DOMAIN`), audience (`ACCESS_AUD`) and expiry are verified, and
  the email must appear in the comma-separated `EDITOR_EMAILS` list.
- `sites`: the `oai-authenticated-user-*` headers set by ChatGPT Sites. Use this
  only on that platform, which removes client-supplied copies.
- unset or anything else: nobody is an editor; studio pages return 404 and the
  editor APIs return 401.

Outside `sites` mode, `worker/index.ts` deletes any incoming
`oai-authenticated-user-*` headers, so they cannot be spoofed on Cloudflare.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the
OAuth cookies, and identity header injection. Do not implement app routes for
those reserved paths. Routes that do not import and call the helper remain
anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the
Sites hosting platform's access policy controls for workspace-wide restrictions,
or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write
actions tied to the current ChatGPT user. Leave public content anonymous.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: build the starter and verify its rendered loading skeleton
- `npm run db:generate`: generate Drizzle migrations after schema changes

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
