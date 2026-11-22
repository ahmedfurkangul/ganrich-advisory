import { Lang } from "./content";
import { Conversation } from "./advisory";

// Accessibility statement. Every claim describes what the site does today or how it was checked;
// update the review date and the known limitations together.
export const accessibilityCopy = {
  en: {
    title: "Accessibility statement | Ganrich Advisory",
    description: "How ganrichadvisory.com aims to meet WCAG 2.1 level AA, how we checked it, which limitations we know about and how to tell us about a barrier.",
    label: "Accessibility",
    h1: "Accessibility statement",
    lead: "We want every page on ganrichadvisory.com to be usable by everyone, including people who use a keyboard, a screen reader or zoom. This statement says what we do, how we check it and where we still fall short.",
    sections: [
      ["Our target", ["We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA on every page in English and Turkish."]],
      ["What the site does", [
        "A \"Skip to content\" link is the first item on every page.",
        "Every page declares its language, and passages in the other language are marked as such.",
        "Images that carry meaning have text alternatives; decorative images are hidden from screen readers.",
        "Links, buttons and form fields show a visible focus outline when you move through them with a keyboard.",
        "Animations and smooth scrolling are switched off when your device asks for reduced motion.",
        "Pages work without JavaScript for reading: the content is in the page when it loads.",
        "Forms label every field, mark required fields and say what went wrong if a submission fails.",
      ]],
      ["How we checked", ["On 22 November 2026 we tested ten key pages on a mobile and a desktop screen with the automated axe-core checker against WCAG 2.1 AA, and checked by hand that the pages read correctly without JavaScript. The automated check found no critical or serious issues. One moderate issue, a nested landmark on the contact page, has been corrected."]],
      ["Known limitations", [
        "Downloadable PDF reports may not be fully accessible to screen readers. If you need a report in another format, email us and we will send the text.",
        "The interactive readiness checks have not yet been fully tested with screen readers.",
        "Some pages link to official sources such as EUR-Lex and the Official Gazette, whose accessibility we do not control.",
      ]],
      ["Tell us about a barrier", ["If something on the site is hard to use or read, email furkangul@ganrichadvisory.com with the page address and what you were trying to do. We will look into it and reply."]],
    ],
    reviewed: "Last reviewed: 22 November 2026.",
  },
  tr: {
    title: "Erişilebilirlik beyanı | Ganrich Advisory",
    description: "ganrichadvisory.com'un WCAG 2.1 AA düzeyini nasıl hedeflediği, bunu nasıl kontrol ettiğimiz, bilinen sınırlamalar ve bir engeli bize nasıl bildirebileceğiniz.",
    label: "Erişilebilirlik",
    h1: "Erişilebilirlik beyanı",
    lead: "ganrichadvisory.com'daki her sayfanın, klavye, ekran okuyucu veya yakınlaştırma kullananlar dahil herkes tarafından kullanılabilmesini istiyoruz. Bu beyan ne yaptığımızı, nasıl kontrol ettiğimizi ve hâlâ nerede eksik kaldığımızı anlatıyor.",
    sections: [
      ["Hedefimiz", ["Türkçe ve İngilizce tüm sayfalarda Web İçeriği Erişilebilirlik Yönergeleri (WCAG) 2.1 AA düzeyini karşılamayı hedefliyoruz."]],
      ["Sitede neler var?", [
        "Her sayfanın ilk öğesi \"İçeriğe geç\" bağlantısı.",
        "Her sayfa dilini belirtiyor; diğer dildeki ifadeler ayrıca işaretleniyor.",
        "Anlam taşıyan görsellerin metin karşılığı var; süsleme amaçlı görseller ekran okuyuculardan gizleniyor.",
        "Klavyeyle gezinirken bağlantı, düğme ve form alanlarında görünür bir odak çerçevesi çıkıyor.",
        "Cihazınız azaltılmış hareket istediğinde animasyonlar ve yumuşak kaydırma kapanıyor.",
        "Sayfalar JavaScript olmadan da okunabiliyor: içerik sayfa yüklendiğinde sayfada.",
        "Formlarda her alanın etiketi var, zorunlu alanlar belirtiliyor ve gönderim başarısız olursa sorun yazılıyor.",
      ]],
      ["Nasıl kontrol ettik?", ["22 Kasım 2026'da on temel sayfayı mobil ve masaüstü ekranda, WCAG 2.1 AA'ya göre otomatik axe-core aracıyla test ettik; sayfaların JavaScript olmadan doğru okunduğunu elle kontrol ettik. Otomatik kontrol kritik veya ciddi bir sorun bulmadı. Bulunan tek orta düzey sorun, iletişim sayfasındaki iç içe geçmiş bir yer imi (landmark), düzeltildi."]],
      ["Bilinen sınırlamalar", [
        "İndirilebilir PDF raporlar ekran okuyucular için tam erişilebilir olmayabilir. Raporu başka bir biçimde isterseniz bize e-posta gönderin, metni iletelim.",
        "Etkileşimli hazırlık testleri henüz ekran okuyucularla tam olarak test edilmedi.",
        "Bazı sayfalar EUR-Lex ve Resmî Gazete gibi resmî kaynaklara bağlanıyor; bu sitelerin erişilebilirliği bizim kontrolümüzde değil.",
      ]],
      ["Bir engeli bize bildirin", ["Sitede kullanması veya okuması zor bir şey varsa sayfa adresini ve ne yapmaya çalıştığınızı furkangul@ganrichadvisory.com adresine yazın. İnceleyip size dönüş yaparız."]],
    ],
    reviewed: "Son gözden geçirme: 22 Kasım 2026.",
  },
} as const;

export function AccessibilityPage({ lang }: { lang: Lang }) {
  const c = accessibilityCopy[lang];
  return <>
    <section className="advisory-hero guide-hero"><p className="kicker">{c.label}</p><h1>{c.h1}</h1><p className="advisory-lead">{c.lead}</p></section>
    <article className="decision-note-body guide-body accessibility-statement">
      {c.sections.map(([h, items]) => <section key={h}>
        <h2>{h}</h2>
        {items.length > 1 ? <ul>{items.map(i => <li key={i}>{i}</li>)}</ul> : <p>{items[0]}</p>}
      </section>)}
      <p className="note-status">{c.reviewed}</p>
    </article>
    <Conversation lang={lang}/>
  </>;
}
