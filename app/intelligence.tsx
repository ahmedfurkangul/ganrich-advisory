"use client";

import { useEffect, useRef, useState } from "react";
import { insightArticles, insightHref, Lang, markets, routeMap } from "./content";
import { engagementSummary as engagementByKey, EngagementKey } from "./practice-core";
import { optionalPreferencesEnabled } from "./privacy-center";

type BriefItem = { id: string; title: string; type: string; href: string };

/*
 * Decision Lab privacy model
 * - Tools run entirely in the browser; nothing is sent to Ganrich unless the visitor submits the contact form.
 * - Free-text business information is never written to the URL.
 * - Drafts persist in localStorage only after the visitor opts in, and can be deleted at any time.
 * - Hand-offs to the contact form or the Board Brief Builder use sessionStorage (this tab only).
 */

const HANDOFF_KEY = "ganrich-inquiry-handoff";
const BOARD_HANDOFF_KEY = "ganrich-board-handoff";

function keepModalFocus(event: KeyboardEvent, container: HTMLElement | null) {
  if (event.key !== "Tab" || !container) return;
  const controls = [...container.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')];
  if (!controls.length) return;
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function emitSave(item: BriefItem) {
  window.dispatchEvent(new CustomEvent("ganrich-save", { detail: item }));
}

function readJson<T>(storage: Storage | undefined, key: string): T | null {
  try {
    const raw = storage?.getItem(key);
    return raw ? JSON.parse(raw) as T : null;
  } catch {
    return null;
  }
}

/* Sends a tool summary to the contact form through this tab's sessionStorage; the URL carries only a topic key. */
function handoffToContact(lang: Lang, tool: string, summary: string, topic?: EngagementKey) {
  try { sessionStorage.setItem(HANDOFF_KEY, JSON.stringify({ tool, summary: summary.slice(0, 1800) })); } catch { /* storage unavailable: continue without context */ }
  window.location.assign(`/${lang}/${routeMap[lang].contact}${topic ? `?topic=${topic}` : ""}`);
}

type Draft<T> = { value: T; savedAt: string };

/* Draft recovery with explicit visitor control. Nothing is stored until "keep" is switched on. */
function useToolDraft<T>(key: string, initial: T) {
  const storageKey = `ganrich-draft-${key}`;
  const [value, setValue] = useState<T>(initial);
  const [keep, setKeep] = useState(false);
  const [restoredAt, setRestoredAt] = useState("");
  useEffect(() => {
    const stored = readJson<Draft<T>>(typeof window === "undefined" ? undefined : window.localStorage, storageKey);
    if (stored?.value) queueMicrotask(() => { setValue(stored.value); setKeep(true); setRestoredAt(stored.savedAt); });
  }, [storageKey]);
  useEffect(() => {
    if (!keep) return;
    try { localStorage.setItem(storageKey, JSON.stringify({ value, savedAt: new Date().toISOString() })); } catch { /* storage unavailable */ }
  }, [keep, storageKey, value]);
  const changeKeep = (next: boolean) => {
    setKeep(next);
    if (!next) { try { localStorage.removeItem(storageKey); } catch { /* storage unavailable */ } setRestoredAt(""); }
  };
  const clear = () => { changeKeep(false); setValue(initial); };
  return { value, setValue, keep, setKeep: changeKeep, restoredAt, clear };
}

function DraftControl({ lang, keep, setKeep, restoredAt, clear }: { lang: Lang; keep: boolean; setKeep: (next: boolean) => void; restoredAt: string; clear: () => void }) {
  const isEn = lang === "en";
  const when = restoredAt ? new Date(restoredAt).toLocaleString(isEn ? "en-GB" : "tr-TR", { dateStyle: "medium", timeStyle: "short" }) : "";
  return <div className="lab-draft">
    {restoredAt && <p role="status">{isEn ? `Restored your draft saved on this device (${when}).` : `Bu cihazda kayıtlı taslağınız geri yüklendi (${when}).`}</p>}
    <label className="lab-check"><input type="checkbox" checked={keep} onChange={(event) => setKeep(event.target.checked)}/><span>{isEn ? "Keep a draft on this device" : "Taslağı bu cihazda sakla"}</span></label>
    <small>{isEn ? "Off by default. When on, your entries are saved in this browser only and never sent to Ganrich. Switching it off deletes the draft." : "Varsayılan olarak kapalıdır. Açıkken girdileriniz yalnızca bu tarayıcıda saklanır, Ganrich’e gönderilmez. Kapattığınızda taslak silinir."}</small>
    <button type="button" className="lab-text-button" onClick={clear}>{isEn ? "Clear all entries" : "Tüm girdileri temizle"}</button>
  </div>;
}

function CopySummary({ lang, text }: { lang: Lang; text: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const isEn = lang === "en";
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setState("copied"); } catch { setState("failed"); }
    window.setTimeout(() => setState("idle"), 2400);
  };
  return <button type="button" onClick={copy}>{state === "copied" ? (isEn ? "Copied to clipboard" : "Panoya kopyalandı") : state === "failed" ? (isEn ? "Copy failed: select and copy the text" : "Kopyalanamadı: metni seçip kopyalayın") : (isEn ? "Copy summary" : "Özeti kopyala")}</button>;
}

function ToolScopeNote({ lang }: { lang: Lang }) {
  return <p className="disclaimer">{lang === "en"
    ? "This tool structures user-entered information for preliminary exploration. It does not provide a Ganrich recommendation, verify the evidence, or replace professional, legal, investment, or accountable executive judgment."
    : "Bu araç, kullanıcı tarafından girilen bilgileri ön keşif amacıyla yapılandırır. Ganrich önerisi sunmaz, kanıtı doğrulamaz; profesyonel, hukuki, yatırım veya sorumlu yönetici muhakemesinin yerine geçmez."}</p>;
}

export function SaveControl({ lang, item }: { lang: Lang; item: BriefItem }) {
  const [saved, setSaved] = useState(false);
  return (
    <button
      className="save-control"
      type="button"
      onClick={() => {
        emitSave(item);
        setSaved(true);
      }}
    >
      <span aria-hidden="true">{saved ? "✓" : "+"}</span>
      {saved ? (lang === "en" ? "Saved" : "Kaydedildi") : lang === "en" ? "Save to briefing" : "Brifinge kaydet"}
    </button>
  );
}

type ToolMeta = { key: string; name: string; who: string; time: string; output: string; engagement?: EngagementKey };

function toolMeta(lang: Lang): ToolMeta[] {
  const isEn = lang === "en";
  return [
    { key: "marketCompass", name: isEn ? "Market Entry Compass" : "Pazara Giriş Pusulası", who: isEn ? "For leadership teams comparing two candidate markets before committing to either." : "Herhangi birine taahhüt vermeden önce iki aday pazarı karşılaştıran yönetim ekipleri için.", time: isEn ? "About 5 minutes" : "Yaklaşık 5 dakika", output: isEn ? "A weighted opportunity–readiness comparison, the scoring shown line by line, and the evidence gaps to close." : "Ağırlıklı bir fırsat–hazırlık karşılaştırması, satır satır gösterilen puanlama ve kapatılması gereken kanıt açıkları.", engagement: "serviceMarketEntry" },
    { key: "aiValueLens", name: isEn ? "AI Value Lens" : "Yapay Zekâ Değer Merceği", who: isEn ? "For managers deciding whether one AI use case deserves a controlled test." : "Bir yapay zekâ kullanım alanının kontrollü bir testi hak edip etmediğine karar veren yöneticiler için.", time: isEn ? "About 4 minutes" : "Yaklaşık 4 dakika", output: isEn ? "A value–readiness profile, a directional reading and the evidence to build before any scale decision." : "Bir değer–hazırlık profili, yön gösterici bir okuma ve ölçek kararından önce oluşturulacak kanıt.", engagement: "serviceAiValue" },
    { key: "decisionFramer", name: isEn ? "Decision Framer" : "Karar Çerçeveleyici", who: isEn ? "For an owner or executive who needs to turn a broad concern into a decision others can work on." : "Geniş bir kaygıyı başkalarının üzerinde çalışabileceği bir karara dönüştürmesi gereken şirket sahibi ya da yönetici için.", time: isEn ? "8–10 minutes" : "8–10 dakika", output: isEn ? "A one-page decision brief: statement, outcome, alternatives, assumptions, stakeholders, cost of delay and evidence gaps." : "Tek sayfalık bir karar özeti: karar ifadesi, sonuç, alternatifler, varsayımlar, paydaşlar, gecikmenin maliyeti ve kanıt açıkları.", engagement: "serviceOperatingModel" },
    { key: "boardBriefBuilder", name: isEn ? "Board Brief Builder" : "Yönetim Kurulu Brifingi Oluşturucu", who: isEn ? "For whoever has to put a recommendation in front of a board or owners' meeting." : "Bir öneriyi yönetim kurulu ya da ortaklar toplantısının önüne koyması gereken kişi için.", time: isEn ? "10–15 minutes" : "10–15 dakika", output: isEn ? "A printable one-page memo separating recommendation, evidence, uncertainty, risk and the approval required." : "Öneriyi, kanıtı, belirsizliği, riski ve gereken onayı birbirinden ayıran, yazdırılabilir tek sayfalık bir not." },
    { key: "decisionAtlas", name: isEn ? "Decision Atlas" : "Karar Atlası", who: isEn ? "For a first visit: start from the question on your agenda and find the relevant work, reading and tool." : "İlk ziyaret için: gündeminizdeki sorudan başlayıp ilgili çalışmayı, okumayı ve aracı bulun.", time: isEn ? "1 minute" : "1 dakika", output: isEn ? "A short pathway to the relevant engagement, perspective and tool." : "İlgili çalışma biçimine, bakışa ve araca giden kısa bir yol." },
  ];
}

function ToolIntro({ lang, toolKey, children }: { lang: Lang; toolKey: string; children?: React.ReactNode }) {
  const isEn = lang === "en";
  const meta = toolMeta(lang).find((item) => item.key === toolKey)!;
  return <aside className="lab-intro" aria-label={isEn ? "About this tool" : "Bu araç hakkında"}>
    <dl>
      <div><dt>{isEn ? "Who it helps" : "Kime yardımcı olur"}</dt><dd>{meta.who}</dd></div>
      <div><dt>{isEn ? "Time" : "Süre"}</dt><dd>{meta.time}</dd></div>
      <div><dt>{isEn ? "You get" : "Ne elde edersiniz"}</dt><dd>{meta.output}</dd></div>
      <div><dt>{isEn ? "Your data" : "Verileriniz"}</dt><dd>{isEn ? "Runs in your browser. Nothing is sent to Ganrich or written into the page address." : "Tarayıcınızda çalışır. Hiçbir şey Ganrich’e gönderilmez ya da sayfa adresine yazılmaz."}</dd></div>
    </dl>
    {children}
  </aside>;
}

function ExampleButton({ lang, onClick }: { lang: Lang; onClick: () => void }) {
  return <button type="button" className="lab-example" onClick={onClick}>{lang === "en" ? "Try a worked example" : "Örnekle deneyin"}<small>{lang === "en" ? "Fictional, non-confidential inputs" : "Kurgusal, gizli olmayan girdiler"}</small></button>;
}

function NextActions({ lang, engagement }: { lang: Lang; engagement?: EngagementKey }) {
  const isEn = lang === "en";
  const item = engagement ? engagementByKey(lang, engagement) : null;
  if (!item) return null;
  return <section className="lab-next"><span className="eyebrow">{isEn ? "If the decision matters" : "Karar önemliyse"}</span><p>{isEn ? `A tool gives you structure, not an answer. If you would like an independent review of this decision, the ${item.name} is designed for it.` : `Bir araç size yapı sağlar, yanıt değil. Bu karar için bağımsız bir değerlendirme isterseniz ${item.name} tam bunun için tasarlandı.`}</p><a className="text-link" href={`/${lang}/${routeMap[lang][item.key]}`}>{item.name}<span aria-hidden="true" className="arrow">→</span></a></section>;
}

const decisionThemes = {
  en: [
    ["Which markets should we enter?", "serviceMarketEntry", "marketCompass", "articleMarketEntry"],
    ["Should we use a distributor, a partner or our own entity?", "serviceMarketEntry", "marketCompass", "articleCorridor"],
    ["Which decisions should stay with the founder?", "serviceOperatingModel", "decisionFramer", "articleFamilyHoldings"],
    ["Why is our transformation not delivering?", "serviceOperatingModel", "decisionFramer", "articleTransformation"],
    ["Where can AI create measurable value?", "serviceAiValue", "aiValueLens", "articleIndustrialAi"],
    ["How do we put this decision to the board?", "", "boardBriefBuilder", "article"],
  ],
  tr: [
    ["Hangi pazarlara girmeliyiz?", "serviceMarketEntry", "marketCompass", "articleMarketEntry"],
    ["Distribütör mü, ortak mı, kendi şirketimiz mi?", "serviceMarketEntry", "marketCompass", "articleCorridor"],
    ["Hangi kararlar kurucuda kalmalı?", "serviceOperatingModel", "decisionFramer", "articleFamilyHoldings"],
    ["Dönüşümümüz neden beklenen sonucu üretmiyor?", "serviceOperatingModel", "decisionFramer", "articleTransformation"],
    ["Yapay zekâ nerede ölçülebilir değer yaratabilir?", "serviceAiValue", "aiValueLens", "articleIndustrialAi"],
    ["Bu kararı yönetim kuruluna nasıl sunarız?", "", "boardBriefBuilder", "article"],
  ],
} as const;

const articleEngagements: EngagementKey[] = ["serviceAiValue", "serviceOperatingModel", "serviceMarketEntry", "serviceMarketEntry", "serviceOperatingModel", "serviceAiValue"];

const articleOrder = ["article", "articleTransformation", "articleMarketEntry", "articleCorridor", "articleFamilyHoldings", "articleIndustrialAi"];

function IntelligenceHero({ label, title, intro }: { label: string; title: string; intro: string }) {
  return <section className="intelligence-hero lab-hero"><span className="eyebrow">{label}</span><h1>{title}</h1><p>{intro}</p></section>;
}

function toolName(lang: Lang, key: string) {
  return toolMeta(lang).find((item) => item.key === key)?.name ?? key;
}

export function DecisionLabPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en"; const m = routeMap[lang];
  const tools = toolMeta(lang);
  return (
    <>
      <IntelligenceHero label={isEn ? "Decision Lab" : "Karar Laboratuvarı"} title={isEn ? "Free tools to structure a decision before you discuss it." : "Bir kararı konuşmadan önce yapılandırmak için ücretsiz araçlar."} intro={isEn ? "Five short tools, built from the same questions Ganrich asks in an engagement. They run in your browser, need no account or email, and produce a result you can print or keep." : "Ganrich’in çalışmalarda sorduğu sorulardan üretilmiş beş kısa araç. Tarayıcınızda çalışır, hesap ya da e-posta gerektirmez ve yazdırabileceğiniz ya da saklayabileceğiniz bir sonuç üretir."}/>
      <section className="lab-tools section" aria-label={isEn ? "Tools" : "Araçlar"}>
        {tools.map((tool, index) => <article key={tool.key} className="lab-tool">
          <span className="p-index">0{index + 1}</span>
          <div>
            <h2><a href={`/${lang}/${m[tool.key]}`} data-analytics-event="decision_tool_started">{tool.name}</a></h2>
            <p>{tool.who}</p>
          </div>
          <dl>
            <div><dt>{isEn ? "Time" : "Süre"}</dt><dd>{tool.time}</dd></div>
            <div><dt>{isEn ? "Output" : "Çıktı"}</dt><dd>{tool.output}</dd></div>
          </dl>
          <a className="text-link" href={`/${lang}/${m[tool.key]}`}>{isEn ? "Open the tool" : "Aracı açın"}<span aria-hidden="true" className="arrow">→</span></a>
        </article>)}
      </section>
      <section className="lab-preview section" aria-labelledby="lab-preview-title">
        <div><span className="eyebrow">{isEn ? "Output preview" : "Çıktı önizlemesi"}</span><h2 id="lab-preview-title">{isEn ? "What a result looks like." : "Bir sonuç neye benzer."}</h2><p>{isEn ? "Each tool ends with a structured page you can print to PDF. This preview uses the fictional worked example from the AI Value Lens." : "Her araç, PDF olarak yazdırabileceğiniz yapılandırılmış bir sayfayla biter. Bu önizleme, Yapay Zekâ Değer Merceği’ndeki kurgusal örneği kullanır."}</p></div>
        <figure className="lab-preview-card" aria-label={isEn ? "Example result" : "Örnek sonuç"}>
          <span className="p-tag">{isEn ? "Fictional example" : "Kurgusal örnek"}</span>
          <strong>{isEn ? "Quote pricing for repeat customers" : "Tekrar eden müşteriler için teklif fiyatlama"}</strong>
          <output>69 <small>/ 100</small></output>
          <p>{isEn ? "Validate the value case: potential is visible, but data readiness should be strengthened before committing to scale." : "Değer gerekçesini doğrulayın: potansiyel görünür, ancak ölçek kararından önce veri hazırlığı güçlendirilmeli."}</p>
        </figure>
      </section>
      <section className="lab-privacy section" aria-labelledby="lab-privacy-title">
        <h2 id="lab-privacy-title">{isEn ? "How your entries are handled" : "Girdileriniz nasıl ele alınır"}</h2>
        <ul>
          <li><strong>{isEn ? "In your browser" : "Tarayıcınızda"}</strong>{isEn ? "Calculations happen on your device. Nothing you type is sent to Ganrich." : "Hesaplamalar cihazınızda yapılır. Yazdığınız hiçbir şey Ganrich’e gönderilmez."}</li>
          <li><strong>{isEn ? "Not in the address bar" : "Adres çubuğunda değil"}</strong>{isEn ? "Business text is never written into the page URL, so it cannot leak through shared links or browser history." : "İşle ilgili metinler sayfa adresine yazılmaz; paylaşılan bağlantılar ya da tarayıcı geçmişi yoluyla sızmaz."}</li>
          <li><strong>{isEn ? "Drafts only if you ask" : "Taslak yalnızca isterseniz"}</strong>{isEn ? "Tick “Keep a draft on this device” to resume later. Untick it, or clear entries, to delete the draft." : "Daha sonra devam etmek için “Taslağı bu cihazda sakla” seçeneğini işaretleyin. İşareti kaldırdığınızda ya da girdileri temizlediğinizde taslak silinir."}</li>
          <li><strong>{isEn ? "Sharing is deliberate" : "Paylaşım bilinçli yapılır"}</strong>{isEn ? "You can print, copy a summary or, if you choose, carry it into the contact form, where you see exactly what will be sent." : "Yazdırabilir, özeti kopyalayabilir ya da isterseniz iletişim formuna taşıyabilirsiniz; orada neyin gönderileceğini tam olarak görürsünüz."}</li>
        </ul>
      </section>
      <section className="limitations-band"><strong>{isEn ? "What these tools do not do" : "Bu araçların yapmadığı şeyler"}</strong><p>{isEn ? "They structure your own thinking. The scores are simple, transparent formulas, not validated diagnostics, and they include no external market data. They do not replace professional judgment, legal review, investment advice or a decision owner." : "Kendi düşüncenizi yapılandırırlar. Puanlar doğrulanmış teşhis araçları değil, basit ve şeffaf formüllerdir; dış pazar verisi içermez. Profesyonel muhakemenin, hukuk incelemesinin, yatırım tavsiyesinin ya da karar sahibinin yerine geçmezler."}</p><a className="text-link" href={`/${lang}/${m.decisionLabChangelog}`}>{isEn ? "Changelog" : "Değişiklik günlüğü"}<span aria-hidden="true" className="arrow">→</span></a></section>
    </>
  );
}

