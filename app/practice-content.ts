import type { Lang } from "./content";
import { engagementSummary, EngagementKey } from "./practice-core";

export { engagementSummary, firstConversation, founder } from "./practice-core";
export type { EngagementKey } from "./practice-core";

/*
 * Positioning, engagement, and founder content for the practice pages.
 * Engagement names are owner-approved (22 October 2026); scope and working steps remain proposals
 * (see docs/REVIEW-DECISIONS.md). No prices, durations, clients, or outcomes are stated.
 * Names, short descriptions and contact data live in practice-core.ts so client bundles stay small.
 */

export type Engagement = {
  key: EngagementKey;
  index: string;
  name: string;
  short: string;
  situationTitle: string;
  situation: string[];
  decision: string;
  forWho: string[];
  notFor: string[];
  questions: string[];
  process: Array<[string, string]>;
  participation: string[];
  deliverables: Array<[string, string]>;
  insightKey: string;
  insightLabel: string;
  toolKey: string;
  toolLabel: string;
  contactPrompt: string;
};

export type Situation = { title: string; body: string; signals: string[]; engagement: EngagementKey };

const engagementsEn: Engagement[] = [
  {
    ...engagementSummary("en", "serviceMarketEntry"),
    situationTitle: "When a new market looks attractive but the route is unproven",
    situation: [
      "A Gulf country, a European market or a regional distributor relationship has moved onto the leadership agenda. There is enthusiasm, a few promising conversations and perhaps a partner proposal, but no shared view of which market comes first, which entry model fits, or what would justify a larger commitment.",
      "The risk is rarely a lack of ideas. It is committing capital, people and reputation in an order that makes it hard to learn or to change course.",
    ],
    decision: "Which market to pursue first, through which entry model, and which commitments to make now versus later.",
    forWho: [
      "Owners and leadership teams of established Turkish companies considering their first or next international market.",
      "Businesses weighing a distributor, a partnership and their own entity against each other.",
      "Boards that want a sequenced plan rather than a single yes/no investment case.",
    ],
    notFor: [
      "Companies looking for a licensed market-research study, a legal or tax opinion, or transaction advisory.",
      "Situations where the decision has already been made and only implementation support is needed.",
      "Requests to validate a conclusion rather than test it.",
    ],
    questions: [
      "Which two or three markets deserve serious attention, and why these?",
      "Distributor, partner or own entity: what does each route give us and what does it cost us in control?",
      "What must be true for this to work, and which of those assumptions are still untested?",
      "What is the smallest commitment that would teach us the most?",
      "At what point would we stop, change model, or invest further?",
    ],
    process: [
      ["Frame", "Agree the decision, the ambition, the constraints and who will make the final call."],
      ["Shortlist", "Narrow the candidate markets using your criteria and dated public evidence, recording every assumption."],
      ["Compare routes", "Set out the realistic entry models for each shortlisted market with the trade-offs in control, cost, speed and learning."],
      ["Sequence", "Turn the preferred option into a sequence of commitments with explicit gates and stopping rules."],
      ["Decide", "Review the recommendation with the decision-makers and record what was decided and why."],
    ],
    participation: [
      "A named decision owner and one working contact on your side.",
      "Access to the people who know the current customers, products and partner conversations.",
      "Existing commercial data you are comfortable sharing under an agreed confidentiality framework.",
      "Two or three working sessions with the leadership team.",
    ],
    deliverables: [
      ["Market shortlist", "The markets considered, the criteria used and why each was kept or set aside."],
      ["Entry alternatives", "A side-by-side view of distributor, partnership and own-entity routes for the leading market."],
      ["Assumptions register", "Each assumption the recommendation depends on, its evidence, and its status."],
      ["Evidence gaps", "What is not yet known, how to find out, and who should own it."],
      ["Sequence of commitments", "Staged commitments with decision gates, indicators to watch and conditions for stopping."],
      ["Decision memo", "A board-ready summary of the recommendation, the alternatives and the residual risks."],
    ],
    insightKey: "articleMarketEntry",
    insightLabel: "Market entry is a sequence of commitments",
    toolKey: "marketCompass",
    toolLabel: "Market Entry Compass",
  },
  {
    ...engagementSummary("en", "serviceOperatingModel"),
    situationTitle: "When the company has outgrown its founding structure",
    situation: [
      "Growth, a new generation, an acquisition or a second business line has made the original way of working harder to sustain. Important decisions still route through the founder or a small circle, meetings multiply, and capable managers wait for permission.",
      "The question is not whether to become 'corporate'. It is which decisions should stay with the owners, which should move, and what structure, forums and information make that work.",
    ],
    decision: "Which decisions remain with the founder, family or board, which move to management, and what governance and information make the new arrangement hold.",
    forWho: [
      "Founder-led companies and family groups preparing for the next stage of scale or succession.",
      "Holding structures where the role of the centre versus the operating companies is unclear.",
      "Leadership teams whose strategy is agreed but stalls in execution because accountability is blurred.",
    ],
    notFor: [
      "Legal restructuring, succession or inheritance planning, which needs qualified legal and tax advisers.",
      "Headcount-reduction programmes framed as operating-model work.",
      "Organisations looking for an organisation chart without changing how decisions are made.",
    ],
    questions: [
      "Which decisions does the founder or family genuinely need to keep?",
      "What should the centre of the group do, and what should it stop doing?",
      "Where do decisions stall today, and what does that delay cost?",
      "Which forums, information and thresholds would let managers act with confidence?",
      "How should the change be sequenced so the business keeps running?",
    ],
    process: [
      ["Listen", "Confidential conversations with owners and senior managers about how decisions are actually made."],
      ["Map", "Map today's key decisions: who proposes, who decides, who is informed, and where they stall."],
      ["Design", "Propose decision rights, governance forums and the role of the centre, with options where trade-offs are real."],
      ["Test", "Walk recent real decisions through the proposed design to see where it would hold or break."],
      ["Sequence", "Agree a transition plan with owners, timing and the signals that show it is working."],
    ],
    participation: [
      "Time with the owners or family members who hold authority today.",
      "Interviews with the senior managers expected to take on decisions.",
      "Existing organisation charts, delegation documents and meeting calendars, where they exist.",
      "A sponsor who can convene the people needed to agree the design.",
    ],
    deliverables: [
      ["Decision-rights map", "The twenty or so decisions that matter most, with current and proposed ownership."],
      ["Governance design", "Forums, membership, cadence and the information each needs."],
      ["Role of the centre", "What the group centre does, what it stops doing, and how it adds value."],
      ["Transition plan", "Sequenced steps, owners and early signals of whether the design is working."],
      ["Board summary", "A concise memo of the design choices and the reasons for them."],
    ],
    insightKey: "articleFamilyHoldings",
    insightLabel: "Family holdings and the operating-model transition",
    toolKey: "decisionFramer",
    toolLabel: "Decision Framer",
  },
  {
    ...engagementSummary("en", "serviceAiValue"),
    situationTitle: "When AI is on the agenda but the value case is not",
    situation: [
      "Board members, customers or competitors are raising AI. Pilots have started in different corners of the business, vendors are proposing tools, and leadership is unsure which efforts matter.",
      "Most of the value sits in a few repeated operating decisions such as pricing, planning, quality, credit or service, and it often depends on fixing the underlying workflow or data first.",
    ],
    decision: "Which one to three use cases deserve a controlled test, which should wait, and what baseline, ownership and safeguards each requires.",
    forWho: [
      "Established industrial, distribution and services businesses with repeatable operating decisions.",
      "Leadership teams that want an independent view before committing to a vendor or a programme.",
      "Companies that have run pilots but cannot yet say what they changed.",
    ],
    notFor: [
      "Software selection, implementation or model development.",
      "Organisations looking for a broad 'AI strategy' document without an operating decision attached.",
      "Use cases involving sensitive personal data where a privacy and legal assessment has not started.",
    ],
    questions: [
      "Which repeated decisions or workflows most affect our margins, cash or service levels?",
      "Is this an AI opportunity, or a process or data problem that AI would expose?",
      "What baseline would show whether a test worked?",
      "Who owns the decision once the tool is in use, and what are the controls?",
      "What should we stop or postpone?",
    ],
    process: [
      ["Locate value", "Identify the operating decisions and workflows that drive performance, with the people who run them."],
      ["Separate problems", "Distinguish AI opportunities from workflow, data or ownership issues that should be fixed first."],
      ["Assess", "Assess shortlisted use cases for value, frequency, data readiness, adoption and risk control, with the scoring made explicit."],
      ["Design the test", "For the leading candidates, define baseline, owner, test scope, safeguards and a stopping rule."],
      ["Decide", "Agree which tests to run, which to defer, and what evidence would justify scaling."],
    ],
    participation: [
      "A sponsor in the leadership team and the managers who own the shortlisted workflows.",
      "Access to how the work is done today, including process walk-throughs and sample outputs.",
      "An honest view of the existing data and systems; no data needs to leave your environment for the diagnostic.",
      "Input from IT, risk or legal where a use case touches sensitive information.",
    ],
    deliverables: [
      ["Value map", "Where operating decisions affect performance, and which could benefit from better information or automation."],
      ["Opportunity triage", "Use cases sorted into test now, fix the foundations first, or set aside, with reasons."],
      ["Test charters", "For up to three candidates: baseline, owner, scope, safeguards and stopping rule."],
      ["Readiness gaps", "Data, process and capability gaps, with suggested owners."],
      ["Leadership memo", "A concise recommendation and the evidence that would change it."],
    ],
    insightKey: "articleIndustrialAi",
    insightLabel: "Where AI creates measurable value in mid-market industrials",
    toolKey: "aiValueLens",
    toolLabel: "AI Value Lens",
  },
];

