# Next.js + PostgreSQL + Docker + Vercel Setup

**Kompletna postavka Next.js aplikacije sa PostgreSQL bazom, Docker podrškOM i Vercel deploymentom**

## 📋 Što je urađeno?

### 1. ✅ Docker Setup
- `docker-compose.yml` - PostgreSQL baza sa svim potrebnim konfiguracijama
- `.dockerignore` - Optimizacija Docker slika
- `Dockerfile` - Multi-stage build za production deployment
- PostgreSQL verzija 17 Alpine (lagana i brza)

### 2. ✅ Database Migracije
- `prisma/migrations/init/migration.sql` - Inicijalna SQL migracija
- `prisma/seed.mjs` - Seed script za test podatke
- Konfiguracija Prisma za automatske migracije

### 3. ✅ Environment Konfiguracija
- `.env` - Lokalna development konfiguracija sa Docker PostgreSQL
- `.env.local` - Lokalni override (git-ignored)
- `.env.production` - Production template
- `.env.example` - Template za nove setupe
- Sve sensitive podatke su izbrisani iz git-a

### 4. ✅ Build Processo
- Optimizovani npm scripts za sve faze
- Build, migracija i start kao dio deployment procesa
- Prisma client generation prije builda

### 5. ✅ Vercel Deployment
- `vercel.json` - Vercel konfiguracija
- Podršku za production PostgreSQL
- Automatske migracije pri deployu
- Environment varijable setup guide

### 6. ✅ CI/CD Pipeline
- `.github/workflows/ci.yml` - GitHub Actions workflow
- Automatski build i test na svaki push
- Database migrations testiranje

### 7. ✅ Setup Scripts
- `setup.sh` - Setup script za Linux/macOS
- `setup.bat` - Setup script za Windows
- Automatska PostgreSQL pokreća
- Automatske migracije i seed

## 🚀 Brzá Pokretanje

### Opcija 1: Korištenje Setup Skripte (Preporučeno)

**Na Windows:**
```bash
setup.bat
```

**Na Mac/Linux:**
```bash
bash setup.sh
```

### Opcija 2: Manuelna Postavka

1. **Pokreni PostgreSQL:**
   ```bash
   docker-compose up -d
   ```

2. **Instaliraj zavisnosti:**
   ```bash
   npm install
   ```

3. **Generiši Prisma client:**
   ```bash
   npm run prisma:generate
   ```

4. **Primijeni migracije:**
   ```bash
   npm run db:push
   ```

5. **Pokreni dev server:**
   ```bash
   npm run dev
   ```

## 📝 Dostupni Npm Scripts

```bash
npm run dev              # Pokreni development server (http://localhost:3000)
npm run build           # Build za production
npm start               # Pokreni production server
npm run lint            # Provjeri kod sa ESLint

# Database
npm run prisma:generate # Generiši Prisma client
npm run prisma:migrate  # Kreiraj novu migraciju
npm run prisma:seed     # Seeduj bazu testnim podacima
npm run db:push         # Primijeni migracije bez kreiranja verzije
npm run db:reset        # Resetuj bazu (obriši sve)
```

## 🐳 Docker Komande

```bash
# Pokreni PostgreSQL u background-u
docker-compose up -d

# Vidi logove
docker-compose logs -f postgres

# Zaustavi sve
docker-compose down

# Resetuj bazu podataka
docker-compose down -v
docker-compose up -d
```

## 🌐 Vercel Deployment

1. **Povežite sa Vercel-om:**
   - Idi na https://vercel.com/import
   - Odaberi ovaj GitHub repositorij

2. **Postavi Environment Variables na Vercel:**
   Idi u Project Settings → Environment Variables i dodaj:
   - `DATABASE_URL` - PostgreSQL connection string
   - `NEXT_PUBLIC_PAYPAL_CLIENT_ID` - PayPal ID (ako koristiš)
   - `SMTP_*` - Email konfiguracija (ako koristiš)

