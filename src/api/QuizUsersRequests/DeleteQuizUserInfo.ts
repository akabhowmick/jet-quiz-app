import { supabase } from "../supabase-requests";

export const deleteQuizUserInfoFromDb = async (userId: number) => {
  const { error } = await supabase
    .from("QuizUsersInfo")
    .delete()
    .eq("user_id", userId);
  if (error){console.log(error);
    return;}
};
