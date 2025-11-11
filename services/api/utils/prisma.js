const { PrismaClient } = require('../prisma/generated/prisma');
// migrated prisma to automate database schema changes
// const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function connectWithRetry(retries = 50, delay = 2000) {
    for (let i = 0; i < retries; i++) {
        try {
            await prisma.$connect();
            console.log('Prisma DB connected');
            return;
        } catch (err) {
            console.error(`Prisma DB connection error (tried ${i + 1}):`, err.message);
            if (i < retries - 1) await new Promise(res => setTimeout(res, delay));
            else process.exit(1);
        }
    }
}

connectWithRetry();

module.exports = prisma;