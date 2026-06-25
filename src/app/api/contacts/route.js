import { requireAdmin } from '@/lib/api/requireAdmin';
import { successResponse, errorResponse } from '@/lib/api/response';
import connectDB, { findMany, insertDoc } from '@/lib/db/pg';

// Trusted personal/business email providers — blocks disposable/unknown domains
const ALLOWED_DOMAINS = new Set([
  // Google
  'gmail.com', 'googlemail.com',
  // Microsoft
  'outlook.com', 'hotmail.com', 'hotmail.co.uk', 'hotmail.fr', 'live.com',
  'live.co.uk', 'msn.com', 'passport.com',
  // Yahoo
  'yahoo.com', 'yahoo.co.uk', 'yahoo.co.in', 'yahoo.fr', 'yahoo.de',
  'yahoo.es', 'yahoo.it', 'yahoo.ca', 'yahoo.com.au', 'ymail.com',
  // Apple
  'icloud.com', 'me.com', 'mac.com',
  // ProtonMail
  'proton.me', 'protonmail.com', 'pm.me',
  // Zoho
  'zoho.com', 'zohomail.com',
  // Other reputable
  'aol.com', 'aim.com', 'mail.com', 'gmx.com', 'gmx.net', 'gmx.de',
  'tutanota.com', 'tutamail.com', 'tuta.io',
  'fastmail.com', 'fastmail.fm',
  'hey.com',
  'pm.me',
]);

function isAllowedEmail(email) {
  const parts = email.toLowerCase().trim().split('@');
  if (parts.length !== 2) return false;
  return ALLOWED_DOMAINS.has(parts[1]);
}

// Public: submit contact form
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.email || !isAllowedEmail(body.email)) {
      return errorResponse(
        'Please use a verified email provider (Gmail, Outlook, Yahoo, iCloud, ProtonMail, etc.)',
        422
      );
    }

    const contact = await insertDoc('contacts', { read: false, ...body });
    return successResponse(contact, 201);
  } catch (e) {
    return errorResponse(e.message || 'Failed to submit', 500);
  }
}

// Admin: list all submissions with optional filter
export async function GET(request) {
  const auth = await requireAdmin();
  if (auth) return auth;
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const read = searchParams.get('read');
    const q    = searchParams.get('q') || '';

    const clauses = [];
    const params = [];
    if (read === 'false') clauses.push(`data->>'read' = 'false'`);
    if (read === 'true')  clauses.push(`data->>'read' = 'true'`);
    if (q) {
      params.push(`%${q}%`);
      clauses.push(`(data->>'fullname' ILIKE $${params.length} OR data->>'email' ILIKE $${params.length} OR data->>'message' ILIKE $${params.length})`);
    }

    const contacts = await findMany('contacts', {
      where: clauses.join(' AND '),
      params,
      orderBy: 'created_at DESC',
    });
    return successResponse(contacts);
  } catch {
    return errorResponse('Failed to fetch', 500);
  }
}