const engagementsTr: Engagement[] = [
  {
    ...engagementSummary("tr", "serviceMarketEntry"),
    situationTitle: "Yeni bir pazar cazip görünüyor ama rota henüz kanıtlanmamışsa",
    situation: [
      "Bir Körfez ülkesi, bir Avrupa pazarı ya da bölgesel bir distribütör ilişkisi yönetimin gündemine girmiş. Heyecan, umut veren birkaç görüşme, belki bir ortaklık teklifi var; ama hangi pazarın önce geleceği, hangi giriş modelinin uygun olduğu ve daha büyük bir taahhüdü neyin haklı çıkaracağı konusunda ortak bir görüş yok.",
      "Risk çoğu zaman fikir eksikliği değildir. Asıl risk, sermayeyi, insanları ve itibarı öğrenmeyi ya da rota değiştirmeyi zorlaştıran bir sırayla bağlamaktır.",
    ],
    decision: "Önce hangi pazara gidileceği, hangi giriş modelinin seçileceği ve hangi taahhütlerin şimdi, hangilerinin sonra verileceği.",
    forWho: [
      "İlk ya da bir sonraki uluslararası pazarını değerlendiren köklü Türk şirketlerinin sahipleri ve yönetim ekipleri.",
      "Distribütör, ortaklık ve kendi şirketini kurma seçeneklerini karşılaştıran işletmeler.",
      "Tek bir evet/hayır yatırım kararı yerine aşamalı bir plan görmek isteyen yönetim kurulları.",
    ],
    notFor: [
      "Lisanslı pazar araştırması, hukuki veya vergisel görüş ya da işlem danışmanlığı arayan şirketler.",
      "Kararın zaten verildiği ve yalnızca uygulama desteğinin gerektiği durumlar.",
      "Bir sonucu sınamak yerine onaylatmak isteyen talepler.",
    ],
    questions: [
      "Hangi iki üç pazar ciddi ilgiyi hak ediyor ve neden bunlar?",
      "Distribütör, ortak ya da kendi şirketimiz: her yol bize ne kazandırır, kontrolden ne kaybettirir?",
      "Bunun işlemesi için neyin doğru olması gerekiyor ve bu varsayımlardan hangileri henüz sınanmadı?",
      "Bize en çok şey öğretecek en küçük taahhüt hangisi?",
      "Hangi noktada durur, modeli değiştirir ya da yatırımı artırırız?",
    ],
    process: [
      ["Çerçeveleme", "Kararı, hedefi, kısıtları ve son kararı kimin vereceğini netleştiririz."],
      ["Kısa liste", "Aday pazarları sizin ölçütlerinizle ve tarihli kamuya açık kanıtlarla daraltır, her varsayımı kayda geçiririz."],
      ["Rotaların karşılaştırılması", "Kısa listedeki her pazar için gerçekçi giriş modellerini kontrol, maliyet, hız ve öğrenme açısından yan yana koyarız."],
      ["Sıralama", "Tercih edilen seçeneği açık karar kapıları ve durma kurallarıyla aşamalı taahhütlere dönüştürürüz."],
      ["Karar", "Öneriyi karar vericilerle birlikte değerlendirir, neye neden karar verildiğini kayda geçiririz."],
    ],
    participation: [
      "Sizin tarafınızda adı belli bir karar sahibi ve bir çalışma muhatabı.",
      "Mevcut müşterileri, ürünleri ve ortaklık görüşmelerini bilen kişilere erişim.",
      "Üzerinde anlaşılan bir gizlilik çerçevesinde paylaşmaktan rahatsızlık duymayacağınız ticari veriler.",
      "Yönetim ekibiyle iki üç çalışma oturumu.",
    ],
    deliverables: [
      ["Pazar kısa listesi", "Değerlendirilen pazarlar, kullanılan ölçütler ve her birinin neden tutulduğu ya da elendiği."],
      ["Giriş alternatifleri", "Öne çıkan pazar için distribütör, ortaklık ve kendi şirketi seçeneklerinin yan yana görünümü."],
      ["Varsayım kaydı", "Önerinin dayandığı her varsayım, kanıtı ve güncel durumu."],
      ["Kanıt açıkları", "Henüz bilinmeyenler, bunların nasıl öğrenileceği ve kimin sorumlu olacağı."],
      ["Taahhüt sırası", "Karar kapıları, izlenecek göstergeler ve durma koşullarıyla aşamalı taahhütler."],
      ["Karar notu", "Öneriyi, alternatifleri ve kalan riskleri özetleyen, yönetim kuruluna hazır bir not."],
    ],
    insightKey: "articleMarketEntry",
    insightLabel: "Pazara giriş, birbirini izleyen taahhütlerdir",
    toolKey: "marketCompass",
    toolLabel: "Pazara Giriş Pusulası",
  },
  {
    ...engagementSummary("tr", "serviceOperatingModel"),
    situationTitle: "Şirket, kurulduğu yapının ötesine geçtiğinde",
    situation: [
      "Büyüme, yeni bir kuşak, bir satın alma ya da ikinci bir iş kolu, ilk günlerdeki çalışma biçimini sürdürmeyi zorlaştırmış. Önemli kararlar hâlâ kurucuya ya da dar bir çevreye gidiyor, toplantılar çoğalıyor, yetkin yöneticiler onay bekliyor.",
      "Mesele 'kurumsallaşmak' ya da kurumsallaşmamak değil. Mesele hangi kararların sahiplerde kalacağı, hangilerinin devredileceği ve bunu hangi yapı, kurul ve bilgi akışının mümkün kılacağı.",
    ],
    decision: "Hangi kararların kurucu, aile ya da yönetim kurulunda kalacağı, hangilerinin yönetime geçeceği ve yeni düzeni hangi yönetişim ve bilgi akışının ayakta tutacağı.",
    forWho: [
      "Bir sonraki ölçek ya da kuşak geçişine hazırlanan kurucu liderliğindeki şirketler ve aile grupları.",
      "Merkez ile grup şirketlerinin rolünün belirsiz olduğu holding yapıları.",
      "Stratejisi üzerinde anlaşılmış ama sorumluluklar bulanık olduğu için uygulamada tıkanan yönetim ekipleri.",
    ],
    notFor: [
      "Nitelikli hukuk ve vergi danışmanları gerektiren hukuki yeniden yapılanma, halefiyet veya miras planlaması.",
      "İşletim modeli çalışması adı altında yürütülen kadro azaltma programları.",
      "Kararların nasıl alındığını değiştirmeden yalnızca organizasyon şeması isteyen kurumlar.",
    ],
    questions: [
      "Kurucunun ya da ailenin gerçekten elinde tutması gereken kararlar hangileri?",
      "Grup merkezi ne yapmalı, neyi bırakmalı?",
      "Bugün kararlar nerede tıkanıyor ve bu gecikmenin maliyeti ne?",
      "Hangi kurullar, bilgiler ve eşikler yöneticilerin güvenle hareket etmesini sağlar?",
      "İş akışı aksamadan değişim hangi sırayla yapılmalı?",
    ],
    process: [
      ["Dinleme", "Kararların gerçekte nasıl alındığını sahipler ve üst yöneticilerle gizlilik içinde konuşuruz."],
      ["Haritalama", "Bugünün kritik kararlarını haritalarız: kim önerir, kim karar verir, kim bilgilendirilir, karar nerede tıkanır."],
      ["Tasarım", "Karar haklarını, yönetişim kurullarını ve merkezin rolünü, gerçek ödünleşimlerin olduğu yerlerde seçeneklerle birlikte öneririz."],
      ["Sınama", "Yakın geçmişteki gerçek kararları önerilen tasarımdan geçirerek nerede işleyip nerede kırılacağını görürüz."],
      ["Sıralama", "Sahipleri, zamanlaması ve işlediğini gösteren işaretleriyle bir geçiş planı üzerinde anlaşırız."],
    ],
    participation: [
      "Bugün yetkiyi elinde tutan sahipler ya da aile üyeleriyle zaman.",
      "Karar sorumluluğu üstlenmesi beklenen üst yöneticilerle görüşmeler.",
      "Varsa mevcut organizasyon şemaları, yetki devri belgeleri ve toplantı takvimleri.",
      "Tasarım üzerinde uzlaşması gereken kişileri bir araya getirebilecek bir sponsor.",
    ],
    deliverables: [
      ["Karar hakları haritası", "En önemli yirmi kadar karar; bugünkü ve önerilen sahipleriyle."],
      ["Yönetişim tasarımı", "Kurullar, üyeleri, toplanma sıklığı ve her birinin ihtiyaç duyduğu bilgi."],
      ["Merkezin rolü", "Grup merkezinin ne yapacağı, neyi bırakacağı ve nasıl değer katacağı."],
      ["Geçiş planı", "Sıralı adımlar, sorumlular ve tasarımın işleyip işlemediğini gösteren erken işaretler."],
      ["Yönetim kurulu özeti", "Tasarım tercihlerini ve gerekçelerini anlatan kısa bir not."],
    ],
    insightKey: "articleFamilyHoldings",
    insightLabel: "Aile holdingleri ve işletim modeli geçişi",
    toolKey: "decisionFramer",
    toolLabel: "Karar Çerçeveleyici",
  },
  {
    ...engagementSummary("tr", "serviceAiValue"),
    situationTitle: "Yapay zekâ gündemde ama değer gerekçesi ortada yoksa",
    situation: [
      "Yönetim kurulu üyeleri, müşteriler ya da rakipler yapay zekâyı gündeme getiriyor. Şirketin farklı köşelerinde pilotlar başlamış, tedarikçiler araç öneriyor ve yönetim hangi çabanın önemli olduğundan emin değil.",
      "Değerin büyük kısmı fiyatlama, planlama, kalite, kredi ya da hizmet gibi tekrar eden birkaç işletim kararında yatar ve çoğu zaman önce alttaki iş akışının ya da verinin düzeltilmesini gerektirir.",
    ],
    decision: "Hangi bir ila üç kullanım alanının kontrollü bir testi hak ettiği, hangilerinin bekleyeceği ve her birinin hangi başlangıç ölçümünü, sahipliği ve güvenceleri gerektirdiği.",
    forWho: [
      "Tekrar eden işletim kararları olan köklü sanayi, dağıtım ve hizmet şirketleri.",
      "Bir tedarikçiye ya da programa bağlanmadan önce bağımsız bir görüş isteyen yönetim ekipleri.",
      "Pilot yapmış ama neyi değiştirdiğini henüz söyleyemeyen şirketler.",
    ],
    notFor: [
      "Yazılım seçimi, uygulama ya da model geliştirme.",
      "Bir işletim kararına bağlı olmayan genel bir 'yapay zekâ stratejisi' belgesi arayan kurumlar.",
      "Gizlilik ve hukuk değerlendirmesi başlamamış, hassas kişisel veri içeren kullanım alanları.",
    ],
    questions: [
      "Marjlarımızı, nakdimizi ya da hizmet düzeyimizi en çok hangi tekrar eden kararlar veya iş akışları etkiliyor?",
      "Bu bir yapay zekâ fırsatı mı, yoksa yapay zekânın görünür kılacağı bir süreç ya da veri sorunu mu?",
      "Bir testin işe yarayıp yaramadığını hangi başlangıç ölçümü gösterir?",
      "Araç kullanılmaya başladığında kararın sahibi kim olacak, kontroller neler?",
      "Neyi durdurmalı ya da ertelemeliyiz?",
    ],
    process: [
      ["Değeri bulma", "Performansı belirleyen işletim kararlarını ve iş akışlarını, onları yürüten kişilerle birlikte belirleriz."],
      ["Sorunları ayırma", "Yapay zekâ fırsatlarını önce çözülmesi gereken iş akışı, veri ya da sahiplik sorunlarından ayırırız."],
      ["Değerlendirme", "Kısa listedeki kullanım alanlarını değer, sıklık, veri hazırlığı, benimseme ve risk kontrolü açısından, puanlamayı açık ederek değerlendiririz."],
      ["Testi tasarlama", "Öne çıkan adaylar için başlangıç ölçümünü, sahibi, test kapsamını, güvenceleri ve durma kuralını tanımlarız."],
      ["Karar", "Hangi testlerin yapılacağı, hangilerinin erteleneceği ve ölçeklemeyi hangi kanıtın haklı çıkaracağı üzerinde anlaşırız."],
    ],
    participation: [
      "Yönetim ekibinden bir sponsor ve kısa listedeki iş akışlarının sahibi olan yöneticiler.",
      "İşin bugün nasıl yapıldığına erişim: süreç üzerinden birlikte geçme ve örnek çıktılar.",
      "Mevcut veri ve sistemlere dair açık bir değerlendirme; teşhis için hiçbir verinin ortamınızdan çıkması gerekmez.",
      "Bir kullanım alanı hassas bilgiye dokunuyorsa bilgi teknolojileri, risk veya hukuk birimlerinin görüşü.",
    ],
    deliverables: [
      ["Değer haritası", "İşletim kararlarının performansı nerede etkilediği ve hangilerinin daha iyi bilgi ya da otomasyondan fayda görebileceği."],
      ["Fırsat ayrıştırması", "Kullanım alanlarının gerekçeleriyle 'şimdi test et', 'önce temeli düzelt' ya da 'şimdilik bırak' olarak sınıflanması."],
      ["Test şartları", "En fazla üç aday için başlangıç ölçümü, sahip, kapsam, güvenceler ve durma kuralı."],
      ["Hazırlık açıkları", "Veri, süreç ve yetkinlik açıkları ile önerilen sorumlular."],
      ["Yönetim notu", "Kısa bir öneri ve bu öneriyi değiştirecek kanıt."],
    ],
    insightKey: "articleIndustrialAi",
    insightLabel: "Orta ölçekli sanayi şirketlerinde yapay zekâ değeri",
    toolKey: "aiValueLens",
    toolLabel: "Yapay Zekâ Değer Merceği",
  },
];

