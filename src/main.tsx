import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./providers/auth-provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
