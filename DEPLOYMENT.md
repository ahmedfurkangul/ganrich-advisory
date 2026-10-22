# Yayın (Deployment)

Site, Furkan'ın kendi Cloudflare hesabında Cloudflare Workers üzerinde çalışır (devir belgesindeki **B yolu**). Bu belge, bir sonraki güncellemenin nasıl yayınlanacağını anlatır. Geri dönüş için [ROLLBACK.md](ROLLBACK.md), alan adı için [GODADDY-DNS.md](GODADDY-DNS.md) dosyasına bakın.

## Ortamlar

| Ortam | Worker | Adres | D1 | R2 | Durum |
|---|---|---|---|---|---|
| Yerel / test | `ganrich-advisory` | `npm run start` → localhost:3000 | yer tutucu (`site-creator-d1`) | yerel | Testler bununla çalışır |
| `preview` | `ganrich-preview` | https://ganrich-preview.ahmedfurkangul.workers.dev | `ganrich-preview-db` | `ganrich-preview-docs` | Yayında, üretim verisi yok |
| `production` | henüz yok | ganrichadvisory.com | henüz yok | henüz yok | Alan adı geçişi onaylanınca eklenecek |

Bütün bağlamalar (D1, R2, değişkenler) kaynakta, [`wrangler.jsonc`](wrangler.jsonc) içindedir. Build sırasında `CLOUDFLARE_ENV` ortamı seçer; `dist/` dosyaları elle düzenlenmez.

Mevcut canlı site hâlâ ChatGPT Sites'tadır (proje `appgprj_6a6132c161908191b86ae822e996775e`). Bu repo o yayını değiştirmez.

## Gereksinimler

- Node 22.13 veya üstü, `npm ci`.
- Cloudflare girişi: `npx wrangler login` (tarayıcıda onay) ya da `CLOUDFLARE_API_TOKEN` ve `CLOUDFLARE_ACCOUNT_ID` ortam değişkenleri. Token'ı repoya veya sohbete yazmayın.

## Önizlemeyi güncelleme

```bash
git checkout <yayınlanacak dal>
npm ci
scripts/deploy.sh preview      # veya: npm run deploy:preview
```

Script sırasıyla şunları yapar ve herhangi biri başarısız olursa durur:

1. Çalışma alanının temiz olduğunu kontrol eder (her yayın bir commit'e karşılık gelir).
2. `npm test`: build ve otomatik testler.
3. `npm run typecheck`: TypeScript kontrolü (Worker tipleri `worker-configuration.d.ts` içinde).
4. `CLOUDFLARE_ENV=preview npm run build`.
5. `wrangler d1 migrations apply DB --env preview --remote`: `drizzle/` içindeki yeni migration'lar.
6. `wrangler deploy`: Worker sürümünü commit kısa kimliğiyle etiketleyerek yayınlar.

Çıktıdaki **Version ID**'yi yayın notuna yazın; geri dönüşte bu kimlik kullanılır.

## Editör (PDF stüdyosu) kimliği

Editör yalnızca imzası doğrulanan bir Cloudflare Access oturumuyla tanınır ([`app/editor-auth.ts`](app/editor-auth.ts)):

- `EDITOR_AUTH=access`
- `ACCESS_TEAM_DOMAIN`: hesabın Access ekip alanı (`fse2-planlar-pages.cloudflareaccess.com`).
- `ACCESS_AUD`: siteyi veya stüdyoyu koruyan Access uygulamasının AUD etiketi. Boşsa editörlük kapalıdır.
- `EDITOR_EMAILS`: virgülle ayrılmış izinli e-postalar.

`oai-authenticated-user-*` başlıkları Worker'da silinir; istemci bunları gönderse bile kimlik sayılmaz. Access uygulaması yoksa veya e-posta listede değilse stüdyo 404, editör API'leri 401 döner.

## Sırlar

Sır değerleri `npx wrangler secret put AD --env preview` ile girilir; isimler ve açıklamalar [`.env.example`](.env.example) dosyasındadır. Şu an kullanılan sırlar: `ANALYTICS_TOKEN` (isteğe bağlı), `PDF_INGEST_KEY` (isteğe bağlı). Hiçbiri önizlemede tanımlı değildir.

## Bilinen sınırlar

- **İletişim formu e-posta bildirimi yok.** Form talebi D1'deki `inquiries` tablosuna yazar; kimseye e-posta gitmez. Bildirim için sağlayıcı ve alıcı adresi seçildikten sonra ayrıca kurulacak.
- **Üretim verisi taşınmadı.** ChatGPT Sites'taki D1 kayıtlarına (talepler, PDF metadata) ve R2 dosyalarına bu ortamdan erişim yok. Taşıma, Sites'tan dışa aktarma alınabilirse planlanır; alınamazsa bu bir taşıma engelidir.
- Önizleme veritabanındaki ilk iki migration elle uygulanmıştı. `deploy.sh` ilk çalıştığında wrangler bunları yeniden uygulamaya çalışırsa (`table already exists`), `d1_migrations` tablosuna iki satırı işaretlemek gerekir (bkz. ROLLBACK.md, "Migration kaydı").

## Üretime geçiş (henüz yapılmadı)

Ayrı ve açık onay gerektirir. Sıra:

1. v23 kaynağı (PR #3), editör kimliği (PR #2) ve bu yayın yapılandırmasının `main`'e birleştirilmesi.
2. Üretim D1/R2 kaynaklarının oluşturulması ve `wrangler.jsonc` içine `production` ortamının eklenmesi.
3. Sites verisinin dışa aktarılıp aktarılması ve sayıların, anahtarların, sağlama toplamlarının karşılaştırılması.
4. GODADDY-DNS.md'deki plana göre DNS yönetiminin Cloudflare'e alınması ve Workers Custom Domain bağlanması.
5. `scripts/deploy.sh production --confirm`.
