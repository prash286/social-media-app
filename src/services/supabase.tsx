import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://epnzghdogulhlqvqhhhg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwbnpnaGRvZ3VsaGxxdnFoaGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQyNTI1NDUsImV4cCI6MjAwOTgyODU0NX0.7BhPi4UQJfnX65_JxK-d6u7TlxM2OBOoXAmTsnhCyo8";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
