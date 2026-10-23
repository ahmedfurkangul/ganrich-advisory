import type { Lang } from './content';
import { services } from './advisory-content';
import { notes } from './advisory-note-content';
import { solutionByKey } from './solutions-content';
export function advisoryMeta(lang:Lang,key:string):[string,string]|undefined{
 const s=services[lang].find(s=>s.key===key);if(s)return [s.title+' | Ganrich Advisory',s.intro];
 const n=notes[lang].find(n=>n.key===key);if(n)return [n.title+' | Ganrich Advisory',n.thesis];
 const sol=solutionByKey(lang,key);if(sol)return [sol.title+' | Ganrich Advisory',sol.tagline];
 if(key==='solutions')return lang==='en'?['Solutions | Ganrich Advisory','Focused programmes for EU market access, industrial efficiency and AI in commercial operations.']:['Çözümler | Ganrich Advisory','AB pazarına erişim, sanayide verimlilik ve ticari operasyonlarda yapay zekâ için odaklı programlar.'];
 if(key==='sampleWork')return lang==='en'?['Sample work | Ganrich Advisory','Illustrative decision memos for market entry, operating models, and AI pilots.']:['Örnek çalışmalar | Ganrich Advisory','Pazara giriş, işletim modeli ve yapay zekâ için temsili karar notları.'];
}
