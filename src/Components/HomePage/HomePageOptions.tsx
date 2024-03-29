import { useQuizUserInfoContext } from "../../providers/quiz-user-info-provider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";

export const HomePageOptions = () => {
  const { selectedIndex, setSelectedIndex, homePageDisplayOptions } =
    useQuizUserInfoContext();

  const handleListItemClick = (option: string) => {
    setSelectedIndex(option);
  };

  return (
    <List
      id="list-home-options"
      orientation="horizontal"
      aria-label="Home options menu bar"
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
      {homePageDisplayOptions.map((option) => (
        <ListItem key={option} id={selectedIndex === option ? "active-tab" : ""}>
          <ListItemButton onClick={() => handleListItemClick(option)}>
            {option}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
