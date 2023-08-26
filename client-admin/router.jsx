import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "./views/LoginPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) throw redirect("/");
      return null;
    },
  },
]);

export default router;
