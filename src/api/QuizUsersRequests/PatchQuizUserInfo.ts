import { QuizUsersInfo } from "../../types/interfaces";
import { supabase } from "../supabase-requests";

export const updateQuizUserInfoInDB = async (user: QuizUsersInfo) => {
  const {
    numberOfQuizzesPlayed,
    overallQuizPoints,
    overallRanking,
    user_id,
    saved_quizzes_ids,
  } = user;
  const { data, error } = await supabase
    .from("QuizUsersInfo")
    .update({
      numberOfQuizzesPlayed,
      overallQuizPoints,
      overallRanking,
      saved_quizzes_ids,
    })
    .eq("user_id", user_id)
    .select();
  if (error) {
    console.log(error);
    return;
  }
  return data;
};
