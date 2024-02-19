import { SetStateAction, useEffect, useState } from "react";
import "./SignIn.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useAuthContext } from "../../providers/auth-provider";
import { QuizUsersInfo, UserSignIn } from "../../types/interfaces";
import {
  isEmailValid,
  isValidPassword,
  isValidUserName,
} from "../FormElements/FormUtils/validations";
import {
  emailErrorMessage,
  passwordErrorMessage,
  usernameErrorMessage,
} from "../FormElements/FormUtils/ErrorMessage";
import { TextFieldWithValidation } from "../FormElements/FormUtils/TextFieldWithValidation";
import { useNavigate } from "react-router-dom";
import { useQuizUserInfoContext } from "../../providers/quiz-user-info-provider";

export const SignIn = () => {
  const { signUpUser, signInUser } = useAuthContext();
  const { addQuizUserInfo } = useQuizUserInfoContext();
  const [activeClass, setActiveClass] = useState("");
  const [typeOfSignIn, setTypeOfSignIn] = useState("login"); //only valid if login or valid
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const isEmailInputValid = isEmailValid(emailInput);
  const isPasswordInputValid = isValidPassword(passwordInput);
  const isUsernameInputValid = isValidUserName(userNameInput);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      // ? we need to make the user's saved info appear 
      navigate("/");
    }
  }, [navigate]);

  const handleTypeOfSignIn = () => {
    if (activeClass === "active") {
      setActiveClass("");
      setTypeOfSignIn("login");
    } else {
      setActiveClass("active");
      setTypeOfSignIn("signup");
    }
  };

  const reset = () => {
    setEmailInput("");
    setPasswordInput("");
    setUserNameInput("");
    setIsSubmitted(false);
  };

  const handleSignInSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsSubmitted(true);
    let userSignedIn = false;
    if (isEmailInputValid && isPasswordInputValid) {
      const inputtedCredentials: UserSignIn = {
        email: emailInput,
        password: passwordInput,
      };
      if (typeOfSignIn === "signup") {
        if (isUsernameInputValid) {
          const newUserId = await signUpUser(inputtedCredentials);
          if (newUserId) {
            userSignedIn = true;
          }
          const newUser: QuizUsersInfo = {
            numberOfQuizzesPlayed: 0,
            overallQuizPoints: 0,
            overallRanking: 0,
            userName: userNameInput,
            user_id: newUserId!,
          };
          // ! the authenticated user is not making the new User
          addQuizUserInfo(newUser);
        }
      } else if (typeOfSignIn === "login") {
        userSignedIn = await signInUser(inputtedCredentials);
      }
    }
    if (userSignedIn) {
      reset();
    }
  };

  return (
    <div>
      <div className={"container " + activeClass} id="container">
        <div className={typeOfSignIn + " form-container sign-up-container"}>
          <form action="#">
            <h1>Create Account</h1>
            <div className="social-container">
              <FacebookIcon className="social" />
              <InstagramIcon className="social" />
              <TwitterIcon className="social" />
            </div>
            <span>or use your email for registration</span>
            <TextFieldWithValidation
              label="Create Account Email"
              inputProps={{
                placeholder: "ab@bing.net",
                value: emailInput,
                type: "text",
                onChange: (e: {
                  target: { value: SetStateAction<string> };
                }) => {
                  setEmailInput(e.target.value);
                },
              }}
              errorMessage={emailErrorMessage}
              shouldDisplayError={!isEmailInputValid && isSubmitted}
            />
            <TextFieldWithValidation
              label="Create Account Password"
              inputProps={{
                placeholder: "Password1!",
                value: passwordInput,
                type: "password",
                onChange: (e: {
                  target: { value: SetStateAction<string> };
                }) => {
                  setPasswordInput(e.target.value);
                },
              }}
              errorMessage={passwordErrorMessage}
              shouldDisplayError={!isPasswordInputValid && isSubmitted}
            />
            <TextFieldWithValidation
              label="Create Account Username"
              inputProps={{
                placeholder: "MasterQuiz1",
                value: userNameInput,
                type: "text",
                onChange: (e: {
                  target: { value: SetStateAction<string> };
                }) => {
                  setUserNameInput(e.target.value);
                },
              }}
              errorMessage={usernameErrorMessage}
              shouldDisplayError={!isUsernameInputValid && isSubmitted}
            />
            <button onClick={(e) => handleSignInSubmit(e)}>Sign Up</button>
          </form>
        </div>
        <div className={typeOfSignIn + " form-container sign-in-container"}>
          <form action="#">
            <h1>Sign in</h1>
            <div className="social-container">
              <FacebookIcon className="social" />
              <InstagramIcon className="social" />
              <TwitterIcon className="social" />
            </div>
            <span>or use your account</span>
            <TextFieldWithValidation
              label="Log In Email"
              inputProps={{
                placeholder: "ab@bing.net",
                value: emailInput,
                type: "text",
                onChange: (e: {
                  target: { value: SetStateAction<string> };
                }) => {
                  setEmailInput(e.target.value);
                },
              }}
              errorMessage={emailErrorMessage}
              shouldDisplayError={!isEmailInputValid && isSubmitted}
            />
            <TextFieldWithValidation
              label="Log In Password"
              inputProps={{
                placeholder: "Password1!",
                value: passwordInput,
                type: "password",
                onChange: (e: {
                  target: { value: SetStateAction<string> };
                }) => {
                  setPasswordInput(e.target.value);
                },
              }}
              errorMessage={passwordErrorMessage}
              shouldDisplayError={!isPasswordInputValid && isSubmitted}
            />
            <button onClick={(e) => handleSignInSubmit(e)}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={() => handleTypeOfSignIn()}
                className="ghost"
                id="login"
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                onClick={() => handleTypeOfSignIn()}
                className="ghost"
                id="signUp"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
