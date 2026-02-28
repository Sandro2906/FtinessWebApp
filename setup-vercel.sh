#!/bin/bash
# Automate basic Vercel configuration using Vercel CLI
# Usage: bash setup-vercel.sh

if ! command -v vercel &> /dev/null; then
  echo "❌ Vercel CLI nije instaliran. Instaliraj ga:
       npm i -g vercel"
  exit 1
fi

echo "🔐 Prijava u Vercel (ako već nisi)"
vercel login || exit 1

echo "
📦 Kreiraj Vercel PostgreSQL bazu (opcionalno)"
read -p "Želiš li da automatski kreiraš Vercel PostgreSQL bazu? (y/n): " createDb
if [[ "$createDb" =~ ^[Yy]$ ]]; then
  vercel postgres create nextjsdb --password $(openssl rand -base64 12) || true
  echo "✔ Baza kreirana, provjeri dashboard za connection string"
fi

echo "
🌐 Postavimo environment varijable"
read -p "Unesi vrijednost za DATABASE_URL: " dburl
vercel env add DATABASE_URL "$dburl" production || exit 1

# Add any additional env vars you want here
# vercel env add NEXT_PUBLIC_PAYPAL_CLIENT_ID "your_id" production
# vercel env add SMTP_HOST "smtp.gmail.com" production
# vercel env add SMTP_PORT "587" production
# vercel env add SMTP_USER "user@example.com" production
# vercel env add SMTP_PASS "password" production

echo "
✅ Vercel env varijable postavljene. Pokreni deploy ili pushaj kod.
"
