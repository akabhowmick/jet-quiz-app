import { supabase } from "../supabase-requests";

export const getQuizzesFromDB = async () => {
  const { data, error } = await supabase.from("Quizzes").select("*");
  return { data, error };
}; 

export const getSingleQuizFromDB = async (quizId: number) => {
  const { data, error } = await supabase
    .from("Quizzes")
    .select("*")
    .eq("id", quizId);
  if (error) {
    console.log(error);
    return;
  }
  return data;
};