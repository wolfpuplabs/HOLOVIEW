import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false, // Wajib false biar file .glb/.usdz gak rusak saat di-upload
  },
};

export default async function handler(req, res) {
  // Hanya menerima request POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const filename = req.query.filename;

  if (!filename) {
    return res.status(400).json({ error: 'Missing filename parameter' });
  }

  try {
    // 1. Kumpulin potongan data (stream) file jadi Buffer utuh
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    const fileBuffer = Buffer.concat(chunks);

    // 2. Upload langsung ke Vercel Blob dengan menembak token secara manual
    const blob = await put(filename, fileBuffer, {
      access: 'public',
      // PENTING: Ganti teks di bawah ini dengan TOKEN ASLI lu dari Vercel Blob!
      // Pastikan tanda kutip duanya (" ") jangan dihapus ya bang.
      token: "vercel_blob_rw_JhKUcWxykmaQt49w_AV0y2cfxmBFShDPiJI4u3DysBBCh4F",
    });

    // 3. Kembalikan response sukses beserta URL file 3D-nya
    return res.status(200).json(blob);
  } catch (error) {
    // Menampilkan error asli di console log Vercel jika gagal
    console.error("UPLOAD ERROR DETAILS:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
