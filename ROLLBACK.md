# Geri dönüş (Rollback)

Önce sorunun nerede olduğunu ayırın: **kod sürümü** mü, **veri/migration** mı, **alan adı/DNS** mi?

## 1. Kod sürümü (en sık durum)

Worker'ın son çalışan sürümüne dönün; veri ve DNS değişmez.

```bash
npx wrangler deployments list --env preview          # sürümleri ve Version ID'leri listeler
npx wrangler rollback <VERSION_ID> --env preview -m "neden"
```

Panelden: Workers & Pages → `ganrich-preview` → Deployments → önceki sürüm → Rollback.

Ardından düzeltmeyi bir dalda yapıp `scripts/deploy.sh preview` ile yeniden yayınlayın.

Bilinen sürümler:

| Tarih | Version ID | Kaynak | Not |
|---|---|---|---|
| 2026-10-22 | `b10e52e7-8a43-42ca-82d7-b5b4ce2dd688` | `a7b1d90` | İlk önizleme, R2 yok, `dist` elle düzenlenmişti |
| 2026-10-22 | `3f27004e-9fc3-4cc8-ae5a-7de341307c39` | `a7b1d90` | R2 bağlandı; sahte başlık açığı var, geri dönülmemeli |

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

## 3. Alan adı / DNS (üretim geçişi yapıldıktan sonra geçerli)

- Geri dönüş için gerekenler: GoDaddy zone dışa aktarma dosyası, eski nameserver'lar (`ns11.domaincontrol.com`, `ns12.domaincontrol.com`), eski web hedefleri (GODADDY-DNS.md).
- Nameserver'ı GoDaddy'ye geri çevirmek her şeyi anında geri almaz: çözümleyiciler eski NS kaydını 3600 saniyeye, kayıt kuruluşu tarafını ise 48 saate kadar önbellekte tutabilir. Bu süre boyunca hem eski GoDaddy zone'u hem Cloudflare zone'u çalışır durumda kalmalıdır.
- Daha hızlı yol: nameserver'a dokunmadan Cloudflare zone'u içinde `@` ve `www` kayıtlarını eski Sites hedeflerine (iki A kaydı ve `custom-domains.chatgpt.site` CNAME) döndürmek. Bunun için Sites'taki özel alan adı bağlantısı silinmemiş olmalıdır.
- E-posta kayıtlarını (MX, SPF, DKIM, DMARC, autodiscover) hiçbir geri dönüşte değiştirmeyin.

## Sırlar nerede

Sır değerleri bu belgede yoktur. Bulundukları yerler: Cloudflare hesabı (Workers → ganrich-preview → Settings → Variables and Secrets), Cloudflare Zero Trust (Access uygulamaları), GoDaddy hesabı (alan adı ve DNS), Microsoft 365 (e-posta).
