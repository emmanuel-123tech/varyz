import { NextRequest, NextResponse } from 'next/server';
import { validateAccessToken } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tokenStr = searchParams.get('token') || '';

    if (!tokenStr) {
      return NextResponse.json({ isValid: false }, { status: 400 });
    }

    const result = await validateAccessToken(tokenStr);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('API /validate-token Error:', err);
    return NextResponse.json({ isValid: false }, { status: 500 });
  }
}
