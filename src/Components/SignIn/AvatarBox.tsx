import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import { SetStateAction, useState } from "react";

const AvatarBox = ({
  setSelectedAvatar,
}: {
  setSelectedAvatar: React.Dispatch<SetStateAction<string>>;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const avatars = [
    "src/assets/bear.png",
    "src/assets/cat.png",
    "src/assets/chicken.png",
    "src/assets/dog.png",
    "src/assets/elephant.png",
    "src/assets/fox.png",
    "src/assets/giraffe.png",
    "src/assets/gorilla.png",
    "src/assets/hen.png",
    "src/assets/koala.png",
    "src/assets/lion.png",
    "src/assets/llama.png",
    "src/assets/monkey.png",
    "src/assets/octopus.png",
    "src/assets/owl.png",
    "src/assets/panda.png",
    "src/assets/penguin.png",
    "src/assets/polar-bear.png",
    "src/assets/puffer-fish.png",
    "src/assets/rabbit.png",
    "src/assets/sea-lion.png",
    "src/assets/shark.png",
    "src/assets/tiger.png",
    "src/assets/walrus.png",
    "src/assets/weasel.png",
  ];

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
