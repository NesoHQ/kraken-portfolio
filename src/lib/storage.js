import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

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
