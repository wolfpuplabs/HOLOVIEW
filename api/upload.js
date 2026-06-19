export const config = {
  api: { bodyParser: false }, // Wajib false agar file biner 3D tidak korup
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Ambil token aman dari environment Vercel
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) {
      throw new Error("Sistem Gagal: BLOB_READ_WRITE_TOKEN tidak ditemukan di Vercel Dashboard.");
    }

    // 2. Ambil dan bersihkan nama file
    let filename = req.headers['x-filename'] || 'model.glb';
    filename = decodeURIComponent(filename).replace(/[^a-zA-Z0-9.-]/g, '_');
    filename = `${Date.now()}_${filename}`;

    // 3. Kumpulkan pecahan file dari frontend ke dalam RAM (Buffer)
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const fileBuffer = Buffer.concat(chunks);

    // 4. Tembak langsung ke REST API Vercel Blob tanpa module tambahan
    const vercelRes = await fetch(`https://blob.vercel-storage.com/${filename}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-api-version': '7',
        'Content-Type': 'application/octet-stream',
      },
      body: fileBuffer
    });

    if (!vercelRes.ok) {
      const errText = await vercelRes.text();
      throw new Error(`Vercel Blob Menolak: ${errText}`);
    }

    const data = await vercelRes.json();
    
    // 5. Kembalikan URL publik ke browser
    return res.status(200).json({ url: data.url });

  } catch (error) {
    console.error("Upload API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
