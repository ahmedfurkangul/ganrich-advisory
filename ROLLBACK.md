# Geri dönüş (Rollback)

Önce sorunun nerede olduğunu ayırın: **kod sürümü** mü, **veri/migration** mı, **alan adı/DNS** mi?

## 1. Kod sürümü (en sık durum)

Worker'ın son çalışan sürümüne dönün; veri ve DNS değişmez.

**Üretim (ganrichadvisory.com):** Workers & Pages → `ganrich-advisory` → Deployments → önceki sürüm → Rollback. Komut satırından:

```bash
npx wrangler deployments list --env production --config wrangler.jsonc
npx wrangler rollback <VERSION_ID> --env production --config wrangler.jsonc -m "neden"
```

Not: `main`'e yapılan her push otomatik yayınlanır (DEPLOYMENT.md). Geri döndükten sonra hatalı commit'i `main`'de geri almazsanız bir sonraki birleştirme onu yeniden yayına alır. Düzeltmeyi ayrı bir PR ile yapın.

**Önizleme:** aynı komutlar `--env preview` ile, ya da panelde `ganrich-preview`.

## 2. Veri ve migration

- Migration'ları körlemesine geri almayın; arada gelen talepler kaybolur.
- Önce yedek: `npx wrangler d1 export ganrich-preview-db --remote --output yedek-$(date +%F).sql`
- D1 Time Travel ile bir zaman noktasına dönülebilir: `npx wrangler d1 time-travel restore ganrich-preview-db --timestamp <ISO zaman>`. Bu, o andan sonraki bütün yazmaları siler; önce dışa aktarın ve yeni kayıtları ayrıca uzlaştırın.
- R2 dosyaları sürümlenmez; silinen PDF geri gelmez. Toplu silme yapmadan önce listeyi alın: `npx wrangler r2 object list ganrich-preview-docs`.

### Migration kaydı

`0000` ve `0001` önizleme veritabanına elle uygulandıysa wrangler'a bunları uygulanmış olarak işaretleyin:

```bash
npx wrangler d1 execute ganrich-preview-db --remote --command \
  "CREATE TABLE IF NOT EXISTS d1_migrations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL); INSERT OR IGNORE INTO d1_migrations (name) VALUES ('0000_volatile_skin.sql'), ('0001_lonely_sauron.sql');"
```

## 3. Alan adı / DNS

- Geri dönüş için gerekenler: GoDaddy zone dışa aktarma dosyası, eski nameserver'lar (`ns11.domaincontrol.com`, `ns12.domaincontrol.com`), eski web hedefleri (docs/GODADDY-DNS.md).
- Nameserver'ı GoDaddy'ye geri çevirmek her şeyi anında geri almaz: çözümleyiciler eski NS kaydını 3600 saniyeye, kayıt kuruluşu tarafını ise 48 saate kadar önbellekte tutabilir. Bu süre boyunca hem eski GoDaddy zone'u hem Cloudflare zone'u çalışır durumda kalmalıdır.
- Daha hızlı yol: nameserver'a dokunmadan Cloudflare zone'u içinde `@` ve `www` kayıtlarını eski Sites hedeflerine (iki A kaydı ve `custom-domains.chatgpt.site` CNAME) döndürmek. Bunun için Sites'taki özel alan adı bağlantısı silinmemiş olmalıdır.
- E-posta kayıtlarını (MX, SPF, DKIM, DMARC, autodiscover) hiçbir geri dönüşte değiştirmeyin.

## Sırlar nerede

Sır değerleri bu belgede yoktur. Bulundukları yerler: Cloudflare hesabı (Workers → ganrich-advisory veya ganrich-preview → Settings → Variables and Secrets), Cloudflare Zero Trust (Access uygulamaları), GoDaddy hesabı (alan adı ve DNS), Microsoft 365 (e-posta).
