import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB, { findMany, countDocs, insertDoc } from '@/lib/db/pg';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page  = Math.max(1, parseInt(searchParams.get('page')  || '1'));
    const limit = Math.min(50, parseInt(searchParams.get('limit') || '20'));
    const q     = searchParams.get('q') || '';

    // Loose, case-insensitive search across title, category and tags.
    let where = '';
    let params = [];
    if (q) {
      where = `(data->>'title' ILIKE $1 OR data->>'category' ILIKE $1 OR (data->'tags')::text ILIKE $1)`;
      params = [`%${q}%`];
    }

    const [items, total] = await Promise.all([
      findMany('blogs', {
        where, params,
        orderBy: 'created_at DESC',
        limit, offset: (page - 1) * limit,
        omit: 'content',
      }),
      countDocs('blogs', where, params),
    ]);

    return successResponse({ items, total, page, pages: Math.ceil(total / limit) });
  } catch {
    return errorResponse('Failed to fetch blogs', 500);
  }
}

export async function POST(request) {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const body = await request.json();
    const blog = await insertDoc('blogs', body);
    return successResponse(blog, 201);
  } catch (e) {
    return errorResponse(e.message || 'Failed to create blog', 500);
  }
}
