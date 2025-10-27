# Modern Blog Projesi

## 📋 Proje Özeti
Modern, ölçeklenebilir ve SEO dostu bir blog platformu. PostgreSQL veritabanı, TypeScript backend ve Next.js frontend ile geliştirilmiştir.

## 🛠️ Teknoloji Stack

### Backend
- **Node.js** + **TypeScript**
- **Express.js** - Web framework
- **PostgreSQL** - Veritabanı
- **Prisma** - ORM
- **JWT** - Authentication
- **bcrypt** - Şifre hashleme
- **Multer** - Dosya yükleme
- **Sharp** - Resim optimizasyonu

### Frontend
- **Next.js 15** - React framework (App Router) + **Turbo** - Ultra-fast bundling
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Styling
- **Framer Motion** - Animasyonlar
- **React Hook Form** - Form yönetimi
- **Zustand** - State management
- **Turbo** - Lightning-fast build system

### DevOps & Tools
- **Docker** - Containerization
- **GitHub Actions** - CI/CD
- **ESLint** + **Prettier** - Code quality
- **Husky** - Git hooks

## 📁 Proje Yapısı

```
NextBlogProject/
├── backend/                 # Backend API
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── utils/           # Utility functions
│   │   └── types/           # TypeScript types
│   ├── prisma/              # Database schema
│   ├── uploads/             # File uploads
│   └── package.json
├── frontend/                # Next.js frontend
│   ├── app/                 # App Router pages
│   ├── components/          # React components
│   ├── lib/                 # Utilities & configs
│   ├── styles/              # Global styles
│   └── package.json
├── admin/                   # Admin panel
│   ├── app/                 # Admin pages
│   ├── components/          # Admin components
│   └── package.json
├── docker-compose.yml       # Development environment
├── .env.example            # Environment variables
└── README.md
```

## 🗄️ Veritabanı Şeması

### Ana Tablolar

#### 1. Users (Kullanıcılar)
```sql
- id (UUID, Primary Key)
- email (String, Unique)
- username (String, Unique)
- password (String, Hashed)
- firstName (String)
- lastName (String)
- avatar (String, URL)
- role (Enum: USER, ADMIN, MODERATOR)
- isActive (Boolean)
- emailVerified (Boolean)
- createdAt (DateTime)
- updatedAt (DateTime)
```

#### 2. Categories (Kategoriler)
```sql
- id (UUID, Primary Key)
- name (String, Unique)
- slug (String, Unique)
- description (Text)
- color (String, Hex)
- icon (String)
- isActive (Boolean)
- createdAt (DateTime)
- updatedAt (DateTime)
```

#### 3. Tags (Etiketler)
```sql
- id (UUID, Primary Key)
- name (String, Unique)
- slug (String, Unique)
- color (String, Hex)
- createdAt (DateTime)
- updatedAt (DateTime)
```

#### 4. Posts (Blog Yazıları)
```sql
- id (UUID, Primary Key)
- title (String)
- slug (String, Unique)
- excerpt (Text)
- content (Text, Rich Text)
- featuredImage (String, URL)
- status (Enum: DRAFT, PUBLISHED, ARCHIVED)
- publishedAt (DateTime)
- readTime (Integer, minutes)
- viewCount (Integer)
- likeCount (Integer)
- authorId (UUID, Foreign Key)
- categoryId (UUID, Foreign Key)
- createdAt (DateTime)
- updatedAt (DateTime)
```

#### 5. Comments (Yorumlar)
```sql
- id (UUID, Primary Key)
- content (Text)
- isApproved (Boolean)
- authorName (String)
- authorEmail (String)
- authorWebsite (String, Optional)
- postId (UUID, Foreign Key)
- parentId (UUID, Foreign Key, Optional)
- createdAt (DateTime)
- updatedAt (DateTime)
```

#### 6. PostTags (Yazı-Etiket İlişkisi)
```sql
- postId (UUID, Foreign Key)
- tagId (UUID, Foreign Key)
- createdAt (DateTime)
```

#### 7. Media (Medya Dosyaları)
```sql
- id (UUID, Primary Key)
- filename (String)
- originalName (String)
- mimeType (String)
- size (Integer)
- url (String)
- alt (String)
- uploadedBy (UUID, Foreign Key)
- createdAt (DateTime)
```

#### 8. Settings (Site Ayarları)
```sql
- id (UUID, Primary Key)
- key (String, Unique)
- value (Text)
- type (Enum: STRING, NUMBER, BOOLEAN, JSON)
- description (Text)
- updatedAt (DateTime)
```

## 🚀 Geliştirme Aşamaları

### Faz 1: Backend API Geliştirme
- [ ] Proje kurulumu ve konfigürasyon
- [ ] PostgreSQL veritabanı kurulumu
- [ ] Prisma ORM kurulumu ve şema oluşturma
- [ ] Authentication sistemi (JWT)
- [ ] User management API'leri
- [ ] Category management API'leri
- [ ] Tag management API'leri
- [ ] Post CRUD API'leri
- [ ] Comment management API'leri
- [ ] Media upload API'leri
- [ ] Settings API'leri
- [ ] API dokümantasyonu (Swagger)

