import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { checkDeployTarget } from "../scripts/check-deploy-target.mjs";

async function fakeBuild(name, database) {
  const root = await mkdtemp(path.join(tmpdir(), "deploy-target-"));
  await mkdir(path.join(root, ".wrangler/deploy"), { recursive: true });
  await mkdir(path.join(root, "dist/server"), { recursive: true });
  await writeFile(path.join(root, ".wrangler/deploy/config.json"), JSON.stringify({ configPath: "../../dist/server/wrangler.json" }));
  await writeFile(path.join(root, "dist/server/wrangler.json"), JSON.stringify({ name, d1_databases: [{ binding: "DB", database_name: database }] }));
  return root;
}

test("deploy target check accepts only a build for the same environment", async () => {
  assert.equal(await checkDeployTarget("preview", await fakeBuild("ganrich-preview", "ganrich-preview-db")), "");
  assert.equal(await checkDeployTarget("production", await fakeBuild("ganrich-advisory", "ganrich-prod-db")), "");
  // A plain build (no CLOUDFLARE_ENV) carries the production Worker name with a placeholder database.
  const plain = await fakeBuild("ganrich-advisory", "site-creator-d1");
  assert.match(await checkDeployTarget("preview", plain), /not preview/);
  assert.match(await checkDeployTarget("production", plain), /not production/);
  assert.match(await checkDeployTarget("production", await fakeBuild("ganrich-preview", "ganrich-preview-db")), /not production/);
  assert.match(await checkDeployTarget("preview", await mkdtemp(path.join(tmpdir(), "deploy-target-empty-"))), /No build found/);
  assert.match(await checkDeployTarget("staging"), /Unknown target/);
});
