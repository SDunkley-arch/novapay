import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const db = new PrismaClient();

app.use(cors());
app.use(express.json());

const sign = (user) =>
  jwt.sign({ id: user.id }, process.env.JWT_SECRET || "devsecret", { expiresIn: "7d" });

const auth = (req, res, next) => {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token) return res.status(401).json({ error: { code: "NO_AUTH" } });
  try { req.user = jwt.verify(token, process.env.JWT_SECRET || "devsecret"); next(); }
  catch { return res.status(401).json({ error: { code: "BAD_AUTH" } }); }
};

app.get("/health", (_req, res) => res.json({ ok: true }));

// Add root route for direct access
app.get("/", (_req, res) => res.json({
  message: "NovaPay API Server",
  version: "1.0.0",
  endpoints: {
    health: "GET /health",
    auth: "POST /auth/register, POST /auth/login",
    wallet: "GET /wallet/balances, GET /wallet/transactions",
    transfers: "POST /transfers/p2p",
    bills: "POST /bills/pay"
  },
  status: "running"
}));

app.post("/auth/register", async (req, res) => {
  const v = z.object({ email: z.string().email(), password: z.string().min(4) }).safeParse(req.body);
  if (!v.success) return res.status(400).json({ error: { code: "BAD_INPUT" } });
  const { email, password } = v.data;

  const exists = await db.user.findUnique({ where: { email } });
  if (exists) return res.status(409).json({ error: { code: "EXISTS" } });

  const hash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { email, password: hash, balance: { create: {} } },
    include: { balance: true }
  });

  return res.json({ token: sign(user), user: { id: user.id, email: user.email } });
});

app.post("/auth/login", async (req, res) => {
  const v = z.object({ email: z.string().email(), password: z.string().min(4) }).safeParse(req.body);
  if (!v.success) return res.status(400).json({ error: { code: "BAD_INPUT" } });
  const { email, password } = v.data;

  const user = await db.user.findUnique({ where: { email }, include: { balance: true } });
  if (!user) return res.status(400).json({ error: { code: "NO_USER" } });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ error: { code: "BAD_CRED" } });

  return res.json({ token: sign(user), user: { id: user.id, email: user.email } });
});

app.get("/wallet/balances", auth, async (req, res) => {
  const me = await db.user.findUnique({ where: { id: req.user.id }, include: { balance: true } });
  return res.json({ JMD: me.balance.jmd, USD: me.balance.usd });
});

const port = Number(process.env.PORT || 4000);
const host = process.env.HOST || "0.0.0.0";
app.listen(port, host, () => console.log(`API listening on http://${host}:${port}`));
// wallet: transactions
app.get("/wallet/transactions", auth, async (req, res) => {
  const txs = await db.transaction.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" },
    take: 50
  });
  res.json(txs);
});
const toCents = (n) => Math.round(Number(n) * 100);

app.post("/transfers/p2p", auth, async (req, res) => {
  const { toEmail, amount, currency, note } = req.body || {};
  if (!toEmail || !amount || !currency) return res.status(400).json({ error: { code: "BAD_INPUT" } });

  const amt = typeof amount === "string" ? toCents(amount) : Math.round(amount);
  if (!["JMD", "USD"].includes(currency)) return res.status(400).json({ error: { code: "BAD_CURRENCY" } });

  const sender = await db.user.findUnique({ where: { id: req.user.id }, include: { balance: true } });
  const receiver = await db.user.findUnique({ where: { email: toEmail }, include: { balance: true } });
  if (!receiver) return res.status(400).json({ error: { code: "NO_RECIPIENT" } });

  const key = currency.toLowerCase(); // "jmd" | "usd"
  if (sender.balance[key] < amt) return res.status(400).json({ error: { code: "INSUFFICIENT" } });

  await db.balance.update({ where: { userId: sender.id }, data: { [key]: sender.balance[key] - amt } });
  await db.balance.update({ where: { userId: receiver.id }, data: { [key]: receiver.balance[key] + amt } });

  await db.transaction.create({ data: { userId: sender.id, kind: "P2P_SEND", amount: amt, currency, note } });
  await db.transaction.create({ data: { userId: receiver.id, kind: "P2P_RECV", amount: amt, currency, note } });

  const updated = await db.user.findUnique({ where: { id: sender.id }, include: { balance: true } });
  res.json({ balances: { JMD: updated.balance.jmd, USD: updated.balance.usd } });
});
app.post("/bills/pay", auth, async (req, res) => {
  const { billerId, accountRef, amount, currency } = req.body || {};
  if (!billerId || !accountRef || !amount || !currency) return res.status(400).json({ error: { code: "BAD_INPUT" } });

  const amt = typeof amount === "string" ? toCents(amount) : Math.round(amount);
  if (!["JMD", "USD"].includes(currency)) return res.status(400).json({ error: { code: "BAD_CURRENCY" } });

  const me = await db.user.findUnique({ where: { id: req.user.id }, include: { balance: true } });
  const key = currency.toLowerCase();
  if (me.balance[key] < amt) return res.status(400).json({ error: { code: "INSUFFICIENT" } });

  await db.balance.update({ where: { userId: me.id }, data: { [key]: me.balance[key] - amt } });
  await db.transaction.create({ data: { userId: me.id, kind: "BILL", amount: amt, currency, note: `BILL:${billerId}:${accountRef}` } });

  const updated = await db.user.findUnique({ where: { id: me.id }, include: { balance: true } });
  res.json({ balances: { JMD: updated.balance.jmd, USD: updated.balance.usd } });
});
