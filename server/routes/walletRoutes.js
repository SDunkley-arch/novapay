// server/src/routes/walletRoutes.js
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

/**
 * @route GET /api/wallet/balance/:userId
 * @desc  Returns a user's wallet balance.
 *        If no balance record exists, creates one with 0 JMD / 0 USD.
 */
router.get("/balance/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || isNaN(userId)) {
      return res.status(400).json({ error: "Invalid userId parameter." });
    }

    // Try to find the balance for this user
    let balance = await prisma.balance.findUnique({
      where: { userId: Number(userId) },
      include: {
        user: {
          select: { id: true, email: true, createdAt: true },
        },
      },
    });

    // If no balance exists, create an empty one
    if (!balance) {
      balance = await prisma.balance.create({
        data: {
          userId: Number(userId),
          jmd: 0,
          usd: 0,
        },
        include: {
          user: {
            select: { id: true, email: true, createdAt: true },
          },
        },
      });
      console.log(`💰 Created new empty balance record for user ${userId}`);
    }

    // Return a formatted response
    res.status(200).json({
      user: balance.user,
      balances: {
        JMD: (balance.jmd / 100).toFixed(2),
        USD: (balance.usd / 100).toFixed(2),
      },
    });
  } catch (err) {
    console.error("❌ Error fetching or creating balance:", err);
    res.status(500).json({
      error: "Internal Server Error",
      details: err.message,
    });
  }
});

export default router;