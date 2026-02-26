# Next.js + PostgreSQL + Docker Setup

Ovaj projekt koristi Next.js sa PostgreSQL bazom podataka i Docker-om za razvoj i deployment na Vercel.

## 🚀 Brzi Start

### Preduvjeti
- Node.js 18+ i npm
- Docker i Docker Compose
- Git

### Lokalni razvoj sa Docker-om

1. **Pokreni PostgreSQL database:**
   ```bash
   docker-compose up -d
   ```

2. **Instaliraj zavisnosti:**
   ```bash
   npm install
   ```

3. **Kreiraj .env.local fajl (ako nije već kreiran):**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Primijeni Prisma migracije:**
   ```bash
   npm run prisma:migrate
   ```

5. **Pokreni seeding (opciono):**
   ```bash
   npm run prisma:seed
   ```

6. **Pokreni dev server:**
   ```bash
   npm run dev
   ```

Aplikacija će biti dostupna na `http://localhost:3000`

### Database Akcije

```bash
# Generiraj Prisma client
npm run prisma:generate

# Kreiraj novu migraciju
npm run prisma:migrate

# Seeduj bazu testnim podacima
npm run prisma:seed

# Resetuj bazu (obriši sve podatke i re-primijeni migracije)
npm run db:reset

# Push schema bez migracija (za development)
npm run db:push
```

### Docker Komande

```bash
# Pokreni services
docker-compose up

# Pokreni u background-u
docker-compose up -d

# Pogledaj logove
docker-compose logs -f postgres

# Zaustavi services
docker-compose down

# Obriši sve uključujući volume (baza podataka)
docker-compose down -v
```

## 🔧 Vercel Deployment

### Setup na Vercel

1. **Povežite repositorij sa Vercel-om:**
   - Idi na https://vercel.com/import
   - Odaberi GitHub repositorij

2. **Postavite Environment Variables:**
   - Idi u Project Settings > Environment Variables
   - Dodaj `DATABASE_URL` sa vašom PostgreSQL connection stringom
   - Dodaj bilo koji drugi .env varijable po potrebi

3. **PostgreSQL baza na proizvodnji:**
   - Koristi Vercel PostgreSQL (preporučeno) ili vanjsku uslugu (Render, AWS RDS, itd.)
   - Format: `postgresql://user:password@host:port/database`

4. **Deploy:**
   - Vercel će automatski pokrenuti build i migracije
   - Build command: `npm run build`
   - Start command: `npm start`

## 📁 Struktura Projekta

```
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # React komponente
│   └── lib/
│       └── db.ts         # Prisma client i helper funkcije
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.mjs          # Seed script
├── docker-compose.yml    # Docker PostgreSQL setup
├── Dockerfile            # Production Docker image
├── vercel.json           # Vercel deployment config
└── next.config.ts        # Next.js config
```

## 🔐 Sigurnost

- **Nikada** commituj `.env` fajlove
- Koristiti `.env.local` za lokalni razvoj
- Environment varijable se postavljaju na Vercel dashboard-u
- Sve osjetljive informacije trebale biti u environment varijablama

## 🐛 Troubleshooting

### PostgreSQL dostupan?
```bash
docker-compose ps
```

### Migracije nisu primijenjene?
```bash
npm run prisma:migrate
npm run db:push
```

### Resetuj bazu:
```bash
npm run db:reset
```

### Build greške?
```bash
npm run prisma:generate
npm install
npm run build
```

## 📚 Korisni linkovi

- [Next.js dokumentacija](https://nextjs.org/docs)
- [Prisma dokumentacija](https://www.prisma.io/docs/)
- [Docker dokumentacija](https://docs.docker.com/)
- [Vercel dokumentacija](https://vercel.com/docs)
- [PostgreSQL dokumentacija](https://www.postgresql.org/docs/)

## 🤝 Prilog

Ako imaš problema, provjeri:
1. Docker je pokrenut: `docker ps`
2. PostgreSQL je dostupan: `docker-compose logs`
3. `.env` ima ispravnu DATABASE_URL
4. Sve migracije su primijenjene: `npm run prisma:migrate`
