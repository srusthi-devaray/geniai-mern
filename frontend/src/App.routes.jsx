import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/Register";

const router = createBrowserRouter([
  {
    path: "/login",

    element: <Login />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
]);

export { router };
