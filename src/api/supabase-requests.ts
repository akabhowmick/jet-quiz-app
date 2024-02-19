import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ewkjvhrihajmbtpptlxi.supabase.co"; //process.env.REACT_APP_SUPABASE_URL!;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3a2p2aHJpaGFqbWJ0cHB0bHhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA5Mzc0ODMsImV4cCI6MjAxNjUxMzQ4M30.Z44SvV-9YPDRhj_G6oHHwd5QhTIbiD0s8wAEpgmhPjQ";
export const supabase = createClient(supabaseUrl, supabaseKey);

