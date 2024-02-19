import { User } from "@supabase/supabase-js";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import { getQuizUsersInfoFromDB } from "../api/QuizUsersRequests/getQuizUserInfo";
import { updateQuizUserInfoInDB } from "../api/QuizUsersRequests/PatchQuizUserInfo";
import { addUserToDB } from "../api/QuizUsersRequests/PostQuizUserInfo";
import { QuizUsersInfo } from "../types/interfaces";

interface QuizUserInfoContextType {
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  quizUserInfo: QuizUsersInfo | null;
  setQuizUserInfo: React.Dispatch<React.SetStateAction<QuizUsersInfo | null>>;
  leaderBoardUsers: QuizUsersInfo[];
  addQuizUserInfo: (user: QuizUsersInfo) => Promise<void>;
  editQuizUserInfo: (score: number, setToZero?: number) => Promise<void>;
  updateOverallRankings: (updatedUsers: QuizUsersInfo[]) => Promise<number>;
  homePageDisplayOptions: string[];
  leaderBoardUsersLoadingError: boolean;
  leaderBoardUsersLoading: boolean;
}

const QuizUserInfoContext = createContext<QuizUserInfoContextType>(
  {} as QuizUserInfoContextType
);

export const QuizUserInfoProvider = ({
  children,
  user,
}: {
  user: User | null;
  children: ReactNode;
}) => {
  const [quizUserInfo, setQuizUserInfo] = useState<QuizUsersInfo | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [leaderBoardUsers, setLeaderBoardUsers] = useState<QuizUsersInfo[]>([]);
  const [leaderBoardUsersLoading, setLeaderBoardUsersLoading] = useState(true);
  const [leaderBoardUsersLoadingError, setLeaderBoardUsersLoadingError] =
    useState(false);
  const homePageDisplayOptions = [
    "Show all quizzes",
    "Add a new quiz",
    "See Leader Board",
    "User Instructions",
  ];

  const fetchLeaderBoardData = async () => {
    setLeaderBoardUsersLoading(true);
    try {
      const allUsers = await getQuizUsersInfoFromDB();
      if (allUsers) {
        setLeaderBoardUsersLoadingError(false);
        setLeaderBoardUsersLoading(false);
        const sortedUsers = allUsers.sort(
          (a: QuizUsersInfo, b: QuizUsersInfo) =>
            b.overallQuizPoints - a.overallQuizPoints
        );
        const limitedUsers = sortedUsers.slice(0, 10);
        if (!limitedUsers) {
          throw new Error("Failed to fetch data");
        }
        setLeaderBoardUsers(limitedUsers);
      }
    } catch (error) {
      console.log(error);
      setLeaderBoardUsersLoading(false);
      setLeaderBoardUsersLoadingError(true);
    }
  };

  const getQuizUserInfoOnFirstLoad = useCallback(async () => {
    const allUsers = await getQuizUsersInfoFromDB();
    if (allUsers && user) {
      const myCurrentUser = allUsers?.find((u) => u.user_id === user?.id);
      setQuizUserInfo(myCurrentUser);
    }
  }, [user]);

  useEffect(() => {
    getQuizUserInfoOnFirstLoad();
  }, [getQuizUserInfoOnFirstLoad]);

  useEffect(() => {
    if (selectedIndex === 2) {
      fetchLeaderBoardData();
    } else {
      setLeaderBoardUsers([]);
    }
  }, [selectedIndex]);

  const addQuizUserInfo = async (newUser: QuizUsersInfo) => {
    const newUserData = await addUserToDB(newUser);
    if (newUserData) {
      setQuizUserInfo(newUserData[0]);
    }
  };

  const editQuizUserInfo = async (score: number, setToZero?: number) => {
    let editedUser: QuizUsersInfo;
    if (setToZero === 0) {
      editedUser = {
        ...quizUserInfo!,
        numberOfQuizzesPlayed: 0,
        overallQuizPoints: 0,
      };
    } else {
      editedUser = {
        ...quizUserInfo!,
        numberOfQuizzesPlayed: quizUserInfo!.numberOfQuizzesPlayed + 1,
        overallQuizPoints: quizUserInfo!.overallQuizPoints + score,
      };
    }
    const editedUserData = await updateQuizUserInfoInDB(editedUser);
    if (editedUserData) {
      updateOverallRankings();
      setQuizUserInfo(editedUserData[0]);
    }
  };

  const updateOverallRankings = async () => {
    let overallRanking = 0;
    try {
      const allUsers = await getQuizUsersInfoFromDB();
      if (allUsers) {
        const sortedUsers = allUsers.sort(
          (a: QuizUsersInfo, b: QuizUsersInfo) =>
            b.overallQuizPoints - a.overallQuizPoints
        );
        const limitedUsers = sortedUsers.slice(0, 10);
        for (let i = 1; i < limitedUsers.length; i++) {
          if (limitedUsers[i] === quizUserInfo) {
            overallRanking = i + 1;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    return overallRanking
  };

  return (
    <QuizUserInfoContext.Provider
      value={{
        selectedIndex,
        setSelectedIndex,
        quizUserInfo,
        setQuizUserInfo,
        leaderBoardUsers,
        addQuizUserInfo,
        editQuizUserInfo,
        homePageDisplayOptions,
        leaderBoardUsersLoadingError,
        leaderBoardUsersLoading,
        updateOverallRankings,
      }}
    >
      {children}
    </QuizUserInfoContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useQuizUserInfoContext = () => useContext(QuizUserInfoContext);
