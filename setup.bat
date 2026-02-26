@echo off
REM Next.js + PostgreSQL Setup Script for Windows

echo 🚀 Next.js + PostgreSQL Setup Script
echo =====================================

REM Check if Docker is installed
where docker >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Docker nije instaliran. Molim instaliraj Docker sa https://www.docker.com
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js/npm nije instaliran. Molim instaliraj Node.js sa https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Docker i Node.js su dostupni

REM Start Docker containers
echo 📦 Pokretanje PostgreSQL kontejnera...
docker-compose up -d

REM Wait for PostgreSQL to be ready
echo ⏳ Čekanje da se PostgreSQL pokrene (30 sekundi)...
timeout /t 30 /nobreak

REM Install npm dependencies
echo 📚 Instalacija zavisnosti...
call npm install

REM Generate Prisma client
echo 🔧 Generisanje Prisma klijenta...
call npm run prisma:generate

REM Run migrations
echo 🗄️  Primjena migracija...
call npm run db:push

REM Run seed (optional)
setlocal enabledelayedexpansion
set /p seedChoice="Želiš li da seeduješ bazu testnim podacima? (y/n): "
if /i "!seedChoice!"=="y" (
    call npm run prisma:seed
)

echo.
echo ✅ Setup je kompletan!
echo.
echo 🎉 Za pokretanje dev servera:
echo    npm run dev
echo.
echo 📖 Više informacija:
echo    Pročitaj DOCKER_SETUP.md
echo.
pause
