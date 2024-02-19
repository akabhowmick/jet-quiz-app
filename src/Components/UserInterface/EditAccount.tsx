import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { useAuthContext } from "../../providers/auth-provider";
import {
  isEmailValid,
  isValidPassword,
} from "../FormElements/FormUtils/validations";
import { TextFieldWithValidation } from "../FormElements/FormUtils/TextFieldWithValidation";
import {
  emailErrorMessage,
  passwordErrorMessage,
} from "../FormElements/FormUtils/ErrorMessage";

export const EditAccount = () => {
  const { editUserLogin} = useAuthContext();
  const [open, setOpen] = React.useState<boolean>(false);
  const [emailInput, setEmailInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");
  const isEmailInputValid = isEmailValid(emailInput);
  const isPasswordInputValid = isValidPassword(passwordInput);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const reset = () => {
    setEmailInput("");
    setPasswordInput("");
    setIsSubmitted(false);
  };
  
  const handleEditBtnClick = () => {
    setIsSubmitted(true);
    if (isEmailInputValid && isPasswordInputValid) {
      reset();
      editUserLogin(emailInput, passwordInput);
    }
  };

  return (
    <React.Fragment>
      <Button
        color="neutral"
        endDecorator={<ModeEditIcon  />}
        onClick={() => setOpen(true)}
      >
        
        Edit Account
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
            <ModalClose variant="plain" sx={{ m: 1 }} />
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to edit your account?
            <TextFieldWithValidation
              label="Create Account Email"
              inputProps={{
                placeholder: "ab@bing.net",
                value: emailInput,
                type: "text",
                onChange: (e: {
                  target: { value: React.SetStateAction<string> };
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
                  target: { value: React.SetStateAction<string> };
                }) => {
                  setPasswordInput(e.target.value);
                },
              }}
              errorMessage={passwordErrorMessage}
              shouldDisplayError={!isPasswordInputValid && isSubmitted}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => handleEditBtnClick()}
            >
              Save Changes
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};
