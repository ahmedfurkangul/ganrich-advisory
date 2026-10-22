# GoDaddy ve DNS

**Durum (22 Ekim 2026): hiçbir DNS kaydı, nameserver veya alan adı ayarı değiştirilmedi.** Bu belge mevcut durumun kaydı ve onaylanırsa uygulanacak planıdır.

## Kaynak ve kapsam

Kayıtlar 22 Ekim 2026'da GoDaddy'nin yetkili nameserver'ı `ns11.domaincontrol.com` sorgulanarak okundu. Dışarıdan sorgu tam liste vermez: bilinmeyen alt alan adları burada olmayabilir. **Kesin liste için GoDaddy panelinden zone dosyası dışa aktarılmalı** (Alan adı → DNS → … → Export Zone File). Bu, Furkan'ın GoDaddy'ye kendisinin giriş yapmasını gerektirir ve henüz yapılmadı.

## Alan adı

| Ayar | Değer |
|---|---|
| Kayıt kuruluşu | GoDaddy (bitiş 2027-07-23) |
| Nameserver | `ns11.domaincontrol.com`, `ns12.domaincontrol.com` (TTL 3600) |
| DNSSEC | Kapalı (DS kaydı yok) |
| Kilit | `clientUpdateProhibited`: nameserver değişikliğinden önce GoDaddy'de kaldırılması gerekebilir |
| SOA serial | 2026082303 (minimum TTL 600) |
| CAA / AAAA / wildcard | Yok |

## Kayıtlar

| Ad | Tür | TTL | Değer | Amaç |
|---|---|---|---|---|
| `@` | A | 600 | 162.159.143.30 | Web: ChatGPT Sites |
| `@` | A | 600 | 172.66.3.26 | Web: ChatGPT Sites |
| `www` | CNAME | 3600 | custom-domains.chatgpt.site | Web: ChatGPT Sites |
| `@` | MX | 3600 | 0 ganrichadvisory-com.mail.protection.outlook.com | E-posta: Microsoft 365 |
| `@` | TXT | 3600 | NETORGFT21058350.onmicrosoft.com | Microsoft alan adı doğrulaması |
| `@` | TXT | 3600 | v=spf1 include:secureserver.net -all | SPF |
| `_dmarc` | TXT | 3600 | v=DMARC1; p=quarantine; adkim=r; aspf=r; rua=mailto:dmarc_rua@onsecureserver.net; | DMARC |
| `selector1._domainkey` | CNAME | 3600 | selector1-ganrichadvisory-com._domainkey.netorgft21058350.e-v1.dkim.mail.microsoft | DKIM |
| `selector2._domainkey` | CNAME | 3600 | selector2-ganrichadvisory-com._domainkey.netorgft21058350.e-v1.dkim.mail.microsoft | DKIM |
| `autodiscover` | CNAME | 3600 | autodiscover.outlook.com | Outlook yapılandırması |
| `msoid` | CNAME | 3600 | clientconfig.microsoftonline-p.net | Microsoft 365 |
| `lyncdiscover` | CNAME | 3600 | webdir.online.lync.com | Teams/Skype |
| `sip` | CNAME | 3600 | sipdir.online.lync.com | Teams/Skype |
| `_sip._tls` | SRV | 3600 | 100 1 443 sipdir.online.lync.com | Teams/Skype |
| `_sipfederationtls._tcp` | SRV | 3600 | 100 1 5061 sipfed.online.lync.com | Teams/Skype |
| `email` | CNAME | 3600 | email.secureserver.net | GoDaddy webmail |
| `_domainconnect` | CNAME | 3600 | _domainconnect.gd.domaincontrol.com | GoDaddy Domain Connect |

E-posta notu: MX kaydı Microsoft 365'e yönlendirir; bu, belirli bir posta kutusunun (örneğin furkangul@ganrichadvisory.com) var olduğunu veya çalıştığını kanıtlamaz. Gelen/giden test, Furkan'ın belirleyeceği gerçek bir kutuyla ayrıca yapılmalıdır.

## Plan: DNS yönetimini Cloudflare'e almak (onay bekliyor)

Alan adı GoDaddy'de kalır; yalnızca DNS yönetimi taşınır. Workers Custom Domain için alan adının aktif bir Cloudflare zone'u olması gerekir.

1. GoDaddy'den zone dosyasını dışa aktarın; nameserver, DNSSEC ve yönlendirme (forwarding) ayarlarının ekran görüntüsünü alın.
2. Cloudflare'de `ganrichadvisory.com` zone'unu ekleyin (Free plan), zone dosyasını içe aktarın ve yukarıdaki tabloyla satır satır karşılaştırın.
3. E-posta ve Microsoft kayıtlarını **DNS only** (gri bulut) bırakın; değerleri aynen koruyun.
4. Geçiş anında web kayıtları eski Sites hedeflerini göstermeye devam etsin (`@` iki A kaydı, `www` CNAME). Yani nameserver değişimi tek başına siteyi değiştirmez.
5. GoDaddy'de `clientUpdateProhibited` kilidini kaldırın, Nameservers bölümüne yalnızca Cloudflare'in bu zone'a atadığı iki nameserver'ı girin. Değişiklik öncesi eski/yeni değerler, web ve e-posta etkisi ve geri dönüş adımları onaya sunulacak.
6. Zone aktif olduktan sonra eski sitenin ve e-postanın (gelen ve giden) çalıştığını doğrulayın.
7. Ayrı bir onayla: Worker'a `ganrichadvisory.com` ve `www.ganrichadvisory.com` Custom Domain bağlayın; bu işlem Cloudflare'de ilgili eski A/CNAME kayıtlarının değiştirilmesini ister. Sertifikaların iki hostname için de aktif olduğunu kontrol edin.
8. `www` → `https://ganrichadvisory.com` için yol ve sorguyu koruyan 301 yönlendirmesi (Cloudflare Redirect Rule). GoDaddy masked forwarding kullanılmaz.
9. Eski Sites yayınını ve özel alan adı bağlantısını, mutabık kalınan gözlem süresi bitene kadar silmeyin.

Yayılma süresi: eski NS TTL'i 3600 saniye; kayıt kuruluşu tarafında 48 saate kadar sürebilir. Anlık geçiş garantisi verilmez.
