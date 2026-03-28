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
