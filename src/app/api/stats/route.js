import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB, { countDocs, getSingleton } from '@/lib/db/pg';

export async function GET() {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const [totalBlogs, totalMessages, unreadMessages, about] = await Promise.all([
      countDocs('blogs'),
      countDocs('contacts'),
      countDocs('contacts', `data->>'read' = 'false'`),
      getSingleton('about'),
    ]);
    return successResponse({
      totalBlogs,
      totalMessages,
      unreadMessages,
      resumeDownloads: about?.resumeDownloads ?? 0,
    });
  } catch {
    return errorResponse('Failed to fetch stats', 500);
  }
}
