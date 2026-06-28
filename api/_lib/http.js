// api/_lib/http.js — robust JSON body reader for Vercel Node functions.

export async function readJson(req) {
  let body = req.body;
  if (body && typeof body === 'object') return body;
  if (typeof body === 'string' && body.length) {
    try { return JSON.parse(body); } catch { return null; }
  }
  try {
    const chunks = [];
    for await (const c of req) chunks.push(typeof c === 'string' ? Buffer.from(c) : c);
    const raw = Buffer.concat(chunks).toString('utf8');
    return raw ? JSON.parse(raw) : {};
  } catch { return null; }
}
