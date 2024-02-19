import { User } from "@supabase/supabase-js";
import {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { deleteQuizFromDb } from "../api/QuizRequests/DeleteQuizRequest";
import {
  getQuizzesFromDB,
  getSingleQuizFromDB,
} from "../api/QuizRequests/GetQuizRequest";
import { editQuizzesToDB } from "../api/QuizRequests/PatchQuizRequest";
import { addQuizzesToDB } from "../api/QuizRequests/PostQuizRequest";
import { Quiz } from "../types/interfaces";
import swal from "sweetalert";

interface QuizContextType {
  quizzes: Quiz[];
  currentQuiz: Quiz | undefined;
  addQuiz: (newQuiz: Quiz) => Promise<void>;
  editQuiz: (quizId: number, quizToEdit: Quiz) => Promise<boolean>;
  deleteQuiz: (quizId: number, quizToDelete: Quiz) => Promise<void>;
  getSingleQuizInfo: (quizId: number) => void;
  gameEndPointCalculator: (userPoints: number) => number;
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
  quizzesLoading: boolean;
  quizzesLoadingError: boolean;
}

const QuizContext = createContext<QuizContextType>({} as QuizContextType);

export const QuizProvider = ({
  children,
  user,
}: {
  user: User | null;
  children: ReactNode;
}) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quizzesLoading, setQuizzesLoading] = useState(true);
  const [quizzesLoadingError, setQuizzesLoadingError] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz>();

  const gameEndPointCalculator = (userPoints: number) => {
    const quizAnswersLength = currentQuiz!.answersArray.length;
    const roundedPoints = Math.round((userPoints / quizAnswersLength) * 5);
    return roundedPoints;
  };

  // * here we can go ahead and use the loading and error states
  const refetchQuizzes = async () => {
    const { data, error } = await getQuizzesFromDB();
    if (error) {
      console.log(error);
      setQuizzesLoadingError(true);
    }
    if (data) {
      setQuizzes(data);
    }
    setQuizzesLoading(false);
  };

  useEffect(() => {
    refetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const checkAuthorization = (quizToModify: Quiz) => {
    return user!.id === quizToModify.quizAuthorId;
  };

  const addQuiz = async (newQuiz: Quiz) => {
    const data = await addQuizzesToDB(newQuiz);
    if (data) {
      refetchQuizzes();
    }
  };

  const editQuiz = async (quizId: number, quizToEdit: Quiz) => {
    if (checkAuthorization(quizToEdit)) {
      const { data, error } = await editQuizzesToDB(quizId, quizToEdit);
      if (data) {
        refetchQuizzes();
        return true;
      }
      if (error) {
        swal("Editing Error!", `Invalid: ${error.message}`, "error");
      }
      return false;
    }
    swal("Editing Error!", "Invalid: You are not the maker of this quiz!!", "error");
    return false;
  };

  const getSingleQuizInfo = async (quizId: number) => {
    const quizData = await getSingleQuizFromDB(quizId);
    if (quizData) {
      setCurrentQuiz(quizData[0]);
    }
  };

  const deleteQuiz = async (quizId: number, quizToDelete: Quiz) => {
    if (checkAuthorization(quizToDelete)) {
      const deletedQuizError = await deleteQuizFromDb(quizId);
      if (!deletedQuizError) {
        await refetchQuizzes();
      } else {
        swal(
          "Deleting Error!",
          `Invalid: ${deletedQuizError.message}`,
          "error"
        );
      }
    }
    swal("Delete Error!", "Invalid: You are not the maker of this quiz!!", "error");
  };

  return (
    <QuizContext.Provider
      value={{
        addQuiz,
        quizzes,
        editQuiz,
        getSingleQuizInfo,
        currentQuiz,
        gameEndPointCalculator,
        deleteQuiz,
        setQuizzes,
        quizzesLoading,
        quizzesLoadingError,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useQuizContext = () => useContext(QuizContext);
