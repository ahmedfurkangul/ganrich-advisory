import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const failures = [];
const passes = [];

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

function check(label, condition, detail) {
  if (condition) passes.push(label);
  else failures.push(`${label}: ${detail}`);
}

async function sourceFiles(directory) {
  const entries = await readdir(path.join(root, directory), { withFileTypes: true });
  const files = await Promise.all(entries.map(async entry => {
    const relative = path.join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(relative);
    return /\.(?:ts|tsx|js|mjs|css)$/.test(entry.name) ? [relative] : [];
  }));
  return files.flat();
}

const hosting = JSON.parse(await readFile(path.join(root, ".openai/hosting.json"), "utf8"));
check("Sites project is persisted", typeof hosting.project_id === "string" && hosting.project_id.length > 10, "missing project_id");
check("D1 binding is declared", hosting.d1 === "DB", "expected logical DB binding");
check("R2 binding is declared", hosting.r2 === "DOCUMENTS", "expected logical DOCUMENTS binding");

const envExample = await readFile(path.join(root, ".env.example"), "utf8");
check("Canonical production host is configured", envExample.includes("NEXT_PUBLIC_SITE_URL=https://ganrichadvisory.com"), "production origin is missing or different");
check("Analytics remains off by default", envExample.includes("NEXT_PUBLIC_ANALYTICS_MODE=off"), "analytics must not activate implicitly");

const requiredFiles = [
  "app/sitemap.ts",
  "app/reports-sitemap.xml/route.ts",
  "app/robots.ts",
  "app/feed.xml/route.ts",
  "app/[lang]/feed.xml/route.ts",
  "app/not-found.tsx",
  "app/error.tsx",
  "LAUNCH-READINESS.md",
  "RELEASE-SIGN-OFF.md",
  "drizzle/0000_volatile_skin.sql",
  "drizzle/0001_lonely_sauron.sql",
];
const fileResults = await Promise.all(requiredFiles.map(exists));
check("Release-critical files are present", fileResults.every(Boolean), requiredFiles.filter((_, index) => !fileResults[index]).join(", "));

const files = await sourceFiles("app");
const contents = await Promise.all(files.map(file => readFile(path.join(root, file), "utf8")));
const prospectSource = contents.join("\n");
const forbidden = [
  "Ganrich Consulting",
  "EDITORIAL PROTOTYPE",
  "Interface prototype",
  "[PUBLICATION DATE]",
  "[AUTHOR]",
  "[EMAIL]",
  "[LINKEDIN]",
].filter(marker => prospectSource.includes(marker));
check("Prospect-facing placeholder audit is clean", forbidden.length === 0, forbidden.join(", "));
check("Verified direct email remains available", prospectSource.includes("furkangul@gmail.com"), "verified contact email is absent");

const buildEntry = "dist/server/index.js";
check("Deployable server entry exists", await exists(buildEntry), "run npm run build");
if (await exists(buildEntry)) {
  const buildTime = (await stat(path.join(root, buildEntry))).mtimeMs;
  const sourceTimes = await Promise.all([...files, "next.config.ts", "package.json"].map(async file => (await stat(path.join(root, file))).mtimeMs));
  check("Build is not older than source", buildTime >= Math.max(...sourceTimes), "run npm run build after the latest source change");
}

console.log(`Ganrich release preflight: ${passes.length} technical checks passed.`);
for (const label of passes) console.log(`  PASS  ${label}`);
if (failures.length) {
  for (const failure of failures) console.error(`  FAIL  ${failure}`);
  process.exitCode = 1;
} else {
  console.log("Owner, counsel, accessibility, and production-operation approvals remain governed by RELEASE-SIGN-OFF.md.");
}
