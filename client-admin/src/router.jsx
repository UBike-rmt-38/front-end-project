import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "./views/LoginPage";
import Layout from "./components/Layout";
import HomePage from "./views/HomePage";
import AddProductPage from "./views/AddStationPage";
import BicyclesListPage from "./views/BicyclesListPage";
import AddBicyclePage from "./views/AddBicyclePage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) throw redirect("/login");
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/addstation",
        element: <AddProductPage />,
      },
      {
        path: "/bicycles",
        element: <BicyclesListPage />
      },
      {
        path: "/form",
        element: <AddBicyclePage />
      },
      {
        path: "/form/:id",
        element: <AddBicyclePage />
      }

    ],
  },
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
