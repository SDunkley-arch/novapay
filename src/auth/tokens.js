import jwt from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

export const signAccess = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

export const verifyAccess = (token) => jwt.verify(token, JWT_SECRET);
