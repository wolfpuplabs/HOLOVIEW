import { put } from '@vercel/blob';
import { sql } from '@vercel/postgres';

export const config = {
  api: { bodyParser: false }, // Penting untuk menangani file upload
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    // Menangani file dari request
    const filename = req.headers['x-vercel-filename'] || 'model.glb';
    const blob = await put(filename, req, { access: 'public' });

    // Menyimpan metadata ke PostgreSQL
    const name = req.headers['x-vercel-model-name'] || 'Model Tanpa Nama';
    await sql`INSERT INTO models (name, url) VALUES (${name}, ${blob.url});`;

    return res.status(200).json({ url: blob.url });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
