import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB, { updateById, deleteById } from '@/lib/db/pg';

export async function PATCH(request, { params }) {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const project = await updateById('projects', id, body);
    if (!project) return errorResponse('Not found', 404);
    return successResponse(project);
  } catch (e) {
    return errorResponse(e.message || 'Failed to update', 500);
  }
}

export async function DELETE(request, { params }) {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const { id } = await params;
    await deleteById('projects', id);
    return successResponse({ deleted: true });
  } catch {
    return errorResponse('Failed to delete', 500);
  }
}
