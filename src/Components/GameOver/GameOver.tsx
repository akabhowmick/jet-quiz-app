import { useQuizUserInfoContext } from "../../providers/quiz-user-info-provider";
import { Link, useNavigate } from "react-router-dom";
import { Typography, Button, ButtonGroup } from "@mui/material";

export const GameOver = ({ score }: { score: number }) => {
  const { editQuizUserInfo } = useQuizUserInfoContext();
  const navigate = useNavigate();

  const handleClickOnEditBtnClick = async () => {
    await editQuizUserInfo(score);
    navigate("/profile");
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Game Over
      </Typography>
      <Typography variant="body1" gutterBottom>
        Your final score: {score}
      </Typography>
      <ButtonGroup>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          style={{ marginRight: "10px" }}
        >
          Home
        </Button>
        <Button
          component={Link}
          to="/profile"
          variant="contained"
          color="secondary"
          onClick={() => handleClickOnEditBtnClick()}
        >
          See Updated Profile!
        </Button>
      </ButtonGroup>
    </div>
  );
};
