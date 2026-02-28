const { execSync } = require('child_process');

function run(command) {
  console.log(`> ${command}`);
  execSync(command, { stdio: 'inherit' });
}

// generate prisma client always (schema might change even without URL)
run('npx prisma generate');

// only deploy migrations if DATABASE_URL is set
if (process.env.DATABASE_URL && process.env.DATABASE_URL.length) {
  run('npx prisma migrate deploy');
} else {
  console.log('⚠️  DATABASE_URL not provided, skipping migrations');
}

// now build Next.js
run('npx next build');
