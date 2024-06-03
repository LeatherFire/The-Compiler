# Proje Kullanım Notları

## Hesap Bilgileri
Bu projeyi kullanırken faydalanmanız için size içinde verilerin olduğu bir hesap sağlıyorum. Dilerseniz bu hesap ile giriş yapabilir veya kendiniz sıfırdan bir hesap oluşturabilirsiniz.

### Hazır Hesap Bilgileri
- **Email:** asd123@gmail.com
- **Password:** securepassword

## API Sorunları ve Çözümleri

### `api/executeCode` API'sinin Vercel'de Çalışmama Sebebi
Projede yerel makinede sorunsuz çalışan `api/executeCode` API'si, Vercel üzerinde çalışırken bazı sorunlar yaşanmaktadır. Bu sorunların ana sebepleri şunlar olabilir:

1. **Vercel'in Sunucu Ortamı Kısıtlamaları:**
   Vercel üzerinde çalıştırılan projelerde, bazı sistem çağrıları ve dosya işlemleri kısıtlanmış olabilir. Özellikle `child_process` ve `fs` modüllerinin kullanımı, Vercel'in sunucu ortamında bazı kısıtlamalarla karşılaşabilir.

2. **Geçici Dosya Oluşturma ve Çalıştırma:**
   `api/executeCode` API'si, geçici dosyalar oluşturarak ve bu dosyaları çalıştırarak kod yürütmektedir. Vercel gibi serverless platformlarda, bu tür dosya operasyonları sınırlı olabilir veya izin verilmemiş olabilir.

3. **Yol ve Dosya İzinleri:**
   Geçici dosyaların oluşturulduğu `/tmp` dizini veya diğer dosya yolları Vercel'in çalışma ortamında erişilebilir olmayabilir. Bu durum, API'nin beklenen şekilde çalışmasını engelleyebilir.

### Yerel Makinede Çalışma
Aynı API, yerel makinede çalışırken bu tür kısıtlamalar olmadığı için sorunsuz çalışmaktadır. Yerel makinede, dosya sistemine tam erişim ve gerekli izinlere sahip olduğunuzdan API sorunsuz şekilde kod çalıştırma işlemlerini gerçekleştirebilir.

## Uyumluluk Sorunları
Projenin en iyi şekilde çalışması için Chrome veya özellikle Opera tarayıcısını kullanmanızı öneririm. Diğer tarayıcılarda bazı uyumluluk sorunları yaşanabilir.

## Siteye Erişim
Projeye mutlaka bu adres üzerinden erişilmelidir: [WebOS](https://webos-git-main-yigitcan-ucars-projects.vercel.app). API yolları `.env` dosyasında bu şekilde ayarlandığı için, farklı bir URL kullanıldığında API'lere erişimde sorunlar yaşanabilir.

## Projenin Geleceği ve İyileştirmeler
Bu proje şu anda beta aşamasında olup, zamanla API'lerin ve frontend kısmının karmaşıklaşarak büyümesi planlanmaktadır. Gelecekte daha fazla özellik eklenerek, projeyi tarayıcıda çalışan bir işletim sistemine dönüştürmek hedeflenmektedir.

### İyileştirmeler
- **Performans Artışı:** Daha hızlı ve verimli çalışan API'ler.
- **Güvenlik:** Kullanıcı verilerinin daha iyi korunması.
- **Yeni Özellikler:** Daha fazla programlama dili desteği ve gelişmiş kod editörü.

### Proje Geleceği
- **Gelişmiş Kod Editörü:** Daha kullanıcı dostu ve özelliklerle dolu bir kod editörü.
- **Daha Fazla Entegrasyon:** GitHub, GitLab gibi platformlarla entegrasyon.
- **Gelişmiş Kullanıcı Profilleri:** Kullanıcıların projelerini ve kodlarını daha kolay yönetebileceği profiller.

Projeyi tarayıcıda çalışan bir işletim sistemine dönüştürme hedefi doğrultusunda, zamanla daha fazla özelliğin eklenmesi ve kullanıcı deneyiminin iyileştirilmesi planlanmaktadır.

İyi çalışmalar!