export const engagements: Record<Lang, Engagement[]> = { en: engagementsEn, tr: engagementsTr };

export function engagementByKey(lang: Lang, key: string) {
  return engagements[lang].find((item) => item.key === key);
}

export const situations: Record<Lang, Situation[]> = {
  en: [
    {
      title: "You are weighing a market beyond Türkiye",
      body: "A Gulf or European opportunity is attractive, but the first market, the entry model and the size of the first commitment are still open.",
      signals: ["A distributor or partner proposal is on the table", "Several markets compete for the same people and budget", "The board wants a plan, not just enthusiasm"],
      engagement: "serviceMarketEntry",
    },
    {
      title: "The business has outgrown how it was founded",
      body: "Decisions still route through the founder or family. The next stage needs clear decision rights, working governance and a capable centre.",
      signals: ["Senior managers wait for approval on routine choices", "A generational transition or second business line is under way", "The holding centre's role is unclear"],
      engagement: "serviceOperatingModel",
    },
    {
      title: "AI is on the agenda, the value case is not",
      body: "Pilots and vendor proposals are multiplying. Leadership needs to know which operating decisions would actually improve, and what must be fixed first.",
      signals: ["Pilots exist but nobody can say what they changed", "A vendor programme is waiting for approval", "Data and process ownership are unclear"],
      engagement: "serviceAiValue",
    },
  ],
  tr: [
    {
      title: "Türkiye dışında bir pazarı değerlendiriyorsunuz",
      body: "Bir Körfez ya da Avrupa fırsatı cazip; ama ilk pazar, giriş modeli ve ilk taahhüdün büyüklüğü hâlâ açık.",
      signals: ["Masada bir distribütör ya da ortaklık teklifi var", "Birkaç pazar aynı insanlar ve bütçe için yarışıyor", "Yönetim kurulu heyecan değil, plan görmek istiyor"],
      engagement: "serviceMarketEntry",
    },
    {
      title: "Şirket, kurulduğu yapının ötesine geçti",
      body: "Kararlar hâlâ kurucuya ya da aileye gidiyor. Bir sonraki aşama için net karar hakları, işleyen bir yönetişim ve yetkin bir merkez gerekiyor.",
      signals: ["Üst yöneticiler rutin kararlar için onay bekliyor", "Kuşak geçişi ya da yeni bir iş kolu gündemde", "Holding merkezinin rolü belirsiz"],
      engagement: "serviceOperatingModel",
    },
    {
      title: "Yapay zekâ gündemde, değer gerekçesi değil",
      body: "Pilotlar ve tedarikçi teklifleri çoğalıyor. Yönetimin hangi işletim kararlarının gerçekten iyileşeceğini ve önce neyin düzeltilmesi gerektiğini bilmesi gerekiyor.",
      signals: ["Pilotlar var ama neyi değiştirdikleri belli değil", "Bir tedarikçi programı onay bekliyor", "Veri ve süreç sahipliği belirsiz"],
      engagement: "serviceAiValue",
    },
  ],
};

