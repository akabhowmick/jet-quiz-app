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
    "src/assets/Avatars/bear.png",
    "src/assets/Avatars/cat.png",
    "src/assets/Avatars/chicken.png",
    "src/assets/Avatars/dog.png",
    "src/assets/Avatars/elephant.png",
    "src/assets/Avatars/fox.png",
    "src/assets/Avatars/giraffe.png",
    "src/assets/Avatars/gorilla.png",
    "src/assets/Avatars/hen.png",
    "src/assets/Avatars/koala.png",
    "src/assets/Avatars/lion.png",
    "src/assets/Avatars/llama.png",
    "src/assets/Avatars/monkey.png",
    "src/assets/Avatars/octopus.png",
    "src/assets/Avatars/owl.png",
    "src/assets/Avatars/panda.png",
    "src/assets/Avatars/penguin.png",
    "src/assets/Avatars/polar-bear.png",
    "src/assets/Avatars/puffer-fish.png",
    "src/assets/Avatars/rabbit.png",
    "src/assets/Avatars/sea-lion.png",
    "src/assets/Avatars/shark.png",
    "src/assets/Avatars/tiger.png",
    "src/assets/Avatars/walrus.png",
    "src/assets/Avatars/weasel.png",
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
