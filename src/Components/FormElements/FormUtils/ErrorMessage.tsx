/* eslint-disable react-refresh/only-export-components */
export const firstNameErrorMessage =
  "First name must be at least 2 characters long and contain only letters";
export const lastNameErrorMessage =
  "Last name must be at least 2 characters long and contain only letters";
export const emailErrorMessage = "Email is Invalid";
export const passwordErrorMessage =
  "Enter valid password (8-20 char, 1 lowercase,1 uppercase, 1 number, 1 special character";
export const messageErrorMessage = "Enter a message longer than 20 characters";
export const questionErrorMessage =
  "Enter a question longer than 10 characters";
export const titleErrorMessage = "Enter a title";
export const imageErrorMessage = "Enter an image";
export const tattooStatesErrorMessage = "Enter tattoo location";
export const tattooStylesErrorMessage = "Enter a style(s)";
export const priceErrorMessage = "Enter a price range";
export const userTypeErrorMessage = "Choose a user type";
export const phoneNumberErrorMessage = "Enter a valid phone number";
export const emptyAnswerErrorMessage = "Enter an answer";
export const usernameErrorMessage = "Enter a username that is 7 characters, and only letters, numbers";

export const swalNumberErrorMessage = {
  title: "Error!",
  text: "Enter an integer number greater than zero!",
  icon: "error",
  dangerMode: true,
};

export const ErrorMessage = ({
  message,
  show,
}: {
  message: string;
  show: boolean;
}) => {
  return show ? <div className="error-message">{message}</div> : <div></div>;
};