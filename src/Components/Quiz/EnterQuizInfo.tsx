import { Button } from "@mui/joy";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import { useState, FormEvent, useEffect, ChangeEvent } from "react";
import { useAuthContext } from "../../providers/auth-provider";
import { useQuizContext } from "../../providers/quiz-provider";
import { useQuizUserInfoContext } from "../../providers/quiz-user-info-provider";
import { Quiz } from "../../types/interfaces";
import {
  emptyAnswerErrorMessage,
  ErrorMessage,
  questionErrorMessage,
  quizTagErrorMessage,
  swalNumberErrorMessage,
} from "../FormElements/FormUtils/ErrorMessage";
import { TextFieldWithValidation } from "../FormElements/FormUtils/TextFieldWithValidation";
import {
  isValidAnswerArray,
  isValidPositiveInteger,
  isValidQuizQuestion,
  isValidQuizTag,
} from "../FormElements/FormUtils/validations";
import swal from "sweetalert";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const EnterQuizInfo = ({
  role,
  currentQuiz,
  onClose,
}: {
  role: string;
  currentQuiz?: Quiz;
  onClose?: () => void;
}) => {
  const { addQuiz, editQuiz, tags } = useQuizContext();
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
  const [quizTagInputs, setQuizTagInputs] = useState<string[]>(["Random"]);
  const isQuizTagsValid = isValidQuizTag(quizTagInputs);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (currentQuiz) {
      setNumOfAnswers(currentQuiz.numberOfAnswers);
      setTimeInput(currentQuiz.timeLimit);
      setQuestionInput(currentQuiz.question);
      setAnswersArrayInput(currentQuiz.answersArray);
      setQuizTagInputs(currentQuiz.quizTags);
    }
  }, [currentQuiz]);

  const reset = () => {
    setNumOfAnswers(1);
    setTimeInput(5);
    setQuestionInput("");
    setAnswersArrayInput([]);
    setAnswersArrayInput(["random"]);
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

  const handleSelectChange = (
    event: SelectChangeEvent<typeof quizTagInputs>
  ) => {
    const {
      target: { value },
    } = event;
    setQuizTagInputs(typeof value === "string" ? value.split(",") : value);
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
      isAnswerArrayInputValid &&
      isQuizTagsValid
    ) {
      const quizMade: Quiz = {
        question: questionInput,
        numberOfAnswers: numOfAnswers,
        timeLimit: timeInput,
        answersArray: answersArrayInput,
        quizAuthorId: user!.id!,
        quizAuthorName: quizUserInfo!.userName,
        quizAuthorImage: quizUserInfo!.user_image,
        quizTags: quizTagInputs,
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
      swal(
        "Quiz Added!",
        "You can view, edit, or delete your quiz in the My Quizzes Tab!!",
        "success"
      );
      reset();
    }
  };

  return (
    <form className="add-quiz-box" onSubmit={handleSubmit}>
      <div className="form-question-inputs">
        <TextFieldWithValidation
          label="Enter Quiz Prompt Here"
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
          label="Number of Answers"
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
          label="Time Limit (in seconds)"
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
        <div className="quiz-tag-container text-field">
          <div className="input-wrap">
            <label className="quiz-tag-select-label" htmlFor="quiz-tag-select">
              Choose Quiz Category:
            </label>
            <div className="select-wrap">
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={quizTagInputs}
                onChange={handleSelectChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {tags.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    {tag}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <ErrorMessage
            message={quizTagErrorMessage}
            show={isSubmitted && !isQuizTagsValid}
          />
        </div>
      </div>

      {/* Render input fields based on the number of answers */}
      <div className="answers-flexbox">
        {answersArrayInput.map((_, index) => (
          <div key={index}>
            <TextFieldWithValidation
              label={`Answer ${index + 1}`}
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
