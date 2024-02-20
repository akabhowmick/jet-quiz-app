import { useQuizContext } from "../../providers/quiz-provider";
import { EnterQuizInfo } from "../Quiz/EnterQuizInfo";
import "./HomePage.css";
import { HomePageOptions } from "./HomePageOptions";
import { QuizBox } from "../Quiz/QuizBox";
import { Leaderboard } from "../LeaderBoard/LeaderBoard";
import { useQuizUserInfoContext } from "../../providers/quiz-user-info-provider";
import { UserInstructions } from "../UserInstructions/UserInstructions";

export const HomePage = () => {
  const { playableQuizzes, myQuizzes, quizzesLoading, quizzesLoadingError } = useQuizContext();
  const { selectedIndex } = useQuizUserInfoContext();

  const showPlayableQuizzes = (
    <div className="quiz-box">
      {quizzesLoading && <div>Loading With Spin</div>}
      {quizzesLoadingError && <div>Error</div>}
      {playableQuizzes &&
        playableQuizzes.map((quiz) => {
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
      {selectedIndex === 0 && showPlayableQuizzes}
      {selectedIndex === 1 && newQuiz}
      {selectedIndex === 2 && <Leaderboard />}
      {selectedIndex === 3 && <UserInstructions />}
      {selectedIndex === 4 && showMyQuizzes}
    </div>
  );
};
