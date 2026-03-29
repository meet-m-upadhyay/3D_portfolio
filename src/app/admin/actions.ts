"use server";
import { createClient } from "@/lib/supabase/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function uploadResumeAction(formData: FormData) {
  const supabase = createClient();
  
  // 1. Force Cookie Resolution into a Session object
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (sessionError || authError || !session || !user) {
    return { success: false, error: "Unauthorized: Invalid or missing session cookie" };
  }

  // 2. Guaranteed Propagation
  // Pass the verified access token directly to a raw backend client to ensure PostgREST 
  // receives the 'authenticated' JWT, bypassing any @supabase/ssr auto-header bugs.
  const authClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        get(name: string) { return cookies().get(name)?.value; },
        set() {},
        remove() {}
      },
      global: {
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      }
    }
  );

  const file = formData.get("file") as File;
  if (!file) return { success: false, error: "No file provided" };

  const fileName = `${Date.now()}_${file.name}`;

  try {
    const { data: storageData, error: uploadError } = await authClient.storage
      .from("resumes")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: insertData, error: dbError } = await authClient
      .from("resumes")
      .insert([{ file_url: storageData.path }])
      .select("id")
      .single();

    if (dbError) throw dbError;

    const { error: rpcError } = await authClient.rpc("set_active_resume", {
      new_resume_id: insertData.id,
    });

    if (rpcError) throw rpcError;

    return { success: true };
  } catch (error: any) {
    console.error("Server Action Error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteMessageAction(id: string) {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Unauthorized" };
  }

  // Use Service Role to ensure deletion bypasses RLS
  const adminClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { get(name: string) { return cookies().get(name)?.value; }, set() {}, remove() {} } }
  );

  const { error } = await adminClient.from("contact_messages").update({ is_active: false }).eq("id", id);
  if (error) return { success: false, error: error.message };

  return { success: true };
}

export async function clearAllMessagesAction() {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Unauthorized" };
  }

  const adminClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { get(name: string) { return cookies().get(name)?.value; }, set() {}, remove() {} } }
  );

  const { error } = await adminClient.from("contact_messages").update({ is_active: false }).not("id", "is", null);
  if (error) return { success: false, error: error.message };

  return { success: true };
}