export function DecisionAtlasPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en"; const m = routeMap[lang];
  const [decision, setDecision] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    const value = Number(new URLSearchParams(window.location.search).get("decision"));
    queueMicrotask(() => {
      if (Number.isInteger(value) && value >= 0 && value < decisionThemes[lang].length) setDecision(value);
      setHydrated(true);
    });
  }, [lang]);
  useEffect(() => {
    if (!hydrated) return;
    // Only the index of a predefined question is kept in the URL; it contains no visitor text.
    window.history.replaceState(null, "", `${window.location.pathname}?decision=${decision}`);
  }, [decision, hydrated]);
  const [question, engagementKey, toolKey, articleKey] = decisionThemes[lang][decision];
  const engagement = engagementKey ? engagementByKey(lang, engagementKey) : null;
  const articleIndex = articleOrder.indexOf(articleKey);
  const article = insightArticles[lang][articleIndex];
  return (
    <>
      <IntelligenceHero label={isEn ? "Decision Atlas" : "Karar Atlası"} title={isEn ? "Begin with the decision." : "Karardan başlayın."} intro={isEn ? "Pick the question closest to what is on your agenda. The Atlas points you to the relevant engagement, the most useful reading and a tool to start with." : "Gündeminize en yakın soruyu seçin. Atlas sizi ilgili çalışma biçimine, en faydalı okumaya ve başlamak için bir araca yönlendirir."}/>
      <section className="atlas section">
        <div className="atlas-controls">
          <fieldset><legend>{isEn ? "Which question is closest to yours?" : "Hangi soru sizinkine en yakın?"}</legend>{decisionThemes[lang].map((item, i) => <label key={item[0]} className={decision === i ? "selected" : ""}><input type="radio" name="decision" checked={decision === i} onChange={() => setDecision(i)}/><span>0{i + 1}</span>{item[0]}</label>)}</fieldset>
        </div>
        <div className="atlas-result" aria-live="polite">
          <span className="eyebrow">{isEn ? "Your pathway" : "Yolunuz"}</span>
          <h2>{question}</h2>
          <dl>
            <div><dt>{isEn ? "Start with this tool" : "Bu araçla başlayın"}</dt><dd><a href={`/${lang}/${m[toolKey]}`}>{toolName(lang, toolKey)} <span aria-hidden="true">→</span></a></dd></div>
            <div><dt>{isEn ? "Read" : "Okuyun"}</dt><dd><a href={insightHref(lang, articleIndex)}>{article.title} <span aria-hidden="true">→</span></a></dd></div>
            <div><dt>{isEn ? "Related engagement" : "İlgili çalışma biçimi"}</dt><dd>{engagement ? <a href={`/${lang}/${m[engagement.key]}`}>{engagement.name} <span aria-hidden="true">→</span></a> : (isEn ? "Usually part of any engagement" : "Genellikle her çalışmanın parçasıdır")}</dd></div>
            <div><dt>{isEn ? "A question to answer next" : "Sonra yanıtlanacak soru"}</dt><dd>{isEn ? "What evidence would make leadership choose a different path?" : "Hangi kanıt yönetimin farklı bir yol seçmesine neden olur?"}</dd></div>
          </dl>
          <div className="atlas-actions">
            <a className="button" href={`/${lang}/${m[toolKey]}`} data-analytics-event="decision_tool_started">{isEn ? "Open the tool" : "Aracı açın"}</a>
            <SaveControl lang={lang} item={{ id: `atlas-${decision}`, title: question, type: isEn ? "Decision pathway" : "Karar yolu", href: `/${lang}/${m.decisionAtlas}?decision=${decision}` }}/>
          </div>
          <small>{isEn ? "The page address keeps only the number of the question you picked, so it is safe to share." : "Sayfa adresi yalnızca seçtiğiniz sorunun numarasını tutar; paylaşmak güvenlidir."}</small>
        </div>
      </section>
    </>
  );
}

