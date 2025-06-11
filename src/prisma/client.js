const { PrismaClient } = require('@prisma/client')
// TODO:: see why we do module.exports and how does it differ from the export const / export default and all.
module.exports = new PrismaClient();