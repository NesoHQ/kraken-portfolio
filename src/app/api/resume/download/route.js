import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api/requireAdmin';
import connectDB, { getSingleton, query } from '@/lib/db/pg';
import { getDownloadUrl } from '@/lib/storage';

// Public endpoint the "Download Resume" button points at. It records the hit on
// the `about` singleton, then redirects to the actual file in storage — so every
// download is seen by our server instead of going straight to RustFS.
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const about = await getSingleton('about');
    const url = about?.resumeUrl;
    if (!url) {
      return NextResponse.json({ error: 'No resume available' }, { status: 404 });
    }

    // Atomic increment — avoids the read-modify-write race a JS round-trip would have.
    await query(
      `UPDATE about
         SET data = jsonb_set(
               data,
               '{resumeDownloads}',
               (COALESCE((data->>'resumeDownloads')::int, 0) + 1)::text::jsonb
             )
       WHERE id = $1`,
      [about._id]
    );

    // Garage refuses anonymous reads, so redirect to a short-lived signed URL.
    const signedUrl = await getDownloadUrl(url);
    return NextResponse.redirect(signedUrl, 302);
  } catch (e) {
    console.error('[resume/download] failed:', e.name, e.message);
    return NextResponse.json({ error: 'Failed to fetch resume' }, { status: 500 });
  }
}

// Admin-only: reset the download counter back to zero.
export async function POST() {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const about = await getSingleton('about');
    if (!about) return NextResponse.json({ error: 'No about record' }, { status: 404 });
    await query(
      `UPDATE about SET data = jsonb_set(data, '{resumeDownloads}', '0'::jsonb) WHERE id = $1`,
      [about._id]
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to reset' }, { status: 500 });
  }
}
