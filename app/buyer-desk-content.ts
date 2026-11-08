import type { Lang } from "./content";

// EU Buyer Request Desk: the first new service after the competitive strategy study (8 Nov 2026).
// Furkan chose the positioning "independent decision partner for EU buyer requirements" and this desk
// as the first new service. No prices, client names, partner names, figures or case studies here.

export type BuyerDeskCopy = {
  kicker: string;
  h1: string;
  lead: string;
  problemTitle: string;
  problem: string;
  doTitle: string;
  doItems: [string, string][];
  dontTitle: string;
  dontItems: string[];
  stepsTitle: string;
  steps: [string, string][];
  audienceTitle: string;
  audience: string;
  rulesTitle: string;
  rulesBody: string;
  ruleLinks: { key: string; label: string }[];
  faqTitle: string;
  faq: [string, string][];
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
};

export const BUYER_DESK_TITLE: Record<Lang, string> = { en: "EU Buyer Request Desk", tr: "AB Alıcı Talep Masası" };

export const buyerDesk: Record<Lang, BuyerDeskCopy> = {
  en: {
    kicker: "EU Buyer Request Desk",
    h1: "One desk for every EU buyer request.",
    lead: "Your EU customers now send questions on CBAM emissions, deforestation, packaging, forced labour, cyber security and supplier sustainability data. We become the desk that sorts each request, decides with you what to give and when, and keeps the answers consistent.",
    problemTitle: "Why a desk",
    problem: "Requests arrive in different inboxes: sales, quality, finance, the plant. Nobody owns them, answers differ from one customer to the next, and the same data is gathered again each time. Some requests are legal obligations, some are the buyer's own policy and some are open to negotiation. Treating them all the same costs time and, sometimes, margin.",
    doTitle: "What the desk does",
    doItems: [
      ["Sorts every request", "Legal obligation, buyer policy or commercial negotiation, with the deadline and the person who owns it."],
      ["Decides the answer with you", "What to give and in how much detail, actual or default values where that choice exists, and what preparing it will cost."],
      ["Keeps one answer library", "Approved answers, the evidence behind them and who signed them off, so the next similar request starts from an approved answer."],
      ["Runs a yearly calendar", "Which EU rule reaches which product and which customer, and when."],
      ["Coordinates specialists independently", "Verifiers, lawyers or software only when they are needed, chosen on your criteria."],
    ],
    dontTitle: "What the desk does not do",
    dontItems: [
      "We are not a verification body and do not issue verified statements.",
      "We do not give legal opinions. Contract wording is reviewed by your lawyer.",
      "We do not sell or resell software, and take no commissions or referral fees from vendors or verifiers.",
      "Nothing is sent to a buyer without your team's approval.",
    ],
    stepsTitle: "How it works",
    steps: [
      ["First review", "We look at the requests you already have and the ones you expect, and agree whether a desk would help."],
      ["Set-up", "A list of open requests with owners and deadlines, the first entries in the answer library, and the rule calendar for your products."],
      ["Monthly desk", "New requests are sorted and answered with your team, with a short note to management each month."],
    ],
    audienceTitle: "Who it is for",
    audience: "Manufacturers and exporters selling to EU buyers who do not have an in-house team for compliance and sustainability requests. Usually the export, finance, quality or plant manager who receives the questionnaires today.",
    rulesTitle: "Rules the desk covers",
    rulesBody: "The desk draws on the same work as our programmes. Each link explains the rule, who it affects and what a first step looks like.",
    ruleLinks: [
      { key: "solutionCbam", label: "CBAM" },
      { key: "solutionEudr", label: "EUDR" },
      { key: "solutionCra", label: "Cyber Resilience Act" },
      { key: "solutionPackaging", label: "EU packaging rules (PPWR)" },
      { key: "solutionForcedLabour", label: "Forced labour regulation" },
      { key: "solutionSupplierData", label: "Supplier sustainability data" },
      { key: "solutionTextiles", label: "Textile ecodesign and product passport" },
      { key: "regulationCalendar", label: "EU regulation calendar" },
    ],
    faqTitle: "Questions about the desk",
    faq: [
      ["Is this a software platform?", "No. We work with your team and the tools you already use. If a platform turns out to be needed, we help you choose one independently and take no fee from the vendor."],
      ["Do you verify our emissions data?", "No. Verification is done by accredited bodies. We prepare and organise the data so that verification can go smoothly, and help you choose a verifier if you need one."],
      ["How is our customers' and our own data handled?", "We use only the data a request needs, under a confidentiality agreement and Turkish data protection law (KVKK). Nothing goes to a buyer without your approval."],
      ["How does it start?", "With a first review of the requests you already have. Scope and terms are agreed after that conversation."],
      ["Can we start with a single request?", "Yes. You can start with the most urgent request and decide on a monthly desk after seeing how it works."],
    ],
    ctaTitle: "Bring the last request your EU buyer sent.",
    ctaBody: "In a first conversation we look at one real request, sort it and suggest the next step. Please keep the first message non-confidential.",
    ctaButton: "Request a first review",
  },
  tr: {
    kicker: "AB Alıcı Talep Masası",
    h1: "AB alıcılarınızdan gelen her talep için tek masa.",
    lead: "AB müşterileriniz artık SKDM emisyon verisi, ormansızlaşma, ambalaj, zorla çalıştırma, siber güvenlik ve tedarikçi sürdürülebilirlik verisi soruyor. Her talebi sınıflandıran, neyi ne zaman vereceğinize sizinle birlikte karar veren ve yanıtları tutarlı tutan masa oluyoruz.",
    problemTitle: "Neden bir masa",
    problem: "Talepler farklı kutulara düşüyor: satış, kalite, finans, tesis. Sahibi yok, yanıtlar müşteriden müşteriye değişiyor ve aynı veri her seferinde yeniden toplanıyor. Bazı talepler yasal zorunluluk, bazıları alıcının kendi politikası, bazıları ise pazarlığa açık. Hepsine aynı şekilde davranmak zaman, bazen de marj kaybettiriyor.",
    doTitle: "Masa ne yapar",
    doItems: [
      ["Her talebi sınıflandırır", "Yasal zorunluluk, alıcı politikası veya ticari pazarlık; son tarih ve sorumlu kişiyle birlikte."],
      ["Yanıta sizinle karar verir", "Neyin hangi ayrıntıda verileceği, seçim varsa gerçek mi varsayılan değer mi kullanılacağı ve hazırlığın maliyeti."],
      ["Tek bir yanıt kütüphanesi tutar", "Onaylı yanıtlar, dayandıkları kanıt ve onaylayan kişi; böylece benzer bir sonraki talep onaylı bir yanıttan başlar."],
      ["Yıllık takvimi yürütür", "Hangi AB kuralının hangi ürüne ve hangi müşteriye ne zaman dokunduğu."],
      ["Uzmanları bağımsız koordine eder", "Doğrulayıcı, avukat veya yazılım yalnız gerektiğinde ve sizin ölçütlerinizle seçilir."],
    ],
    dontTitle: "Masa ne yapmaz",
    dontItems: [
      "Doğrulama kuruluşu değiliz ve doğrulanmış beyan düzenlemiyoruz.",
      "Hukuki görüş vermiyoruz. Sözleşme metinlerini avukatınız inceler.",
      "Yazılım satmıyor veya aracılık etmiyoruz; yazılım firmalarından ya da doğrulayıcılardan komisyon veya yönlendirme ücreti almıyoruz.",
      "Ekibinizin onayı olmadan alıcıya hiçbir şey gönderilmez.",
    ],
    stepsTitle: "Nasıl çalışır",
    steps: [
      ["Ön görüşme", "Elinizdeki ve beklediğiniz talepleri birlikte inceler, bir masanın işe yarayıp yaramayacağına karar veririz."],
      ["Kurulum", "Sorumlu ve son tarihleriyle açık talepler listesi, yanıt kütüphanesinin ilk kayıtları ve ürünlerinize özel kural takvimi."],
      ["Aylık masa", "Yeni talepler ekibinizle birlikte sınıflandırılır ve yanıtlanır; her ay yönetime kısa bir not gider."],
    ],
    audienceTitle: "Kimler için",
    audience: "AB alıcılarına satış yapan ve uyum ile sürdürülebilirlik talepleri için şirket içinde ekibi olmayan üretici ve ihracatçılar. Genellikle bugün bu anketleri alan ihracat, finans, kalite veya tesis yöneticisi.",
    rulesTitle: "Masanın kapsadığı kurallar",
    rulesBody: "Masa, programlarımızdaki çalışmanın aynısına dayanır. Her bağlantı kuralı, kimi etkilediğini ve ilk adımın nasıl göründüğünü anlatır.",
    ruleLinks: [
      { key: "solutionCbam", label: "SKDM (CBAM)" },
      { key: "solutionEudr", label: "EUDR" },
      { key: "solutionCra", label: "Siber Dayanıklılık Yasası" },
      { key: "solutionPackaging", label: "AB ambalaj kuralları (PPWR)" },
      { key: "solutionForcedLabour", label: "Zorla çalıştırma tüzüğü" },
      { key: "solutionSupplierData", label: "Tedarikçi sürdürülebilirlik verisi" },
      { key: "solutionTextiles", label: "Tekstilde ekotasarım ve ürün pasaportu" },
      { key: "regulationCalendar", label: "AB mevzuat takvimi" },
    ],
    faqTitle: "Masa hakkında sorular",
    faq: [
      ["Bu bir yazılım platformu mu?", "Hayır. Ekibinizle ve zaten kullandığınız araçlarla çalışırız. Bir platform gerektiği ortaya çıkarsa seçimine bağımsız olarak yardım eder, yazılım firmasından ücret almayız."],
      ["Emisyon verimizi siz mi doğruluyorsunuz?", "Hayır. Doğrulamayı akredite kuruluşlar yapar. Biz veriyi doğrulamanın sorunsuz geçeceği biçimde hazırlar ve düzenler, gerekirse doğrulayıcı seçimine yardım ederiz."],
      ["Müşterilerimizin ve bizim verimiz nasıl korunuyor?", "Yalnız talebin gerektirdiği veriyi, gizlilik sözleşmesi ve KVKK çerçevesinde kullanırız. Onayınız olmadan alıcıya hiçbir şey gitmez."],
      ["Nasıl başlıyor?", "Elinizdeki taleplerin incelendiği bir ön görüşmeyle. Kapsam ve koşullar bu görüşmeden sonra birlikte belirlenir."],
      ["Tek bir taleple başlayabilir miyiz?", "Evet. En acil talepten başlayıp işleyişi gördükten sonra aylık masaya karar verebilirsiniz."],
    ],
    ctaTitle: "AB alıcınızın gönderdiği son talebi getirin.",
    ctaBody: "Ön görüşmede gerçek bir talebe bakar, sınıflandırır ve sonraki adımı öneririz. İlk mesajınızda gizli bilgi paylaşmayın.",
    ctaButton: "Ön görüşme isteyin",
  },
};
