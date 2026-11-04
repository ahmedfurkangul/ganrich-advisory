import type { Lang } from "./content";

// AI Decisions: the independent decision layer above AI deployment (positioning approved 4 Nov 2026).
// Every statement here comes from the approved brief. Do not add clients, case studies, partner names,
// figures or prices. Offer durations (4 weeks each) and the no-commission line were approved by the founder.

export type AiOffer = { key: "aiDiagnostic" | "aiPartnerSprint"; title: string; audience: string; duration: string; deliverables: string[] };

export type AiDecisionsCopy = {
  kicker: string;
  h1: string;
  lead: string;
  positioning: string;
  doTitle: string;
  doItems: [string, string][];
  dontTitle: string;
  dontItems: string[];
  offersTitle: string;
  offersIntro: string;
  offers: AiOffer[];
  regulationTitle: string;
  regulationBody: string;
  regulationLinks: { key: string; label: string }[];
  faqTitle: string;
  faq: [string, string][];
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
};

export const aiDecisions: Record<Lang, AiDecisionsCopy> = {
  en: {
    kicker: "AI decisions",
    h1: "AI decisions, independent of the vendor who builds them.",
    lead: "We help leadership teams decide where AI is worth doing, choose who builds it, and check that the value arrives.",
    positioning: "Ganrich Advisory is the independent decision layer above AI deployment. We do not build AI. We work with boards and leadership teams in Türkiye, the Middle East and North Africa, Europe and Africa.",
    doTitle: "What we do",
    doItems: [
      ["Decide where AI creates value", "Which workflows and decisions are worth an AI investment, and which are not."],
      ["Build the business case", "Value, cost, risk and readiness, set out so a board can approve or reject it."],
      ["Select and govern the deployment partner", "An independent selection of who builds it, with contract and governance terms you control."],
      ["Assure delivery against agreed value", "A check that the value agreed at the start actually shows up."],
    ],
    dontTitle: "What we don’t do",
    dontItems: [
      "We do not build or resell AI systems.",
      "We take no vendor commissions or referral fees.",
    ],
    offersTitle: "Two fixed-scope offers",
    offersIntro: "Each offer has a fixed scope and runs for four weeks.",
    offers: [
      { key: "aiDiagnostic", title: "AI value and readiness diagnostic", audience: "For boards", duration: "4 weeks", deliverables: [
        "Prioritised use cases, each with a business case",
        "Readiness gaps across data, people, governance and regulation",
        "A board-level go / no-go recommendation",
      ] },
      { key: "aiPartnerSprint", title: "Deployment partner selection and assurance sprint", audience: "For leadership teams choosing who builds", duration: "4 weeks", deliverables: [
        "Requirements",
        "A long-list and shortlist of build partners",
        "A structured evaluation",
        "Contract and governance recommendations",
        "A value-tracking framework",
      ] },
    ],
    regulationTitle: "Regulation built in",
    regulationBody: "The EU AI Act, KVKK (Türkiye’s personal data protection law) and data-localisation rules in Gulf markets are considered in every partner choice. Where client data is involved, KVKK is part of the decision from the start. The same regulatory work sits behind our programmes for exporters:",
    regulationLinks: [
      { key: "guideCbam2026", label: "CBAM: the 2026 update" },
      { key: "solutionTrEts", label: "Türkiye ETS readiness" },
      { key: "guideCraStandards", label: "CRA compliance without harmonised standards" },
    ],
    faqTitle: "Questions leadership teams ask",
    faq: [
      ["Why use an advisor without engineers?", "Because the party that decides should not be the party that builds. We bring independence from vendors, knowledge of the region and its regulation, senior judgement, and accountability for the decision itself. The engineers come from the partner you select, and we help you select and govern them."],
      ["Do you recommend specific vendors?", "We run an independent selection against your requirements. We have no partnerships to disclose, and we take no vendor commissions or referral fees."],
      ["Do you build or run AI systems?", "No. We do not build or resell AI systems. We help you decide what should be built, by whom, and whether it delivered the value agreed."],
      ["How long do the offers take?", "Both the AI value and readiness diagnostic and the deployment partner selection and assurance sprint run for four weeks."],
      ["How is our data handled?", "Access to your data is agreed before any analysis and handled in line with KVKK. We only look at what the decision needs."],
    ],
    ctaTitle: "Start with one AI decision.",
    ctaBody: "Tell us what is on the table: a use case, a vendor proposal or a pilot that has stalled. We’ll come back by email with whether and how we can help.",
    ctaButton: "Request a first review",
  },
  tr: {
    kicker: "Yapay zekâ kararları",
    h1: "Yapay zekâ kararları, onu kuran tedarikçiden bağımsız.",
    lead: "Yönetim ekiplerinin yapay zekânın nerede yapmaya değer olduğuna karar vermesine, onu kimin kuracağını seçmesine ve değerin gerçekten gelip gelmediğini kontrol etmesine yardımcı oluyoruz.",
    positioning: "Ganrich Advisory, yapay zekâ uygulamalarının üzerindeki bağımsız karar katmanıdır. Yapay zekâ geliştirmiyoruz. Türkiye, Orta Doğu ve Kuzey Afrika, Avrupa ve Afrika’daki yönetim kurulları ve yönetim ekipleriyle çalışıyoruz.",
    doTitle: "Ne yapıyoruz?",
    doItems: [
      ["Yapay zekânın nerede değer yarattığına karar vermek", "Hangi iş akışları ve kararlar bir yapay zekâ yatırımına değer, hangileri değmez."],
      ["İş gerekçesini kurmak", "Değer, maliyet, risk ve hazırlık; yönetim kurulunun onaylayabileceği ya da reddedebileceği biçimde."],
      ["Uygulama ortağını seçmek ve yönetişimini kurmak", "Sistemi kimin kuracağına dair bağımsız bir seçim; sözleşme ve yönetişim koşulları sizin kontrolünüzde."],
      ["Teslimatı kararlaştırılan değere göre güvenceye almak", "Başta üzerinde anlaşılan değerin gerçekten ortaya çıkıp çıkmadığının kontrolü."],
    ],
    dontTitle: "Ne yapmıyoruz?",
    dontItems: [
      "Yapay zekâ sistemi geliştirmiyor veya satmıyoruz.",
      "Tedarikçilerden komisyon veya yönlendirme ücreti almıyoruz.",
    ],
    offersTitle: "Kapsamı belirli iki çalışma",
    offersIntro: "Her çalışmanın kapsamı bellidir ve dört hafta sürer.",
    offers: [
      { key: "aiDiagnostic", title: "Yapay zekâ değer ve hazırlık analizi", audience: "Yönetim kurulları için", duration: "4 hafta", deliverables: [
        "Her biri iş gerekçesiyle önceliklendirilmiş kullanım alanları",
        "Veri, insan, yönetişim ve mevzuat açısından hazırlık boşlukları",
        "Yönetim kurulu düzeyinde devam / dur önerisi",
      ] },
      { key: "aiPartnerSprint", title: "Uygulama ortağı seçimi ve güvence sprinti", audience: "Sistemi kimin kuracağını seçen yönetim ekipleri için", duration: "4 hafta", deliverables: [
        "İhtiyaçların tanımı",
        "Uygulama ortaklarının uzun ve kısa listesi",
        "Yapılandırılmış değerlendirme",
        "Sözleşme ve yönetişim önerileri",
        "Değer takip çerçevesi",
      ] },
    ],
    regulationTitle: "Mevzuat işin içinde",
    regulationBody: "Her ortak seçiminde AB Yapay Zekâ Yasası, KVKK (6698 sayılı Kişisel Verilerin Korunması Kanunu) ve Körfez pazarlarındaki veri yerelleştirme kuralları dikkate alınır. Müşteri verisi söz konusu olduğunda KVKK en baştan kararın parçasıdır. İhracatçılara yönelik programlarımızın arkasında da aynı mevzuat çalışması var:",
    regulationLinks: [
      { key: "guideCbam2026", label: "SKDM (CBAM): 2026 güncellemesi" },
      { key: "solutionTrEts", label: "Türkiye ETS hazırlığı" },
      { key: "guideCraStandards", label: "Uyumlaştırılmış standart yokken CRA uyumu" },
    ],
    faqTitle: "Yönetim ekiplerinin sorduğu sorular",
    faq: [
      ["Mühendisi olmayan bir danışmanla neden çalışalım?", "Çünkü karar veren taraf, sistemi kuran taraf olmamalı. Tedarikçilerden bağımsızlık, bölgeye ve mevzuatına hâkimiyet, kıdemli muhakeme ve kararın kendisi için hesap verebilirlik getiriyoruz. Mühendisler seçtiğiniz ortaktan gelir; o ortağı seçmenize ve yönetmenize yardımcı oluyoruz."],
      ["Belirli tedarikçiler öneriyor musunuz?", "İhtiyaçlarınıza göre bağımsız bir seçim yürütüyoruz. Açıklamamız gereken bir ortaklığımız yok; tedarikçilerden komisyon veya yönlendirme ücreti almıyoruz."],
      ["Yapay zekâ sistemi kuruyor veya işletiyor musunuz?", "Hayır. Yapay zekâ sistemi geliştirmiyor veya satmıyoruz. Neyin, kim tarafından kurulacağına ve kararlaştırılan değerin gelip gelmediğine karar vermenize yardımcı oluyoruz."],
      ["Çalışmalar ne kadar sürer?", "Yapay zekâ değer ve hazırlık analizi de, uygulama ortağı seçimi ve güvence sprinti de dört hafta sürer."],
      ["Verilerimiz nasıl ele alınır?", "Verilerinize erişim, herhangi bir analizden önce kararlaştırılır ve KVKK’ya uygun şekilde yürütülür. Yalnızca kararın gerektirdiği veriye bakarız."],
    ],
    ctaTitle: "Tek bir yapay zekâ kararıyla başlayın.",
    ctaBody: "Masada ne olduğunu paylaşın: bir kullanım alanı, bir tedarikçi teklifi ya da tıkanmış bir pilot. Yardımcı olup olamayacağımızı ve nasıl olacağını e-postayla bildirelim.",
    ctaButton: "Ön görüşme isteyin",
  },
};

/** Offer titles by key, for the contact form topic list. */
export const aiOfferTitle = (lang: Lang, key: string) => aiDecisions[lang].offers.find(o => o.key === key)?.title;
