import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";

const router = createBrowserRouter([
  {
    path: "/login",

    element: <Login />,
  },
  {
    path: "/Register",
    element: <Register />,
  },

  {
    path: "/",
    element: (
      <Protected>
        <h1>
          <Home />
        </h1>
      </Protected>
    ),
  },

  {
    path: "/interview/:interviewid",
  },
]);

export { router };
