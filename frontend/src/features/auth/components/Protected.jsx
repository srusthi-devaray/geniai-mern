import { useAuth } from "../hook/useauth";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return <h1>Loading.....</h1>;
  }

  return user ? children : <Navigate to="/login" replace />;
};
export default Protected;
