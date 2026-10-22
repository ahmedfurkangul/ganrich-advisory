"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { PdfInsight } from "../db/pdf-insights";
import type { Lang } from "./content";
import { routeMap } from "./content";

const contentTypes = ["Report", "Infographic Series", "Report Extract", "Executive Briefing", "Strategic Perspective", "Research Paper", "Data Note", "Framework", "Field Note", "Regional Outlook", "Annual Outlook", "Case Note", "Presentation", "Archived Publication", "Other"];

function reportHref(lang: Lang, insight: Pick<PdfInsight, "slug"> & Partial<Pick<PdfInsight, "language">>) {
  const documentLanguage = insight.language ?? lang;
  return documentLanguage === "en" ? `/en/insights/report/${insight.slug}` : `/tr/icgoruler/rapor/${insight.slug}`;
}

function statusLabel(status: string, lang: Lang) {
  const labels: Record<string, [string, string]> = {
    uploaded: ["Uploaded", "Yüklendi"],
    processing: ["Processing", "İşleniyor"],
    review_required: ["Review required", "İnceleme gerekli"],
    translation_required: ["Translation required", "Çeviri gerekli"],
    ready_for_preview: ["Ready for preview", "Önizlemeye hazır"],
    approved: ["Approved", "Onaylandı"],
    published: ["Published", "Yayımlandı"],
    archived: ["Archived", "Arşivlendi"],
    processing_failed: ["Processing failed", "İşleme başarısız oldu"],
  };
  return labels[status]?.[lang === "en" ? 0 : 1] ?? status;
}

export function PdfReader({ insight, lang, editorial = false }: { insight: PdfInsight; lang: Lang; editorial?: boolean }) {
  const initial = typeof window !== "undefined" ? Number(new URLSearchParams(window.location.search).get("report-page")) || 1 : 1;
  const [page, setPage] = useState(initial);
  const [loaded, setLoaded] = useState(editorial);
  const sectionRef = useRef<HTMLElement>(null);
  const fileUrl = `/api/pdf-insights/${insight.id}/document`;
  const max = insight.pageCount ?? 999;

  const go = (next: number) => {
    const safe = Math.max(1, Math.min(max, next || 1));
    setPage(safe);
    const url = new URL(window.location.href);
    url.searchParams.set("report-page", String(safe));
    window.history.replaceState({}, "", url);
  };

  return <section className="pdf-reader" id="original-report" ref={sectionRef}>
    <header>
      <div><span className="eyebrow">{lang === "en" ? "AUTHORITATIVE SOURCE" : "YETKİLİ KAYNAK"}</span><h2>{lang === "en" ? "Read the original report" : "Özgün raporu inceleyin"}</h2><p>{lang === "en" ? "Explore the complete publication, including its original charts, sources, and methodology." : "Özgün grafikler, kaynaklar ve yöntem dâhil olmak üzere yayının tamamını inceleyin."}</p></div>
      <div className="pdf-source-badge"><strong>PDF</strong><span>{insight.version ? `v${insight.version}` : "v1"}</span></div>
    </header>
    <div className="pdf-toolbar" role="toolbar" aria-label={lang === "en" ? "PDF reader controls" : "PDF okuyucu kontrolleri"}>
      <button type="button" onClick={() => go(page - 1)} disabled={page <= 1} aria-label={lang === "en" ? "Previous page" : "Önceki sayfa"}>←</button>
      <label>{lang === "en" ? "Page" : "Sayfa"} <input type="number" min="1" max={max} value={page} onChange={e => go(Number(e.target.value))}/>{insight.pageCount ? <span>/ {insight.pageCount}</span> : null}</label>
      <button type="button" onClick={() => go(page + 1)} disabled={Boolean(insight.pageCount && page >= insight.pageCount)} aria-label={lang === "en" ? "Next page" : "Sonraki sayfa"}>→</button>
      <span className="pdf-toolbar-spacer"/>
      <a href={`${fileUrl}#page=${page}&zoom=page-width`} target="_blank" rel="noreferrer">{lang === "en" ? "Open full PDF" : "Tam PDF’yi aç"} ↗</a>
      <a href={`${fileUrl}?download=1`}>{lang === "en" ? "Download" : "İndir"} ↓</a>
    </div>
    {loaded ? <iframe title={`${insight.title} - ${lang === "en" ? "original PDF" : "özgün PDF"}`} src={`${fileUrl}#page=${page}&zoom=page-width`}/> : <div className="pdf-reader-poster"><div className="report-cover-art" aria-hidden="true"><span>PDF</span><i/><i/><i/></div><div><strong>{insight.title}</strong><p>{lang === "en" ? "The reader loads only when requested so the editorial page remains fast." : "Editoryal sayfanın hızlı kalması için okuyucu yalnızca istendiğinde yüklenir."}</p><button className="button" type="button" onClick={() => setLoaded(true)}>{lang === "en" ? "Open embedded reader" : "Gömülü okuyucuyu aç"}</button></div></div>}
    <noscript>{lang === "en" ? "The embedded document could not be displayed. Open or download the original PDF." : "Gömülü belge görüntülenemedi. Özgün PDF’yi açın veya indirin."}</noscript>
  </section>;
}

