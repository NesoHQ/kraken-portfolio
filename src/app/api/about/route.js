import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB, { getSingleton, upsertSingleton } from '@/lib/db/pg';
import { seedAbout } from '@/lib/db/seed';

export async function GET() {
  try {
    await connectDB();
    await seedAbout();
    return successResponse(await getSingleton('about'));
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
    const about = await upsertSingleton('about', body);
    return successResponse(about);
  } catch (e) {
    return errorResponse(e.message || 'Failed to update', 500);
  }
}
