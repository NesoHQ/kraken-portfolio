import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import { uploadFile } from '@/lib/storage';

export async function POST(request) {
  const auth = await requireAdmin();
  if (auth) return auth;

  try {
    const form   = await request.formData();
    const file   = form.get('file');
    const folder = form.get('folder') || 'uploads';

    if (!file || typeof file === 'string') {
      return errorResponse('No file provided', 400);
    }

    const url = await uploadFile(file, folder);
    return successResponse({ url });
  } catch (e) {
    console.error('[upload] failed:', e.name, e.message, e.$metadata?.httpStatusCode);
    return errorResponse(e.message || 'Upload failed', 500);
  }
}
