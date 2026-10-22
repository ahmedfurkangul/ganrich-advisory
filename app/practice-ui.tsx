import { Lang, routeMap } from "./content";
import { firstConversation } from "./practice-core";

/* Small shared UI for practice pages and client pages. Internal links use →, external ↗. */

const href = (lang: Lang, key: string) => `/${lang}/${routeMap[lang][key]}`;

export function Go({ to, children, className = "text-link", event }: { to: string; children: React.ReactNode; className?: string; event?: string }) {
  return <a href={to} className={className} data-analytics-event={event}>{children}<span aria-hidden="true" className="arrow">→</span></a>;
}

export function External({ to, children, className = "text-link" }: { to: string; children: React.ReactNode; className?: string }) {
  return <a href={to} className={className} target="_blank" rel="noreferrer">{children}<span aria-hidden="true" className="arrow">↗</span><span className="sr-only">{" (opens in a new tab)"}</span></a>;
}

export function Label({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

export function PracticeHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children?: React.ReactNode }) {
  return <section className="p-hero">
    <div className="p-hero-copy"><Label>{eyebrow}</Label><h1>{title}</h1><p>{intro}</p>{children}</div>
  </section>;
}

export function NextStep({ lang, title, body, prompt }: { lang: Lang; title?: string; body?: string; prompt?: string }) {
  const isEn = lang === "en";
  const steps = firstConversation[lang];
  return <section className="p-next" aria-labelledby="next-step-title">
    <div className="p-next-head">
      <Label>{isEn ? "Next step" : "Sonraki adım"}</Label>
      <h2 id="next-step-title">{title ?? (isEn ? "Start with a short note about the decision." : "Karar hakkında kısa bir notla başlayın.")}</h2>
      <p>{body ?? (isEn ? "No preparation is needed for a first conversation. Here is what happens after you get in touch." : "İlk görüşme için hazırlık gerekmez. İletişime geçtiğinizde süreç şöyle ilerler.")}</p>
      <a className="button light" href={href(lang, "contact")} data-analytics-event="contact_started">{prompt ?? (isEn ? "Start a conversation" : "Görüşme başlatın")}</a>
    </div>
    <ol className="p-next-steps">{steps.map(([title, body], index) => <li key={title}><span>0{index + 1}</span><div><strong>{title}</strong><p>{body}</p></div></li>)}</ol>
  </section>;
}
