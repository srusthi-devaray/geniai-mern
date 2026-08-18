import { useContext } from "react";
import { AuthContext } from "../services/Auth.contex";
import { login, register, logout, getme } from "../services/auth.api";

export const useauth = () => {
  const context = useContext(AuthContext);
  const { user, setuser, loading, setloading } = context;

  const handlelogin = async ({ email, password }) => {
    setloading(true);
    const data = await login({ email, password });
    setuser(data.user);
    setloading(false);
  };

  const handleregister = async ({ email, user, password }) => {
    setloading(true);
    const data = await register({ user, email, password });
    setuser(data.user);
    setloading(false);
  };

  const handlelogout = async () => {
    setloading(true);
    const data = await logout();
    setuser(null);
    setloading(false);
  };
  return { loading, user, handlelogin, handlelogout, handleregister };
};
