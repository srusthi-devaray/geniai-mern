import { RouterProvider } from "react-router-dom";
import { router } from "./App.routes.jsx";
import { AuthProvider } from "./features/auth/services/Auth.contex.jsx";

import { InterviewProvider } from "./features/interview/interivew.context.jsx";
function App() {
  return (
    <>
      <AuthProvider>
        <InterviewProvider>
          <RouterProvider router={router} />
        </InterviewProvider>
      </AuthProvider>
    </>
  );
}

export default App;
