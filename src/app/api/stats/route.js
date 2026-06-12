import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB, { countDocs } from '@/lib/db/pg';

export async function GET() {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const [totalBlogs, totalMessages, unreadMessages] = await Promise.all([
      countDocs('blogs'),
      countDocs('contacts'),
      countDocs('contacts', `data->>'read' = 'false'`),
    ]);
    return successResponse({ totalBlogs, totalMessages, unreadMessages });
  } catch {
    return errorResponse('Failed to fetch stats', 500);
  }
}
