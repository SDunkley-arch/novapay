import express from 'express';
import prisma from '../prisma/client.js';
import { requireAuth } from '../mw/auth.js';

const router = express.Router();

router.get('/balances', requireAuth, async (req, res) => {
  const balances = await prisma.balance.findMany({ where: { userId: req.userId } });
  res.json(balances);
});

router.post('/deposit', requireAuth, async (req, res) => {
  const { amount, currency } = req.body;
  const cents = Math.round(Number(amount) * 100);
  await prisma.$transaction([
    prisma.balance.upsert({
      where: { userId_currency: { userId: req.userId, currency } },
      update: { amount: { increment: cents } },
      create: { userId: req.userId, currency, amount: cents }
    }),
    prisma.transaction.create({
      data: { userId: req.userId, kind: 'DEPOSIT', currency, amount: cents }
    })
  ]);
  res.json({ ok: true });
});

export default router;
