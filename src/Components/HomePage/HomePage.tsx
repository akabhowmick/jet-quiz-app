import { useQuizContext } from "../../providers/quiz-provider";
import { EnterQuizInfo } from "../Quiz/EnterQuizInfo";
import "./HomePage.css";
import { HomePageOptions } from "./HomePageOptions";
import { QuizBox } from "../Quiz/QuizBox";
import { Leaderboard } from "../LeaderBoard/LeaderBoard";
import { useQuizUserInfoContext } from "../../providers/quiz-user-info-provider";
import { UserInstructions } from "../UserInstructions/UserInstructions";
import { FilterAndSearch } from "./FilterAndSearch";

export const HomePage = () => {
  const {
    filteredPlayableQuizzes,
    playableQuizzes,
    myQuizzes,
    quizzesLoading,
    quizzesLoadingError,
    appliedFilters,
  } = useQuizContext();
  const { selectedIndex } = useQuizUserInfoContext();

  const showAllQuizzes =
    appliedFilters.category === "All" &&
    appliedFilters.matchingSubstring === "";

  const quizzesOnMainPage = (
    <div className="quiz-box">
      {quizzesLoading && <div>Loading With Spin</div>}
      {quizzesLoadingError && <div>Error</div>}
      {showAllQuizzes
        ? playableQuizzes &&
          playableQuizzes.map((quiz) => {
            return <QuizBox quiz={quiz} key={quiz.id} />;
          })
        : filteredPlayableQuizzes.map((quiz) => {
            return <QuizBox quiz={quiz} key={quiz.id} />;
          })}
    </div>
  );

  const showMyQuizzes = (
    <div className="quiz-box">
      {quizzesLoading && <div>Loading With Spin</div>}
      {quizzesLoadingError && <div>Error</div>}
      {myQuizzes &&
        myQuizzes.map((quiz) => {
          return <QuizBox quiz={quiz} key={quiz.id} />;
        })}
    </div>
  );

  const newQuiz = (
    <div className="answers-box">
      return <EnterQuizInfo role={"add"} />
    </div>
  );

  return (
    <div className="home-page-box">
      <div className="home-page-header">
        <h1>Welcome to the Jet Quiz App!</h1>
      </div>
      <div className="home-page-options">
        <HomePageOptions />
      </div>
      {selectedIndex === 0 && (
        <div>
          <FilterAndSearch />
          {quizzesOnMainPage}
        </div>
      )}
      {selectedIndex === 1 && newQuiz}
      {selectedIndex === 2 && <Leaderboard />}
      {selectedIndex === 3 && <UserInstructions />}
      {selectedIndex === 4 && showMyQuizzes}
    </div>
  );
};
