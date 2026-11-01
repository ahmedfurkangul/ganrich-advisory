import type { Lang } from './content';
import { services } from './advisory-content';
import { notes } from './advisory-note-content';
import { solutionByKey } from './solutions-content';
// Search titles and descriptions where the on-page tagline is too short or lacks the searched term.
const solutionMeta: Record<Lang, Record<string, [title: string | null, description: string]>> = {
 en: {
  solutionTrEts: [null, 'Türkiye ETS pilot: get your GHG permit, monitoring methodology plan (due 27 Jan 2027) and verified report right, then reuse the same data for your CBAM file.'],
  solutionEudr: [null, 'EUDR applies from 30 Dec 2026, including small timber operators: give your EU importer the plot geolocation and origin data its due diligence statement needs.'],
  solutionCra: [null, 'CRA reporting has applied since 11 Sep 2026: know who decides and what is reported within 24 and 72 hours when a vulnerability in your product is exploited.'],
  solutionTextiles: [null, 'ESPR for Turkish textile suppliers: prepare for EU buyers who can no longer destroy unsold stock and will soon ask for Digital Product Passport data.'],
 },
 tr: {
  solutionTrEts: ['Türkiye ETS (TR ETS) Pilot Hazırlığı | Ganrich Advisory', 'TR ETS pilot döneminde sera gazı izni, İzleme Metodolojisi Planı (son tarih 27 Ocak 2027) ve doğrulanmış raporu doğru kurun; aynı veriyi SKDM için kullanın.'],
  solutionEudr: [null, 'EUDR 30 Aralık 2026’dan itibaren küçük ahşap işletmecileri dahil uygulanıyor: AB ithalatçınızın durum tespiti beyanı için menşe ve konum verisini hazırlayın.'],
  solutionCra: [null, 'Siber Dayanıklılık Yasası (CRA) bildirimleri 11 Eylül 2026’dan beri zorunlu: istismar edilen bir açıkta 24 ve 72 saatte kimin neyi bildireceğini kurun.'],
  solutionTextiles: [null, 'ESPR ve Dijital Ürün Pasaportu: satılmayan stoku imha edemeyen ve yakında pasaport verisi isteyecek AB alıcılarına Türk tekstil tedarikçisi olarak hazırlanın.'],
  solutionForcedLabour: ['Zorla Çalıştırma Tüzüğü: Tedarik Zinciri Kanıtı | Ganrich', ''],
 },
};
export function advisoryMeta(lang:Lang,key:string):[string,string]|undefined{
 const s=services[lang].find(s=>s.key===key);if(s)return [s.title+' | Ganrich Advisory',s.intro];
 const n=notes[lang].find(n=>n.key===key);if(n)return [n.title+' | Ganrich Advisory',n.thesis];
 const sol=solutionByKey(lang,key);if(sol){const m=solutionMeta[lang][key];return [m?.[0]??sol.title+' | Ganrich Advisory',m?.[1]||sol.tagline];}
 if(key==='solutions')return lang==='en'?['Solutions | Ganrich Advisory','EU-readiness programmes for Turkish exporters: CBAM, EUDR, CRA, ESPR and Türkiye ETS, plus energy, water and AI projects scoped to one clear decision.']:['Çözümler | Ganrich Advisory','Türk ihracatçılar için AB Yeşil Mutabakat uyum programları: SKDM, EUDR, CRA, ESPR ve TR ETS; ayrıca enerji, su ve yapay zekâ projeleri.'];
 if(key==='sampleWork')return lang==='en'?['Sample work | Ganrich Advisory','Illustrative decision memos from Ganrich Advisory on market entry, operating models and AI pilots, showing how a hard question becomes a clear decision.']:['Örnek çalışmalar | Ganrich Advisory','Ganrich Advisory’den pazara giriş, işletim modeli ve yapay zekâ pilotları için temsili karar notları: zor bir sorunun net bir karara nasıl dönüştüğünü görün.'];
}
