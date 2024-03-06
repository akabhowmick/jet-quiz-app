import { useQuizContext } from "../../providers/quiz-provider";
import { EnterQuizInfo } from "../Quiz/EnterQuizInfo";
import "./HomePage.css";
import { HomePageOptions } from "./HomePageOptions";
import { QuizBox } from "../Quiz/QuizBox";
import { Leaderboard } from "../LeaderBoard/LeaderBoard";
import { useQuizUserInfoContext } from "../../providers/quiz-user-info-provider";
import { UserInstructions } from "../UserInstructions/UserInstructions";
import { FilterAndSearch } from "./FilterAndSearch";
import { loadingCard } from "../Loaders/Loaders";

export const HomePage = () => {
  const {
    filteredPlayableQuizzes,
    playableQuizzes,
    myQuizzes,
    quizzesLoading,
    quizzesLoadingError,
    appliedFilters,
    savedQuizzes,
  } = useQuizContext();
  const { selectedIndex } = useQuizUserInfoContext();

  const showAllQuizzes =
    appliedFilters.category === "All" && appliedFilters.matchingSubstring === "";

  const loadingOrErrors = (
    <>
      {quizzesLoading && (
        <>
          {loadingCard}
          {loadingCard}
          {loadingCard}
        </>
      )}
      {quizzesLoadingError && <div>Error</div>}
    </>
  );

  const quizzesOnMainPage = (
    <div id="playable-quiz-box-container" className="quiz-box">
      {loadingOrErrors}
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
    <div id="my-quiz-box-container" className="quiz-box">
      {loadingOrErrors}
      {quizzesLoadingError && <div>Error</div>}
      {myQuizzes &&
        myQuizzes.map((quiz) => {
          return <QuizBox quiz={quiz} key={quiz.id} />;
        })}
    </div>
  );

  const showSavedQuizzes = (
    <div id="my-quiz-box-container" className="quiz-box">
      {loadingOrErrors}
      {quizzesLoadingError && <div>Error</div>}
      {myQuizzes &&
        savedQuizzes.map((quiz) => {
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
      {selectedIndex === "Playable Quizzes" && (
        <div>
          <FilterAndSearch />
          {quizzesOnMainPage}
        </div>
      )}
      {selectedIndex === "Add A New Quiz" && newQuiz}
      {selectedIndex === "My Quizzes" && showMyQuizzes}
      {selectedIndex === "Bookmarked Quizzes" && showSavedQuizzes}
      {selectedIndex === "View Leaderboard" && <Leaderboard />}
      {selectedIndex === "User Instructions" && <UserInstructions />}
    </div>
  );
};
