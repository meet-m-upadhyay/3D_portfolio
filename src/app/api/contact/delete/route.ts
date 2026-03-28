import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    // 1. Verify admin session securely
    const cookieStore = cookies();
    const supabaseSession = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet: { name: string; value: string; options: any }[]) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      }
    );

    const { data, error: authError } = await supabaseSession.auth.getUser();
    if (authError || !data?.user) {
      console.error('Auth Error during delete API request:', authError?.message || 'No active user found');
      return NextResponse.json({ error: 'Unauthorized', details: authError?.message }, { status: 401 });
    }

    // 2. Extract payload
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing message ID' }, { status: 400 });
    }

    // 3. Bypass RLS for deletion using Service Role key
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    if (id === 'all') {
      const { error } = await supabaseAdmin.from('contact_messages').delete().not('id', 'is', null);
      if (error) throw error;
    } else {
      const { error } = await supabaseAdmin.from('contact_messages').delete().eq('id', id);
      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Delete API error:', err);
    return NextResponse.json({ error: err.message || 'Failed to delete message' }, { status: 500 });
  }
}
