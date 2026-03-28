import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { sendReplyEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Verify admin session
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { messageId, replyText, toEmail, toName } = await request.json();

    if (!messageId || !replyText || !toEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Send reply email via SMTP
    await sendReplyEmail(toEmail, toName || 'there', replyText);

    // Mark message as replied in database
    await supabase
      .from('contact_messages')
      .update({ replied: true, reply_text: replyText, replied_at: new Date().toISOString() })
      .eq('id', messageId);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Reply API error:', err);
    return NextResponse.json({ error: 'Failed to send reply' }, { status: 500 });
  }
}
