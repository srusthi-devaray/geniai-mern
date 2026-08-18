import { RouterProvider } from "react-router-dom";
import { router } from "./App.routes.jsx";
import { AuthProvider } from "./features/auth/services/Auth.contex.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
