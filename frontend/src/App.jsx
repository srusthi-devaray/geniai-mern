import { RouterProvider } from "react-router-dom";
import { router } from "./App.routes.jsx";
import { AuthProvider } from "./features/auth/services/Auth.contex.jsx";
import { interviewProvider } from "./features/interview/interivew.context.jsx";
function App() {
  return (
    <>
      <AuthProvider>
        <interviewProvider>
          <RouterProvider router={router} />
        </interviewProvider>
      </AuthProvider>
    </>
  );
}

export default App;
