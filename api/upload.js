import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false, // Tetep matiin biar file 3D nggak rusak
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
    // 1. Kumpulin potongan file-nya jadi satu kesatuan (Buffer)
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    const fileBuffer = Buffer.concat(chunks);

    // 2. Upload Buffer yang udah utuh ke Vercel Blob
    const blob = await put(filename, fileBuffer, {
      access: 'public',
    });

    return res.status(200).json(blob);
  } catch (error) {
    // 3. Tulis error aslinya ke log Vercel biar nggak nebak-nebak lagi
    console.error("UPLOAD ERROR DETAILS:", error);
    return res.status(500).json({ error: error.message });
  }
}
