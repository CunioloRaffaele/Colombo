const { PrismaClient } = require('../prisma/generated/prisma');
// migrated prisma to automate database schema changes
// const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma;