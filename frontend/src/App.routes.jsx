import { createBrowserRouter } from "react-router-dom";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Home from "./features/interview/pages/Home";
import Interview from "./features/interview/pages/Interview";
import TechnicalQuestions from "./features/interview/pages/TechnicalQuestions";
import BehavioralQuestions from "./features/interview/pages/BehavioralQuestions";
import SkillGaps from "./features/interview/pages/Skillsgaps";
import RoadMap from "./features/interview/pages/RoadMap";
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
        <Home />
      </Protected>
    ),
  },

  {
    path: "/interview/:interviewid",
    element: (
      <Protected>
        <Interview />
      </Protected>
    ),

    children: [
      {
        path: "technical",
        element: <TechnicalQuestions />,
      },

      {
        path: "behavioral",
        element: <BehavioralQuestions />,
      },

      {
        path: "skills",
        element: <SkillGaps />,
      },

      {
        path: "roadmap",
        element: <RoadMap />,
      },
    ],
  },
]);

export { router };