const framerQuestions = {
  en: [
    [["What decision needs to be made?", "Write it as a choice, e.g. “Whether to open our own entity in the UAE in 2027”."], ["Why does it matter now?", "What has changed, or what happens if nothing is decided?"]],
    [["What outcome matters most?", "The result you would use to judge the decision in two years."], ["What alternatives are being considered?", "Include “do nothing” or “wait” if they are real options."]],
    [["What constraints are non-negotiable?", "Capital, people, timing, ownership or reputation limits."], ["What assumptions are shaping the discussion?", "Things people believe but have not tested."]],
    [["Where is the greatest uncertainty?", "The unknown that would most change the answer."], ["Who must support or execute the decision?", "Roles, not names, if you prefer."]],
    [["What is the cost of delay?", "Money, market position, people or momentum lost by waiting."], ["What evidence is missing?", "What you would want to know before committing."]],
  ],
  tr: [
    [["Hangi kararın verilmesi gerekiyor?", "Bir tercih olarak yazın, ör. “2027’de BAE’de kendi şirketimizi kurup kurmamak”."], ["Bu karar neden şimdi önemli?", "Ne değişti ya da hiçbir karar verilmezse ne olur?"]],
    [["En önemli sonuç nedir?", "İki yıl sonra kararı değerlendirmek için kullanacağınız sonuç."], ["Hangi alternatifler değerlendiriliyor?", "Gerçek seçeneklerse “hiçbir şey yapmamak” ya da “beklemek” de dâhil."]],
    [["Hangi kısıtlar tartışmaya açık değil?", "Sermaye, insan, zamanlama, sahiplik ya da itibar sınırları."], ["Görüşmeyi hangi varsayımlar şekillendiriyor?", "İnsanların inandığı ama sınanmamış şeyler."]],
    [["En büyük belirsizlik nerede?", "Yanıtı en çok değiştirecek bilinmeyen."], ["Kararı kimlerin desteklemesi veya uygulaması gerekiyor?", "İsterseniz isim yerine rol yazın."]],
    [["Gecikmenin maliyeti nedir?", "Beklemekle kaybedilen para, pazar konumu, insan ya da ivme."], ["Hangi kanıt eksik?", "Taahhüt vermeden önce bilmek isteyeceğiniz şey."]],
  ],
} as const;

const framerExample = {
  en: ["Whether to replace our UAE distributor with our own sales entity in 2027", "The distributor contract renews in nine months and sales have plateaued", "Profitable growth in the Gulf without losing key project customers", "Renew with new terms; add a second distributor; open our own entity", "Owner approval needed for any entity; no more than two expatriate hires", "Customers buy because of our product, not the distributor's relationships", "Whether project contractors would follow us to a new entity", "Owners, export director, finance director, the current distributor", "Another three-year contract locks in current terms and margins", "Customer-level sales data and the distributor's share of specifications"],
  tr: ["2027’de BAE distribütörümüzü kendi satış şirketimizle değiştirip değiştirmemek", "Distribütör sözleşmesi dokuz ay sonra yenileniyor ve satışlar duraksadı", "Kilit proje müşterilerini kaybetmeden Körfez’de kârlı büyüme", "Yeni koşullarla yenilemek; ikinci bir distribütör eklemek; kendi şirketimizi kurmak", "Her şirket kuruluşu için ortak onayı gerekli; en fazla iki yurt dışı istihdam", "Müşteriler distribütörün ilişkileri için değil, ürünümüz için alıyor", "Proje yüklenicilerinin bizi yeni şirkete takip edip etmeyeceği", "Ortaklar, ihracat direktörü, finans direktörü, mevcut distribütör", "Üç yıllık yeni bir sözleşme mevcut koşulları ve marjları kilitler", "Müşteri bazında satış verisi ve distribütörün şartnamelerdeki payı"],
};

export function DecisionFramerPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en"; const m = routeMap[lang];
  const [step, setStep] = useState(0);
  const draft = useToolDraft<string[]>(`framer-${lang}`, Array(10).fill(""));
  const answers = draft.value;
  const [done, setDone] = useState(false);
  const [statement, setStatement] = useState("");
  const [error, setError] = useState("");
  const result = useRef<HTMLDivElement>(null);
  const update = (index: number, value: string) => draft.setValue(answers.map((answer, i) => i === index ? value : answer));
  const filled = answers.filter((answer) => answer.trim()).length;
  const complete = () => {
    if (answers[0].trim().length < 8) { setStep(0); setError(isEn ? "Describe the decision in at least a few words before creating the brief." : "Özeti oluşturmadan önce kararı en az birkaç kelimeyle tanımlayın."); return; }
    setError("");
    setStatement(isEn ? `Leadership must decide ${answers[0].trim().replace(/^whether/i, "whether")}${answers[2].trim() ? `, with the aim of ${answers[2].trim().replace(/\.$/, "")}` : ""}, while testing the assumptions and evidence that could change the choice.` : `Yönetimin, ${answers[2].trim() ? `${answers[2].trim().replace(/\.$/, "")} hedefiyle ` : ""}şu konuda karar vermesi gerekiyor: ${answers[0].trim().replace(/\.$/, "")}. Bu tercihi değiştirebilecek varsayımlar ve kanıtlar sınanmalı.`);
    setDone(true);
    window.setTimeout(() => result.current?.focus(), 40);
  };
  const summary = () => [
    `${isEn ? "Decision" : "Karar"}: ${statement}`,
    ...[[2, isEn ? "Desired outcome" : "İstenen sonuç"], [3, isEn ? "Alternatives" : "Alternatifler"], [5, isEn ? "Critical assumptions" : "Kritik varsayımlar"], [7, isEn ? "Stakeholders" : "Paydaşlar"], [8, isEn ? "Cost of delay" : "Gecikmenin maliyeti"], [9, isEn ? "Missing evidence" : "Eksik kanıt"]].map(([index, label]) => `${label}: ${answers[index as number] || "—"}`),
  ].join("\n");
  const toBoard = () => {
    try { sessionStorage.setItem(BOARD_HANDOFF_KEY, JSON.stringify({ decision: statement, alternatives: answers[3], evidence: [answers[5] && `${isEn ? "Assumptions" : "Varsayımlar"}: ${answers[5]}`, answers[9] && `${isEn ? "Missing evidence" : "Eksik kanıt"}: ${answers[9]}`].filter(Boolean).join("\n"), rationale: [answers[1], answers[8]].filter(Boolean).join(" ") })); } catch { /* storage unavailable */ }
    window.location.assign(`/${lang}/${m.boardBriefBuilder}`);
  };
  const steps = isEn ? ["Decision", "Outcome", "Boundaries", "Alignment", "Evidence"] : ["Karar", "Sonuç", "Sınırlar", "Uyum", "Kanıt"];
  return (
    <>
      <IntelligenceHero label={isEn ? "Decision Framer" : "Karar Çerçeveleyici"} title={isEn ? "Turn a broad concern into a decision others can work on." : "Geniş bir kaygıyı başkalarının üzerinde çalışabileceği bir karara dönüştürün."} intro={isEn ? "Ten short questions in five steps. Only the first is required; the rest make the brief stronger. The result is a one-page brief you can print, copy or carry into a board memo." : "Beş adımda on kısa soru. Yalnızca ilki zorunludur; diğerleri özeti güçlendirir. Sonuç; yazdırabileceğiniz, kopyalayabileceğiniz ya da yönetim kurulu notuna taşıyabileceğiniz tek sayfalık bir özettir."}/>
      <section className="framer section">
        <ToolIntro lang={lang} toolKey="decisionFramer"><ExampleButton lang={lang} onClick={() => { draft.setValue([...framerExample[lang]]); setStep(0); setDone(false); setError(""); }}/></ToolIntro>
        {!done ? (
          <div className="framer-workspace">
            <aside>
              <span className="eyebrow">{isEn ? "Progress" : "İlerleme"}</span>
              <strong>{isEn ? `Step ${step + 1} of 5` : `5 adımdan ${step + 1}.`}</strong>
              <div className="lab-progress" role="progressbar" aria-valuemin={0} aria-valuemax={10} aria-valuenow={filled} aria-label={isEn ? "Questions answered" : "Yanıtlanan sorular"}><span style={{ width: `${filled * 10}%` }}/></div>
              <small>{isEn ? `${filled} of 10 answered` : `10 sorudan ${filled} tanesi yanıtlandı`}</small>
              <ol>{steps.map((label, i) => <li key={label} className={i === step ? "active" : i < step ? "complete" : ""}><button type="button" aria-current={i === step ? "step" : undefined} onClick={() => setStep(i)}><span>{i < step ? "✓" : `0${i + 1}`}</span>{label}</button></li>)}</ol>
              <DraftControl lang={lang} keep={draft.keep} setKeep={draft.setKeep} restoredAt={draft.restoredAt} clear={() => { draft.clear(); setStep(0); }}/>
            </aside>
            <form onSubmit={(e) => { e.preventDefault(); if (step < 4) setStep(step + 1); else complete(); }} aria-describedby={error ? "framer-error" : undefined}>
              <span className="eyebrow">{isEn ? `Step ${step + 1} · ${steps[step]}` : `${step + 1}. adım · ${steps[step]}`}</span>
              {framerQuestions[lang][step].map(([question, hint], offset) => {
                const index = step * 2 + offset;
                return <label key={question}>{question}{index === 0 ? " *" : ""}<small className="lab-hint" id={`framer-hint-${index}`}>{hint}</small><textarea required={index === 0} minLength={index === 0 ? 8 : undefined} maxLength={700} value={answers[index]} aria-describedby={`framer-hint-${index}`} onChange={(e) => update(index, e.target.value)} placeholder={isEn ? "Concise, non-confidential language…" : "Kısa ve gizli bilgi içermeyen bir ifade…"}/></label>;
              })}
              {error && <p className="form-error" id="framer-error" role="alert">{error}</p>}
              <div className="step-actions"><button type="button" disabled={!step} onClick={() => setStep(step - 1)}>{isEn ? "Back" : "Geri"}</button>{step < 4 && <button type="button" className="lab-text-button" onClick={complete}>{isEn ? "Create the brief now" : "Özeti şimdi oluştur"}</button>}<button className="button" type="submit">{step < 4 ? (isEn ? "Next step" : "Sonraki adım") : (isEn ? "Create decision brief" : "Karar özeti oluştur")}</button></div>
            </form>
          </div>
        ) : (
          <div className="framer-result" aria-live="polite" tabIndex={-1} ref={result}>
            <header><span className="eyebrow">{isEn ? "Preliminary · your inputs · requires validation" : "Ön değerlendirme · sizin girdileriniz · doğrulama gerekli"}</span><h2>{isEn ? "Decision brief" : "Karar özeti"}</h2></header>
            <label>{isEn ? "Decision statement (editable)" : "Karar ifadesi (düzenlenebilir)"}<textarea value={statement} onChange={(e) => setStatement(e.target.value)}/></label>
            <div className="brief-grid">
              <section><span>{isEn ? "Desired outcome" : "İstenen sonuç"}</span><p>{answers[2] || (isEn ? "Not yet defined." : "Henüz tanımlanmadı.")}</p></section>
              <section><span>{isEn ? "Alternatives" : "Alternatifler"}</span><p>{answers[3] || (isEn ? "Not yet defined." : "Henüz tanımlanmadı.")}</p></section>
              <section><span>{isEn ? "Critical assumptions" : "Kritik varsayımlar"}</span><p>{answers[5] || (isEn ? "Not yet stated." : "Henüz belirtilmedi.")}</p></section>
              <section><span>{isEn ? "Missing evidence" : "Eksik kanıt"}</span><p>{answers[9] || (isEn ? "Not yet stated." : "Henüz belirtilmedi.")}</p></section>
              <section><span>{isEn ? "Stakeholders" : "Paydaşlar"}</span><p>{answers[7] || (isEn ? "Not yet identified." : "Henüz belirlenmedi.")}</p></section>
              <section><span>{isEn ? "Cost of delay" : "Gecikmenin maliyeti"}</span><p>{answers[8] || (isEn ? "Not yet assessed." : "Henüz değerlendirilmedi.")}</p></section>
            </div>
            <div className="classification"><span>{isEn ? "Before you rely on this" : "Buna dayanmadan önce"}</span><strong>{answers[5] || answers[9] ? (isEn ? "Test the assumptions and close the evidence gaps above before committing." : "Taahhüt vermeden önce yukarıdaki varsayımları sınayın ve kanıt açıklarını kapatın.") : (isEn ? "Name the assumptions and missing evidence; a brief without them is hard to challenge." : "Varsayımları ve eksik kanıtı belirtin; bunlar olmadan özete itiraz etmek zordur.")}</strong></div>
            <div className="result-actions">
              <button type="button" className="button" onClick={() => window.print()}>{isEn ? "Print / save as PDF" : "Yazdır / PDF olarak kaydet"}</button>
              <CopySummary lang={lang} text={summary()}/>
              <button type="button" onClick={toBoard}>{isEn ? "Continue in Board Brief Builder" : "Yönetim Kurulu Brifingi’nde devam et"}</button>
              <button type="button" onClick={() => handoffToContact(lang, isEn ? "Decision Framer" : "Karar Çerçeveleyici", summary())}>{isEn ? "Discuss this decision" : "Bu kararı konuşalım"}</button>
              <SaveControl lang={lang} item={{ id: "decision-framer-result", title: statement.slice(0, 120), type: isEn ? "Decision brief" : "Karar özeti", href: `/${lang}/${m.decisionFramer}` }}/>
              <button type="button" onClick={() => { setDone(false); setStep(0); }}>{isEn ? "Edit answers" : "Yanıtları düzenle"}</button>
            </div>
            <NextActions lang={lang} engagement="serviceOperatingModel"/>
            <ToolScopeNote lang={lang}/>
          </div>
        )}
      </section>
    </>
  );
}

