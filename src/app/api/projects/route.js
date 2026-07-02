import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB, { findMany, insertDoc } from '@/lib/db/pg';

export async function GET() {
  try {
    await connectDB();
    const projects = await findMany('projects', {
      orderBy: `(data->>'order')::int ASC NULLS LAST, created_at DESC`,
    });
    return successResponse(projects);
  } catch {
    return errorResponse('Failed to fetch projects', 500);
  }
}

export async function POST(request) {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const body = await request.json();
    const project = await insertDoc('projects', { order: 0, ...body });
    return successResponse(project, 201);
  } catch (e) {
    return errorResponse(e.message || 'Failed to create', 500);
  }
}
