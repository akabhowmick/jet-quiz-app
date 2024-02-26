import {
  createBrowserRouter,
  createRoutesFromElements,
  redirect,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./styles/App.css";
import "./styles/Responsive.css";
import { HomePage } from "./Components/HomePage/HomePage";
import { Logout } from "./Components/Logout/Logout";
import { QuizGame } from "./Components/Quiz/QuizGame";
import { SignIn } from "./Components/SignIn/SignIn";
import { ProfilePage } from "./Components/UserInterface/ProfilePage";
import RootLayout from "./layouts/RootLayout";
import { useAuthContext } from "./providers/auth-provider";
import { QuizProvider } from "./providers/quiz-provider";
import { QuizUserInfoProvider } from "./providers/quiz-user-info-provider";
import { NotFound } from "./Components/NotFound/NotFound";

function App() {
  const { user, userLoading } = useAuthContext();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          loader={() => {
            if (!user && !userLoading) return redirect("/signup");
            return null;
          }}
          element={<HomePage />}
        />
        <Route path="signup" element={<SignIn />} />
        <Route
          path="profile"
          loader={() => {
            if (!user && !userLoading) return redirect("/signup");
            return null;
          }}
          element={<ProfilePage />}
        />
        <Route path="logout" element={<Logout />} />
        <Route path="/play/:quizId" element={<QuizGame />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <QuizUserInfoProvider user={user}>
      <QuizProvider user={user}>
        <div className="main-div">
          <RouterProvider router={router} />
        </div>
      </QuizProvider>
    </QuizUserInfoProvider>
  );
}

export default App;
