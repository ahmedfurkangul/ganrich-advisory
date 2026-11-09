import type { Lang } from "./content";

// Light index of the long-form guides for client components (the library). Full text lives in guides-content.ts.
export type GuideIndexEntry = { key: string; solution: string; topic: Record<Lang, string> } & Record<Lang, { h1: string; description: string }>;
export const guideIndex: GuideIndexEntry[] = [
 {
  "key": "guideUkCbam",
  "solution": "solutionCbam",
  "topic": {
   "en": "UK CBAM",
   "tr": "İngiltere SKDM"
  },
  "en": {
   "h1": "UK CBAM from 1 January 2027: what Turkish steel and aluminium exporters must prepare",
   "description": "UK CBAM starts on 1 January 2027. What Turkish steel and aluminium exporters must prepare, how it differs from EU CBAM and which emissions data UK buyers need."
  },
  "tr": {
   "h1": "İngiltere SKDM'si 1 Ocak 2027'de başlıyor: Türk çelik ve alüminyum ihracatçısı neyi hazırlamalı?",
   "description": "İngiltere SKDM'si 1 Ocak 2027'de başlıyor. Türk çelik ve alüminyum ihracatçısı için AB SKDM'den farkları, İngiliz alıcının isteyeceği veri ve 7 haftalık plan."
  }
 },
 {
  "key": "guideCraReporting",
  "solution": "solutionCra",
  "topic": {
   "en": "CRA",
   "tr": "CRA"
  },
  "en": {
   "h1": "CRA Reporting for Refrigeration and White-Goods Exporters",
   "description": "ENISA and the Commission’s 4 Nov 2026 joint statement on refrigeration cyber incidents: CRA Art. 14 reporting since 11 Sep. What Turkish exporters must do."
  },
  "tr": {
   "h1": "CRA Bildirimi: Beyaz Eşya ve Soğutma İhracatçısı",
   "description": "ENISA ve Komisyon’un 4 Kasım 2026 ortak açıklaması: ticari soğutma siber olayları ve CRA Madde 14 bildirimi. Beyaz eşya ve soğutma ihracatçısı için özet."
  }
 },
 {
  "key": "guideCbam2026",
  "solution": "solutionCbam",
  "topic": {
   "en": "CBAM",
   "tr": "SKDM (CBAM)"
  },
  "en": {
   "h1": "CBAM 2026 update: what Turkish producers should know before COP31 in Antalya",
   "description": "CBAM 2026 for Turkish producers: Q1–Q3 certificate prices, the 30 Sep 2027 declaration, verification, the 50-tonne rule and how the new TR ETS pilot fits in."
  },
  "tr": {
   "h1": "SKDM 2026 güncellemesi: COP31 öncesinde Türk sanayicisinin bilmesi gerekenler",
   "description": "SKDM 2026'da neler değişti? 1.-3. çeyrek sertifika fiyatları, 30 Eylül 2027 beyanı, doğrulama, 50 ton eşiği ve yeni TR ETS pilot dönemi ihracatçıya tek yazıda."
  }
 },
 {
  "key": "guideCraStandards",
  "solution": "solutionCra",
  "topic": {
   "en": "CRA",
   "tr": "CRA"
  },
  "en": {
   "h1": "CRA compliance without harmonised standards: what can a Turkish manufacturer rely on?",
   "description": "No CRA harmonised standard is cited yet and the deadlines are moving. What the Cyber Resilience Act lets Turkish manufacturers rely on until 11 December 2027."
  },
  "tr": {
   "h1": "CRA uyumu: standart yokken Türk üretici neye dayanacak?",
   "description": "CRA için henüz atfı yayımlanmış uyumlaştırılmış standart yok, tarihler kayıyor. Siber Dayanıklılık Yasası 11 Aralık 2027'ye dek üreticiye hangi yolları açıyor?"
  }
 },
 {
  "key": "guideEudr2026",
  "solution": "solutionEudr",
  "topic": {
   "en": "EUDR",
   "tr": "EUDR"
  },
  "en": {
   "h1": "EUDR 30 December 2026: what your EU buyer will ask you to send, and by when",
   "description": "EUDR applies to large and medium operators from 30 December 2026. What your EU buyer will ask you for: DDS reference, plot geolocation and legality proof."
  },
  "tr": {
   "h1": "EUDR 30 Aralık 2026: AB alıcınız sizden hangi belgeyi, ne zamana kadar isteyecek?",
   "description": "EUDR 30 Aralık 2026'da büyük ve orta ölçekli işletmecilere uygulanıyor. AB alıcınızın sizden isteyeceği DDS referansı, parsel konumu ve yasallık kanıtı."
  }
 },
 {
  "key": "guideSteelDpp",
  "solution": "solutionCbam",
  "topic": {
   "en": "ESPR · Digital Product Passport",
   "tr": "ESPR · Dijital Ürün Pasaportu"
  },
  "en": {
   "h1": "The steel Digital Product Passport: what ESPR means for Turkish mills, and what is still open",
   "description": "Iron and steel is first in line among ESPR product groups on the Commission's DPP timeline. What a steel passport may ask of Turkish mills, and what is open."
  },
  "tr": {
   "h1": "Çelik Dijital Ürün Pasaportu: ESPR Türk çelik üreticisinden ne isteyecek, ne hâlâ belirsiz?",
   "description": "Demir-çelik, Komisyon'un DPP takviminde ESPR ürün grupları arasında ilk sırada. Çelik Dijital Ürün Pasaportu Türk üreticiden ne isteyebilir, ne hâlâ belirsiz?"
  }
 }
];
