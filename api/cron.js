import { list, del } from '@vercel/blob';

export default async function handler(req, res) {
  try {
    // 1. Ambil daftar semua file 3D yang ada di Blob lu
    const { blobs } = await list({
      // PENTING: Pake Token Public yang sama persis kayak di file upload.js lu!
      token: "vercel_blob_rw_DW3PeSQBB9lRlBSa_GbQu9wnSMPtdUUIVS71ewDCU9bPEHZ",
    });

    const now = new Date();
    let deletedCount = 0;

    // 2. Cek umur file satu-satu
    for (const blob of blobs) {
      const uploadedAt = new Date(blob.uploadedAt);
      const diffHours = (now - uploadedAt) / (1000 * 60 * 60);

      // 3. Kalau umurnya udah lebih dari 24 jam, hapus!
      if (diffHours > 24) {
        await del(blob.url, {
          token: "vercel_blob_rw_DW3PeSQBB9lRlBSa_GbQu9wnSMPtdUUIVS71ewDCU9bPEHZ", // Pake Token Public lu
        });
        deletedCount++;
      }
    }

    return res.status(200).json({ 
      status: "Pembersihan selesai!", 
      fileDihapus: deletedCount 
    });
  } catch (error) {
    console.error("CRON ERROR DETAILS:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
