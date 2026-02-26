import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Check if users already exist
  const existingUsers = await prisma.user.count();
  
  if (existingUsers > 0) {
    console.log('✅ Users already exist, skipping seed');
    return;
  }

  // Create test users
  const testUsers = [
    {
      username: 'testuser',
      email: 'test@example.com',
      password: crypto.createHash('sha256').update('password123').digest('hex'),
      age: 25,
      phone: '+381600000000',
    },
    {
      username: 'admin',
      email: 'admin@example.com',
      password: crypto.createHash('sha256').update('admin123').digest('hex'),
      age: 30,
      phone: '+381600000001',
    },
  ];

  for (const user of testUsers) {
    const created = await prisma.user.create({
      data: user,
    });
    console.log(`✅ Created user: ${created.username}`);
  }

  console.log('✅ Database seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
