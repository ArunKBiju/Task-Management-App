import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sbwswkusqejfocplxqvg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNid3N3a3VzcWVqZm9jcGx4cXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2ODc2NzMsImV4cCI6MjA1OTI2MzY3M30.15aLRmhiArT04IJOmubGP4isxzYM_jVvz9DdZBCYhQ0";

const supabase = createClient(supabaseUrl, supabaseKey);

console.log("Supabase client initialized:", supabase);

export default supabase;
