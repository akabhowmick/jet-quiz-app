import { Quiz } from "../../types/interfaces";
import { supabase } from "../supabase-requests";

export const editQuizzesToDB = async (quizId: number, quiz: Quiz) => {
  const { question, numberOfAnswers, timeLimit, answersArray, quizAuthorId } =
    quiz;
  const { data, error } = await supabase
    .from("Quizzes")
    .update({
      question,
      numberOfAnswers,
      timeLimit,
      answersArray,
      quizAuthorId,
    })
    .eq("id", quizId)
    .select();
  return {data,error};
};