type MarketScore = { name: string; scores: number[] };
type CompassState = { markets: MarketScore[]; weights: number[] };
const compassInitial: CompassState = { markets: [{ name: "", scores: [50, 50, 50, 50] }, { name: "", scores: [50, 50, 50, 50] }], weights: [25, 25, 25, 25] };

export function MarketCompassPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en"; const m = routeMap[lang];
  const dimensions = isEn
    ? [["Market attractiveness", "Size, growth and margins you could realistically reach"], ["Strategic fit", "How well the market suits your products and ambitions"], ["Capability readiness", "Your people, partners and processes for this market"], ["Execution risk", "Regulatory, partner and delivery risk (higher = riskier)"]]
    : [["Pazar cazibesi", "Gerçekçi olarak ulaşabileceğiniz büyüklük, büyüme ve marjlar"], ["Stratejik uyum", "Pazarın ürünlerinize ve hedeflerinize ne kadar uyduğu"], ["Yetkinlik hazırlığı", "Bu pazar için insanlarınız, ortaklarınız ve süreçleriniz"], ["Uygulama riski", "Mevzuat, ortak ve teslimat riski (yüksek = daha riskli)"]];
  const draft = useToolDraft<CompassState>("market-compass", compassInitial);
  const { markets: marketsInput, weights } = draft.value;
  const [result, setResult] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const setMarkets = (next: MarketScore[]) => draft.setValue({ ...draft.value, markets: next });
  const setWeights = (next: number[]) => draft.setValue({ ...draft.value, weights: next });
  const weightTotal = weights.reduce((a, b) => a + b, 0);
  const contribution = (market: MarketScore, i: number) => weightTotal ? ((i === 3 ? 100 - market.scores[i] : market.scores[i]) * weights[i]) / weightTotal : 0;
  const score = (market: MarketScore) => Math.round(market.scores.reduce((sum, _value, i) => sum + contribution(market, i), 0));
  const updateScore = (marketIndex: number, dimension: number, value: number) => setMarkets(marketsInput.map((market, i) => i === marketIndex ? { ...market, scores: market.scores.map((scoreValue, j) => j === dimension ? value : scoreValue) } : market));
  const namesReady = marketsInput.every((market) => market.name.trim().length >= 2);
  const sameName = namesReady && marketsInput[0].name.trim().toLocaleLowerCase() === marketsInput[1].name.trim().toLocaleLowerCase();
  const scores = marketsInput.map(score);
  const gap = Math.abs(scores[0] - scores[1]);
  const leader = scores[0] === scores[1] ? null : scores[0] > scores[1] ? 0 : 1;
  const summary = [`${isEn ? "Market Entry Compass" : "Pazara Giriş Pusulası"} · ${marketsInput.map((market) => market.name).join(" / ")}`, ...dimensions.map(([label], i) => `${label} (${isEn ? "weight" : "ağırlık"} ${weights[i]}): ${marketsInput[0].scores[i]} / ${marketsInput[1].scores[i]}`), `${isEn ? "Weighted score" : "Ağırlıklı puan"}: ${scores[0]} / ${scores[1]}`].join("\n");
  const compare = () => { setResult(true); window.setTimeout(() => resultRef.current?.focus(), 40); };
  return (
    <>
      <IntelligenceHero label={isEn ? "Market Entry Compass" : "Pazara Giriş Pusulası"} title={isEn ? "Market attractiveness is only one part of the decision." : "Pazarın cazibesi, kararın yalnızca bir boyutudur."} intro={isEn ? "Compare two candidate markets on four dimensions, using weights and scores you set. No country data is inserted: every number is your assumption, and the arithmetic is shown." : "İki aday pazarı, ağırlıklarını ve puanlarını sizin belirlediğiniz dört boyutta karşılaştırın. Hiçbir ülke verisi eklenmez: her sayı sizin varsayımınızdır ve hesaplama açıkça gösterilir."}/>
      <section className="compass section">
        <ToolIntro lang={lang} toolKey="marketCompass"><ExampleButton lang={lang} onClick={() => { draft.setValue({ markets: [{ name: isEn ? "Example market A" : "Örnek pazar A", scores: [72, 64, 45, 55] }, { name: isEn ? "Example market B" : "Örnek pazar B", scores: [58, 70, 68, 35] }], weights: [30, 25, 25, 20] }); setResult(false); }}/></ToolIntro>
        <div className="source-key"><span><i className="user"/> {isEn ? "All inputs are your assumptions" : "Tüm girdiler sizin varsayımınızdır"}</span><span><i className="external"/> {isEn ? "No external or Ganrich data included" : "Dış veri ya da Ganrich verisi eklenmez"}</span></div>
        <div className="weight-editor">
          <header><div><span className="eyebrow">{isEn ? "Step 1 · Weights" : "1. adım · Ağırlıklar"}</span><h2>{isEn ? "Decide what matters for this decision." : "Bu karar için neyin önemli olduğuna karar verin."}</h2></div><p>{isEn ? "Weights are relative; they do not need to add up to 100. The starting values are a neutral default, not a methodology." : "Ağırlıklar görelidir; toplamlarının 100 olması gerekmez. Başlangıç değerleri bir yöntem değil, nötr bir varsayılandır."}</p></header>
          <div>{dimensions.map(([dimension, hint], i) => <label key={dimension}><span>{dimension}</span><small className="lab-hint">{hint}</small><input type="range" min="0" max="100" value={weights[i]} aria-valuetext={`${weights[i]}`} onChange={(e) => setWeights(weights.map((w, j) => j === i ? Number(e.target.value) : w))}/><output>{weights[i]}</output></label>)}</div>
        </div>
        <div className="market-inputs">
          {marketsInput.map((market, marketIndex) => <section key={marketIndex} aria-label={isEn ? `Market ${marketIndex + 1}` : `Pazar ${marketIndex + 1}`}><span className="eyebrow">{isEn ? `Step ${marketIndex + 2} · Market ${marketIndex + 1}` : `${marketIndex + 2}. adım · Pazar ${marketIndex + 1}`}</span><label className="market-name">{isEn ? "Name *" : "Ad *"}<input required minLength={2} maxLength={80} value={market.name} onChange={(e) => setMarkets(marketsInput.map((item, i) => i === marketIndex ? { ...item, name: e.target.value } : item))} placeholder={isEn ? "A country, city or segment" : "Bir ülke, şehir ya da segment"}/></label>{dimensions.map(([dimension], dimensionIndex) => <label key={dimension}><span>{dimension}</span><input type="range" min="0" max="100" value={market.scores[dimensionIndex]} onChange={(e) => updateScore(marketIndex, dimensionIndex, Number(e.target.value))}/><output>{market.scores[dimensionIndex]}</output></label>)}</section>)}
        </div>
        <DraftControl lang={lang} keep={draft.keep} setKeep={draft.setKeep} restoredAt={draft.restoredAt} clear={() => { draft.clear(); setResult(false); }}/>
        {!weightTotal && <p className="form-error" role="alert">{isEn ? "At least one weight must be greater than zero." : "En az bir ağırlık sıfırdan büyük olmalıdır."}</p>}
        {sameName && <p className="form-error" role="alert">{isEn ? "Give the two markets different names." : "İki pazara farklı adlar verin."}</p>}
        {!namesReady && <p className="lab-hint" role="status">{isEn ? "Name both markets to compare them." : "Karşılaştırmak için iki pazara da ad verin."}</p>}
        <button className="button" type="button" disabled={!weightTotal || !namesReady || sameName} onClick={compare}>{isEn ? "Compare markets" : "Pazarları karşılaştır"}</button>
        {result && namesReady && <div className="compass-result" aria-live="polite" tabIndex={-1} ref={resultRef}><header><span className="eyebrow">{isEn ? "Directional · your assumptions" : "Yön gösterici · sizin varsayımlarınız"}</span><h2>{isEn ? "Opportunity–readiness comparison" : "Fırsat–hazırlık karşılaştırması"}</h2></header>
          <div className="score-bars">{marketsInput.map((market, i) => <div key={i}><strong>{market.name}</strong><i><span style={{ width: `${scores[i]}%` }}/></i><output>{scores[i]} / 100</output></div>)}</div>
          <div className="p-table-wrap" tabIndex={0} role="region" aria-label={isEn ? "Score breakdown" : "Puan dökümü"}><table><caption>{isEn ? "How each score is built: input × weight ÷ total weight (risk is inverted)" : "Her puan nasıl oluşur: girdi × ağırlık ÷ toplam ağırlık (risk tersine çevrilir)"}</caption><thead><tr><th scope="col">{isEn ? "Dimension" : "Boyut"}</th><th scope="col">{isEn ? "Weight" : "Ağırlık"}</th>{marketsInput.map((market, i) => <th scope="col" key={i}>{market.name}</th>)}</tr></thead><tbody>{dimensions.map(([dimension], i) => <tr key={dimension}><th scope="row">{dimension}</th><td>{weights[i]}</td>{marketsInput.map((market, j) => <td key={j}>{market.scores[i]}{i === 3 ? ` → ${100 - market.scores[i]}` : ""} · <strong>{contribution(market, i).toFixed(1)}</strong></td>)}</tr>)}<tr><th scope="row">{isEn ? "Total" : "Toplam"}</th><td>{weightTotal}</td>{scores.map((value, i) => <td key={i}><strong>{value}</strong></td>)}</tr></tbody></table></div>
          <div className="compass-interpretation"><section><span>{isEn ? "What this suggests" : "Sonucun gösterdiği"}</span><p>{leader === null || gap < 5 ? (isEn ? "On your current assumptions the two markets are effectively tied. The decision will turn on evidence you do not yet have, not on the scores." : "Mevcut varsayımlarınızla iki pazar fiilen eşit. Karar puanlara değil, henüz sahip olmadığınız kanıta bağlı olacak.") : (isEn ? `${marketsInput[leader].name} leads by ${gap} points on your assumptions. Check which single input, if wrong, would reverse that.` : `Varsayımlarınıza göre ${marketsInput[leader].name} ${gap} puan önde. Hangi tek girdinin yanlış olması durumunda sıralamanın tersine döneceğini kontrol edin.`)}</p></section><section><span>{isEn ? "Evidence gap" : "Kanıt açığı"}</span><p>{isEn ? "Validate the highest-weighted inputs first, with dated market research and an honest view of your own capabilities." : "Önce en yüksek ağırlıklı girdileri, tarihli pazar araştırması ve kendi yetkinliklerinize dair dürüst bir değerlendirmeyle doğrulayın."}</p></section></div>
          <div className="result-actions"><button type="button" className="button" onClick={() => window.print()}>{isEn ? "Print / save as PDF" : "Yazdır / PDF olarak kaydet"}</button><CopySummary lang={lang} text={summary}/><button type="button" onClick={() => handoffToContact(lang, isEn ? "Market Entry Compass" : "Pazara Giriş Pusulası", summary, "serviceMarketEntry")}>{isEn ? "Discuss this decision" : "Bu kararı konuşalım"}</button><SaveControl lang={lang} item={{ id: "market-compass-result", title: marketsInput.map((market) => market.name).join(" / "), type: isEn ? "Market comparison" : "Pazar karşılaştırması", href: `/${lang}/${m.marketCompass}` }}/></div>
          <NextActions lang={lang} engagement="serviceMarketEntry"/>
          <ToolScopeNote lang={lang}/>
        </div>}
      </section>
    </>
  );
}

