// Derive the allowed image host from the storage URL so it isn't duplicated.
// Next.js loads .env files before evaluating this config.
const storageUrl = process.env.RUSTFS_PUBLIC_URL || process.env.RUSTFS_ENDPOINT;
const storage = storageUrl ? new URL(storageUrl) : null;

const nextConfig = {
  images: {
    remotePatterns: storage
      ? [
          {
            protocol: storage.protocol.replace(':', ''),
            hostname: storage.hostname,
            pathname: '/**',
          },
        ]
      : [],
  },
};

export default nextConfig;
  