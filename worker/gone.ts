// Infographic reports from the old ChatGPT Sites version of the site. They were
// not migrated and the owner removed them for good (2026-11-09), so they answer
// 410 Gone instead of 404, which tells search engines to drop them sooner.
const GONE_REPORT_SLUGS = [
  "bilim-yeni-bir-altin-cag-infografik-serisi-25-sayfa-7f6b3227",
  "faizin-700-yillik-yolculugu-1310-2024-infografikler-471603a8",
  "genc-yazilimcilar-is-piyasasi-infografik-serisi-afd4e132",
  "haziran-2026-ekonomik-gorunum-10-infografik-f4990067",
  "kentlesen-dunya-10-infografik-bafe853b",
  "kredi-uretim-sektorel-analiz-infografikleri-dc933c8c",
  "powering-intelligence-2026-tr-infografik-serisi-33105abe",
  "samd-gelecegi-infografik-sunum-0f76fa76",
  "turkiye-elektrik-fiyatlari-infografik-serisi-077f7340",
  "turkiye-is-gucu-piyasasinda-buyuk-makas-infografikler-c551d319",
  "turkiye-sanayi-dinamikleri-2014-2026-infografik-serisi-cdafed7f",
  "uretkken-yapay-zeka-ekonomisi-10-infografik-57fbade4",
  "uzay-rekabeti-ve-yeni-uzay-ekonomisi-10-infografik-618f2a97",
];

const GONE_PATHS = new Set(GONE_REPORT_SLUGS.flatMap(slug => [
  `/tr/icgoruler/rapor/${slug}`,
  `/en/insights/report/${slug}`,
]));

export function isGonePath(pathname: string): boolean {
  return GONE_PATHS.has(pathname.replace(/\/+$/, ""));
}

export function goneResponse(pathname: string): Response {
  const tr = pathname.startsWith("/tr/");
  const body = tr
    ? `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Rapor kaldırıldı | Ganrich Advisory</title></head><body><h1>Bu rapor kaldırıldı</h1><p><a href="/tr/icgoruler">Teknik notlara dön</a></p></body></html>`
    : `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Report removed | Ganrich Advisory</title></head><body><h1>This report has been removed</h1><p><a href="/en/insights">Back to technical notes</a></p></body></html>`;
  return new Response(body, {
    status: 410,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=3600", "x-robots-tag": "noindex" },
  });
}
