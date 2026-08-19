import { useState } from "react";
import "../auth.form.scss";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hook/useauth";

function Login() {
  const navigate = useNavigate();
  const { loading, handlelogin } = useAuth();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const isloggedin = await handlelogin({ email, password });
    if (isloggedin) {
      navigate("/");
    }
  };

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  if (loading) {
    return (
      <main>
        <h1>Loading.....</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handlesubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setemail(e.target.value)}
              placeholder="enter your email"
            ></input>
          </div>

          <div className="input-group">
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setpassword(e.target.value)}
              placeholder="enter your password"
            ></input>
          </div>

          <button className="button primary-button">Login</button>
        </form>

        <p>
          dont have an account<Link to={"/register"}>Register</Link>
        </p>
      </div>
    </main>
  );
}
export default Login;
