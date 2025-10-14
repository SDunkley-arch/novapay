import express from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../prisma/client.js';
import { signAccess } from '../auth/tokens.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hash } });
  res.json({ id: user.id, email: user.email });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: 'Invalid credentials' });

  const token = signAccess({ id: user.id });
  res
    .cookie('nv_access', token, { httpOnly: true })
    .json({ token, user: { id: user.id, email: user.email } });
});

export default router;
