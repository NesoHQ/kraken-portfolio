import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB from '@/lib/db/mongoose';
import Project from '@/lib/db/models/Project';

export async function PATCH(request, { params }) {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const project = await Project.findByIdAndUpdate(id, body, { new: true }).lean();
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
    await Project.findByIdAndDelete(id);
    return successResponse({ deleted: true });
  } catch {
    return errorResponse('Failed to delete', 500);
  }
}
