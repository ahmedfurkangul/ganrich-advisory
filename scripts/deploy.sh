#!/usr/bin/env bash
# Builds, tests and deploys Ganrich Advisory to a named Cloudflare environment.
#
#   scripts/deploy.sh preview              # workers.dev review address
#   scripts/deploy.sh production --confirm # only after the cutover is approved
#
# Requires `npx wrangler login` (or CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID).
set -euo pipefail

target="${1:-}"
confirm="${2:-}"

case "$target" in
  preview) ;;
  production)
    if [[ "$confirm" != "--confirm" ]]; then
      echo "Production deploys need --confirm and an approved cutover (DEPLOYMENT.md)." >&2
      exit 1
    fi
    ;;
  *)
    echo "Usage: scripts/deploy.sh preview|production [--confirm]" >&2
    exit 1
    ;;
esac

cd "$(dirname "$0")/.."

echo "==> Source: $(git rev-parse --short HEAD) on $(git rev-parse --abbrev-ref HEAD)"
if [[ -n "$(git status --porcelain)" ]]; then
  echo "Working tree has uncommitted changes; commit or stash them so the deploy maps to a commit." >&2
  exit 1
fi

echo "==> Tests (local build)"
npm test

echo "==> Typecheck"
npm run typecheck

echo "==> Build for $target"
CLOUDFLARE_ENV="$target" npm run build

echo "==> D1 migrations for $target"
npx wrangler d1 migrations apply DB --env "$target" --remote --config wrangler.jsonc

echo "==> Deploy"
npx wrangler deploy --message "$(git rev-parse --short HEAD) $target"

echo "==> Done. Record the version id above in your release notes."
