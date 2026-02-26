#!/bin/bash

echo "🚀 Next.js + PostgreSQL Setup Script"
echo "====================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker nije instaliran. Molim instaliraj Docker sa https://www.docker.com"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Node.js/npm nije instaliran. Molim instaliraj Node.js sa https://nodejs.org"
    exit 1
fi

echo "✅ Docker i Node.js su dostupni"

# Start Docker containers
echo "📦 Pokretanje PostgreSQL kontejnera..."
docker-compose up -d

# Wait for PostgreSQL to be ready
echo "⏳ Čekanje da se PostgreSQL pokrene..."
sleep 10

# Install npm dependencies
echo "📚 Instalacija zavisnosti..."
npm install

# Generate Prisma client
echo "🔧 Generisanje Prisma klijenta..."
npm run prisma:generate

# Run migrations
echo "🗄️  Primjena migracija..."
npm run db:push

# Run seed (optional)
read -p "Želiš li da seeduješ bazu testnim podacima? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run prisma:seed
fi

echo ""
echo "✅ Setup je kompletan!"
echo ""
echo "🎉 Za pokretanje dev servera:"
echo "   npm run dev"
echo ""
echo "📖 Više informacija:"
echo "   Pročitaj DOCKER_SETUP.md"
