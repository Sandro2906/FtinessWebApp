# 🎯 VERCEL DEPLOYMENT GUIDE - SLJEDEĆI KORACI

Sve potrebne datoteke su kreirane i pushane na GitHub! Evo što trebaj uraditi na Vercel-u:

## 1️⃣ POKRENI APLIKACIJU LOKALNO (TEST)

Prije deploymenta, testiraj da sve radi:

### Windows:
```bash
setup.bat
```

### Mac/Linux:
```bash
bash setup.sh
```

Ili manualno:
```bash
docker-compose up -d
npm install
npm run db:push
npm run dev
```

Posjeti: http://localhost:3000

## 2️⃣ SETUP NA VERCEL-U

### A. Povežite Repositorij

1. Idi na https://vercel.com
2. Klikni "Add New..." → "Project"
3. Odaberi GitHub i autorizuj Vercel
4. Pronađi i odaberi ovaj repositorij
5. Klikni "Import"

### B. Configure Build & Output Settings

Vercel bi trebao automatski detektovati Next.js:
- **Framework**: Next.js
- **Build Command**: `npm run build` ✅ (Već je optimizovan)
- **Output Directory**: `.next` ✅ (Već postavljeno)
- **Install Command**: `npm install` ✅

## 3️⃣ POSTAVI ENVIRONMENT VARIJABLE (KRITIČNO!)

Idi u: **Settings** → **Environment Variables**

**Obavezno dodaj:**

### DATABASE_URL (OBAVEZNO!)
Trebam PostgreSQL bazu. Izbori:

**Izbor 1: Vercel PostgreSQL** (Preporučeno)
- U "Storage" tab-u dodaj "Postgres Database"
- Environment će biti automatski postavljen!

**Izbor 2: Vanjska baza**
```
postgresql://username:password@host:port/database
```

Primjeri vanjskih PostgreSQL usluga:
- **Render.com** (Free tier dostupan) - https://render.com
- **Railway.app** (Free tier dostupan) - https://railway.app
- **Neon.tech** (Serverless PostgreSQL) - https://neon.tech
- **AWS RDS** (Pay as you go)
- **DigitalOcean** (Managed database)

### Ostale Varijable (Ako koristiš):
```
NEXT_PUBLIC_PAYPAL_CLIENT_ID = "tvoj_paypal_id"
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = "587"
SMTP_USER = "tvoj_email@gmail.com"
SMTP_PASS = "tvoj_app_password"
```

## 4️⃣ DEPLOY!

1. Kada postaviš environment varijable, klikni **Deploy**
2. Vercel će:
   - Preuzeti kod sa GitHub-a
   - Pokrenuti `npm run build`
     - Generiše Prisma client
     - Primjenjuje migracije (`prisma migrate deploy`)
     - Builduje Next.js aplikaciju
3. Čekaj da se build završi (obično 2-5 minuta)

## 5️⃣ PROVJERI DEPLOYMENT

Kada je deployment završen:
1. Klikni na URL domene (npr. `my-app.vercel.app`)
2. Trebao bi vidjeti tvoju aplikaciju
3. Provjeri da su API routes dostupne
4. Testiraj login/register ako ih imaš

## 🔍 TROUBLESHOOTING

### Build Greške?

**Ako vidja grešku za DATABASE_URL:**
- Provjeri da li je `DATABASE_URL` zaista postavljena u Environment Variables
- Provjeri format: `postgresql://...`
- Testiraj connection string lokalno prvo

**Ako vidja Prisma greške:**
- Provjeri Vercel build logs (u Build tab-u)
- Prikaži build log između linija `> prisma`

**Ako je aplikacija crna/white page:**
- Otvori browser dev tools (F12)
- Pogledaj Console za greške
- Provjeri Network tab

### PostgreSQL greške nakon deploymenta?

```
Error: connect ECONNREFUSED
Error: no pg_hba.conf entry
Error: database does not exist
```

**Rješenja:**
1. Provjeri `DATABASE_URL` je točan
2. Provjeri PostgreSQL server je aktivan
3. Provjeri lozinka je točna
4. Provjeri firewall dozvoljava inbound connections

## 📊 MONITORING

Nakon deploymenta, provjeri:

### Vercel Dashboard:
- **Deployments** tab - vidi sve deploymente
- **Analytics** - brzina stranica i traffic
- **Functions** - performance API route-a
- **Logs** - vidja runtime greške

### Database Monitoring:
Ako koristiš vanjsku bazu, koristi njen control panel:
- Provjeri aktivne connections
- Vidi query logs
- Monitor CPU/memory usage

## 🚀 CONTINUOUS DEPLOYMENT AUTOMATSKI RADI!

Kada pushjaš kod na `main` branch-a:
```bash
git push origin main
```

Vercel će **automatski**:
1. Preuzeti novi kod
2. Pokrenuti test (GitHub Actions CI/CD workflow)
3. Ako test prođe, automatski deployar
4. Primijeniti database migracije
5. Update aplikaciju na istoj domeni

## 📱 CUSTOM DOMENE (Opciono)

Ako imaš custom domenu:
1. Idi u Project Settings → Domains
2. Dodaj tvoju domenu
3. Slijedi upute za DNS setup

## 🔐 SECURITY CHECKLIST

Pre nego što aplikacija ide u produkciju:

- [ ] DATABASE_URL je postavljena
- [ ] `.env` fajl je u `.gitignore` (nikada ga ne commituj!)
- [ ] Promijeni default seed podatke (testuser/admin)
- [ ] Dodaj HTTPS (Vercel ga daje automatski)
- [ ] Setup CORS ako trebas API pristup sa drugih domena
- [ ] Validiraj sve forme na backend-u
- [ ] Postavi proper error handling
- [ ] Setup email notifications (ako trebas)

## 📞 SUPPORT

Ako naiđeš na probleme:

**Vercel Support:** https://vercel.com/support
**Next.js Docs:** https://nextjs.org/docs
**Prisma Docs:** https://www.prisma.io/docs
**GitHub Issues:** https://github.com/vercel/next.js/issues

---

## ✅ SAŽETAK ŠTO JE GOTOVO:

- ✅ Docker setup za lokalni razvoj
- ✅ PostgreSQL konfiguracija
- ✅ Prisma migracije
- ✅ Vercel deployment config
- ✅ Environment template files
- ✅ GitHub Actions CI/CD
- ✅ Setup scripts (Windows/Mac/Linux)
- ✅ Kompletan build pipeline

## ❌ POTREBNO NA TEBI:

1. ✋ Postavi DATABASE_URL na Vercel-u
2. ✋ Dodaj ostale env varijable ako trebaju
3. 🚀 Pritisni Deploy na Vercel-u
4. ⏳ Čekaj build (2-5 minuta)
5. 🎉 Done! Aplikacija će biti live!

---

**Aplikacija je spremna za produkciju! Trebaj samo postaviti DATABASE_URL i Deploy! 🚀**
