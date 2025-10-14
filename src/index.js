import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js';
import walletRoutes from './routes/wallet.js';
import transferRoutes from './routes/transfers.js';
import billRoutes from './routes/bills.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));

app.get('/', (req, res) => {
  res.send('<h2>NovaPay Backend Running 🚀</h2><p>Try <a href="/health">/health</a> or <a href="/auth/register">/auth/register</a></p>');
});

app.get('/health', (req, res) => res.send('NovaPay API up ✅'));

app.use('/auth', authRoutes);
app.use('/wallet', walletRoutes);
app.use('/transfers', transferRoutes);
app.use('/bills', billRoutes);

const PORT = process.env.PORT || 5000;
console.log("JWT Secret exists:", !!process.env.JWT_SECRET);
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