type UploadState = { name: string; progress: number; status: string; error?: string };

export function PdfInsightStudio({ lang, editor }: { lang: Lang; editor: string }) {
  const isEn = lang === "en";
  const [items, setItems] = useState<PdfInsight[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [draft, setDraft] = useState<PdfInsight | null>(null);
  const [uploads, setUploads] = useState<UploadState[]>([]);
  const [drag, setDrag] = useState(false);
  const [notice, setNotice] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const refresh = async (select?: string) => {
    const response = await fetch("/api/pdf-insights", { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error ?? "Unable to load PDF insights.");
    setItems(data.insights);
    const id = select ?? selectedId ?? data.insights[0]?.id;
    setSelectedId(id);
    setDraft(data.insights.find((item: PdfInsight) => item.id === id) ?? data.insights[0] ?? null);
  };

  // The initial load intentionally runs once; later refreshes are triggered by editorial actions.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { queueMicrotask(() => refresh().catch(error => setNotice(error.message))); }, []);
  useEffect(() => { const next = items.find(item => item.id === selectedId) ?? null; queueMicrotask(() => setDraft(next)); }, [selectedId, items]);

  const upload = (files: FileList | File[]) => {
    const valid = Array.from(files);
    if (!valid.length) return;
    const states = valid.map(file => ({ name: file.name, progress: 0, status: "uploading" }));
    setUploads(states);
    const form = new FormData();
    valid.forEach(file => form.append("files", file));
    form.append("language", lang);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/pdf-insights");
    xhr.upload.onprogress = event => {
      if (!event.lengthComputable) return;
      const progress = Math.round(event.loaded / event.total * 100);
      setUploads(current => current.map(item => ({ ...item, progress })));
    };
    xhr.onload = () => {
      const data = JSON.parse(xhr.responseText || "{}");
      if (xhr.status >= 200 && xhr.status < 300) {
        setUploads(current => current.map(item => ({ ...item, progress: 100, status: "review_required" })));
        setNotice(isEn ? "Upload complete. Editorial review is required before publication." : "Yükleme tamamlandı. Yayımdan önce editoryal inceleme gereklidir.");
        refresh(data.uploaded?.[0]?.id).catch(error => setNotice(error.message));
      } else {
        setUploads(current => current.map(item => ({ ...item, status: "error", error: data.error ?? data.errors?.[0]?.error ?? "Upload failed" })));
      }
    };
    xhr.onerror = () => setUploads(current => current.map(item => ({ ...item, status: "error", error: isEn ? "Upload failed. Retry." : "Yükleme başarısız. Yeniden deneyin." })));
    xhr.send(form);
  };

  const update = <K extends keyof PdfInsight>(key: K, value: PdfInsight[K]) => setDraft(current => current ? { ...current, [key]: value } : current);
  const findingsText = useMemo(() => draft?.keyFindings.map(f => `${f.title} | ${f.explanation} | ${f.page ?? ""}`).join("\n") ?? "", [draft?.keyFindings]);
  const implicationsText = useMemo(() => draft?.leadershipImplications.join("\n") ?? "", [draft?.leadershipImplications]);

  const save = async (publish = false) => {
    if (!draft) return;
    const body = { ...draft, status: publish ? "published" : "ready_for_preview" };
    const response = await fetch("/api/pdf-insights", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    const data = await response.json();
    if (!response.ok) {
      setNotice(data.error ?? (isEn ? "The insight could not be saved." : "İçgörü kaydedilemedi."));
      return;
    }
    setNotice(publish ? (isEn ? "Published. The PDF is now the authoritative source for the web insight." : "Yayımlandı. PDF artık web içgörüsünün yetkili kaynağıdır.") : (isEn ? "Draft saved for preview." : "Taslak önizleme için kaydedildi."));
    await refresh(draft.id);
  };

  const workflow = isEn ? ["Upload", "Extract", "Review", "Enrich", "Preview", "Publish"] : ["Yükle", "İçeriği Çıkar", "Gözden Geçir", "Zenginleştir", "Önizle", "Yayımla"];
  const governance: [keyof PdfInsight, string][] = isEn ? [
    ["rightsConfirmed", "Rights confirmed"], ["confidentialityReviewed", "Confidentiality reviewed"], ["personalDataReviewed", "Personal data reviewed"], ["sourcesReviewed", "Sources reviewed"], ["translationReviewed", "Translation reviewed"], ["aiRetrievalApproved", "Approved for AI-assisted retrieval"], ["finalApproval", "Final publication approved"],
  ] : [
    ["rightsConfirmed", "Haklar onaylandı"], ["confidentialityReviewed", "Gizlilik incelendi"], ["personalDataReviewed", "Kişisel veriler incelendi"], ["sourcesReviewed", "Kaynaklar incelendi"], ["translationReviewed", "Çeviri incelendi"], ["aiRetrievalApproved", "Yapay zekâ destekli erişim için onaylandı"], ["finalApproval", "Nihai yayın onaylandı"],
  ];

  return <div className="pdf-studio">
    <header className="pdf-studio-hero"><div><span className="eyebrow">{isEn ? "EDITORIAL CONTROL ROOM" : "EDİTORYAL KONTROL ODASI"}</span><h1>{isEn ? "Add PDF Insight" : "PDF İçgörüsü Ekle"}</h1><p>{isEn ? "The PDF is the authority. The web page is the editorial experience. The embedded reader is the verification layer." : "PDF yetkili kaynaktır. Web sayfası editoryal deneyimdir. Gömülü okuyucu doğrulama katmanıdır."}</p></div><div><span>{isEn ? "SIGNED-IN EDITOR" : "OTURUM AÇMIŞ EDİTÖR"}</span><strong>{editor}</strong><small>{isEn ? "Every publication requires explicit approval." : "Her yayın açık onay gerektirir."}</small></div></header>
    <ol className="ingest-steps">{workflow.map((step, index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>)}</ol>
    <section className={`pdf-drop ${drag ? "drag" : ""}`} onDragOver={event => { event.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={event => { event.preventDefault(); setDrag(false); upload(event.dataTransfer.files); }}>
      <input ref={inputRef} type="file" accept="application/pdf,.pdf" multiple hidden onChange={event => event.target.files && upload(event.target.files)}/>
      <span className="eyebrow">{isEn ? "SECURE DOCUMENT INTAKE" : "GÜVENLİ BELGE ALIMI"}</span><h2>{isEn ? "Drop one or more authoritative PDFs here." : "Bir veya daha fazla yetkili PDF’yi buraya bırakın."}</h2><p>{isEn ? "PDF only · maximum 75 MB per file · duplicate detection enabled · nothing publishes automatically" : "Yalnızca PDF · dosya başına en fazla 75 MB · kopya tespiti etkin · hiçbir belge otomatik yayımlanmaz"}</p><button className="button outline" type="button" onClick={() => inputRef.current?.click()}>{isEn ? "Choose PDF files" : "PDF dosyalarını seçin"}</button>
    </section>
    {uploads.length > 0 && <ul className="upload-queue">{uploads.map(file => <li key={file.name}><div><strong>{file.name}</strong><small>{file.error ?? statusLabel(file.status, lang)}</small></div><progress max="100" value={file.progress}/><span>{file.progress}%</span></li>)}</ul>}
    {notice && <p className="studio-notice" role="status">{notice}</p>}
    <section className="editorial-console">
      <aside className="document-queue"><header><span className="eyebrow">{isEn ? "INGESTION QUEUE" : "ALIM KUYRUĞU"}</span><strong>{items.length}</strong></header>{items.length ? <ol>{items.map(item => <li key={item.id}><button className={selectedId === item.id ? "active" : ""} onClick={() => setSelectedId(item.id)}><span>{item.language.toUpperCase()} · v{item.version}</span><strong>{item.title}</strong><small>{statusLabel(item.status, lang)}</small></button></li>)}</ol> : <p>{isEn ? "No PDFs have been uploaded. The workspace remains source-empty rather than inventing report content." : "Henüz PDF yüklenmedi. Çalışma alanı, rapor içeriği uydurmak yerine kaynak olmadan bekler."}</p>}</aside>
      {draft ? <div className="review-workspace">
        <section className="source-pane"><header><span className="eyebrow">{isEn ? "ORIGINAL PDF" : "ÖZGÜN PDF"}</span><small>{isEn ? "Verification layer" : "Doğrulama katmanı"}</small></header><PdfReader insight={draft} lang={lang} editorial/></section>
        <form className="metadata-pane" onSubmit={event => { event.preventDefault(); save(false); }}>
          <header><div><span className="eyebrow">{isEn ? "WEB-NATIVE EDITORIAL PAGE" : "WEB UYUMLU EDİTORYAL SAYFA"}</span><h2>{isEn ? "Review every claim against the source." : "Her iddiayı kaynakla karşılaştırın."}</h2></div><span className="provenance-tag">{isEn ? "Requires confirmation" : "Onay gerekli"}</span></header>
          <div className="metadata-grid">
            <label>{isEn ? "Title" : "Başlık"}<input value={draft.title} onChange={e => update("title", e.target.value)}/><small>{isEn ? "Extracted from filename · confirm against cover" : "Dosya adından çıkarıldı · kapakla doğrulayın"}</small></label>
            <label>{isEn ? "Content type" : "İçerik türü"}<select value={draft.contentType} onChange={e => update("contentType", e.target.value)}>{contentTypes.map(type => <option key={type}>{type}</option>)}</select></label>
            <label>{isEn ? "Document language" : "Belge dili"}<select value={draft.language} onChange={e => update("language", e.target.value as "en" | "tr")}><option value="en">English</option><option value="tr">Türkçe</option></select></label>
            <label>{isEn ? "Author" : "Yazar"}<input value={draft.author} onChange={e => update("author", e.target.value)}/><small>{isEn ? "Do not infer from filename" : "Dosya adından çıkarsamayın"}</small></label>
            <label>{isEn ? "Publication date" : "Yayın tarihi"}<input type="date" value={draft.publicationDate ?? ""} onChange={e => update("publicationDate", e.target.value)}/></label>
            <label>{isEn ? "Pages" : "Sayfa"}<input type="number" min="1" value={draft.pageCount ?? ""} onChange={e => update("pageCount", Number(e.target.value) || null)}/></label>
            <label className="wide">{isEn ? "Subtitle" : "Alt başlık"}<input value={draft.subtitle} onChange={e => update("subtitle", e.target.value)}/></label>
            <label className="wide">{isEn ? "Executive thesis" : "Yönetici tezi"}<textarea value={draft.executiveThesis} onChange={e => update("executiveThesis", e.target.value)}/><small>{isEn ? "25–60 words · grounded strictly in the PDF" : "25–60 kelime · yalnızca PDF’ye dayalı"}</small></label>
            <label className="wide">{isEn ? "Executive summary" : "Yönetici özeti"}<textarea className="tall" value={draft.executiveSummary} onChange={e => update("executiveSummary", e.target.value)}/><small>{isEn ? "150–350 words · no unsupported facts" : "150–350 kelime · desteklenmeyen bilgi içermez"}</small></label>
            <label className="wide">{isEn ? "Key findings" : "Temel bulgular"}<textarea className="tall" value={findingsText} onChange={e => update("keyFindings", e.target.value.split("\n").filter(Boolean).map(line => { const [title, explanation, page] = line.split("|").map(x => x.trim()); return { title, explanation, page: Number(page) || undefined }; }))}/><small>{isEn ? "One per line: title | explanation | PDF page" : "Her satır: başlık | açıklama | PDF sayfası"}</small></label>
            <label className="wide">{isEn ? "What this means for leaders" : "Liderler için anlamı"}<textarea value={implicationsText} onChange={e => update("leadershipImplications", e.target.value.split("\n").filter(Boolean))}/><small>{isEn ? "Optional editor-approved interpretation · one implication per line" : "İsteğe bağlı, editör onaylı yorum · her satırda bir çıkarım"}</small></label>
            <label className="wide">{isEn ? "Methodology and source notes" : "Yöntem ve kaynak notları"}<textarea value={draft.methodology} onChange={e => update("methodology", e.target.value)}/></label>
            <label className="wide">{isEn ? "Limitations" : "Sınırlılıklar"}<textarea value={draft.limitations} onChange={e => update("limitations", e.target.value)}/></label>
            <label>{isEn ? "Access model" : "Erişim modeli"}<select value={draft.gatingModel} onChange={e => update("gatingModel", e.target.value)}><option value="fully_ungated">{isEn ? "Fully ungated" : "Tamamen açık"}</option><option value="pdf_gated">{isEn ? "Web summary open, PDF gated" : "Web özeti açık, PDF kısıtlı"}</option><option value="briefing_by_request">{isEn ? "Public summary, briefing by request" : "Açık özet, talep üzerine brifing"}</option><option value="private">{isEn ? "Private / invitation only" : "Özel / davetli"}</option></select></label>
          </div>
          <fieldset className="governance"><legend>{isEn ? "Rights, privacy, and publication controls" : "Haklar, gizlilik ve yayın kontrolleri"}</legend>{governance.map(([key, label]) => <label key={key}><input type="checkbox" checked={Boolean(draft[key])} onChange={e => update(key, e.target.checked as never)}/><span>{label}</span></label>)}</fieldset>
          <div className="studio-actions"><button className="button" type="submit">{isEn ? "Save for preview" : "Önizleme için kaydet"}</button><a className="text-link" href={reportHref(lang, draft)} target="_blank" rel="noreferrer">{isEn ? "Open web preview" : "Web önizlemesini aç"} ↗</a><button className="publish-control" type="button" onClick={() => save(true)}>{isEn ? "Publish approved insight" : "Onaylı içgörüyü yayımla"}</button></div>
        </form>
      </div> : <div className="studio-empty"><span>PDF</span><h2>{isEn ? "Upload an authoritative source to begin." : "Başlamak için yetkili bir kaynak yükleyin."}</h2><p>{isEn ? "No report thesis, findings, author, date, or evidence will be invented in this workspace." : "Bu çalışma alanında rapor tezi, bulgu, yazar, tarih veya kanıt uydurulmayacaktır."}</p></div>}
    </section>
  </div>;
}

export function PdfInsightReport({ lang, insight }: { lang: Lang; insight: PdfInsight }) {
  const isEn = lang === "en";
  const goToPage = (page?: number) => {
    if (!page) return;
    const url = new URL(window.location.href);
    url.searchParams.set("report-page", String(page));
    window.history.replaceState({}, "", url);
    document.getElementById("original-report")?.scrollIntoView({ behavior: "smooth" });
  };
  return <article className="pdf-report">
    <header className="pdf-report-hero">
      <nav aria-label={isEn ? "Breadcrumb" : "İçerik yolu"}><a href={`/${lang}`}>Ganrich</a><span>/</span><a href={`/${lang}/${routeMap[lang].insights}`}>{isEn ? "Insights" : "İçgörüler"}</a><span>/</span><span>{insight.contentType}</span></nav>
      <div className="pdf-report-title"><div><p className="meta">{insight.contentType} · {insight.language.toUpperCase()} · v{insight.version}</p><h1>{insight.title}</h1>{insight.subtitle && <p>{insight.subtitle}</p>}</div><div className="report-cover-art" aria-label={isEn ? "Website editorial image, not the original report cover" : "Web sitesi editoryal görseli; özgün rapor kapağı değildir"}><span>PDF</span><i/><i/><i/><small>{isEn ? "EDITORIAL IMAGE" : "EDİTORYAL GÖRSEL"}</small></div></div>
      <dl>{insight.author && <div><dt>{isEn ? "Author" : "Yazar"}</dt><dd>{insight.author}</dd></div>}{insight.publicationDate && <div><dt>{isEn ? "Published" : "Yayımlanma tarihi"}</dt><dd>{insight.publicationDate}</dd></div>}{insight.pageCount && <div><dt>{isEn ? "Pages" : "Sayfa"}</dt><dd>{insight.pageCount}</dd></div>}<div><dt>{isEn ? "Available languages" : "Mevcut diller"}</dt><dd>{insight.language === "en" ? "English" : "Türkçe"}</dd></div></dl>
    </header>
    <section className="report-thesis section"><span className="eyebrow">{isEn ? "EXECUTIVE THESIS" : "YÖNETİCİ TEZİ"}</span><h2>{insight.executiveThesis}</h2><small>{isEn ? "Editorially structured from the original publication." : "Özgün yayından editoryal olarak yapılandırılmıştır."}</small></section>
    {insight.executiveSummary && <section className="report-summary section"><div><span className="eyebrow">{isEn ? "EXECUTIVE SUMMARY" : "YÖNETİCİ ÖZETİ"}</span><h2>{isEn ? "The report in brief." : "Kısaca rapor."}</h2></div><p>{insight.executiveSummary}</p></section>}
    {insight.keyFindings.length > 0 && <section className="report-findings section"><header><span className="eyebrow">{isEn ? "KEY FINDINGS" : "TEMEL BULGULAR"}</span><h2>{isEn ? "What the source supports." : "Kaynağın desteklediği bulgular."}</h2></header><ol>{insight.keyFindings.map((finding, index) => <li key={`${finding.title}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{finding.title}</h3><p>{finding.explanation}</p>{finding.page && <button type="button" onClick={() => goToPage(finding.page)}>{isEn ? `View in original report - page ${finding.page}` : `Özgün raporda görüntüle - sayfa ${finding.page}`} ↓</button>}</div></li>)}</ol></section>}
    {insight.leadershipImplications.length > 0 && <section className="report-implications section"><span className="eyebrow">{isEn ? "EDITOR-APPROVED INTERPRETATION" : "EDİTÖR ONAYLI YORUM"}</span><h2>{isEn ? "What this means for leaders" : "Liderler için anlamı"}</h2><ul>{insight.leadershipImplications.map(item => <li key={item}>{item}</li>)}</ul></section>}
    {(insight.methodology || insight.limitations) && <details className="report-provenance section"><summary><span>{isEn ? "Sources and methodology" : "Kaynaklar ve yöntem"}</span><i>+</i></summary><div><dl><div><dt>{isEn ? "Original document" : "Özgün belge"}</dt><dd>{insight.title}, v{insight.version}</dd></div>{insight.dataPeriod && <div><dt>{isEn ? "Data period" : "Veri dönemi"}</dt><dd>{insight.dataPeriod}</dd></div>}{insight.methodology && <div><dt>{isEn ? "Methodology" : "Yöntem"}</dt><dd>{insight.methodology}</dd></div>}{insight.limitations && <div><dt>{isEn ? "Limitations" : "Sınırlılıklar"}</dt><dd>{insight.limitations}</dd></div>}<div><dt>{isEn ? "Last editorial review" : "Son editoryal inceleme"}</dt><dd>{insight.updatedAt.slice(0, 10)}</dd></div></dl></div></details>}
    {insight.gatingModel === "fully_ungated" ? <PdfReader insight={insight} lang={lang}/> : <section className="report-access section"><span className="eyebrow">{isEn ? "DOCUMENT ACCESS" : "BELGE ERİŞİMİ"}</span><h2>{insight.gatingModel === "pdf_gated" ? (isEn ? "The editorial analysis is open. The source document is shared on request." : "Editoryal analiz açıktır. Kaynak belge talep üzerine paylaşılır.") : (isEn ? "Continue through a prepared briefing." : "Hazırlıklı bir brifing ile devam edin.")}</h2><p>{isEn ? "Share the decision context. Ganrich will confirm the appropriate access path without exposing restricted material." : "Karar bağlamını paylaşın. Ganrich, kısıtlı materyali açığa çıkarmadan uygun erişim yolunu teyit edecektir."}</p><a className="button outline" href={`/${lang}/${routeMap[lang].privateBriefing}`}>{isEn ? "Request access" : "Erişim talep edin"} ↗</a></section>}
    <section className="report-related section"><div><span className="eyebrow">{isEn ? "CONTINUE THE DECISION" : "KARARA DEVAM EDİN"}</span><h2>{isEn ? "From evidence to action." : "Kanıttan eyleme."}</h2></div><div><a href={`/${lang}/${routeMap[lang].decisionFramer}`}>{isEn ? "Frame the decision" : "Kararı çerçeveleyin"} ↗</a><a href={`/${lang}/${routeMap[lang].privateBriefing}`}>{isEn ? "Request a private briefing" : "Özel brifing talep edin"} ↗</a><a href={`/${lang}/${routeMap[lang].insights}`}>{isEn ? "Related perspectives" : "İlgili perspektifler"} ↗</a></div></section>
  </article>;
}
