import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { ResetAccount } from "./ResetAccount";
import { EditAccount } from "./EditAccount";
import { useQuizUserInfoContext } from "../../providers/quiz-user-info-provider";

export const ProfilePage = () => {
  const { quizUserInfo } = useQuizUserInfoContext();
  const rankingInfo =
    quizUserInfo?.overallRanking === 0
      ? "Play more games to be ranked!"
      : quizUserInfo?.overallRanking;

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: { xs: "auto", sm: "initial" },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          display: "block",
          width: "1px",
          bgcolor: "warning.300",
          left: "500px",
          top: "-24px",
          bottom: "-24px",
          "&::before": {
            top: "4px",
            display: "block",
            position: "absolute",
            right: "0.5rem",
            color: "text.tertiary",
            fontSize: "sm",
            fontWeight: "lg",
          },
          "&::after": {
            top: "4px",
            display: "block",
            position: "absolute",
            left: "0.5rem",
            color: "text.tertiary",
            fontSize: "sm",
            fontWeight: "lg",
          },
        }}
      />
      <Card
        orientation="horizontal"
        sx={{
          width: "100%",
          flexWrap: "wrap",
          [`& > *`]: {
            "--stack-point": "500px",
            minWidth:
              "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
          },
          overflow: "auto",
          resize: "horizontal",
        }}
      >
        <AspectRatio flex objectFit="contain" sx={{ minWidth: 150 }}>
          <img
            src={quizUserInfo?.user_image}
            loading="lazy"
            alt="user-avatar"
          />
        </AspectRatio>
        <CardContent>
          <Typography fontSize="xl" fontWeight="lg">
            {quizUserInfo!.userName}
          </Typography>
          <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
            Jet Trivia Enthusiast
          </Typography>
          <Sheet
            sx={{
              bgcolor: "background.level1",
              borderRadius: "sm",
              p: 1.5,
              my: 1.5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              "& > div": { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Number of Quizzes Played:
              </Typography>
              <Typography fontWeight="lg">
                {quizUserInfo!.numberOfQuizzesPlayed}
              </Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Current Points:
              </Typography>
              <Typography fontWeight="lg">
                {quizUserInfo!.overallQuizPoints}
              </Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Overall Ranking:
              </Typography>
              <Typography fontWeight="lg">{rankingInfo}</Typography>
            </div>
          </Sheet>
          <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
            <EditAccount />
            <ResetAccount />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
