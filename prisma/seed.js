import { PrismaClient } from "@prisma/client";
import { seedDefaultAdmin } from "./seeds/index.js";

const prisma = new PrismaClient();

async function main() {
  await seedDefaultAdmin();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
