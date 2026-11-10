#!/usr/bin/env bash
# Deploy step for Cloudflare Workers Builds (production Worker `ganrich-advisory`).
#
# Workers Builds can finish builds out of order, or rebuild an older commit
# later. On 9 Nov 2026 a late build of an older `main` overwrote newer live
# changes. This step deploys only when the commit that was built is still the
# tip of the branch; otherwise it skips, because the newer build deploys.
#
# Set it as the deploy command in Cloudflare:
#   Workers & Pages > ganrich-advisory > Settings > Builds > Deploy command:
#   bash scripts/deploy-if-latest.sh
#
# If the tip cannot be read (no network or git access), it deploys as before.
set -uo pipefail
cd "$(dirname "$0")/.."

built="${WORKERS_CI_COMMIT_SHA:-$(git rev-parse HEAD 2>/dev/null || true)}"
branch="${WORKERS_CI_BRANCH:-main}"
tip="$(git ls-remote origin "refs/heads/$branch" 2>/dev/null | cut -f1 || true)"

if [[ -n "$built" && -n "$tip" && "$built" != "$tip" ]]; then
  echo "Skipping deploy: this build is ${built:0:7}, but $branch is now at ${tip:0:7}. The build for ${tip:0:7} deploys instead."
  exit 0
fi
if [[ -z "$tip" ]]; then
  echo "Could not read the tip of $branch; deploying ${built:0:7} as before."
fi

exec npx wrangler deploy --message "${built:0:7} workers-builds"
