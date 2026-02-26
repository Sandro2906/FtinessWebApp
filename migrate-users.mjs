import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting migration...');
    const dataPath = path.join(process.cwd(), 'data', 'users.json');
    if (!fs.existsSync(dataPath)) {
        console.log('No users.json found.');
        return;
    }

    const rawData = fs.readFileSync(dataPath, 'utf8');
    const users = JSON.parse(rawData);

    for (const user of users) {
        try {
            await prisma.user.create({
                data: {
                    id: user.id || undefined,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    age: user.age ? parseInt(user.age) : 0,
                    phone: user.phone || '',
                    avatarUrl: user.avatarUrl || null,
                }
            });
            console.log(`Successfully migrated user: ${user.username}`);
        } catch (error) {
            console.error(`Error migrating user ${user.username}:`, error.message);
        }
    }
    console.log('Migration complete!');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
