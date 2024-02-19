import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { useQuizUserInfoContext } from "../../providers/quiz-user-info-provider";

export const ResetAccount = () => {
  const { editQuizUserInfo } = useQuizUserInfoContext();
  const [open, setOpen] = React.useState<boolean>(false);

  const handleResetBtnClick = async () => {
    await editQuizUserInfo(0, 0);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        color="danger"
        endDecorator={<DeleteForever />}
        onClick={() => setOpen(true)}
      >
        Reset Account
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
            Are you sure you want to reset your account?
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => handleResetBtnClick()}
            >
              Reset Account
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