type BoardBrief = {
  decision: string;
  recommendation: string;
  rationale: string;
  alternatives: string;
  evidence: string;
  risks: string;
  action: string;
  owner: string;
};

const emptyBoardBrief: BoardBrief = { decision: "", recommendation: "", rationale: "", alternatives: "", evidence: "", risks: "", action: "", owner: "" };
const requiredBoardFields: Array<keyof BoardBrief> = ["decision", "recommendation", "evidence", "action"];

const boardExample: Record<Lang, BoardBrief> = {
  en: { decision: "Approve a staged entry into the UAE for the industrial valve line.", recommendation: "Appoint a distributor with quarterly performance gates now; defer any own-entity decision to the next annual review.", rationale: "Two contractors have asked for local stock; the current agent agreement expires in nine months.", alternatives: "Own entity now (higher control, higher fixed cost); continue with the agent (lowest cost, no learning).", evidence: "Established: certification route confirmed. Assumed: contractor demand. Unknown: distributor margin expectations.", risks: "Distributor under-performs: quarterly gate with exit clause. Price pressure: floor price in contract.", action: "Approve budget for distributor onboarding and one technical sales visit per quarter.", owner: "Export director · review at the next annual planning meeting." },
  tr: { decision: "Endüstriyel vana grubu için BAE’ye aşamalı girişi onaylamak.", recommendation: "Şimdi üç aylık performans kapılı bir distribütör atamak; kendi şirketini kurma kararını bir sonraki yıllık değerlendirmeye bırakmak.", rationale: "İki yüklenici yerel stok talep etti; mevcut acente sözleşmesi dokuz ay sonra bitiyor.", alternatives: "Hemen kendi şirketi (daha yüksek kontrol, daha yüksek sabit maliyet); acenteyle devam (en düşük maliyet, öğrenme yok).", evidence: "Kanıtlı: sertifikasyon yolu doğrulandı. Varsayım: yüklenici talebi. Bilinmeyen: distribütörün marj beklentisi.", risks: "Distribütörün düşük performansı: çıkış hükümlü üç aylık kapı. Fiyat baskısı: sözleşmede taban fiyat.", action: "Distribütör sürecine ve üç ayda bir teknik satış ziyaretine bütçe onayı.", owner: "İhracat direktörü · bir sonraki yıllık planlama toplantısında değerlendirme." },
};

