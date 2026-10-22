# Ganrich Advisory — Claude için kaynak kod devri

Bu paket mevcut Sites kaynak deposunun bir kopyasıdır. Site kodları değiştirilmedi ve yeniden yayınlanmadı.

- Canlı site: https://ganrichadvisory.com/en
- Kaynak proje: appgprj_6a6132c161908191b86ae822e996775e
- Kaynak commit: a52832ae56a7efef97c8c857e9226a7c43327318
- Dışa aktarma tarihi: 22 Ekim 2026
- Depodan alınan dosya sayısı: 140

## Yerel geliştirme

Node.js 22.13.0 veya üzeri gerekir. ZIP'i açın; terminalde package.json dosyasının bulunduğu ganrich-advisory klasörüne geçin:

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Terminalde gösterilen yerel adresin /en veya /tr yolunu açın.

```bash
npm run build
npm test
```

Bu dışa aktarma sırasında uygulama kurulmadı veya çalıştırılmadı; yukarıdaki komutlar mevcut paket yapılandırmasından alınmıştır. ZIP içeriğinin kaynak dosyalarla eşleşmesi doğrulandı.

## Teknoloji ve önemli dosyalar

Proje React 19, TypeScript, Next.js App Router API'leri, Vinext/Vite, Tailwind CSS 4 ve Cloudflare Workers kullanır. Standart bir Next.js projesi gibi görünse de mevcut geliştirme ve derleme komutları Vinext kullanır.

- app/site.tsx: ana site arayüzü ve bileşenler
- app/content.ts: iki dilli içerik ve rota haritası
- app/globals.css: görsel tasarım
- app/[lang]/[[...slug]]/page.tsx: genel sayfa rotaları
- app/intelligence.tsx, app/intelligence-shell.tsx: stratejik içerik arayüzleri
- app/pdf-insights.tsx, app/pdf-insight-pages.tsx: PDF stüdyosu ve rapor sayfaları
- app/api/: form, analiz ve PDF uç noktaları
- public/: depoda bulunan logo, görseller ve sosyal paylaşım görselleri
- db/, drizzle/: veritabanı kodları ve şema geçişleri
- vite.config.ts, worker/index.ts, build/: çalışma ve derleme altyapısı
- .openai/hosting.json: mevcut Sites proje kimliği ve DB / DOCUMENTS bağlamaları
- SITE-SYSTEM.md, PDF-INSIGHT-SYSTEM.md ve diğer proje belgeleri: mevcut sistem notları

## Dahil olmayan canlı veriler

Kaynak deposundaki bütün izlenen dosyalar dahildir. Canlı Cloudflare D1 veritabanı kayıtları, iletişim formu başvuruları, R2 DOCUMENTS deposuna yüklenen PDF belgeleri, oturumlar ve çalışma ortamı sırları bu pakete dahil değildir. SQL şemaları mevcut olsa da bunlar canlı kayıtların yedeği değildir. Yerel D1/R2 ortamı üretim verilerini otomatik almaz.

.env.example dahil edilmiştir; gerçek ortam anahtarları veya kaynak depoya erişim kimlik bilgileri eklenmemiştir. Git geçmişi ve node_modules pakete dahil değildir.

PDF stüdyosunun editör kimliği mevcut Sites/ChatGPT oturum başlıklarına dayanır. Başka bir barındırmaya geçerken kimlik doğrulama, D1/R2 bağlamaları, veriler ve ortam ayarları ayrıca taşınmalıdır. Mevcut .openai/hosting.json yapılandırması korunmuştur; başka ortamda dağıtım için uyarlama gerekir.

## Claude'a verilebilecek başlangıç isteği

“Bu ZIP Ganrich Advisory sitesinin mevcut kaynak kodudur. Önce CLAUDE_DEVIR.md, package.json, vite.config.ts ve SITE-SYSTEM.md dosyalarını incele. Mevcut Türkçe/İngilizce içerikleri, rotaları ve marka tasarımını koruyarak talep edeceğim geliştirmeleri bu proje üzerinde yap. Mevcut Vinext/Cloudflare mimarisini dikkate al. Canlı D1 kayıtları ve R2 PDF dosyaları ZIP'te bulunmuyor.”
