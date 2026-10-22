import type { Lang } from './content';
import { services } from './advisory-content';
import { notes } from './advisory-note-content';
export function advisoryMeta(lang:Lang,key:string):[string,string]|undefined{
 const s=services[lang].find(s=>s.key===key);if(s)return [s.title+' | Ganrich Advisory',s.intro];
 const n=notes[lang].find(n=>n.key===key);if(n)return [n.title+' | Ganrich Advisory',n.thesis];
 if(key==='sampleWork')return lang==='en'?['Sample work | Ganrich Advisory','Illustrative decision memos for market entry, operating models, and AI pilots.']:['Örnek çalışmalar | Ganrich Advisory','Pazara giriş, işletim modeli ve yapay zekâ için temsili karar notları.'];
}
