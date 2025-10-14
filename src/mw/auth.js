import { verifyAccess } from '../auth/tokens.js';

export function requireAuth(req, res, next) {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : req.cookies?.nv_access;
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    const payload = verifyAccess(token);
    req.userId = payload.id;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
