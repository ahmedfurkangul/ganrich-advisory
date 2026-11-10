#!/usr/bin/env node
// Refuses a deploy unless the built Worker config points at the expected Cloudflare environment.
//
//   node scripts/check-deploy-target.mjs preview|production
//
// `wrangler deploy` follows .wrangler/deploy/config.json to the config the last build wrote. A build without
// CLOUDFLARE_ENV (for example the one `npm test` runs) writes the top-level config: Worker name
// `ganrich-advisory`, the production name, with a placeholder D1 database. Deploying that would replace the
// live site with a broken build, so the deploy scripts run this check first.
import { readFile } from "node:fs/promises";
import path from "node:path";

export const expected = {
  preview: { name: "ganrich-preview", database: "ganrich-preview-db" },
  production: { name: "ganrich-advisory", database: "ganrich-prod-db" },
};

export async function checkDeployTarget(target, root = process.cwd()) {
  const want = expected[target];
  if (!want) return `Unknown target "${target}". Use preview or production.`;
  const redirectFile = path.join(root, ".wrangler/deploy/config.json");
  let redirect;
  try { redirect = JSON.parse(await readFile(redirectFile, "utf8")); } catch { return `No build found (${redirectFile} is missing). Build with CLOUDFLARE_ENV=${target} first.`; }
  const configFile = path.resolve(path.dirname(redirectFile), redirect.configPath ?? "");
  let config;
  try { config = JSON.parse(await readFile(configFile, "utf8")); } catch { return `Cannot read the built config ${configFile}.`; }
  const name = config.name;
  const database = config.d1_databases?.find(d => d.binding === "DB")?.database_name;
  if (name !== want.name || database !== want.database) {
    return `The last build targets Worker "${name}" with database "${database}", not ${target} ("${want.name}", "${want.database}"). Rebuild with CLOUDFLARE_ENV=${target} npm run build.`;
  }
  return "";
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const target = process.argv[2] ?? "";
  const problem = await checkDeployTarget(target);
  if (problem) { console.error(`Deploy refused: ${problem}`); process.exit(1); }
  console.log(`Deploy target OK: ${expected[target].name} (${expected[target].database}).`);
}
