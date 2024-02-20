import { supabase } from "../supabase-requests";

export const updateUserSupabase = async (password: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });
  return { data, error };
};
