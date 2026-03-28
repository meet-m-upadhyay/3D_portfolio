import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendNotificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Save to Supabase — use service role key to bypass RLS (safe: server-side only)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{ name, email, message }])
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
    }

    // Send notification email via Resend
    try {
      await sendNotificationEmail(name, email, message);
      console.log('✅ Notification email sent successfully');
    } catch (emailErr: any) {
      console.error('❌ Resend notification error:', emailErr?.message || emailErr);
      // Don't fail the request — the message is saved, email is best-effort
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
