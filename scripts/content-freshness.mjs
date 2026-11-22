// Lists the dated, fact-heavy content (guides, rule hubs, the regulation calendar) by the date its facts
// were last checked, oldest first, and flags anything older than the threshold (default 30 days).
// Usage: node --experimental-strip-types scripts/content-freshness.mjs [days]
// Exit code is 0 either way: this is a reading list for the weekly review, not a gate.
import { guides } from "../app/guides-content.ts";
import { ruleHubs } from "../app/rule-hubs-content.ts";
import { CALENDAR_CHECKED } from "../app/regulation-calendar.ts";

const days = Number(process.argv[2] ?? 30);
const today = new Date();
const months = { January: 0, February: 1, March: 2, April: 3, May: 4, June: 5, July: 6, August: 7, September: 8, October: 9, November: 10, December: 11 };

// "23–24 October 2026" or "on 22 November 2026": take the last day-month-year in the text.
function lastDate(text) {
  const all = [...text.matchAll(/(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/g)];
  const m = all.at(-1);
  return m ? new Date(Date.UTC(+m[3], months[m[2]], +m[1])) : null;
}

const rows = [
  ...guides.map(g => ({ kind: "guide", key: g.key, checked: lastDate(g.checked.en) ?? new Date(g.dateModified ?? g.date) })),
  ...ruleHubs.map(h => ({ kind: "hub", key: h.key, checked: lastDate(h.en.checked) })),
  { kind: "calendar", key: "regulationCalendar", checked: new Date(CALENDAR_CHECKED.date) },
].sort((a, b) => (a.checked?.getTime() ?? 0) - (b.checked?.getTime() ?? 0));

const iso = d => d ? d.toISOString().slice(0, 10) : "unknown";
let stale = 0;
for (const r of rows) {
  const age = r.checked ? Math.floor((today - r.checked) / 86400000) : Infinity;
  const flag = age > days ? "RECHECK" : "ok";
  if (flag === "RECHECK") stale++;
  console.log(`${flag.padEnd(8)} ${iso(r.checked)}  ${String(age === Infinity ? "?" : age).padStart(4)} d  ${r.kind.padEnd(8)} ${r.key}`);
}
console.log(`\n${stale} of ${rows.length} items last checked more than ${days} days ago.`);
