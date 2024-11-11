import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/Home/HomePage";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import Project from "./pages/Project/Project";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/Project",
        element: <Project />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Admin",
        element: <Admin />,
      },
    ],
  },
]);
export default router;