import { createClient } from "@supabase/supabase-js";
import env from "./env.js";

// Public (anon) client - safe for normal auth flows if needed
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

// Admin (service role) client - server-side only, has elevated privileges
export const supabaseAdmin = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

export default supabase;