import { Session, User, WeakPassword } from "@supabase/supabase-js";

export interface QuizUsersInfo {
  id?: number;
  userName: string;
  numberOfQuizzesPlayed: number;
  overallQuizPoints: number;
  overallRanking: number;
  user_id: string;
  user_image: string;
}

export interface Quiz {
  id?: number;
  question: string;
  numberOfAnswers: number;
  timeLimit: number;
  answersArray: string[];
  quizAuthorId: string;
  quizAuthorName: string;
  quizAuthorImage: string;
}

export interface UserSignIn {
  email: string;
  password: string;
}

export interface UserDataFromSupabase {
  user: User | null;
  session: Session | null;
  weakPassword?: WeakPassword | undefined;
}
