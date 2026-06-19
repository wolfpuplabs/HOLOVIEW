import { put } from '@vercel/blob';

// Ganti config Edge ke config buat matiin bodyParser
export const config = {
  api: {
    bodyParser: false, // Wajib dimatiin biar file 3D-nya masuk utuh sebagai stream
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Di Node.js runtime, ambil parameter dari req.query
  const filename = req.query.filename;

  if (!filename) {
    return res.status(400).json({ error: 'Missing filename parameter' });
  }

  try {
    // req bisa langsung dikirim sebagai stream ke Vercel Blob
    const blob = await put(filename, req, {
      access: 'public',
    });

    return res.status(200).json(blob);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
