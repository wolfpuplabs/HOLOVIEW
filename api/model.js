import { put } from '@vercel/blob';
import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // GET: Mengambil daftar model
  if (req.method === 'GET') {
    const { rows } = await sql`SELECT * FROM models ORDER BY created_at DESC;`;
    return res.status(200).json(rows);
  }

  // POST: Menambah model baru
  if (req.method === 'POST') {
    const { name, url } = req.body;
    await sql`INSERT INTO models (name, url) VALUES (${name}, ${url});`;
    return res.status(200).json({ message: 'Success' });
  }
}
