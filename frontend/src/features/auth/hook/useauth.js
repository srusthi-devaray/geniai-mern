import { useContext } from "react";
import { AuthContext } from "../services/Auth.contex";
import { login, register, logout } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setuser, loading, setloading } = context;

  const handlelogin = async ({ email, password }) => {
    setloading(true);

    try {
      const data = await login({ email, password });
      setuser(data.user);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      setloading(false);
    }
  };

  const handleregister = async ({ username, email, password }) => {
    setloading(true);
    try {
      const data = await register({ username, email, password });
      setuser(data.user);
      return true;
    } catch (err) {
      console.log(err);
      return err.response?.data?.message || "Unable to register";
    } finally {
      setloading(false);
    }
  };

  const handlelogout = async () => {
    setloading(true);
    await logout();
    setuser(null);
    setloading(false);
  };
  return { loading, user, handlelogin, handlelogout, handleregister };
};
