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
import { Quiz, QuizFilter } from "../types/interfaces";
import swal from "sweetalert";

interface QuizContextType {
  playableQuizzes: Quiz[];
  filteredPlayableQuizzes: Quiz[];
  myQuizzes: Quiz[];
  currentQuiz: Quiz | undefined;
  addQuiz: (newQuiz: Quiz) => Promise<void>;
  editQuiz: (quizId: number, quizToEdit: Quiz) => Promise<boolean>;
  deleteQuiz: (quizId: number, quizToDelete: Quiz) => Promise<void>;
  getSingleQuizInfo: (quizId: number) => void;
  gameEndPointCalculator: (userPoints: number) => number;
  setPlayableQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
  setFilteredPlayableQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
  setMyQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
  quizzesLoading: boolean;
  quizzesLoadingError: boolean;
  handleQuizFilters: (filterType: string, filterValue: string) => void;
  tags: string[];
  appliedFilters: QuizFilter;
}

const QuizContext = createContext<QuizContextType>({} as QuizContextType);

export const QuizProvider = ({
  children,
  user,
}: {
  user: User | null;
  children: ReactNode;
}) => {
  const [playableQuizzes, setPlayableQuizzes] = useState<Quiz[]>([]);
  const [filteredPlayableQuizzes, setFilteredPlayableQuizzes] = useState<
    Quiz[]
  >([]);
  const [myQuizzes, setMyQuizzes] = useState<Quiz[]>([]);
  const [quizzesLoading, setQuizzesLoading] = useState(true);
  const [quizzesLoadingError, setQuizzesLoadingError] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz>();
  const [appliedFilters, setAppliedFilters] = useState<QuizFilter>({
    category: "All",
    matchingSubstring: "",
  });
  const tags = [
    "All",
    "Random",
    "Geography",
    "Math",
    "History",
    "Sports",
    "Science",
  ];

  const gameEndPointCalculator = (userPoints: number) => {
    const quizAnswersLength = currentQuiz!.answersArray.length;
    const roundedPoints = Math.round((userPoints / quizAnswersLength) * 5);
    return roundedPoints;
  };

  const refetchQuizzes = async () => {
    const { data, error } = await getQuizzesFromDB();
    if (error) {
      console.log(error);
      setQuizzesLoadingError(true);
    }
    if (data) {
      setPlayableQuizzes(
        data.filter((quiz: Quiz) => quiz.quizAuthorId !== user?.id)
      );
      setMyQuizzes(data.filter((quiz: Quiz) => quiz.quizAuthorId === user?.id));
    }
    setQuizzesLoading(false);
  };

  const filterByCategory = (category: string) => {
    let filteredQuizzes;
    if (category !== "All") {
      filteredQuizzes = playableQuizzes.filter((quiz) =>
        quiz.quizTags?.includes(category)
      );
    } else {
      filteredQuizzes = playableQuizzes;
    }
    setFilteredPlayableQuizzes(filteredQuizzes);
  };

  const filterBySearch = (substring: string) => {
    let filteredQuizzes;
    if (appliedFilters.category === "All") {
      if (substring !== "") {
        filteredQuizzes = playableQuizzes.filter((quiz) =>
          quiz.question.toLowerCase().includes(substring.toLowerCase())
        );
      } else {
        filteredQuizzes = playableQuizzes;
      }
    } else {
      if (substring !== "") {
        filteredQuizzes = filteredPlayableQuizzes.filter((quiz) =>
          quiz.question.toLowerCase().includes(substring.toLowerCase())
        );
      } else {
        filteredQuizzes = filteredPlayableQuizzes;
      }
    }

    setFilteredPlayableQuizzes(filteredQuizzes);
  };

  const handleQuizFilters = (filterType: string, filterValue: string) => {
    if (filterType === "filterSearchInput") {
      setAppliedFilters({ ...appliedFilters, matchingSubstring: filterValue });
      filterBySearch(filterValue);
    } else if (filterType === "filterCategoryInput") {
      setAppliedFilters({ matchingSubstring: "", category: filterValue });
      filterByCategory(filterValue);
    }
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
    swal(
      "Editing Error!",
      "Invalid: You are not the maker of this quiz!!",
      "error"
    );
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
    swal(
      "Delete Error!",
      "Invalid: You are not the maker of this quiz!!",
      "error"
    );
  };

  return (
    <QuizContext.Provider
      value={{
        myQuizzes,
        addQuiz,
        playableQuizzes,
        editQuiz,
        getSingleQuizInfo,
        currentQuiz,
        gameEndPointCalculator,
        deleteQuiz,
        setPlayableQuizzes,
        setFilteredPlayableQuizzes,
        quizzesLoading,
        quizzesLoadingError,
        setMyQuizzes,
        tags,
        filteredPlayableQuizzes,
        handleQuizFilters,
        appliedFilters,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useQuizContext = () => useContext(QuizContext);
