import { supabase } from "../supabase-requests";

export const signUpUserSupabase = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};
