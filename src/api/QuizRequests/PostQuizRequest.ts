import { Quiz } from "../../types/interfaces";
import { supabase } from "../supabase-requests";

export const addQuizzesToDB = async (quiz: Quiz) => {
  const {
    question,
    numberOfAnswers,
    timeLimit,
    answersArray,
    quizAuthorId,
    quizAuthorImage,
    quizAuthorName,
  } = quiz;
  const { data, error } = await supabase
    .from("Quizzes")
    .insert([
      {
        question,
        numberOfAnswers,
        timeLimit,
        answersArray,
        quizAuthorId,
        quizAuthorImage,
        quizAuthorName,
      },
    ])
    .select();
  if (error) {
    console.log(error);
    return;
  }
  return data;
};
