import { useState } from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { EnterQuizInfo } from "./EnterQuizInfo";
import { Quiz } from "../../types/interfaces";

export const EditQuiz = ({ quizToEdit, canModify }: { quizToEdit: Quiz, canModify: boolean }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        disabled={!canModify}
        color="warning"
        endDecorator={<ModeEditIcon />}
        onClick={() => setOpen(true)}
      >
        Edit
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
            Are you sure you want to edit your quiz?
            <EnterQuizInfo role={"edit"} currentQuiz={quizToEdit} onClose={() => setOpen(false)}/>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </>
  );
};
