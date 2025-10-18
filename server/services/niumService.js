// /server/src/services/niumService.js
import axios from "axios";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const prisma = new PrismaClient();

// Axios instance for Nium API
const niumApi = axios.create({
  baseURL: process.env.NIUM_BASE_URL, // e.g. https://sandbox.nium.com/api
  headers: {
    "x-api-key": process.env.NIUM_API_KEY,
    "x-client-id": process.env.NIUM_CLIENT_ID,
    "Content-Type": "application/json",
  },
});


// 1️⃣ Get Client Transactions (Fetch + Store in DB)
export async function getClientTransactions() {
  try {
    console.log("🔹 Fetching transactions from Nium...");

    const res = await niumApi.get(`/v1/client/${process.env.NIUM_CLIENT_ID}/transactions`);
    const transactions = res.data.content || [];

    // Store or update transactions in PostgreSQL
    for (const tx of transactions) {
      await prisma.transaction.upsert({
        where: { transactionId: tx.authCode || "unknown" },
        update: {
          amount: tx.authAmount || 0,
          currency: tx.authCurrencyCode || "USD",
          status: tx.authResponseCode || "PENDING",
        },
        create: {
          transactionId: tx.authCode || "unknown",
          amount: tx.authAmount || 0,
          currency: tx.authCurrencyCode || "USD",
          status: tx.authResponseCode || "PENDING",
        },
      });
    }

    console.log(`✅ Synced ${transactions.length} transactions to DB`);
    return res.data;

  } catch (err) {
    console.error("❌ Nium Error:", err.response?.data || err.message);
    throw new Error("Failed to fetch or sync transactions from Nium API");
  }
}


// 2️⃣ Example: Create Payout (For later testing)
export async function createPayout(payload) {
  try {
    console.log("🔹 Creating Nium payout...");
    const res = await niumApi.post(`/v1/payouts`, payload);

    console.log("✅ Payout successful:", res.data);
    return res.data;

  } catch (err) {
    console.error("❌ Nium Payout Error:", err.response?.data || err.message);
    throw new Error("Failed to create Nium payout");
  }
}