/* eslint-disable no-useless-escape */
export const isEmailValid = (emailAddress: string) => {
  const emailRegex =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return emailRegex.test(emailAddress);
};

export const isValidPassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-#$^+_!*()@%&]).{8,20}$/gm;
  return passwordRegex.test(password);
};

export const isValidQuizQuestion = (question: string) => {
  return question.length > 10;
};

export const isValidPositiveInteger = (numberInput: number) => {
  return numberInput > 0 && Number.isInteger(numberInput) && numberInput < 200;
};

export const isValidAnswerArray = (answerArray: string[]) => {
  return answerArray.every((element) => element.trim() !== "");
};

export const isValidUserName = (userName: string) => {
  const passwordRegex = /^(?=.*\d).{7,}$/;
  return passwordRegex.test(userName);
};

export const isValidAvatar = (pathToImage: string) => {
  return pathToImage.length > 0 && pathToImage;
};

export const isValidQuizTag = (tagsArray: string[]) => {
  return tagsArray.length > 0;
};
