// This script seeds the database with mock users and request logs for testing purposes.
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create mock users
  const users = await prisma.user.createMany({
    data: [
      { email: "alice@example.com", password: "password123", role: "ADMIN" },
      { email: "bob@example.com", password: "password123", role: "USER" },
      { email: "carol@example.com", password: "password123", role: "USER" },
    ],
    skipDuplicates: true,
  });

  // Fetch users to get their IDs
  const allUsers = await prisma.user.findMany();
  for (const user of allUsers) {
    await prisma.requestLog.create({
      data: {
        userId: user.id,
        endpoint: "/users",
        method: "GET",
        status: 200,
        responseMs: Math.floor(Math.random() * 100) + 50,
      },
    });
  }

  console.log("Mock data seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
