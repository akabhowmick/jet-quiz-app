import { QuizUsersInfo } from "../../types/interfaces";
import { supabase } from "../supabase-requests";

export const updateQuizUserInfoInDB = async (user: QuizUsersInfo) => {
  const { numberOfQuizzesPlayed, overallQuizPoints, overallRanking, user_id } =
    user;
  const { data, error } = await supabase
    .from("QuizUsersInfo")
    .update({ numberOfQuizzesPlayed, overallQuizPoints, overallRanking })
    .eq("user_id", user_id)
    .select();
  if (error) {
    console.log(error);
    return;
  }
  return data;
};