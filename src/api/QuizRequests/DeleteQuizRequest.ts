import { supabase } from "../supabase-requests";

export const deleteQuizFromDb = async (quizId: number) => {
  const { error } = await supabase
    .from("Quizzes")
    .delete()
    .eq("id", quizId);
  return error;
};