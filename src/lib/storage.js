import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const client = new S3Client({
  endpoint:        process.env.RUSTFS_ENDPOINT,
  region:          process.env.RUSTFS_REGION || 'us-east-1',
  credentials: {
    accessKeyId:     process.env.RUSTFS_ACCESS_KEY,
    secretAccessKey: process.env.RUSTFS_SECRET_KEY,
  },
  forcePathStyle: true, // required for non-AWS S3-compatible stores
});

const BUCKET  = process.env.RUSTFS_BUCKET  || 'portfolio';
const PUB_URL = process.env.RUSTFS_PUBLIC_URL || process.env.RUSTFS_ENDPOINT;

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'application/pdf'];
const MAX_BYTES = 5 * 1024 * 1024;       // 5 MB for images
const MAX_BYTES_PDF = 10 * 1024 * 1024;  // 10 MB for PDFs (resumes)

/**
 * Upload a Web API File to RustFS.
 * @param {File} file
 * @param {string} folder  e.g. 'blogs' | 'projects'
 * @returns {Promise<string>} public URL
 */
export async function uploadFile(file, folder = 'uploads') {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(`File type not allowed. Use: ${ALLOWED_TYPES.join(', ')}`);
  }
  const limit = file.type === 'application/pdf' ? MAX_BYTES_PDF : MAX_BYTES;
  if (file.size > limit) {
    throw new Error(`File too large. Max ${limit / 1024 / 1024} MB.`);
  }

  const ext      = file.name.split('.').pop().toLowerCase();
  const key      = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
  const buffer   = Buffer.from(await file.arrayBuffer());

  await client.send(new PutObjectCommand({
    Bucket:      BUCKET,
    Key:         key,
    Body:        buffer,
    ContentType: file.type,
    ContentDisposition: 'inline',
  }));

  return `${PUB_URL}/${BUCKET}/${key}`;
}

/**
 * Turn a stored public URL into a short-lived presigned GET URL.
 * Garage (and most S3-compatible stores) refuse anonymous reads, so files are
 * served via signed URLs instead of relying on a public bucket.
 * @param {string} storedUrl  the URL returned by uploadFile()
 * @param {number} expiresIn  seconds the link stays valid (default 5 min)
 * @returns {Promise<string>} presigned URL
 */
export async function getDownloadUrl(storedUrl, expiresIn = 300) {
  // Strip the public-URL/bucket prefix to recover the object key.
  const prefix = `${PUB_URL}/${BUCKET}/`;
  const key = storedUrl.startsWith(prefix)
    ? storedUrl.slice(prefix.length)
    : new URL(storedUrl).pathname.replace(/^\/+/, '').replace(new RegExp(`^${BUCKET}/`), '');

  return getSignedUrl(client, new GetObjectCommand({ Bucket: BUCKET, Key: key }), { expiresIn });
}
