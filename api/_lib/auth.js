// api/_lib/auth.js — shared owner-passcode auth helpers.
// Files under _lib are not turned into routes, but can be imported by functions.

import crypto from 'node:crypto';

const COOKIE = 'hv_session';
const MAX_AGE_S = 60 * 60 * 24 * 30; // 30 days

function secret() {
  // Prefer a dedicated secret; fall back to the blob token so signing still works.
  return process.env.SESSION_SECRET || process.env.BLOB_READ_WRITE_TOKEN || 'holoview-dev-secret';
}

export function sign(payload) {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', secret()).update(data).digest('base64url');
  return `${data}.${sig}`;
}

export function verifyToken(token) {
  if (!token || !token.includes('.')) return null;
  const [data, sig] = token.split('.');
  const expect = crypto.createHmac('sha256', secret()).update(data).digest('base64url');
  const a = Buffer.from(sig), b = Buffer.from(expect);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    if (payload.exp && Date.now() > payload.exp) return null;
    return payload;
  } catch { return null; }
}

export function parseCookies(req) {
  const out = {};
  const h = (req.headers && req.headers.cookie) || '';
  h.split(';').forEach((p) => {
    const i = p.indexOf('=');
    if (i > -1) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
}

export function isAuthed(req) {
  return !!verifyToken(parseCookies(req)[COOKIE]);
}

export function sessionCookie() {
  const token = sign({ role: 'owner', exp: Date.now() + MAX_AGE_S * 1000 });
  return `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${MAX_AGE_S}`;
}

export function clearCookie() {
  return `${COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

export function checkPasscode(input) {
  const real = process.env.OWNER_PASSCODE || '';
  if (!real || input == null) return false;
  const a = Buffer.from(String(input)), b = Buffer.from(real);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// Per-deployment, non-guessable storage path for the owner's library index.
export function libraryKey() {
  const h = crypto.createHash('sha256').update(secret()).digest('hex').slice(0, 16);
  return `library/owner-${h}.json`;
}
