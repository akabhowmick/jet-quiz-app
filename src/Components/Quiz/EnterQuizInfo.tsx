import { Button } from "@mui/joy";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useAuthContext } from "../../providers/auth-provider";
import { useQuizContext } from "../../providers/quiz-provider";
import { useQuizUserInfoContext } from "../../providers/quiz-user-info-provider";
import { Quiz } from "../../types/interfaces";
import {
  emptyAnswerErrorMessage,
  questionErrorMessage,
  swalNumberErrorMessage,
} from "../FormElements/FormUtils/ErrorMessage";
import { TextFieldWithValidation } from "../FormElements/FormUtils/TextFieldWithValidation";
import {
  isValidAnswerArray,
  isValidPositiveInteger,
  isValidQuizQuestion,
} from "../FormElements/FormUtils/validations";

export const EnterQuizInfo = ({
  role,
  currentQuiz,
  onClose,
}: {
  role: string;
  currentQuiz?: Quiz;
  onClose?: () => void;
}) => {
  const { addQuiz, editQuiz } = useQuizContext();
  const { user } = useAuthContext();
  const { quizUserInfo } = useQuizUserInfoContext();

  const [numOfAnswers, setNumOfAnswers] = useState(1); // Default number of answers
  const isNumOfAnswersValid = isValidPositiveInteger(numOfAnswers);
  const [timeInput, setTimeInput] = useState(60); // Default time for quiz
  const isTimeInputValid = isValidPositiveInteger(timeInput);
  const [questionInput, setQuestionInput] = useState(""); // Question for quiz
  const isQuestionInputValid = isValidQuizQuestion(questionInput);
  const [answersArrayInput, setAnswersArrayInput] = useState<string[]>(
    Array(isNumOfAnswersValid ? numOfAnswers : 0).fill("")
  ); // Default all answers blank
  const isAnswerArrayInputValid = isValidAnswerArray(answersArrayInput);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (currentQuiz) {
      setNumOfAnswers(currentQuiz.numberOfAnswers);
      setTimeInput(currentQuiz.timeLimit);
      setQuestionInput(currentQuiz.question);
      setAnswersArrayInput(currentQuiz.answersArray);
    }
  }, [currentQuiz]);

  const reset = () => {
    setNumOfAnswers(1);
    setTimeInput(5);
    setQuestionInput("");
    setAnswersArrayInput([]);
    setIsSubmitted(false);
  };

  const handleNumberOfAnswersInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const numberInput = Number(e.target.value);
    setNumOfAnswers(numberInput);
    if (numberInput > 0 && Number.isInteger(numberInput)) {
      if (numberInput > answersArrayInput.length) {
        const newAnswerArray = answersArrayInput.concat(
          Array(numberInput - answersArrayInput.length).fill("")
        );
        setAnswersArrayInput(newAnswerArray);
      } else {
        setAnswersArrayInput(answersArrayInput.slice(0, numberInput));
      }
    }
  };

  const handleTimeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeInput(Number(e.target.value));
  };

  const handleQuestionAnswerInputChange = (index: number, value: string) => {
    const updatedAnswers = [...answersArrayInput];
    updatedAnswers[index] = value;
    setAnswersArrayInput(updatedAnswers);
  };

  const handleQuestionInputChange = (question: string) => {
    setQuestionInput(question);
  };

  const quizValues = () => {
    setIsSubmitted(true);
    if (
      isQuestionInputValid &&
      isTimeInputValid &&
      isNumOfAnswersValid &&
      isAnswerArrayInputValid
    ) {
      const quizMade: Quiz = {
        question: questionInput,
        numberOfAnswers: numOfAnswers,
        timeLimit: timeInput,
        answersArray: answersArrayInput,
        quizAuthorId: user!.id!,
        quizAuthorName: quizUserInfo!.userName,
        quizAuthorImage: quizUserInfo!.user_image,
      };
      return quizMade;
    }
  };

  const handleEditBtnClick = async () => {
    const editedQuiz = quizValues();
    if (editedQuiz) {
      const wasEditSuccessful = editQuiz(currentQuiz!.id!, editedQuiz!);
      reset();
      if (await wasEditSuccessful) {
        onClose!();
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newQuiz = quizValues();
    if (newQuiz) {
      addQuiz(newQuiz);
      reset();
    }
  };

  return (
    <form className="add-quiz-box" onSubmit={handleSubmit}>
      <div className="form-question-inputs">
        <TextFieldWithValidation
          label="Enter Quiz Prompt Here:"
          inputProps={{
            placeholder: "Name all the countries in the world...",
            value: questionInput,
            type: "text",
            onChange: (e: { target: { value: string } }) => {
              handleQuestionInputChange(e.target.value);
            },
          }}
          errorMessage={questionErrorMessage}
          shouldDisplayError={!isQuestionInputValid && isSubmitted}
        />
        <TextFieldWithValidation
          label="Number of Answers:"
          inputProps={{
            value: numOfAnswers,
            type: "number",
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
              handleNumberOfAnswersInputChange(e);
            },
          }}
          errorMessage={swalNumberErrorMessage.text}
          shouldDisplayError={!isNumOfAnswersValid && isSubmitted}
        />
        <TextFieldWithValidation
          label="Time Limit (in seconds):"
          inputProps={{
            value: timeInput,
            type: "number",
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
              handleTimeInputChange(e);
            },
          }}
          errorMessage={swalNumberErrorMessage.text}
          shouldDisplayError={!isTimeInputValid && isSubmitted}
        />
      </div>

      {/* Render input fields based on the number of answers */}
      <div className="answers-flexbox">
        {answersArrayInput.map((_, index) => (
          <div key={index}>
            <TextFieldWithValidation
              label={`Answer ${index + 1}:`}
              inputProps={{
                placeholder: "Dummy answer",
                value: answersArrayInput[index] || "",
                type: "text",
                onChange: (e) => {
                  handleQuestionAnswerInputChange(index, e.target.value);
                },
              }}
              errorMessage={emptyAnswerErrorMessage}
              //fix this next part
              shouldDisplayError={
                !isAnswerArrayInputValid &&
                isSubmitted &&
                answersArrayInput[index] === ""
              }
            />
          </div>
        ))}{" "}
      </div>
      {role === "add" && <button type="submit">Submit</button>}
      {role === "edit" && (
        <Button
          variant="solid"
          color="success"
          onClick={() => handleEditBtnClick()}
        >
          Save Changes
        </Button>
      )}
    </form>
  );
};
