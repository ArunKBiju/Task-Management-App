import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "valla panikkum poda";
const supabaseKey ="naanam undo vallavantem code adichu maattaan";

const supabase = createClient(supabaseUrl, supabaseKey);

console.log("Supabase client initialized:", supabase);

export default supabase;
