export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Membaca nama file yang dikirim dari browser header
    const filename = request.headers['x-filename'] || `${Date.now()}_model.glb`;

    // Berkomunikasi dengan REST Vercel Blob untuk meminta Presigned Upload URL
    const vercelResponse = await fetch(`https://blob.vercel-storage.com/${filename}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
        'x-api-version': '1',
        'x-add-random-suffix': 'true' // Menghindari duplikasi nama file antar user
      }
    });

    if (!vercelResponse.ok) {
      const errText = await vercelResponse.text();
      throw new Error(`Vercel Storage Refused: ${errText}`);
    }

    const data = await vercelResponse.json();
    
    // Kirim Presigned URL ke browser client
    return response.status(200).json({
      uploadUrl: data.url,
      publicUrl: data.url.split('?')[0] // URL bersih tanpa query string
    });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
