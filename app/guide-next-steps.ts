import type { Lang } from "./content";

// The concrete next step at the end of each long-form guide. `target` is a route key (the page the
// step points to) and also the contact-form topic (?service=<target>), so the form opens pre-filled.
// No prices, durations or response times (site rule).
export type GuideNextStep = { target: string } & Record<Lang, { title: string; body: string }>;

export const guideNextSteps: Record<string, GuideNextStep> = {
  guideCbamVerifier: { target: "toolSelection",
    en: { title: "Choosing a verifier? Ask for a neutral shortlist.", body: "We turn your installation, products and buyers into selection criteria, compare accredited verifiers on the same terms and give you a written recommendation. We take no fee from any verifier." },
    tr: { title: "Doğrulayıcı mı seçiyorsunuz? Tarafsız bir kısa liste isteyin.", body: "Tesisinizi, ürünlerinizi ve alıcılarınızı seçim ölçütlerine çeviririz, akredite doğrulayıcıları aynı ölçütlerle karşılaştırır ve yazılı bir öneri veririz. Hiçbir doğrulayıcıdan ücret almayız." } },
  guideCbamDefaults: { target: "solutionCbam",
    en: { title: "Default or actual values? Decide with your own numbers.", body: "We compare what defaults would cost your buyer with what actual, verified values would take for your plant, product by product, and agree with you which way to go." },
    tr: { title: "Varsayılan mı, fiili değer mi? Kendi rakamlarınızla karar verin.", body: "Varsayılan değerlerin alıcınıza maliyetini, tesisiniz için fiili ve doğrulanmış değerlerin gerektirdiği işle ürün ürün karşılaştırır, hangi yolun seçileceğine sizinle karar veririz." } },
  guideCbam2026: { target: "buyerDesk",
    en: { title: "CBAM questions from several EU buyers?", body: "The EU Buyer Request Desk sorts each request, decides with you what to give and when, and keeps your answers consistent across customers." },
    tr: { title: "Birden çok AB alıcısından SKDM sorusu mu geliyor?", body: "AB Alıcı Talep Masası her talebi sınıflandırır, neyi ne zaman vereceğinize sizinle karar verir ve yanıtlarınızı müşteriler arasında tutarlı tutar." } },
  guideCbamDownstream: { target: "solutionCbam",
    en: { title: "Set up the steel and aluminium data flow before 2028.", body: "We map which of your products may fall in scope, which supplier data you will need and how to write it into supply contracts now." },
    tr: { title: "Çelik ve alüminyum veri akışını 2028'den önce kurun.", body: "Hangi ürünlerinizin kapsama girebileceğini, hangi tedarikçi verisine ihtiyaç duyacağınızı ve bunu tedarik sözleşmelerine şimdiden nasıl yazacağınızı birlikte çıkarırız." } },
  guideUkCbam: { target: "solutionCbam",
    en: { title: "Shipping to both the EU and the UK?", body: "We help you build one emissions file that serves both regimes, and decide where actual values are worth the effort." },
    tr: { title: "Hem AB'ye hem İngiltere'ye mi ihracat yapıyorsunuz?", body: "İki rejime de hizmet eden tek bir emisyon dosyası kurmanıza ve fiili değerin hangi ürünlerde zahmete değdiğine karar vermenize yardımcı oluruz." } },
  guideGreenDeal: { target: "incentiveFile",
    en: { title: "Turn your CBAM work into a support or finance file.", body: "The emissions data and roadmap your EU buyers ask for are also what green transition support and bank green finance look for. We connect the two." },
    tr: { title: "SKDM çalışmanızı bir destek veya finansman dosyasına dönüştürün.", body: "AB alıcılarınızın istediği emisyon verisi ve yol haritası, yeşil dönüşüm desteklerinin ve banka yeşil finansmanının aradığı şeyle aynı. İkisini birbirine bağlarız." } },
  guideTrEtsMarket: { target: "solutionTrEts",
    en: { title: "Get ready for the Türkiye ETS and its link to CBAM.", body: "We check which of your installations are covered, what monitoring and reporting they need, and how a domestic carbon price could reduce what your EU buyer pays." },
    tr: { title: "TR ETS'ye ve SKDM ile bağlantısına hazırlanın.", body: "Hangi tesislerinizin kapsamda olduğunu, hangi izleme ve raporlamayı gerektirdiğini ve yurt içi karbon fiyatının AB alıcınızın ödediği tutarı nasıl azaltabileceğini birlikte inceleriz." } },
  guideSteelDpp: { target: "toolSelection",
    en: { title: "Choosing product passport or emissions software?", body: "In a short, vendor-neutral sprint we turn your requirements into a shortlist and compare the options on the same criteria. We take no fee from any vendor." },
    tr: { title: "Ürün pasaportu veya emisyon yazılımı mı seçiyorsunuz?", body: "Kısa ve tedarikçiden bağımsız bir çalışmada ihtiyaçlarınızı bir kısa listeye çevirir, seçenekleri aynı ölçütlerle karşılaştırırız. Hiçbir yazılım firmasından ücret almayız." } },
  guideCraReporting: { target: "solutionCra",
    en: { title: "Could you report within 24 hours?", body: "We test your reporting path on one product: who decides, what gets reported to whom, and what is missing before an exploited vulnerability forces the question." },
    tr: { title: "24 saat içinde bildirim yapabilir misiniz?", body: "Bildirim yolunuzu tek bir ürün üzerinde test ederiz: kim karar verir, neyi kime bildirirsiniz ve istismar edilen bir açık bu soruyu zorlamadan önce ne eksik." } },
  guideCraStandards: { target: "solutionCra",
    en: { title: "Plan CRA conformity before the standards are final.", body: "We help you decide which evidence to build now, which standards to follow in the meantime and what to ask your component suppliers." },
    tr: { title: "Standartlar kesinleşmeden CRA uygunluğunu planlayın.", body: "Hangi kanıtı şimdi oluşturacağınıza, bu arada hangi standartları izleyeceğinize ve bileşen tedarikçilerinizden ne isteyeceğinize karar vermenize yardımcı oluruz." } },
  guideEudr2026: { target: "solutionEudr",
    en: { title: "Get your EUDR file ready for your importer.", body: "We work out which products are in scope, what origin, geolocation and legality data your importer needs, and where your supply chain has gaps." },
    tr: { title: "EUDR dosyanızı ithalatçınız için hazırlayın.", body: "Hangi ürünlerin kapsamda olduğunu, ithalatçınızın hangi menşe, coğrafi konum ve yasallık verisine ihtiyaç duyduğunu ve tedarik zincirinizin nerede eksik kaldığını birlikte çıkarırız." } },
  guideGulfEntry: { target: "serviceMarket",
    en: { title: "Deciding how to enter the Gulf?", body: "We compare markets and entry models and set out what must be true before you commit capital." },
    tr: { title: "Körfez'e nasıl gireceğinize mi karar veriyorsunuz?", body: "Pazarları ve giriş modellerini karşılaştırır, sermaye bağlamadan önce neyin doğru olması gerektiğini ortaya koyarız." } },
};
