import { PrismaClient } from '@prisma/client';

const globalPrisma = global as unknown as { prisma?: PrismaClient };

/**
 * The `prisma` variable is an instance of `PrismaClient` used for database interactions.
 *
 * It is initialized with specific logging configurations.
 *
 * If a global instance of `PrismaClient` already exists (`globalPrisma.prisma`), this
 * existing instance will be used instead of creating a new one.
 *
 * Configuration:
 * - `log: ['query']`: Enables logging of all Prisma queries.
 *
 * This setup helps in debugging and monitoring database queries.
 */
export const prisma = globalPrisma.prisma ||
    new PrismaClient({
      log: ['query'],
    })

if (process.env.NODE_ENV !== 'production') globalPrisma.prisma = prisma;