export function BoardBriefBuilderPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en"; const m = routeMap[lang];
  const draft = useToolDraft<BoardBrief>(`board-brief-${lang}`, emptyBoardBrief);
  const brief = draft.value;
  const [generated, setGenerated] = useState(false);
  const [carried, setCarried] = useState(false);
  const memo = useRef<HTMLElement>(null);
  const labels: Array<[keyof BoardBrief, string, string]> = isEn ? [
    ["decision", "Decision required", "State the choice the board is being asked to make."],
    ["recommendation", "Management recommendation", "State the recommended path in one direct sentence."],
    ["rationale", "Why now", "Explain the timing, strategic relevance, and cost of delay."],
    ["alternatives", "Alternatives considered", "Name credible alternatives and why they were not preferred."],
    ["evidence", "Evidence and uncertainty", "Separate established evidence, assumptions, and unresolved questions."],
    ["risks", "Principal risks and controls", "Name material risks, leading indicators, and proposed controls."],
    ["action", "Decision and next action", "Specify approval, resource, gate, or mandate required."],
    ["owner", "Accountable owner and timing", "Name the role accountable and the next review point."],
  ] : [
    ["decision", "Gerekli karar", "Yönetim kurulundan istenen tercihi açık biçimde belirtin."],
    ["recommendation", "Yönetim önerisi", "Önerilen yolu tek ve doğrudan bir cümleyle ifade edin."],
    ["rationale", "Neden şimdi", "Zamanlamayı, stratejik önemi ve gecikmenin maliyetini açıklayın."],
    ["alternatives", "Değerlendirilen alternatifler", "İnandırıcı alternatifleri ve neden tercih edilmediklerini belirtin."],
    ["evidence", "Kanıt ve belirsizlik", "Yerleşik kanıtı, varsayımları ve açık soruları birbirinden ayırın."],
    ["risks", "Başlıca riskler ve kontroller", "Önemli riskleri, öncü göstergeleri ve önerilen kontrolleri belirtin."],
    ["action", "Karar ve sonraki eylem", "Gerekli onayı, kaynağı, kapıyı veya yetkiyi tanımlayın."],
    ["owner", "Sorumlu sahip ve zamanlama", "Sorumlu rolü ve bir sonraki gözden geçirme noktasını belirtin."],
  ];

  useEffect(() => {
    const carriedBrief = readJson<Partial<BoardBrief>>(typeof window === "undefined" ? undefined : window.sessionStorage, BOARD_HANDOFF_KEY);
    if (!carriedBrief) return;
    try { sessionStorage.removeItem(BOARD_HANDOFF_KEY); } catch { /* storage unavailable */ }
    queueMicrotask(() => {
      draft.setValue({ ...emptyBoardBrief, ...Object.fromEntries(Object.entries(carriedBrief).map(([key, value]) => [key, String(value ?? "").slice(0, 1200)])) });
      setCarried(true);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (key: keyof BoardBrief, value: string) => draft.setValue({ ...brief, [key]: value });
  const missing = requiredBoardFields.filter((key) => brief[key].trim().length < 10);
  const filled = labels.filter(([key]) => brief[key].trim()).length;
  const emailBody = labels.map(([key, label]) => `${label.toUpperCase()}\n${brief[key] || "—"}`).join("\n\n");

  return <>
    <IntelligenceHero label={isEn ? "Board Brief Builder" : "Yönetim Kurulu Brifingi Oluşturucu"} title={isEn ? "Make the decision visible on one page." : "Kararı tek sayfada görünür kılın."} intro={isEn ? "Eight fields, four of them required. The result is a one-page memo that separates recommendation, evidence, uncertainty, risk and the approval you need." : "Dördü zorunlu sekiz alan. Sonuç; öneriyi, kanıtı, belirsizliği, riski ve ihtiyaç duyduğunuz onayı birbirinden ayıran tek sayfalık bir nottur."}/>
    <section className="board-builder section">
      <ToolIntro lang={lang} toolKey="boardBriefBuilder"><ExampleButton lang={lang} onClick={() => { draft.setValue({ ...boardExample[lang] }); setGenerated(false); }}/></ToolIntro>
      {!generated ? <form className="board-form" onSubmit={(event) => { event.preventDefault(); if (missing.length) return; setGenerated(true); window.setTimeout(() => memo.current?.focus(), 40); }}>
        <header><span className="eyebrow">{isEn ? "One-page discipline" : "Tek sayfa disiplini"}</span><h2>{isEn ? "Write for the decision, not the archive." : "Arşiv için değil, karar için yazın."}</h2><p>{isEn ? `Use concise, non-confidential language. Fields marked * are required. ${filled} of 8 completed.` : `Kısa ve gizli bilgi içermeyen bir dil kullanın. * işaretli alanlar zorunludur. 8 alandan ${filled} tanesi dolduruldu.`}</p></header>
        {carried && <p className="lab-draft" role="status">{isEn ? "Carried over from the Decision Framer. Review and edit before you build the memo." : "Karar Çerçeveleyici’den aktarıldı. Notu oluşturmadan önce gözden geçirip düzenleyin."}</p>}
        <div>{labels.map(([key, label, hint], index) => { const required = requiredBoardFields.includes(key); return <label key={key}><span>0{index + 1} · {label}{required ? " *" : ""}</span><small id={`board-hint-${key}`}>{hint}</small><textarea value={brief[key]} aria-describedby={`board-hint-${key}`} onChange={(event) => update(key, event.target.value)} minLength={required ? 10 : undefined} maxLength={1200} required={required}/></label>; })}</div>
        <DraftControl lang={lang} keep={draft.keep} setKeep={draft.setKeep} restoredAt={draft.restoredAt} clear={draft.clear}/>
        <button className="button" type="submit">{isEn ? "Build the board memo" : "Yönetim kurulu notunu oluştur"}</button>
        <ToolScopeNote lang={lang}/>
      </form> : <article className="board-memo" aria-live="polite" tabIndex={-1} ref={memo}>
        <header><div><span className="eyebrow">{isEn ? "Preliminary board memo · your inputs" : "Ön yönetim kurulu notu · sizin girdileriniz"}</span><h2>{isEn ? "Decision memorandum" : "Karar notu"}</h2></div><small>{new Date().toLocaleDateString(isEn ? "en-GB" : "tr-TR", { dateStyle: "long" })}</small></header>
        <section className="board-decision"><span>{isEn ? "Decision required" : "Gerekli karar"}</span><h3>{brief.decision}</h3></section>
        <section className="board-recommendation"><span>{isEn ? "Management recommendation" : "Yönetim önerisi"}</span><p>{brief.recommendation}</p></section>
        <div className="board-memo-grid">{labels.slice(2).map(([key, label]) => <section key={key}><span>{label}</span><p>{brief[key] || (isEn ? "Not yet stated." : "Henüz belirtilmedi.")}</p></section>)}</div>
        <div className="result-actions">
          <button type="button" className="button" onClick={() => window.print()}>{isEn ? "Export / print PDF" : "Dışa aktar / PDF yazdır"}</button>
          <CopySummary lang={lang} text={emailBody}/>
          <a href={`mailto:?subject=${encodeURIComponent(isEn ? "Preliminary board decision memo" : "Ön yönetim kurulu karar notu")}&body=${encodeURIComponent(emailBody)}`}>{isEn ? "Email this to me" : "Bunu bana e-posta ile gönder"}</a>
          <button type="button" onClick={() => handoffToContact(lang, isEn ? "Board Brief Builder" : "Yönetim Kurulu Brifingi", emailBody)}>{isEn ? "Discuss this decision" : "Bu kararı konuşalım"}</button>
          <SaveControl lang={lang} item={{ id: "board-brief-result", title: brief.decision.slice(0, 120), type: isEn ? "Board brief" : "Yönetim kurulu brifingi", href: `/${lang}/${m.boardBriefBuilder}` }}/>
          <button type="button" onClick={() => setGenerated(false)}>{isEn ? "Edit inputs" : "Girdileri düzenle"}</button>
        </div>
        <ToolScopeNote lang={lang}/>
      </article>}
    </section>
  </>;
}

export function AIValueLensPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en"; const m = routeMap[lang];
  const dimensions = isEn ? [
    ["Decision value", "How much would a better decision or workflow improve margin, cash, quality or service?"],
    ["Repeatability", "How often does this decision or workflow recur? Daily scores high; once a year scores low."],
    ["Data readiness", "Is the data needed available, reasonably clean, governed and representative?"],
    ["Adoption readiness", "Are the people who do this work ready, and able, to change how they do it?"],
    ["Risk controllability", "Can error, bias, security and accountability risks be controlled and monitored?"],
  ] : [
    ["Karar değeri", "Daha iyi bir karar ya da iş akışı marjı, nakdi, kaliteyi veya hizmeti ne kadar iyileştirir?"],
    ["Tekrarlanabilirlik", "Bu karar ya da iş akışı ne sıklıkta tekrarlanıyor? Günlük yüksek, yılda bir düşük puan alır."],
    ["Veri hazırlığı", "Gerekli veri mevcut, makul ölçüde temiz, yönetişim altında ve temsil edici mi?"],
    ["Benimseme hazırlığı", "Bu işi yapan kişiler çalışma biçimini değiştirmeye hazır ve muktedir mi?"],
    ["Risk kontrolü", "Hata, önyargı, güvenlik ve hesap verebilirlik riskleri kontrol edilip izlenebilir mi?"],
  ];
  const draft = useToolDraft<{ useCase: string; scores: number[] }>("ai-value-lens", { useCase: "", scores: [50, 50, 50, 50, 50] });
  const { useCase, scores } = draft.value;
  const [result, setResult] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const weights = [30, 20, 20, 15, 15];
  const total = Math.round(scores.reduce((sum, value, index) => sum + value * weights[index], 0) / 100);
  const weakest = scores.indexOf(Math.min(...scores));
  const interpretation = total >= 70
    ? (isEn ? ["Prioritise a controlled test", "Your assumptions point to a credible candidate for a bounded test with a baseline, a decision owner and a stopping rule."] : ["Kontrollü bir testi önceliklendirin", "Varsayımlarınız; başlangıç ölçümü, karar sahibi ve durma kuralı olan sınırlı bir test için güvenilir bir aday olduğunu gösteriyor."])
    : total >= 50
      ? (isEn ? ["Validate the value case", "Potential is visible, but one or more readiness conditions should be strengthened before committing to scale."] : ["Değer gerekçesini doğrulayın", "Potansiyel görünür durumda; ancak ölçek kararından önce bir veya daha fazla hazırlık koşulu güçlendirilmeli."])
      : (isEn ? ["Strengthen the foundations", "Your assumptions do not yet support prioritisation. Clarify the decision, data, operating change or risk controls first."] : ["Temelleri güçlendirin", "Varsayımlarınız henüz önceliklendirmeyi desteklemiyor. Önce kararı, veriyi, işletim değişikliğini veya risk kontrollerini netleştirin."]);
  const summary = [`${isEn ? "AI Value Lens" : "Yapay Zekâ Değer Merceği"} · ${useCase}`, ...dimensions.map(([label], i) => `${label} (${isEn ? "weight" : "ağırlık"} ${weights[i]}%): ${scores[i]}`), `${isEn ? "Weighted total" : "Ağırlıklı toplam"}: ${total}/100 · ${interpretation[0]}`].join("\n");
  const assess = () => { setResult(true); window.setTimeout(() => resultRef.current?.focus(), 40); };

  return <>
    <IntelligenceHero label={isEn ? "AI Value Lens" : "Yapay Zekâ Değer Merceği"} title={isEn ? "Begin with value. Test readiness. Keep judgment accountable." : "Değerle başlayın. Hazırlığı sınayın. Muhakemeyi sorumlu tutun."} intro={isEn ? "Assess one use case as an operating decision, not a technology demonstration. You rate five dimensions; the weighting and thresholds are shown so you can disagree with them." : "Bir kullanım alanını teknoloji gösterisi olarak değil, işletim kararı olarak değerlendirin. Beş boyutu siz puanlarsınız; itiraz edebilmeniz için ağırlıklar ve eşikler açıkça gösterilir."}/>
    <section className="ai-lens section">
      <ToolIntro lang={lang} toolKey="aiValueLens"><ExampleButton lang={lang} onClick={() => { draft.setValue({ useCase: isEn ? "Quote pricing for repeat customers (fictional distributor)" : "Tekrar eden müşteriler için teklif fiyatlama (kurgusal distribütör)", scores: [80, 85, 45, 60, 65] }); setResult(false); }}/></ToolIntro>
      <div className="ai-lens-input">
        <header><span className="eyebrow">{isEn ? "Use-case assessment" : "Kullanım alanı değerlendirmesi"}</span><h2>{isEn ? "Make the value logic explicit." : "Değer mantığını görünür kılın."}</h2></header>
        <label className="use-case-name">{isEn ? "Decision or workflow to assess *" : "Değerlendirilecek karar veya iş akışı *"}<input value={useCase} onChange={(event) => draft.setValue({ ...draft.value, useCase: event.target.value })} minLength={3} maxLength={160} placeholder={isEn ? "e.g. production scheduling exception decisions" : "ör. üretim planlaması istisna kararları"}/></label>
        <div className="lens-dimensions">{dimensions.map(([label, hint], index) => <label key={label}><span>{label} <small>· {isEn ? "weight" : "ağırlık"} {weights[index]}%</small></span><small>{hint}</small><input type="range" min="0" max="100" value={scores[index]} onChange={(event) => draft.setValue({ ...draft.value, scores: scores.map((score, scoreIndex) => scoreIndex === index ? Number(event.target.value) : score) })}/><output>{scores[index]}</output></label>)}</div>
        <DraftControl lang={lang} keep={draft.keep} setKeep={draft.setKeep} restoredAt={draft.restoredAt} clear={() => { draft.clear(); setResult(false); }}/>
        {useCase.trim().length < 3 && <p className="lab-hint" role="status">{isEn ? "Name the decision or workflow to enable the assessment." : "Değerlendirmeyi etkinleştirmek için karar ya da iş akışını adlandırın."}</p>}
        <button className="button" type="button" disabled={useCase.trim().length < 3} onClick={assess}>{isEn ? "Assess the use case" : "Kullanım alanını değerlendir"}</button>
      </div>
      {!(result && useCase.trim().length >= 3) && <aside className="lab-placeholder" aria-label={isEn ? "Result preview" : "Sonuç önizlemesi"}><span className="eyebrow">{isEn ? "Your result appears here" : "Sonucunuz burada görünür"}</span><p>{isEn ? "A score out of 100, a directional reading (prioritise a test, validate the value case, or strengthen the foundations), your weakest dimension and how the score was calculated." : "100 üzerinden bir puan, yön gösterici bir okuma (testi önceliklendirin, değer gerekçesini doğrulayın ya da temelleri güçlendirin), en zayıf boyutunuz ve puanın nasıl hesaplandığı."}</p></aside>}
      {result && useCase.trim().length >= 3 && <div className="ai-lens-result" aria-live="polite" tabIndex={-1} ref={resultRef}>
        <header><div><span className="eyebrow">{isEn ? "Directional · your assumptions" : "Yön gösterici · sizin varsayımlarınız"}</span><h2>{useCase}</h2></div><output>{total}<small>/ 100</small></output></header>
        <section className="lens-interpretation"><span>{interpretation[0]}</span><p>{interpretation[1]}</p></section>
        <div className="lens-profile">{dimensions.map(([label], index) => <div key={label} className={index === weakest ? "weakest" : ""}><strong>{label}</strong><i><span style={{ width: `${scores[index]}%` }}/></i><output>{scores[index]}</output></div>)}</div>
        <section className="lens-next"><span>{isEn ? "Weakest dimension" : "En zayıf boyut"}</span><p>{isEn ? `${dimensions[weakest][0]} is your lowest rating. Before any scale decision, define the baseline, decision owner, affected workflow, adoption requirement, risk controls and a stopping rule.` : `En düşük puanınız ${dimensions[weakest][0]}. Herhangi bir ölçek kararından önce başlangıç ölçümünü, karar sahibini, etkilenen iş akışını, benimseme gereksinimini, risk kontrollerini ve durma kuralını tanımlayın.`}</p></section>
        <details className="lab-method"><summary>{isEn ? "How the score is calculated" : "Puan nasıl hesaplanır"}<span className="p-plus" aria-hidden="true">+</span></summary><p>{isEn ? "Weighted average of your five ratings: decision value 30%, repeatability 20%, data readiness 20%, adoption readiness 15%, risk controllability 15%. 70 or more reads as “prioritise a controlled test”, 50–69 as “validate the value case”, below 50 as “strengthen the foundations”. These weights and thresholds are Ganrich working assumptions, not a validated diagnostic." : "Beş puanınızın ağırlıklı ortalaması: karar değeri %30, tekrarlanabilirlik %20, veri hazırlığı %20, benimseme hazırlığı %15, risk kontrolü %15. 70 ve üzeri “kontrollü bir testi önceliklendirin”, 50–69 “değer gerekçesini doğrulayın”, 50’nin altı “temelleri güçlendirin” olarak okunur. Bu ağırlıklar ve eşikler doğrulanmış bir teşhis aracı değil, Ganrich’in çalışma varsayımlarıdır."}</p></details>
        <div className="result-actions">
          <button type="button" className="button" onClick={() => window.print()}>{isEn ? "Print / save as PDF" : "Yazdır / PDF olarak kaydet"}</button>
          <CopySummary lang={lang} text={summary}/>
          <button type="button" onClick={() => handoffToContact(lang, isEn ? "AI Value Lens" : "Yapay Zekâ Değer Merceği", summary, "serviceAiValue")}>{isEn ? "Discuss this decision" : "Bu kararı konuşalım"}</button>
          <SaveControl lang={lang} item={{ id: "ai-value-lens-result", title: useCase.slice(0, 120), type: isEn ? "AI value assessment" : "Yapay zekâ değer değerlendirmesi", href: `/${lang}/${m.aiValueLens}` }}/>
        </div>
        <NextActions lang={lang} engagement="serviceAiValue"/>
        <ToolScopeNote lang={lang}/>
      </div>}
    </section>
  </>;
}

export function DecisionLabChangelogPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en"; const m = routeMap[lang];
  const releases = isEn ? [
    ["22 October 2026", ["Worked examples with fictional inputs in every tool.", "Visitor-entered text is no longer written to page addresses; hand-offs use this browser tab only.", "Drafts are saved only when the visitor opts in, with a visible delete control.", "Scoring formulas and thresholds shown in the Market Entry Compass and AI Value Lens.", "Each tool links to the related Ganrich engagement."]],
    ["24 July 2026", ["Decision Atlas, Decision Framer, Market Entry Compass, Board Brief Builder and AI Value Lens released."]],
  ] : [
    ["22 Ekim 2026", ["Her araçta kurgusal girdilerle örnek kullanım.", "Ziyaretçinin girdiği metinler artık sayfa adresine yazılmıyor; aktarımlar yalnızca bu tarayıcı sekmesini kullanıyor.", "Taslaklar yalnızca ziyaretçi isterse ve görünür bir silme kontrolüyle saklanıyor.", "Pazara Giriş Pusulası ve Yapay Zekâ Değer Merceği’nde puanlama formülleri ve eşikler gösteriliyor.", "Her araç ilgili Ganrich çalışma biçimine bağlanıyor."]],
    ["24 Temmuz 2026", ["Karar Atlası, Karar Çerçeveleyici, Pazara Giriş Pusulası, Yönetim Kurulu Brifingi Oluşturucu ve Yapay Zekâ Değer Merceği yayımlandı."]],
  ];
  const evaluating = isEn ? ["Scenario Studio", "Transformation Pulse", "Operating Model Lens", "Portfolio Prioritizer"] : ["Senaryo Stüdyosu", "Dönüşüm Nabzı", "İşletim Modeli Merceği", "Portföy Önceliklendirme Aracı"];
  return <>
    <IntelligenceHero label={isEn ? "Decision Lab Changelog" : "Karar Laboratuvarı Değişiklik Günlüğü"} title={isEn ? "What is live. What changed. What remains under evaluation." : "Neler yayında. Neler değişti. Neler değerlendirmede."} intro={isEn ? "A plain record of the Decision Lab’s current capabilities and limits." : "Karar Laboratuvarının mevcut yetkinlikleri ve sınırlarına ilişkin açık kayıt."}/>
    <section className="lab-changelog section">
      <header><span className="eyebrow">{isEn ? "Releases" : "Sürümler"}</span><h2>{isEn ? "Five live tools, connected to one decision pathway." : "Tek karar yoluna bağlı beş canlı araç."}</h2></header>
      <ol>{releases.map(([date, items]) => <li key={date as string}><span>{date as string}</span><ul>{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul></li>)}</ol>
      <div className="roadmap-record"><span className="eyebrow">{isEn ? "Under evaluation · no committed release date" : "Değerlendirmede · taahhüt edilmiş tarih yok"}</span>{evaluating.map((item) => <p key={item}>{item}<small>{isEn ? "Scope and evidence standard under review" : "Kapsam ve kanıt standardı inceleniyor"}</small></p>)}</div>
      <a className="button outline" href={`/${lang}/${m.decisionLab}`}>{isEn ? "Return to Decision Lab" : "Karar Laboratuvarına dön"}</a>
    </section>
  </>;
}

export function InsightExperiencePage({ lang, index = 0 }: { lang: Lang; index?: number }) {
  const isEn = lang === "en";
  const article = insightArticles[lang][index] ?? insightArticles[lang][0];
  const href = insightHref(lang, index);
  const m = routeMap[lang];
  const engagement = engagementByKey(lang, articleEngagements[index] ?? "serviceOperatingModel");
  const [mode, setMode] = useState("executive");
  const [challenge, setChallenge] = useState(false);
  const [sources, setSources] = useState(false);
  const sourceDrawer = useRef<HTMLElement>(null);
  const sourceCloseButton = useRef<HTMLButtonElement>(null);
  const sourceInvoker = useRef<HTMLElement | null>(null);
  useEffect(() => { if (!optionalPreferencesEnabled()) return; const saved = localStorage.getItem("ganrich-reading-mode"); if (saved) queueMicrotask(() => setMode(saved)); }, []);
  useEffect(() => {
    if (!sources) return;
    sourceCloseButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      keepModalFocus(event, sourceDrawer.current);
      if (event.key === "Escape") {
        setSources(false);
        window.setTimeout(() => sourceInvoker.current?.focus(), 0);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sources]);
  const changeMode = (next: string) => { setMode(next); if (optionalPreferencesEnabled()) localStorage.setItem("ganrich-reading-mode", next); };
  const openSources = (event: React.MouseEvent<HTMLElement>) => {
    sourceInvoker.current = event.currentTarget;
    setSources(true);
  };
  const closeSources = () => {
    setSources(false);
    window.setTimeout(() => sourceInvoker.current?.focus(), 0);
  };
  const modes = isEn ? [["brief", "90-Second View"], ["executive", "Executive View"], ["full", "Full Analysis"], ["evidence", "Evidence View"]] : [["brief", "90 Saniyelik Bakış"], ["executive", "Yönetici Görünümü"], ["full", "Tam Analiz"], ["evidence", "Kanıt Görünümü"]];
  return (
    <article className={`article intelligence-article mode-${mode}`}>
      <header><p className="meta">{article.type} · {article.region} · <time dateTime={article.date}>{article.dateLabel}</time> · {article.author}</p><h1>{article.title}</h1><p>{article.thesis}</p><div><span>{article.readingTime}</span><span>{isEn ? "English and Turkish" : "Türkçe ve İngilizce"}</span></div><SaveControl lang={lang} item={{ id: `insight-${article.slug}`, title: article.title, type: isEn ? "Insight" : "İçgörü", href }}/></header>
      <nav className="reading-modes" aria-label={isEn ? "Reading modes" : "Okuma modları"}>{modes.map((item) => <button className={mode === item[0] ? "active" : ""} key={item[0]} onClick={() => changeMode(item[0])}>{item[1]}</button>)}</nav>
      <div className="article-body"><aside><strong>{isEn ? "In this perspective" : "Bu bakışta"}</strong><a href="#thesis">{isEn ? "Executive thesis" : "Yönetici tezi"}</a><a href="#findings">{isEn ? "Key findings" : "Temel bulgular"}</a><a href="#analysis">{isEn ? "Full analysis" : "Tam analiz"}</a><a href="#leaders">{isEn ? "Board questions" : "Yönetim kurulu soruları"}</a><a href="#method">{isEn ? "Sources and method" : "Kaynaklar ve yöntem"}</a></aside><div>
        <section className="method"><strong>{isEn ? "Use this when…" : "Şu durumda kullanın…"}</strong><p>{article.applicability}</p></section>
        <section id="thesis"><span className="eyebrow">{isEn ? "EXECUTIVE THESIS" : "YÖNETİCİ TEZİ"}</span><h2>{article.thesis}</h2>{article.analysis.slice(0, mode === "brief" ? 1 : mode === "executive" ? 2 : article.analysis.length).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
        {mode !== "brief" && <section id="findings"><span className="eyebrow">{isEn ? "THREE DISTINCTIONS" : "ÜÇ AYRIM"}</span>{article.findings.map((finding, findingIndex) => <div className="finding" key={finding[0]}><span>0{findingIndex + 1}</span><h3>{finding[0]}</h3><p>{finding[1]}</p></div>)}</section>}
        {(mode === "full" || mode === "evidence") && <figure className="evidence-chart"><figcaption><strong>{article.frameworkTitle}</strong><span>{isEn ? "Illustrative framework · no external data" : "Açıklayıcı çerçeve · haricî veri içermez"}</span></figcaption><div>{article.framework.map((step, stepIndex) => <span key={step}>0{stepIndex + 1} {step}</span>)}</div><button type="button" className="source-link" onClick={openSources}>{isEn ? "Sources and methodology" : "Kaynaklar ve yöntem"}</button><SaveControl lang={lang} item={{ id: `framework-${article.slug}`, title: article.frameworkTitle, type: isEn ? "Framework" : "Çerçeve", href: `${href}#method` }}/></figure>}
        {(mode === "full" || mode === "evidence") && <section id="analysis" className="article-sections"><span className="eyebrow">{isEn ? "FULL ANALYSIS" : "TAM ANALİZ"}</span>{article.sections.map((section, sectionIndex) => <section key={section.title}><span>0{sectionIndex + 1}</span><div><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>)}</section>}
        <section id="leaders" className="leader-meaning"><span className="eyebrow">{isEn ? "QUESTIONS THIS RAISES FOR YOUR BOARD" : "YÖNETİM KURULUNUZ İÇİN ORTAYA ÇIKAN SORULAR"}</span><h2>{isEn ? "Make the next leadership choice explicit." : "Bir sonraki liderlik tercihini açık hâle getirin."}</h2><ul>{article.boardQuestions.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section className="related-engagement"><span className="eyebrow">{isEn ? "RELATED ENGAGEMENT" : "İLGİLİ ÇALIŞMA BİÇİMİ"}</span>{engagement && <><h2>{engagement.name}</h2><p>{engagement.short}</p><a className="text-link" href={`/${lang}/${m[engagement.key]}`}>{isEn ? "How this engagement works" : "Bu çalışma nasıl yürür"}<span aria-hidden="true" className="arrow">→</span></a></>}</section>
        <section className="related-tool"><span className="eyebrow">{isEn ? "RELATED DECISION TOOL" : "İLGİLİ KARAR ARACI"}</span><h2>{article.relatedToolLabel}.</h2><a href={`/${lang}/${m[article.relatedTool]}`}>{isEn ? "Open the tool" : "Aracı açın"} <span aria-hidden="true" className="arrow">→</span></a></section>
        <section className="critical-review"><button type="button" onClick={() => setChallenge(!challenge)} aria-expanded={challenge}><span>{isEn ? "CRITICAL REVIEW" : "ELEŞTİREL İNCELEME"}</span><strong>{isEn ? "Challenge this view" : "Bu görüşü sorgula"}</strong><i>{challenge ? "−" : "+"}</i></button>{challenge && <div><section><span>{isEn ? "STRONGEST COUNTERARGUMENT" : "EN GÜÇLÜ KARŞI GÖRÜŞ"}</span><p>{article.counterargument}</p></section><section><span>{isEn ? "EVIDENCE THAT WOULD WEAKEN THE THESIS" : "TEZİ ZAYIFLATACAK KANIT"}</span><p>{article.weakeningEvidence}</p></section></div>}</section>
        <section id="method" className="method"><strong>{isEn ? "Method and content status" : "Yöntem ve içerik durumu"}</strong><p>{article.methodology}</p><button className="source-link" type="button" onClick={openSources}>{isEn ? "Sources and methodology" : "Kaynaklar ve yöntem"}</button></section>
      </div></div>
      {sources && <div className="provenance-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && closeSources()}><aside ref={sourceDrawer} className="provenance-drawer" role="dialog" aria-modal="true" aria-labelledby="provenance-title"><button ref={sourceCloseButton} type="button" onClick={closeSources} aria-label={isEn ? "Close sources" : "Kaynakları kapat"}>×</button><span className="eyebrow">{isEn ? "SOURCES AND METHODOLOGY" : "KAYNAKLAR VE YÖNTEM"}</span><h2 id="provenance-title">{isEn ? "Provenance record" : "Kaynak kaydı"}</h2><dl><div><dt>{isEn ? "Source basis" : "Kaynak temeli"}</dt><dd>{article.source}</dd></div>{article.sources.map((source) => <div key={source.label}><dt>{source.label}</dt><dd>{source.url ? <a href={source.url} target="_blank" rel="noreferrer">{source.note} <span aria-hidden="true">↗</span></a> : source.note}</dd></div>)}<div><dt>{isEn ? "Data period" : "Veri dönemi"}</dt><dd>{article.dataPeriod}</dd></div><div><dt>{isEn ? "Definition" : "Tanım"}</dt><dd>{article.frameworkTitle}</dd></div><div><dt>{isEn ? "Method" : "Yöntem"}</dt><dd>{article.methodology}</dd></div><div><dt>{isEn ? "Confidence" : "Güven düzeyi"}</dt><dd>{article.confidence}</dd></div><div><dt>{isEn ? "Last review" : "Son inceleme"}</dt><dd>{article.dateLabel}</dd></div></dl></aside></div>}
      <section className="cta-band compact-band"><h2>{isEn ? "Move from this perspective to your specific decision." : "Bu perspektiften kurumunuza özgü karara geçin."}</h2><p>{isEn ? "Describe the decision in a few sentences. Ahmed Furkan Gul reads every message and replies personally." : "Kararı birkaç cümleyle anlatın. Ahmed Furkan Gul her mesajı okur ve kişisel olarak yanıtlar."}</p><a className="button light" href={`/${lang}/${m.contact}${engagement ? `?topic=${engagement.key}` : ""}`}>{isEn ? "Discuss your decision" : "Kararınızı konuşalım"}</a></section>
    </article>
  );
}

export function PrivateBriefingPage({ lang }: { lang: Lang }) {
  const isEn = lang === "en";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const formats = isEn ? ["Executive call", "Leadership-team briefing", "Board discussion", "Private roundtable", "Strategy workshop", "Market-entry review", "AI value workshop", "Transformation pulse review"] : ["Yönetici görüşmesi", "Liderlik ekibi brifingi", "Yönetim kurulu görüşmesi", "Özel yuvarlak masa", "Strateji çalıştayı", "Pazara giriş değerlendirmesi", "Yapay zekâ değer çalıştayı", "Dönüşüm nabzı değerlendirmesi"];
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, kind: "briefing", language: lang, source: `/${lang}/${routeMap[lang].privateBriefing}` }),
      });
      const result = await response.json() as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || "Submission failed");
      setStatus("sent");
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : (isEn ? "The request could not be sent." : "Talep gönderilemedi."));
      setStatus("error");
    }
  };
  return (
    <>
      <IntelligenceHero label={isEn ? "PRIVATE EXECUTIVE BRIEFING" : "ÖZEL YÖNETİCİ BRİFİNGİ"} title={isEn ? "Move from a published perspective to your specific decision." : "Yayımlanmış bir perspektiften kurumunuza özgü karara geçin."} intro={isEn ? "A serious, prepared executive discussion—not a promotional consultation." : "Promosyon amaçlı bir danışmanlık görüşmesi değil; ciddi ve hazırlıklı bir yönetici görüşmesi."}/>
      <section className="briefing-request">
        <div><span className="eyebrow">{isEn ? "HOW THE CONVERSATION BEGINS" : "GÖRÜŞME NASIL BAŞLAR"}</span><h2>{isEn ? "Bring the decision, the evidence, and the tension." : "Kararı, kanıtı ve gerilimi birlikte ele alalım."}</h2><ol><li><span>01</span>{isEn ? "You share the context without restricted material." : "Kısıtlı materyal paylaşmadan bağlamı aktarırsınız."}</li><li><span>02</span>{isEn ? "Ganrich reviews the decision and prepares the relevant questions." : "Ganrich kararı inceler ve ilgili sorulara hazırlanır."}</li><li><span>03</span>{isEn ? "The discussion focuses on choices, evidence, and next action." : "Görüşme tercihlere, kanıta ve sonraki uygulamaya odaklanır."}</li></ol></div>
        {status === "sent" ? <div className="form-success" role="status"><span>✓</span><h2>{isEn ? "Your briefing request has been received." : "Brifing talebiniz alındı."}</h2><p>{isEn ? "We will review the decision context before responding. Please do not send confidential material by email at this stage." : "Yanıt vermeden önce karar bağlamını inceleyeceğiz. Bu aşamada e-posta ile gizli materyal göndermeyin."}</p></div> : <form onSubmit={submit}><label>{isEn ? "What decision is being considered?" : "Hangi karar değerlendiriliyor?"}<textarea name="decision" minLength={15} required/></label><label>{isEn ? "Why is it on the agenda now?" : "Bu karar neden şimdi gündemde?"}<textarea name="context" minLength={30} required/></label><label>{isEn ? "Organization" : "Kurum"}<input name="organization" autoComplete="organization" required/></label><label>{isEn ? "Region" : "Coğrafya"}<select name="region" defaultValue="" required><option value="" disabled>{isEn ? "Select a region" : "Bir coğrafya seçin"}</option>{markets[lang].map((market) => <option key={market[0]}>{market[0]}</option>)}</select></label><label>{isEn ? "Preferred discussion format" : "Tercih edilen görüşme biçimi"}<select name="interest" defaultValue="" required><option value="" disabled>{isEn ? "Select a format" : "Bir format seçin"}</option>{formats.map((format) => <option key={format}>{format}</option>)}</select></label><label>{isEn ? "Which stakeholders are involved?" : "Hangi paydaşlar sürece dahil?"}<input name="role"/></label><label>{isEn ? "Name" : "Ad Soyad"}<input name="name" autoComplete="name" minLength={2} required/></label><label>{isEn ? "Work email" : "İş e-postası"}<input name="email" type="email" autoComplete="email" required/></label><label className="sr-only" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label><label className="marketing-choice"><input name="privacyAcknowledged" type="checkbox" value="yes" required/><span>{isEn ? "I have read the privacy notice and understand how this request will be handled." : "Gizlilik bildirimini okudum ve bu talebin nasıl işleneceğini anladım."}</span></label><p className="jit-notice">{isEn ? "Your details are stored securely to review and respond to this request. Do not include confidential, restricted, or sensitive data." : "Bilgileriniz bu talebi incelemek ve yanıtlamak amacıyla güvenli biçimde saklanır. Gizli, kısıtlı veya hassas bilgi eklemeyin."} <a href={`/${lang}/${routeMap[lang].privacy}`}>{isEn ? "Privacy notice" : "Gizlilik bildirimi"}</a></p>{status === "error" && <p className="form-error" role="alert">{message} <a href="mailto:furkangul@ganrichadvisory.com">{isEn ? "Use direct email." : "Doğrudan e-posta kullanın."}</a></p>}<button className="button" type="submit" disabled={status === "sending"}>{status === "sending" ? (isEn ? "Sending…" : "Gönderiliyor…") : (isEn ? "Request the briefing" : "Brifing talep edin")}</button></form>}
      </section>
    </>
  );
}
