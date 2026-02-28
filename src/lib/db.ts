import { PrismaClient, User } from '@prisma/client'

// decide whether to rely on a real database or use in-memory fallback
const hasDatabaseUrl = Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.length)

const globalForPrisma = global as unknown as { prisma?: PrismaClient }

export const prisma = hasDatabaseUrl
  ? globalForPrisma.prisma || new PrismaClient()
  : null

if (hasDatabaseUrl && process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma!
}

// Re-export User type from Prisma (used for typings only)
export type { User }

// simple in-memory store used when no database URL is provided
const memoryUsers: User[] = []

// helper to generate uuid (prisma normally does it for us)
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15)
}

// All functions must be async now
export async function getUsers() {
    if (hasDatabaseUrl && prisma) {
        return prisma.user.findMany();
    }
    return memoryUsers;
}

export async function getUserByUsername(username: string) {
    if (hasDatabaseUrl && prisma) {
        return prisma.user.findFirst({
            where: { username: { equals: username } }
        });
    }
    return memoryUsers.find(u => u.username === username) || null;
}

export async function getUserByEmail(email: string) {
    if (hasDatabaseUrl && prisma) {
        return prisma.user.findFirst({
            where: { email: { equals: email } }
        });
    }
    return memoryUsers.find(u => u.email === email) || null;
}

export async function addUser(user: any) {
    if (hasDatabaseUrl && prisma) {
        return prisma.user.create({ data: user });
    }
    const newUser: User = {
        ...user,
        id: generateId(),
        createdAt: new Date(),
    } as any;
    memoryUsers.push(newUser);
    return newUser;
}

export async function updateUser(id: string, updatedUser: any) {
    if (hasDatabaseUrl && prisma) {
        return prisma.user.update({ where: { id }, data: updatedUser });
    }
    const idx = memoryUsers.findIndex(u => u.id === id);
    if (idx === -1) return null;
    memoryUsers[idx] = { ...memoryUsers[idx], ...updatedUser } as User;
    return memoryUsers[idx];
}

export async function deleteUser(userId: string) {
    if (hasDatabaseUrl && prisma) {
        return prisma.user.delete({ where: { id: userId } });
    }
    const idx = memoryUsers.findIndex(u => u.id === userId);
    if (idx === -1) return null;
    const [removed] = memoryUsers.splice(idx, 1);
    return removed;
}
