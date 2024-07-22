import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL 
const supabaseKey = import.meta.env.VITE_PUBLIC_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error("supabaseUrl and supabaseKey are required");
}

export const supabase = createClient(supabaseUrl, supabaseKey)