3. **Odaberite PostgreSQL:**
   - Vercel PostgreSQL (preporučeno)
   - Ili vanjsku uslugu (Render, AWS RDS, Neon, itd.)

4. **Deploy:**
   - Vercel će automatski pokrenuti migracije
   - Aplikacija će biti dostupna na vašoj domeni

## 🔐 Sigurnost

⚠️ **VAŽNO**: 
- `.env` fajl je u `.gitignore` - nikada se ne commituje!
- `dev.db` (SQLite) je obrisana
- Sve sensitive podatke stavi u environment varijable

## 📦 Što je Instalirano

- **Next.js 16.1.6** - React framework
- **PostgreSQL 17** - Relacijska baza (Docker)
- **Prisma 6.19.2** - ORM
- **Tailwind CSS 4** - Styling
- **TypeScript 5** - Type-safe JavaScript
- **ESLint 9** - Code quality
- **Nodemailer** - Email slanje
- **PayPal SDK** - Payment processing

## 📁 Struktura Projekta

```
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── blog/           # Blog stranica
│   │   ├── login/          # Login stranica
│   │   ├── profile/        # Profil stranica
│   │   └── register/       # Registracija stranica
│   ├── components/         # React komponente
│   └── lib/
│       └── db.ts           # Prisma client & helpers
├── prisma/
│   ├── schema.prisma       # Database schema
│   ├── seed.mjs            # Seed script
│   └── migrations/         # Database migracije
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI/CD
├── docker-compose.yml      # Docker PostgreSQL setup
├── Dockerfile              # Production Docker image
├── vercel.json             # Vercel deployment config
├── DOCKER_SETUP.md         # Detaljne Docker instrukcije
└── package.json            # NPM zavisnosti
```

## 🧪 Test Korisnici (Ako Seeduješ)

Ako imaš pokrenuo `npm run prisma:seed`, dostupni su:

| Username | Email | Password |
|----------|-------|----------|
| testuser | test@example.com | password123 |
| admin | admin@example.com | admin123 |

## 🆘 Troubleshooting

### PostgreSQL se ne pokreće
```bash
# Provjeri Docker status
docker ps

# Vidi logove
docker-compose logs postgres

# Resetuj kontejner
docker-compose down -v
docker-compose up -d
```

### Greške sa migracijama
```bash
# Resetuj bazu i primijeni migracije
npm run db:reset

# Ili manualno
docker-compose down -v
docker-compose up -d
npm run db:push
```

### Build greške
```bash
# Generiši Prisma client
npm run prisma:generate

# Očisti node_modules i reinstaliraj
rm -rf node_modules package-lock.json
npm install

# Pokušaj build
npm run build
```

### Greške na Vercel-u
1. Provjeri `DATABASE_URL` u environment varijablama
2. Provjeri da je PostgreSQL dostupan putem interneta
3. Vidi Vercel build logove za detaljne greške

## 📚 Korisni Linkovi

- [Next.js Dokumentacija](https://nextjs.org/docs)
- [Prisma ORM](https://www.prisma.io)
- [Docker Tutorial](https://docs.docker.com)
- [Vercel Docs](https://vercel.com/docs)
- [PostgreSQL Guide](https://www.postgresql.org/docs)

## 👨‍💻 Sljedeći Koraci

1. ✅ Pokreni `setup.bat` ili `bash setup.sh`
2. ✅ Testiraj aplikaciju na `http://localhost:3000`
3. ✅ Dodaj PayPal ID u `.env` ako koristiš payment-e
4. ✅ Konfiguruj email (SMTP) ako trebaju email notifikacije
5. ✅ Pushai na GitHub
6. ✅ Connectuj sa Vercel-om za automatski deployment

## 📝 Napomena

Sve potrebne datoteke za production deployment su već kreirane. Trebali bi biti spreman samo da:
1. Postaviš `DATABASE_URL` na Vercel-u
2. Pushuj kod na GitHub
3. Connectuješ repositorij sa Vercel-om

Ostatak će se automatski pokrenuti! 🎉

---

**Kreirano sa ❤️ za lakši development i deployment**
