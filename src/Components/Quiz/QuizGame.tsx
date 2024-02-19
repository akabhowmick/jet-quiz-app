import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuizContext } from "../../providers/quiz-provider";
import { GameOver } from "../GameOver/GameOver";
import "./Quiz.css";

export const QuizGame = () => {
  const { quizId } = useParams();
  const { getSingleQuizInfo, currentQuiz, gameEndPointCalculator } =
    useQuizContext();
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [counter, setCounter] = useState(60);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [revealedAnswers, setRevealedAnswers] = useState<string[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypedAnswer(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAnswerSubmit();
    }
  };

  const handleAnswerSubmit = () => {
    const allQuizAnswers = currentQuiz!.answersArray.map((answer) =>
      answer.toUpperCase()
    );
    if (allQuizAnswers.includes(typedAnswer.toUpperCase())) {
      setRevealedAnswers((prevAnswers) => [
        ...prevAnswers,
        typedAnswer.toUpperCase(),
      ]);
      setTypedAnswer("");
      setScore(score + 1);
      if (revealedAnswers.length + 1 === allQuizAnswers.length) {
        setIsQuizFinished(true);
        setFinalScore(gameEndPointCalculator(score + 1));
      }
    }
  };

  const colorInputLogic = (answer: string) => {
    if (answer) {
      return "user-answered";
    } else if (isQuizFinished) {
      return "user-did-not-answer";
    }
    return "default-input";
  };

  const listOfAnswers = (
    <ul className="answers-flexbox">
      {currentQuiz?.answersArray.map((answer, index) => (
        <input
          key={index}
          type="text"
          value={
            !isQuizFinished
              ? revealedAnswers[index] || `Answer ${index + 1}`
              : answer
          }
          readOnly
          className={colorInputLogic(revealedAnswers[index])}
          style={{
            border: "none",
            borderBottom: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />
      ))}
    </ul>
  );

  useEffect(() => {
    if (quizId) {
      getSingleQuizInfo(parseInt(quizId!, 10));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]);

  useEffect(() => {
    if (counter > 0 && !isQuizFinished) {
      const timer = setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setIsQuizFinished(true);
      setFinalScore(gameEndPointCalculator(score));
    }
  }, [counter, gameEndPointCalculator, isQuizFinished, score]);

  useEffect(() => {
    if (currentQuiz) {
      setCounter(currentQuiz!.timeLimit);
    }
  }, [currentQuiz]);

  return (
    <div>
      {currentQuiz && (
        <div className="quiz-game-board">
          <h1>Quiz</h1>
          <p>{currentQuiz.question}</p>
          <div>Time Left: {counter}</div>
          <label htmlFor="quiz-answers">Type in your answers:</label>
          <input
            id="quiz-answers"
            type="text"
            value={typedAnswer}
            onChange={handleInputChange}
            onKeyPress={(e) => handleKeyPress(e)}
          />
          <button onClick={handleAnswerSubmit}>Submit Answer</button>
          <div>
            {
              <div>
                <h2>Correct Answers:</h2>
                {listOfAnswers}
                <h2>
                  Your Score: {score}/{currentQuiz.answersArray.length}
                </h2>
              </div>
            }
          </div>
          {isQuizFinished && <GameOver score={finalScore} />}
        </div>
      )}
    </div>
  );
};