### Faz 2: Frontend Geliştirme
- [ ] Next.js proje kurulumu
- [ ] Tailwind CSS konfigürasyonu
- [ ] Layout ve navigation
- [ ] Homepage tasarımı
- [ ] Blog listesi sayfası
- [ ] Blog detay sayfası
- [ ] Kategori sayfaları
- [ ] Arama fonksiyonu
- [ ] Responsive tasarım
- [ ] SEO optimizasyonu

### Faz 3: Admin Panel
- [ ] Admin authentication
- [ ] Dashboard tasarımı
- [ ] Post management
- [ ] Category management
- [ ] Tag management
- [ ] Comment moderation
- [ ] Media library
- [ ] User management
- [ ] Settings management
- [ ] Analytics dashboard

### Faz 4: Gelişmiş Özellikler
- [ ] Email notifications
- [ ] Social media integration
- [ ] SEO meta tags
- [ ] Sitemap generation
- [ ] RSS feed
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Performance optimization
- [ ] Caching strategy

## 🔧 Kurulum

### Gereksinimler
- Node.js 18+
- PostgreSQL 14+
- Docker (opsiyonel)

### Geliştirme Ortamı Kurulumu

1. **Repository'yi klonlayın**
```bash
git clone <repository-url>
cd NextBlogProject
```

2. **Environment variables'ları ayarlayın**
```bash
cp .env.example .env
# .env dosyasını düzenleyin
```

3. **Dependencies'leri yükleyin**
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Admin
cd ../admin
npm install
```

4. **Veritabanını kurun**
```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

5. **Development server'ları başlatın**
```bash
# Backend (Port 5000)
cd backend
npm run dev

# Frontend (Port 3000) - Next.js 15 + Turbo
cd frontend
npm run dev

# Admin (Port 3001) - Next.js 15 + Turbo
cd admin
npm run dev
```

### Turbo Optimizasyonları
```bash
# Frontend'de Turbo ile geliştirme
cd frontend
npm run dev --turbo

# Production build (Turbo ile)
npm run build --turbo
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Giriş
- `POST /api/auth/logout` - Çıkış
- `GET /api/auth/me` - Mevcut kullanıcı bilgisi

### Posts
- `GET /api/posts` - Tüm yazıları listele
- `GET /api/posts/:id` - Yazı detayı
- `POST /api/posts` - Yeni yazı oluştur
- `PUT /api/posts/:id` - Yazı güncelle
- `DELETE /api/posts/:id` - Yazı sil

### Categories
- `GET /api/categories` - Kategorileri listele
- `POST /api/categories` - Yeni kategori oluştur
- `PUT /api/categories/:id` - Kategori güncelle
- `DELETE /api/categories/:id` - Kategori sil

### Comments
- `GET /api/comments/:postId` - Yazı yorumları
- `POST /api/comments` - Yeni yorum ekle
- `PUT /api/comments/:id` - Yorum güncelle
- `DELETE /api/comments/:id` - Yorum sil

## 🎨 Tasarım Sistemi

### Renk Paleti
- Primary: #3B82F6 (Blue)
- Secondary: #10B981 (Green)
- Accent: #F59E0B (Amber)
- Neutral: #6B7280 (Gray)

### Typography
- Headings: Inter, sans-serif
- Body: Inter, sans-serif
- Code: JetBrains Mono, monospace

## 📊 Performance Hedefleri (Next.js 15 + Turbo)

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.0s
- **Largest Contentful Paint**: < 1.5s
- **Cumulative Layout Shift**: < 0.05
- **Build Time**: < 30s (Turbo ile)
- **Hot Reload**: < 100ms

## 🔒 Güvenlik

- JWT token authentication
- Password hashing (bcrypt)
- Input validation & sanitization
- CORS configuration
- Rate limiting
- SQL injection protection (Prisma)
- XSS protection

## 📈 SEO Özellikleri

- Server-side rendering (SSR)
- Meta tags optimization
- Structured data (JSON-LD)
- Sitemap generation
- RSS feed
- Open Graph tags
- Twitter Cards

## 🚀 Deployment

### Production Environment
- **Backend**: Railway / Vercel / DigitalOcean
- **Frontend**: Vercel / Netlify
- **Database**: PostgreSQL (Railway / Supabase)
- **CDN**: Cloudinary (images)
- **Monitoring**: Sentry

## 📚 Dokümantasyon

- [API Documentation](./docs/api.md)
- [Database Schema](./docs/database.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guide](./docs/contributing.md)

## 🤝 Katkıda Bulunma

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

- **Developer**: [Your Name]
- **Email**: [your.email@example.com]
- **GitHub**: [@yourusername]

---

**Not**: Bu README dosyası proje geliştikçe güncellenecektir. Her faz tamamlandığında ilgili bölümler işaretlenecektir.
