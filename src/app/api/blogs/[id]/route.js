import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB, { findById, updateById, deleteById } from '@/lib/db/pg';

export async function GET(_, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const blog = await findById('blogs', id);
    if (!blog) return errorResponse('Not found', 404);
    return successResponse(blog);
  } catch {
    return errorResponse('Failed to fetch blog', 500);
  }
}

export async function PATCH(request, { params }) {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const blog = await updateById('blogs', id, body);
    if (!blog) return errorResponse('Not found', 404);
    return successResponse(blog);
  } catch (e) {
    return errorResponse(e.message || 'Failed to update', 500);
  }
}

export async function DELETE(_, { params }) {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const { id } = await params;
    const blog = await deleteById('blogs', id);
    if (!blog) return errorResponse('Not found', 404);
    return successResponse({ message: 'Deleted' });
  } catch {
    return errorResponse('Failed to delete', 500);
  }
}
