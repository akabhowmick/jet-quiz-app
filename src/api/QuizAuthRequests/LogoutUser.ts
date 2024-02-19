import { supabase } from "../supabase-requests";

export const signOutUserSupabase = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
