import { listPdfInsights, type PdfInsight } from "../db/pdf-insights";
import { services } from "./advisory-content";
import { notes } from "./advisory-note-content";
import { insightArticles, insightHref, Lang, routeMap } from "./content";
import { absoluteUrl } from "./site-config";
import { solutions, solutionTags, solutionThemes } from "./solutions-content";
import { CONTACT_EMAIL, COMPANY_LINKEDIN } from "./structured-data";

// llms.txt (https://llmstxt.org): a plain Markdown map of the site for AI assistants and answer engines.
// It only repeats what the public pages already say. Report summaries go into llms-full.txt only when
// the editor ticked "AI retrieval approved" for that report in the PDF studio.

const langs: Lang[] = ["en", "tr"];
const url = (lang: Lang, key: string) => absoluteUrl(`/${lang}/${routeMap[lang][key]}`);
const reportUrl = (r: PdfInsight) => absoluteUrl(r.language === "en" ? `/en/insights/report/${r.slug}` : `/tr/icgoruler/rapor/${r.slug}`);
const oneLine = (value: string) => value.replace(/\s+/g, " ").trim();

const intro = [
  "# Ganrich Advisory",
  "",
  "> Ganrich Advisory is an independent strategy, transformation and applied-AI advisory based in Istanbul, Türkiye. It helps businesses entering new markets, founder-led companies building stronger organisations, and industrial and export teams facing new EU rules decide what to do next and turn that decision into execution. The site is bilingual (English at /en, Turkish at /tr).",
  "",
  "- Founder: Ahmed Furkan Gul, previously Chief Strategy and Business Development Officer at Tay Group; Assistant Professor at İstanbul Kent University.",
  "- Regions: Türkiye, Middle East and North Africa, Europe, Africa.",
  `- Contact: ${CONTACT_EMAIL} · ${absoluteUrl("/en/contact")}`,
  `- LinkedIn: ${COMPANY_LINKEDIN}`,
  "- Engagements are scoped after a first conversation. The site publishes no prices, durations, client names or results.",
];

async function publicReports() {
  const reports = await listPdfInsights({ status: "published" }).catch(() => [] as PdfInsight[]);
  return reports.filter(r => r.gatingModel !== "private");
}

export async function renderLlmsTxt() {
  const reports = await publicReports();
  const out = [...intro, ""];
  for (const lang of langs) {
    const en = lang === "en";
    out.push(`## ${en ? "Advisory services (English)" : "Danışmanlık hizmetleri (Türkçe)"}`, "");
    for (const s of services[lang]) out.push(`- [${s.title}](${url(lang, s.key)}): ${oneLine(s.intro)}`);
    out.push("", `## ${en ? "Solutions programmes (English)" : "Çözüm programları (Türkçe)"}`, "", `- [${en ? "All programmes" : "Tüm programlar"}](${url(lang, "solutions")})`);
    for (const s of solutions[lang]) out.push(`- [${s.title}](${url(lang, s.key)}): ${oneLine(s.tagline)} (${solutionTags[lang][s.key].join(", ")})`);
    out.push("", `## ${en ? "Insights (English)" : "İçgörüler (Türkçe)"}`, "");
    insightArticles[lang].forEach((a, i) => out.push(`- [${a.title}](${absoluteUrl(insightHref(lang, i))}): ${oneLine(a.thesis)}`));
    for (const n of notes[lang]) out.push(`- [${n.title}](${url(lang, n.key)}): ${oneLine(n.thesis)}`);
    const own = reports.filter(r => r.language === lang);
    if (own.length) {
      out.push("", `## ${en ? "Whitepapers and reports (English)" : "Teknik notlar ve raporlar (Türkçe)"}`, "");
      for (const r of own) out.push(`- [${r.title}](${reportUrl(r)}): ${oneLine(r.shortSummary || r.executiveThesis || r.subtitle)}`);
    }
    out.push("");
  }
  out.push("## Optional", "",
    `- [Full text for AI assistants](${absoluteUrl("/llms-full.txt")}): services, programmes and notes in full.`,
    `- [About the founder](${url("en", "about")})`,
    `- [Decision Lab](${url("en", "decisionLab")}): free tools for framing decisions and testing assumptions.`,
    `- [Sitemap](${absoluteUrl("/sitemap.xml")}) · [Reports sitemap](${absoluteUrl("/reports-sitemap.xml")}) · [RSS](${absoluteUrl("/en/feed.xml")})`,
    "");
  return out.join("\n");
}

export async function renderLlmsFullTxt() {
  const reports = await publicReports();
  const out = [...intro, ""];
  for (const lang of langs) {
    const en = lang === "en";
    out.push(`# ${en ? "English" : "Türkçe"}`, "");
    for (const s of services[lang]) {
      out.push(`## ${s.title}`, "", `URL: ${url(lang, s.key)}`, "", `**${s.question}** ${s.intro}`, "", s.when, "",
        `${en ? "What you leave with" : "Çıktılar"}:`, ...s.deliverables.map(d => `- ${d}`), "",
        `${en ? "Scope and boundaries" : "Kapsam ve sınırlar"}: ${s.boundaries}`, "");
    }
    for (const theme of solutionThemes[lang]) {
      out.push(`## ${theme.label}`, "", oneLine(theme.intro), "");
      for (const s of solutions[lang].filter(x => x.theme === theme.key)) {
        out.push(`### ${s.title}`, "", `URL: ${url(lang, s.key)}`, `${en ? "Topics" : "Konular"}: ${solutionTags[lang][s.key].join(", ")}`, "",
          s.tagline, "", `**${s.question}** ${s.trigger}`, "",
          `${en ? "Who it is for" : "Kimler için"}: ${s.audience}`, "",
          `${en ? "Signals" : "İşaretler"}:`, ...s.signals.map(x => `- ${x}`), "",
          `${en ? "What you leave with" : "Elde edecekleriniz"}:`, ...s.outcomes.map(x => `- ${x}`), "",
          `${en ? "How we start" : "Nasıl başlarız"}: ${s.firstStep}`, "",
          `${en ? "Scope and boundaries" : "Kapsam ve sınırlar"}: ${s.boundaries}`, "");
      }
    }
    for (const n of notes[lang]) {
      out.push(`## ${n.title}`, "", `URL: ${url(lang, n.key)}`, "", n.thesis, "", ...n.sections.flatMap(([h, p]) => [`### ${h}`, "", p, ""]));
    }
    insightArticles[lang].forEach((a, i) => {
      out.push(`## ${a.title}`, "", `URL: ${absoluteUrl(insightHref(lang, i))}`, `${en ? "Published" : "Yayın"}: ${a.date} · ${a.topic}`, "", a.thesis, "",
        ...a.sections.flatMap(sec => [`### ${sec.title}`, "", ...sec.paragraphs.flatMap(p => [p, ""])]));
    });
    for (const r of reports.filter(x => x.language === lang)) {
      out.push(`## ${r.title}`, "", `URL: ${reportUrl(r)}`, "", oneLine(r.shortSummary || r.executiveThesis || r.subtitle), "");
      if (r.aiRetrievalApproved) {
        if (r.executiveSummary) out.push(r.executiveSummary, "");
        if (r.keyFindings.length) out.push(...r.keyFindings.map(f => `- ${oneLine(`${f.title}: ${f.explanation}`)}`), "");
      }
    }
  }
  return out.join("\n");
}

export function textResponse(body: string) {
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=600, s-maxage=3600",
    },
  });
}
