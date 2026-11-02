import type { Lang } from "./content";

// Light index of the long-form guides for client components (the library). Full text lives in guides-content.ts.
export type GuideIndexEntry = { key: string; solution: string; topic: Record<Lang, string> } & Record<Lang, { h1: string; description: string }>;
export const guideIndex: GuideIndexEntry[] = [
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
