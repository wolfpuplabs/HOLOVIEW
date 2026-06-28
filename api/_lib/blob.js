// api/_lib/blob.js — make the Blob token discoverable.
//
// The @vercel/blob SDK reads process.env.BLOB_READ_WRITE_TOKEN. If your Blob store
// was created with a custom Environment Variables prefix, the var is named
// "<PREFIX>_READ_WRITE_TOKEN" instead. This finds it and aliases it to the
// standard name so the SDK (and our routes) just work.

export function ensureBlobToken() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return true;
  const key = Object.keys(process.env).find(
    (k) => /READ_WRITE_TOKEN$/.test(k) && process.env[k]
  );
  if (key) {
    process.env.BLOB_READ_WRITE_TOKEN = process.env[key];
    return true;
  }
  return false;
}
