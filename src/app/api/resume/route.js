import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB, { getSingleton, upsertSingleton } from '@/lib/db/pg';

export async function GET() {
  try {
    await connectDB();
    return successResponse(await getSingleton('resume'));
  } catch {
    return errorResponse('Failed to fetch', 500);
  }
}

export async function PUT(request) {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const body = await request.json();
    const resume = await upsertSingleton('resume', body);
    return successResponse(resume);
  } catch (e) {
    return errorResponse(e.message || 'Failed to update', 500);
  }
}
