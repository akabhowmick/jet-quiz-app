import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import { SetStateAction, useState } from "react";
import { avatars } from "../../Avatars";

const AvatarBox = ({
  setSelectedAvatar,
}: {
  setSelectedAvatar: React.Dispatch<SetStateAction<string>>;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleAvatarClick = (avatar: string) => {
    setSelectedAvatar(avatar);
    setOpen(false);
  };

  return (
    <div className="avatar-selection-container">
      <Button color="primary" onClick={() => setOpen(true)}>
        Choose Avatar Icon!
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            Avatar Box
            <ModalClose variant="plain" sx={{ m: 1 }} />
          </DialogTitle>
          <Divider />
          <DialogContent>
            <div className="animal-icons-grid">
              {avatars.map((avatar, index) => (
                <img
                  className="animal-icon"
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  onClick={() => handleAvatarClick(avatar)}
                />
              ))}
            </div>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </div>
  );
};

export default AvatarBox;
