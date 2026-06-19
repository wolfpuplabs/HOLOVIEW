import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // Hanya izinkan metode GET untuk mengambil data
  if (req.method === 'GET') {
    try {
      const { rows } = await sql`SELECT * FROM models ORDER BY created_at DESC;`;
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  return res.status(405).json({ message: 'Method not allowed' });
}
