# BalkoLüx – Bahçe & Balkon Mobilyaları

[![Next.js](https://img.shields.io/badge/Next.js-16.0.10-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19.0-2D3748)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1)](https://www.mysql.com/)

Dış mekan mobilya koleksiyonlarının dijital sergilenmesi ve ürün detay yönetimi platformu.

BalkoLüx platformu, bahçe, teras ve balkonlar için özel olarak tasarlanan dış mekan mobilyalarının teknik özelliklerini ve estetik detaylarını bir araya getiren bir dijital katalogdur. Kullanıcılar; hava koşullarına dayanıklı kumaş yapıları, alüminyum veya ahşap iskelet detayları ve ergonomik tasarım ölçüleri gibi ürün bilgilerine erişebilir. Oturma gruplarından yemek masalarına, dış mekan aksesuarlarından konfor odaklı bahçe mobilyalarına kadar farklı kategorilerdeki ürünlerin yüksek çözünürlüklü görselleri ve materyal bilgileri listelenmektedir.

## 🌟 Özellikler

- **Ürün Kataloğu**: Kategori bazlı filtreleme, arama ve model karşılaştırma
- **Görsel Galerisi**: Yüksek çözünürlüklü ürün görselleri ve materyal detayları
- **Teknik Özellikler**: Kumaş yapısı, iskelet malzemesi, ölçüler ve ergonomik detaylar
- **Mobil Uyumlu**: Responsive tasarım ile tüm cihazlarda optimum deneyim
- **SEO Optimizasyonu**: Next.js SSR/SSG ile hızlı sayfa yükleme ve arama motoru dostu
- **Kullanıcı Hesapları**: Kayıt, giriş, profil yönetimi ve adres defteri
- **Sepet ve Ödeme**: Güvenli alışveriş sepeti ve İyzico entegrasyonu ile ödeme
- **Favoriler**: Ürün favorileme ve liste yönetimi
- **Yorumlar ve Değerlendirmeler**: Ürün yorumları ve yıldız puanlaması
- **Admin Paneli**: Ürün, sipariş, kullanıcı ve blog yönetimi
- **Blog Sistemi**: Kategori bazlı blog yazıları
- **Kupon Sistemi**: İndirim kuponları ve kampanya yönetimi
- **E-posta Bildirimleri**: Sipariş ve kayıt bildirimleri
- **Kargo Takibi**: Sipariş durumu ve kargo bilgileri

## 🛠️ Teknoloji Yığını

### Frontend

- **Next.js 16**: Server-Side Rendering (SSR) ve Static Site Generation (SSG)
- **React 19**: Modern React özellikleri
- **TypeScript**: Tip güvenliği
- **Tailwind CSS 4**: Utility-first CSS framework
- **Radix UI**: Erişilebilir UI bileşenleri
- **Framer Motion**: Animasyonlar
- **Lucide React**: İkonlar

### Backend

- **Next.js API Routes**: RESTful API endpoints
- **Prisma ORM**: Veritabanı yönetimi ve sorguları
- **MySQL**: İlişkisel veritabanı
- **NextAuth.js**: Kimlik doğrulama
- **bcrypt**: Şifre hashleme
- **Nodemailer**: E-posta gönderimi

### Entegrasyonlar

- **İyzico**: Ödeme sistemi
- **Cloudinary**: Resim yükleme ve optimizasyonu
- **Horoz Kargo**: Kargo takibi

### Geliştirme Araçları

- **ESLint**: Kod kalitesi
- **PostCSS**: CSS işleme
- **Docker**: Konteynerleştirme
- **Nginx**: Web sunucusu

## 🚀 Kurulum

### Ön Gereksinimler

- Node.js 18+
- MySQL 8.0+
- npm veya yarn

### Adımlar

1. **Depoyu klonlayın:**

   ```bash
   git clone https://github.com/your-username/balkolux.git
   cd balkolux
   ```

2. **Bağımlılıkları yükleyin:**

   ```bash
   npm install
   ```

3. **Ortam değişkenlerini ayarlayın:**

   `.env.local` dosyasını oluşturun ve aşağıdaki değişkenleri ekleyin:

   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/balkolux"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   IYZICO_API_KEY="your-iyzico-api-key"
   IYZICO_SECRET_KEY="your-iyzico-secret-key"
   EMAIL_SERVER_HOST="smtp.gmail.com"
   EMAIL_SERVER_PORT="587"
   EMAIL_SERVER_USER="your-email@gmail.com"
   EMAIL_SERVER_PASSWORD="your-app-password"
   ```

4. **Veritabanını hazırlayın:**

   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 📖 Kullanım

### Kullanıcı İşlemleri

- Ana sayfada ürünleri keşfedin
- Kategorilere göre filtreleyin
- Ürün detaylarını inceleyin
- Sepete ekleyin ve satın alın
- Hesap oluşturun ve giriş yapın
- Profil bilgilerinizi yönetin

### Admin İşlemleri

- `/admin` adresinden giriş yapın
- Ürünleri ekleyin/düzenleyin/silin
- Siparişleri yönetin
- Kullanıcıları görüntüleyin
- Blog yazıları yayınlayın
- Kuponları oluşturun

## 📡 API Dokümantasyonu

Platform, aşağıdaki ana API kategorilerini içerir:

- **Auth**: Kullanıcı girişi, kaydı ve oturum yönetimi
- **Products**: Ürün listesi, detayları ve arama
- **Cart**: Sepet işlemleri
- **Orders**: Sipariş oluşturma ve yönetimi
- **Users**: Kullanıcı profili ve adresleri
- **Reviews**: Ürün yorumları
- **Favorites**: Favori ürünler
- **Blog**: Blog yazıları
- **Admin**: Yönetim paneli işlemleri

API endpoints'leri `/app/api/` klasöründe bulunabilir.

## 🧪 Test

```bash
npm run build
npm start
```

## 🚢 Dağıtım

Proje VPS üzerinde Docker + Nginx ile production ortamına deploy edilmiştir.

### Docker ile Dağıtım

1. Docker imajını oluşturun:

   ```bash
   docker build -t balkolux .
   ```

2. Konteyneri çalıştırın:
   ```bash
   docker run -p 3000:3000 balkolux
   ```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👥 Yazar

- **Ceyhun Türkmen** - [Website](https://balkolux.com)

---

> Modern yaşam alanları için fonksiyonel dış mekan çözümleri. 🌞