export const workingModel = {
  en: [
    ["The founder leads the work", "You work directly with Ahmed Furkan Gul from the first conversation to the final recommendation. The work is not handed to a junior team."],
    ["One named decision", "Each engagement is organised around a decision your leadership has to make, with an owner and a date, rather than around a methodology."],
    ["Evidence you can inspect", "Facts, assumptions and judgments are kept separate. Public sources are dated and cited; your own information stays inside the agreed confidentiality framework."],
    ["AI as a research tool, not the author", "AI tools help widen research coverage, organise material and test scenarios faster. Framing, interpretation and recommendations remain the founder's responsibility."],
    ["Specialists when needed", "Where a question needs legal, tax, technical or local expertise, we say so early and help you brief the right advisers. They are not presented as Ganrich staff."],
    ["A document a board can use", "Every engagement ends with a written recommendation, its alternatives, the assumptions behind it and what would change it."],
  ] as Array<[string, string]>,
  tr: [
    ["Çalışmayı kurucu yürütür", "İlk görüşmeden son öneriye kadar doğrudan Ahmed Furkan Gul ile çalışırsınız. İş, kıdemsiz bir ekibe devredilmez."],
    ["Adı konmuş tek bir karar", "Her çalışma bir yöntem etrafında değil, yönetiminizin vermesi gereken, sahibi ve tarihi belli bir karar etrafında kurgulanır."],
    ["İncelenebilir kanıt", "Olgular, varsayımlar ve yargılar ayrı tutulur. Kamuya açık kaynaklar tarihli ve atıflıdır; sizin bilgileriniz üzerinde anlaşılan gizlilik çerçevesinde kalır."],
    ["Yapay zekâ yazar değil, araştırma aracıdır", "Yapay zekâ araçları araştırma kapsamını genişletmeye, malzemeyi düzenlemeye ve senaryoları daha hızlı sınamaya yardımcı olur. Çerçeveleme, yorum ve öneri kurucunun sorumluluğundadır."],
    ["Gerektiğinde uzmanlar", "Bir soru hukuk, vergi, teknik ya da yerel uzmanlık gerektiriyorsa bunu erken söyler, doğru danışmanları bilgilendirmenize yardımcı oluruz. Bu uzmanlar Ganrich çalışanı olarak sunulmaz."],
    ["Yönetim kurulunun kullanabileceği bir belge", "Her çalışma; yazılı bir öneri, alternatifleri, dayandığı varsayımlar ve onu neyin değiştireceğiyle tamamlanır."],
  ] as Array<[string, string]>,
};

