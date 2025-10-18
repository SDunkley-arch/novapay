// /server/src/routes/niumRoutes.js
import express from "express";
import { getClientTransactions } from "../services/niumService.js";

const router = express.Router();

// Fetch and save transactions
router.get("/transactions", async (req, res) => {
  try {
    const transactions = await getClientTransactions();
    res.status(200).json({
      totalElements: transactions.length,
      content: transactions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
