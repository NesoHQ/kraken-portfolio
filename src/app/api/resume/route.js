import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB from '@/lib/db/mongoose';
import Resume from '@/lib/db/models/Resume';
import { seedResume } from '@/lib/db/seed';

export async function GET() {
  try {
    await connectDB();
    await seedResume();
    const docs = await Resume.find().sort({ updatedAt: -1 }).lean();
    if (docs.length > 1) {
      await Resume.deleteMany({ _id: { $ne: docs[0]._id } });
    }
    return successResponse(docs[0] ?? null);
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
    const resume = await Resume.findOneAndUpdate(
      {},
      { $set: body },
      { new: true, upsert: true, runValidators: false }
    ).lean();
    return successResponse(resume);
  } catch (e) {
    return errorResponse(e.message || 'Failed to update', 500);
  }
}
