import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../providers/auth-provider";
import { useQuizContext } from "../../providers/quiz-provider";
import { useQuizUserInfoContext } from "../../providers/quiz-user-info-provider";

export const Logout = () => {
  const { logOutUser } = useAuthContext();
  const { setQuizzes } = useQuizContext();
  const { setSelectedIndex } = useQuizUserInfoContext();
  const navigate = useNavigate();

  const onRenderLogOutUser = async () => {
    await logOutUser();
    setSelectedIndex(0);
    setQuizzes([]);
    navigate("/signup");
  };

  useEffect(() => {
    onRenderLogOutUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};
