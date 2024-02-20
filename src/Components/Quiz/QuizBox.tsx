import { useNavigate } from "react-router-dom";

import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import CardActions from "@mui/joy/CardActions";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";

import { Quiz } from "../../types/interfaces";
import { EditQuiz } from "./EditQuiz";
import { DeleteQuiz } from "./DeleteQuiz";
import { useAuthContext } from "../../providers/auth-provider";

export const QuizBox = ({ quiz }: { quiz: Quiz }) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const canModify = user?.id === quiz.quizAuthorId;
  // if the id of the user is the same as the quiz, then they can edit and delete it but not play it

  return (
    <Card
      data-resizable
      sx={{
        textAlign: "center",
        alignItems: "center",
        width: 343,
        overflow: "auto",
        resize: "horizontal",
        "--icon-size": "100px",
      }}
    >
      <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
        <Avatar src={quiz?.quizAuthorImage} sx={{ "--Avatar-size": "4rem" }} />
        <Chip
          size="sm"
          variant="soft"
          color="primary"
          sx={{
            mt: -1,
            mb: 1,
            border: "3px solid",
            borderColor: "background.surface",
          }}
        >
          {quiz?.quizAuthorName}: VERIFIED 
        </Chip>
        <Typography level="title-lg">🎊 {quiz.question} 🎊</Typography>
        <Typography level="title-sm" sx={{ maxWidth: "24ch" }}>
          Time Limit: {quiz.timeLimit} seconds
        </Typography>
        <Typography level="title-sm" sx={{ maxWidth: "24ch" }}>
          Number of answers: {quiz.numberOfAnswers}
        </Typography>
      </CardContent>
      <CardOverflow sx={{ bgcolor: "background.level1" }}>
        <CardActions id="quiz-box-btn">
          <ButtonGroup variant="outlined">
            <Button
              onClick={() => navigate(`/play/${quiz.id!}`)}
              variant="solid"
              color="success"
              disabled={canModify}
              aria-label={`Play ${quiz.question}`}
            >
              Play Now!
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined">
            <EditQuiz canModify={canModify} quizToEdit={quiz} />
            <DeleteQuiz canModify={canModify} quizToDelete={quiz} />
          </ButtonGroup>
        </CardActions>
      </CardOverflow>
    </Card>
  );
};
