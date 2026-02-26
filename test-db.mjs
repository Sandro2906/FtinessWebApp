import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "file:./dev.db"
        }
    }
});

async function main() {
    try {
        const users = await prisma.user.findMany();
        console.log('Success!', users.length);
    } catch (error) {
        console.error('-------ERROR MESSAGE---------');
        console.error(error.message);
        console.error('-----------------------------');
    } finally {
        await prisma.$disconnect();
    }
}

main();
