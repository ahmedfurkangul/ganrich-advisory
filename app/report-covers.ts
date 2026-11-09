// Editorial cover illustrations for the programme reports (public/reports/covers/*.webp).
// One language-neutral image per topic, shared by the EN and TR editions.
const coverBySlug: Record<string, string> = {
  "cbam-actual-or-default-e9f664d8": "cbam-actual", "cbam-gercek-mi-varsayilan-mi-ef31215c": "cbam-actual",
  "cra-the-24-hour-test-96989394": "cra-24h", "cra-24-saat-testi-37aca9ad": "cra-24h",
  "ai-at-the-order-desk-a49ad275": "order-desk", "siparis-masasinda-yapay-zeka-ba6a12f4": "order-desk",
  "machinery-regulation-no-transition-26659c0f": "machinery", "makine-tuzugu-gecis-suresi-yok-6cec1c86": "machinery",
  "ppwr-packaging-file-7d6aa9bd": "ppwr", "ppwr-ambalaj-dosyasi-65f6be90": "ppwr",
  "battery-passport-data-supply-chain-9f541303": "battery", "batarya-pasaportu-veri-zinciri-11d198db": "battery",
  "forced-labour-proof-not-policy-a099a490": "forced-labour", "zorla-calistirma-politika-degil-kanit-492125d0": "forced-labour",
  "turkiye-ets-monitoring-before-money-d75e501c": "ets-monitoring", "turkiye-ets-paradan-once-olcum-000f6369": "ets-monitoring",
  "construction-products-family-by-family-d0de592d": "cpr", "yapi-urunleri-aile-aile-gecis-69b43613": "cpr",
  "espr-textiles-after-destruction-ban-22b37a1c": "espr-textiles", "espr-tekstil-imha-yasagindan-sonra-9b18a3aa": "espr-textiles",
  "nis2-supplier-security-evidence-ea4bc3b0": "nis2", "nis2-tedarikci-guvenligi-kaniti-afa3e63f": "nis2",
  "eu-mdr-two-deadlines-database-5c93bf77": "mdr", "ab-mdr-iki-son-tarih-9abc973b": "mdr",
  "supplier-sustainability-data-after-omnibus-97a36c53": "omnibus", "tedarikci-surdurulebilirlik-verisi-omnibus-82382d59": "omnibus",
  "cbam-august-guidance-turkish-exporters-58a4abcd": "cbam-guidance", "skdm-agustos-rehberleri-turk-ihracatci-1d698fcc": "cbam-guidance",
  "turkiye-ets-pilot-monitoring-plan-8fa4535e": "ets-pilot", "turkiye-ets-pilotu-izleme-plani-98334c09": "ets-pilot",
  "eudr-checklist-turkish-wood-furniture-204bc82e": "eudr", "eudr-kontrol-listesi-ahsap-mobilya-a607fc4b": "eudr",
  "textile-product-passport-turkish-suppliers-eb264118": "textile-dpp", "tekstil-urun-pasaportu-turk-tedarikci-66a3e53c": "textile-dpp",
};

export function reportCover(slug: string): string | undefined {
  const key = coverBySlug[slug];
  return key ? `/reports/covers/${key}.webp` : undefined;
}
