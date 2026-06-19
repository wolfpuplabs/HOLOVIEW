import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false, // Wajib disetel false agar file 3D berukuran megabyte bisa di-stream
  },
};

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const filename = request.headers['x-filename'] || 'asset.glb';
    
    // Otomatis membaca BLOB_READ_WRITE_TOKEN yang sudah terkoneksi di Dashboard Vercel kamu
    const blob = await put(filename, request, {
      access: 'public',
    });

    return response.status(200).json(blob);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
