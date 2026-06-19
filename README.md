# 3D Asset Library & AR Viewer

Platform sederhana untuk mengunggah file 3D (`.glb` / `.usdz`), menyimpannya menggunakan **Vercel Blob**, dan melihatnya secara langsung dalam bentuk 3D / AR (Augmented Reality) menggunakan Google `<model-viewer>`.

## Cara Menggunakan (Deploy ke Vercel lewat GitHub)

1. Buat repository baru di GitHub kamu.
2. Ekstrak isi file ZIP ini dan commit/push semua filenya ke repository GitHub tersebut.
3. Buka Dashboard Vercel, lalu hubungkan/import repository GitHub tadi.
4. Sebelum klik **Deploy**, buka menu **Environment Variables** di Vercel dan tambahkan token Vercel Blob kamu:
   - Name: `BLOB_READ_WRITE_TOKEN`
   - Value: (Salin token dari tab Storage > Blob milikmu di Vercel)
5. Klik **Deploy**. Selesai!

## Fitur Unggulan
- **Save & Share yang Pintar**: Link "Share" yang dihasilkan bukan link download mentah, melainkan link aplikasi yang jika dibuka orang lain langsung otomatis memuat file 3D tersebut di dalam viewer lengkap dengan tombol AR!
