#!/usr/bin/env bash
# Builds, tests and deploys Ganrich Advisory to a named Cloudflare environment.
#
#   scripts/deploy.sh preview              # workers.dev review address
#   scripts/deploy.sh production --confirm # manual production deploy; normally Workers Builds deploys main
#
# Requires `npx wrangler login` (or CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID).
set -euo pipefail

target="${1:-}"
confirm="${2:-}"

case "$target" in
  preview) expected_worker="ganrich-preview" ;;
  production)
    expected_worker="ganrich-advisory"
    if [[ "$confirm" != "--confirm" ]]; then
      echo "Production deploys need --confirm and Furkan's go-live (DEPLOYMENT.md)." >&2
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

# `wrangler deploy` below has no --env: it follows the redirect that the
# CLOUDFLARE_ENV build writes to .wrangler/deploy/config.json. The top-level
# name in wrangler.jsonc is the production Worker, so a missing or stale build
# could send a preview deploy to production. Check the built target first.
echo "==> Check deploy target"
built_worker="$(node -e '
  const fs = require("fs");
  const redirect = JSON.parse(fs.readFileSync(".wrangler/deploy/config.json", "utf8"));
  const path = require("path").resolve(".wrangler/deploy", redirect.configPath);
  process.stdout.write(String(JSON.parse(fs.readFileSync(path, "utf8")).name || ""));
' 2>/dev/null)" || built_worker=""
if [[ "$built_worker" != "$expected_worker" ]]; then
  echo "Built Worker is '${built_worker:-unknown}', expected '$expected_worker' for $target. Not deploying." >&2
  exit 1
fi
echo "    $built_worker"

echo "==> D1 migrations for $target"
npx wrangler d1 migrations apply DB --env "$target" --remote --config wrangler.jsonc

echo "==> Deploy"
npx wrangler deploy --message "$(git rev-parse --short HEAD) $target"

echo "==> Done. Record the version id above in your release notes."
