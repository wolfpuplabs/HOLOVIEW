// /api/auth — owner passcode login.
//
// REQUIRED env vars (Vercel -> Settings -> Environment Variables, then redeploy):
//   OWNER_PASSCODE  = the password only you know (gates upload + library)
//   SESSION_SECRET  = any long random string used to sign the login cookie
//
// GET  /api/auth            -> { authed, passcodeConfigured }
// POST /api/auth {login}    -> sets HttpOnly session cookie on correct passcode
// POST /api/auth {logout}   -> clears the cookie

import { isAuthed, sessionCookie, clearCookie, checkPasscode } from './_lib/auth.js';
import { readJson } from './_lib/http.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({
      authed: isAuthed(req),
      passcodeConfigured: !!process.env.OWNER_PASSCODE,
    });
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = await readJson(req);
  if (!body) return res.status(400).json({ error: 'Invalid body' });

  if (body.action === 'logout') {
    res.setHeader('Set-Cookie', clearCookie());
    return res.status(200).json({ authed: false });
  }

  if (body.action === 'login') {
    if (!process.env.OWNER_PASSCODE) {
      return res.status(500).json({ error: 'OWNER_PASSCODE is not set on the server.' });
    }
    if (checkPasscode(body.passcode)) {
      res.setHeader('Set-Cookie', sessionCookie());
      return res.status(200).json({ authed: true });
    }
    return res.status(401).json({ error: 'Wrong passcode' });
  }

  return res.status(400).json({ error: 'Unknown action' });
}
