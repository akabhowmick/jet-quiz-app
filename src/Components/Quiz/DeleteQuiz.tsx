import { useState } from "react";
import { useQuizContext } from "../../providers/quiz-provider";

import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { DialogActions } from "@mui/joy";
import { Quiz } from "../../types/interfaces";

export const DeleteQuiz = ({
  quizToDelete,
  canModify,
}: {
  quizToDelete: Quiz;
  canModify: boolean;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { deleteQuiz } = useQuizContext();

  const handleDeleteBtnClick = async () => {
    await deleteQuiz(quizToDelete!.id!, quizToDelete);
    setOpen(false);
  };

  return (
    <>
      <Button
        disabled={!canModify}
        variant="outlined"
        color="danger"
        endDecorator={<DeleteForever />}
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="delete-quiz-modal"
        aria-describedby="click-to-delete-quiz"
      >
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
            <ModalClose variant="plain" sx={{ m: 1 }} />
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete your quiz?
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => handleDeleteBtnClick()}
            >
              Delete Forever
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
    </>
  );
};
