import { NextRequest, NextResponse } from 'next/server';
import { submitFeedbackSchema } from '@/lib/schemas';
import { saveFeedback } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Server-side Zod validation
    const validationResult = submitFeedbackSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMsg = validationResult.error.errors[0]?.message || 'Invalid feedback data';
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const data = validationResult.data;

    // Save in Supabase or memory store
    await saveFeedback(data, data.token, data.email);

    console.log(`[ANALYTICS EVENT] prototype_feedback_success - Email: ${data.email}, Rating: ${data.rating}`);

    return NextResponse.json({ success: true, message: 'Feedback saved successfully.' });
  } catch (err: any) {
    console.error('API /submit-feedback Error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}
