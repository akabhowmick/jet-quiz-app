import { QuizUsersInfo } from "../../types/interfaces";
import { supabase } from "../supabase-requests";

export const addUserToDB = async (user: QuizUsersInfo) => {
  const {
    numberOfQuizzesPlayed,
    overallQuizPoints,
    overallRanking,
    userName,
    user_id,
  } = user;
  const { data, error } = await supabase
    .from("QuizUsersInfo")
    .insert([
      {
        numberOfQuizzesPlayed,
        overallQuizPoints,
        overallRanking,
        userName,
        user_id,
      },
    ])
    .select();
  if (error) {
    console.log(error);
    return;
  }
  return data;
};
