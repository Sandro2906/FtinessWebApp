import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Re-export User type from Prisma
export type { User } from '@prisma/client'

// All functions must be async now
export async function getUsers() {
    return prisma.user.findMany();
}

export async function getUserByUsername(username: string) {
    return prisma.user.findFirst({
        where: {
            username: {
                equals: username,
            }
        }
    });
}

export async function getUserByEmail(email: string) {
    return prisma.user.findFirst({
        where: {
            email: {
                equals: email,
            }
        }
    });
}

export async function addUser(user: any) {
    return prisma.user.create({
        data: user
    });
}

export async function updateUser(id: string, updatedUser: any) {
    return prisma.user.update({
        where: { id },
        data: updatedUser
    });
}

export async function deleteUser(userId: string) {
    return prisma.user.delete({
        where: { id: userId }
    });
}
