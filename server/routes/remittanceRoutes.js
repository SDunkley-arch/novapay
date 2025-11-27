import express from "express";
import { z } from "zod";

const router = express.Router();

const wuSchema = z.object({
  recipientName: z.string().min(1),
  recipientAddressLine1: z.string().min(1),
  recipientAddressLine2: z.string().optional().default(""),
  recipientCityOrParish: z.string().min(1),
  recipientCountry: z.string().min(1),
  amount: z.number().positive(),
  currency: z.enum(["JMD", "USD"]),
  purpose: z.enum(["Family Support", "Personal", "Gift", "Other"]),
});

const mgSchema = z.object({
  receiverName: z.string().min(1),
  receiverPhone: z.string().min(1),
  receiverAddressLine1: z.string().min(1),
  receiverAddressLine2: z.string().optional().default(""),
  receiverCityOrParish: z.string().min(1),
  country: z.string().min(1),
  deliveryMethod: z.enum(["Cash Pickup", "Bank Deposit"]),
  amount: z.number().positive(),
  currency: z.enum(["JMD", "USD"]),
});

router.post("/western-union/create", (req, res) => {
  const parsed = wuSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ status: "error", message: "Invalid data" });
  }

  const referenceId = "WU-" + Date.now();
  return res.json({ status: "ok", referenceId });
});

router.post("/moneygram/create", (req, res) => {
  const parsed = mgSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ status: "error", message: "Invalid data" });
  }

  const referenceId = "MG-" + Date.now();
  return res.json({ status: "ok", referenceId });
});

export default router;
