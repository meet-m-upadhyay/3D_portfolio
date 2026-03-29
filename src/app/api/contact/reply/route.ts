import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendReplyEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
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
