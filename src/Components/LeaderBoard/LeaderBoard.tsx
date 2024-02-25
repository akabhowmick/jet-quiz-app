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
import { useQuizUserInfoContext } from "../../providers/quiz-user-info-provider";
import { ThreeCircles } from "react-loader-spinner";

export const Leaderboard = () => {
  const {
    leaderBoardUsers,
    leaderBoardUsersLoading,
    leaderBoardUsersLoadingError,
  } = useQuizUserInfoContext();

  const loading = (
    <ThreeCircles
      visible={true}
      height="50"
      width="50"
      color="#4fa94d"
      ariaLabel="three-circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );

  return (
    <div className="leaderboard-table">
      <Typography variant="h4" gutterBottom>
        Game Leaderboard
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Player</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          {leaderBoardUsersLoading && (
            <TableBody>
              <TableRow key="loading">
                <TableCell>{loading}</TableCell>
                <TableCell>{loading}</TableCell>
                <TableCell>{loading}</TableCell>
              </TableRow>
            </TableBody>
          )}
          {leaderBoardUsersLoadingError && (
            <TableBody>
              <TableRow key="error">
                <TableCell>Not Found</TableCell>
                <TableCell>Not Found</TableCell>
                <TableCell>Not Found</TableCell>
              </TableRow>
            </TableBody>
          )}
          <TableBody>
            {leaderBoardUsers.map((player, index: number) => (
              <TableRow key={player.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{player.userName}</TableCell>
                <TableCell>{player.overallQuizPoints}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
