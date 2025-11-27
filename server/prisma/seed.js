import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

dotenv.config();
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting NovaPay seed...");

  // Hash passwords for test users
  const hashedPassword1 = await bcrypt.hash('Password123!', 10);
  const hashedPassword2 = await bcrypt.hash('User2Pass!', 10);
  const hashedPassword3 = await bcrypt.hash('Merchant@Nova!', 10);

  // Create Users
  const users = await prisma.user.createMany({
    data: [
      { email: 'thalila@novapay.com', password: hashedPassword1 },
      { email: 'user2@novapay.com', password: hashedPassword2 },
      { email: 'merchant@novapay.com', password: hashedPassword3 },
    ],
  });
  console.log(`✅ Created ${users.count} users`);

  // Fetch users for relationships
  const user1 = await prisma.user.findUnique({ where: { email: 'thalila@novapay.com' } });
  const user2 = await prisma.user.findUnique({ where: { email: 'user2@novapay.com' } });
  const user3 = await prisma.user.findUnique({ where: { email: 'merchant@novapay.com' } });

  // Create Balances
  await prisma.balance.createMany({
    data: [
      { jmd: 12500000, usd: 18000, userId: user1.id },
      { jmd: 8900000, usd: 15000, userId: user2.id },
      { jmd: 23000000, usd: 38000, userId: user3.id },
    ],
  });
  console.log("💰 Balances assigned");

  // Create Transactions
  await prisma.transaction.createMany({
    data: [
      {
        kind: 'P2P_SEND',
        amount: 50000,
        currency: 'JMD',
        note: 'Sent to user2',
        userId: user1.id,
      },
      {
        kind: 'P2P_RECV',
        amount: 50000,
        currency: 'JMD',
        note: 'Received from Thalila',
        userId: user2.id,
      },
      {
        kind: 'TOPUP',
        amount: 20000,
        currency: 'USD',
        note: 'Wallet Top-up',
        userId: user3.id,
      },
    ],
  });
  console.log("💸 Transactions created");

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });