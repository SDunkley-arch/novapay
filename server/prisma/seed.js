import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("password", 10);
  await prisma.user.upsert({
    where: { email: "demo@novapay.app" },
    update: {},
    create: {
      email: "demo@novapay.app",
      password: hash,
      balance: { create: { jmd: 12500000, usd: 18000 } }
    }
  });
  console.log("Seed complete");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
