import { NextRequest, NextResponse } from 'next/server';
import { requestAccessSchema } from '@/lib/schemas';
import { checkRateLimit } from '@/lib/rate-limit';
import { processAccessRequest } from '@/lib/supabase';
import { sendPrototypeAccessEmail } from '@/lib/resend';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Server-side rate limit check (max 5 requests per 15 minutes per IP)
    const rateLimit = checkRateLimit(ip, 5, 15 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many prototype access requests. Please try again in a few minutes.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Spam Honeypot Check
    if (body.honeypot && body.honeypot.trim() !== '') {
      // Quietly return success to confuse spam bots
      return NextResponse.json({ success: true, message: 'Request received.' });
    }

    // Server-side Zod validation
    const validationResult = requestAccessSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMsg = validationResult.error.errors[0]?.message || 'Invalid form input';
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const formData = validationResult.data;

    // Database operation (Supabase or Memory fallback)
    const { tokenRecord, isExisting } = await processAccessRequest(formData, ip);

    // Build absolute prototype link URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const prototypeUrl = `${baseUrl}/prototype?token=${encodeURIComponent(tokenRecord.token)}`;

    // Dispatch email via Resend
    const firstName = formData.fullName.split(' ')[0] || formData.fullName;
    await sendPrototypeAccessEmail({
      email: formData.email,
      firstName,
      prototypeUrl,
    });

    // Analytics event logging
    console.log(`[ANALYTICS EVENT] prototype_request_success - Email: ${formData.email}, Role: ${formData.role}, IsExisting: ${isExisting}`);

    return NextResponse.json({
      success: true,
      message: 'Your prototype access is on its way. Check your email for your private link.',
      prototypeUrl,
      isExisting,
    });
  } catch (err: any) {
    console.error('API /request-access Error:', err);
    return NextResponse.json(
      { error: err.message || 'Server error processing prototype request' },
      { status: 500 }
    );
  }
}
