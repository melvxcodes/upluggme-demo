import { supabase } from "./supabaseClient";

export async function runSupabaseSmokeTest() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Supabase smoke test failed:", error.message);
    return;
  }
  console.log("Supabase smoke test ok. Session:", data.session);
}
