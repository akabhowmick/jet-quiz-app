import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export const UserInstructions = () => {
  const instructions = [
    {
      title: "Play Game",
      description: "Play a quiz made by another user and earn points!",
    },
    {
      title: "Edit Quiz",
      description:
        "Edit one of the quizzes you made by changing the question, time limit, and answers",
    },
    { title: "Delete Quiz", description: "Delete a quiz made by you " },
    { title: "Profile", description: "View your profile statistics" },
    { title: "Add a quiz", description: "Make a new quiz" },
    { title: "Leaderboard", description: "View top users by points" },
  ];

  return (
    <div className="user-instructions-table">
      <Typography variant="h4" gutterBottom>
        User Instructions
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Player</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instructions.map((instruction, index: number) => (
              <TableRow key={index}>
                <TableCell>{instruction.title}</TableCell>
                <TableCell>{instruction.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
