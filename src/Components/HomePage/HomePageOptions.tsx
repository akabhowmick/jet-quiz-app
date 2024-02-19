import { useQuizUserInfoContext } from "../../providers/quiz-user-info-provider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";

export const HomePageOptions = () => {
  const { setSelectedIndex, homePageDisplayOptions } = useQuizUserInfoContext();

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <List
      className="list-home-options"
      orientation="horizontal"
      aria-label="Example application menu bar"
      role="menubar"
      data-joy-color-scheme="dark"
      sx={{
        bgcolor: "lightblue",
        borderRadius: "4px",
        maxWidth: "fit-content",
        padding: "10px",
        margin: "0 auto",
      }}
    >
      {homePageDisplayOptions.map((option, index) => (
        <ListItem key={index}>
          <ListItemButton onClick={() => handleListItemClick(index)}>
            {option}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
