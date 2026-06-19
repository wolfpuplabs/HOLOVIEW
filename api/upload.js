import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const filename = req.query.filename;

  if (!filename) {
    return res.status(400).json({ error: 'Missing filename parameter' });
  }

  try {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    const fileBuffer = Buffer.concat(chunks);

    const blob = await put(filename, fileBuffer, {
      access: 'public',
      // KITA PAKSA MASUKIN TOKENNYA DI SINI
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return res.status(200).json(blob);
  } catch (error) {
    console.error("UPLOAD ERROR DETAILS:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
