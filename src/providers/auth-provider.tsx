import { User } from "@supabase/supabase-js";
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import swal from "sweetalert";
import { signOutUserSupabase } from "../api/QuizAuthRequests/LogoutUser";
import { signInUserSupabase } from "../api/QuizAuthRequests/SignInUser";
import { signUpUserSupabase } from "../api/QuizAuthRequests/SignUpUser";
import { updateUserSupabase } from "../api/QuizAuthRequests/UpdateUser";
import { supabase } from "../api/supabase-requests";
import { UserSignIn } from "../types/interfaces";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  signUpUser: (user: UserSignIn) => Promise<string | undefined>;
  signInUser: (user: UserSignIn) => Promise<boolean>;
  editUserLogin: (password: string) => Promise<void>;
  logOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const setLocalStorage = (user: User) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setLoggedIn(true);
    }
  };

  const checkUserSession = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
    setLoggedIn(true);
  };

  const logOutUser = async () => {
    const { error } = await signOutUserSupabase();
    if (!error) {
      setUser(null);
      setLoggedIn(false);
      localStorage.removeItem("user");
    }
  };
  
  useEffect(() => {
    checkUserSession();
  }, []);

  const signUpUser = async (userInfo: UserSignIn) => {
    const { data, error } = await signUpUserSupabase(
      userInfo.email,
      userInfo.password
    );
    if (error) {
      swal("Sign up error!", `Invalid credentials: ${error.message}`, "error");
    }
    if (data.user) {
      setLocalStorage(data.user);
      setUser(data.user);
      return data!.user?.id;
    }
  };

  const signInUser = async (userInfo: UserSignIn) => {
    const { data, error } = await signInUserSupabase(
      userInfo.email,
      userInfo.password
    );
    if (data.user) {
      setLocalStorage(data.user);
      return true;
    } else {
      swal("Sign in error!", `Invalid credentials: ${error?.message}`, "error");
      return false;
    }
  };

  const editUserLogin = async (password: string) => {
    const { data, error } = await updateUserSupabase(password);
    if (data.user) {
      setLocalStorage(data.user);
    }
    if (error) {
      swal("Update error!", `Update Error: ${error.message}`, "error");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loggedIn,
        setLoggedIn,
        signUpUser,
        signInUser,
        editUserLogin,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);