export type CorridorObservation = { date: string; dateTime: string; text: string; source: string; url: string };

/* Dated observations restate the sourced Türkiye–Gulf corridor briefing (sources reviewed 24 July 2026). */
export const corridor: Record<Lang, { observations: CorridorObservation[]; questions: string[]; implications: Array<[string, string]> }> = {
  en: {
    observations: [
      { date: "September 2023", dateTime: "2023-09-01", text: "The UAE–Türkiye Comprehensive Economic Partnership Agreement, signed in March 2023, entered into force. It covers goods, services, digital trade, investment facilitation and government procurement.", source: "UAE Ministry of Economy", url: "https://www.moet.gov.ae/en/web/guest/cepa_turkey" },
      { date: "July 2024", dateTime: "2024-07-31", text: "Türkiye and the Gulf Cooperation Council held the first round of free-trade negotiations in Ankara, following a joint statement in March 2024.", source: "Republic of Türkiye Ministry of Trade", url: "https://ticaret.gov.tr/haberler/turkiye-korfez-isbirligi-konseyi-kik-serbest-ticaret-anlasmasi-hakkinda-basin-duyurusu" },
      { date: "July 2025", dateTime: "2025-07-17", text: "The first Türkiye–UAE High-Level Strategic Council meeting produced cooperation agreements in areas including industry, manufacturing, pharmaceuticals, food and agriculture.", source: "Türkiye Investment and Finance Office", url: "https://www.invest.gov.tr/en/news/news-from-turkey/pages/turkiye-and-uae-sign-seven-landmark-agreements-to-deepen-strategic-partnership.aspx" },
      { date: "October 2025", dateTime: "2025-10-27", text: "A presidential Gulf tour produced further agreements with Kuwait, Qatar and Oman across investment, transport, energy, finance and strategic planning.", source: "Türkiye Investment and Finance Office", url: "https://www.invest.gov.tr/en/news/news-from-turkey/pages/president-erdogan-gulf-tour-yields-24-agreements-joint-statements-declarations.aspx" },
    ],
    questions: [
      "Which specific agreement or mechanism changes our access, costs or partners, if any?",
      "Which Gulf country should come first, and is it chosen for customers, capital, production or learning?",
      "What must we own, such as customer relationships, data or brand, and what can a partner provide?",
      "What evidence would turn this from an interesting opportunity into an investable plan?",
    ],
    implications: [
      ["Momentum is not a business case", "Formal agreements can reduce friction and open conversations. They do not prove demand, margins or delivery capability for a particular company."],
      ["The Gulf is several markets", "The UAE, Saudi Arabia, Qatar, Kuwait, Oman and Bahrain differ in institutions, sector priorities, partner landscapes and decision processes. A plan should name the country sequence."],
      ["Design the partnership before signing it", "Decision rights, exclusivity, customer data, economics and exit terms are easier to agree before momentum turns a relationship into a commitment."],
    ],
  },
  tr: {
    observations: [
      { date: "Eylül 2023", dateTime: "2023-09-01", text: "Mart 2023’te imzalanan BAE–Türkiye Kapsamlı Ekonomik Ortaklık Anlaşması yürürlüğe girdi. Anlaşma mal, hizmet, dijital ticaret, yatırımın kolaylaştırılması ve kamu alımlarını kapsıyor.", source: "BAE Ekonomi Bakanlığı", url: "https://www.moet.gov.ae/en/web/guest/cepa_turkey" },
      { date: "Temmuz 2024", dateTime: "2024-07-31", text: "Türkiye ile Körfez İşbirliği Konseyi, Mart 2024’teki ortak bildirinin ardından serbest ticaret müzakerelerinin ilk turunu Ankara’da yaptı.", source: "T.C. Ticaret Bakanlığı", url: "https://ticaret.gov.tr/haberler/turkiye-korfez-isbirligi-konseyi-kik-serbest-ticaret-anlasmasi-hakkinda-basin-duyurusu" },
      { date: "Temmuz 2025", dateTime: "2025-07-17", text: "Türkiye–BAE Yüksek Düzeyli Stratejik Konseyi’nin ilk toplantısında sanayi, imalat, ilaç, gıda ve tarım gibi alanlarda iş birliği anlaşmaları imzalandı.", source: "T.C. Cumhurbaşkanlığı Yatırım Ofisi", url: "https://www.invest.gov.tr/en/news/news-from-turkey/pages/turkiye-and-uae-sign-seven-landmark-agreements-to-deepen-strategic-partnership.aspx" },
      { date: "Ekim 2025", dateTime: "2025-10-27", text: "Cumhurbaşkanlığı düzeyindeki Körfez ziyaretinde Kuveyt, Katar ve Umman ile yatırım, ulaştırma, enerji, finans ve stratejik planlama alanlarında yeni anlaşmalar imzalandı.", source: "T.C. Cumhurbaşkanlığı Yatırım Ofisi", url: "https://www.invest.gov.tr/en/news/news-from-turkey/pages/president-erdogan-gulf-tour-yields-24-agreements-joint-statements-declarations.aspx" },
    ],
    questions: [
      "Varsa hangi anlaşma ya da mekanizma erişimimizi, maliyetlerimizi veya ortaklarımızı değiştiriyor?",
      "Önce hangi Körfez ülkesi; müşteri, sermaye, üretim ya da öğrenme için mi seçiliyor?",
      "Müşteri ilişkisi, veri ya da marka gibi neyi elimizde tutmalıyız, ortak neyi sağlayabilir?",
      "Hangi kanıt bunu ilginç bir fırsattan yatırım yapılabilir bir plana dönüştürür?",
    ],
    implications: [
      ["İvme, iş gerekçesi değildir", "Resmî anlaşmalar sürtünmeyi azaltabilir ve kapı açabilir. Ancak belirli bir şirket için talebi, marjı ya da teslim kabiliyetini kanıtlamaz."],
      ["Körfez birden fazla pazardır", "BAE, Suudi Arabistan, Katar, Kuveyt, Umman ve Bahreyn; kurumları, sektör öncelikleri, ortak ekosistemleri ve karar süreçleri bakımından farklıdır. Plan, ülke sırasını açıkça belirtmelidir."],
      ["Ortaklığı imzalamadan önce tasarlayın", "Karar hakları, münhasırlık, müşteri verisi, ekonomik koşullar ve çıkış şartları; ilişki taahhüde dönüşmeden önce çok daha kolay konuşulur."],
    ],
  },
};
