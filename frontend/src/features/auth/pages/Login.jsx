import React from "react";
import "../auth.form.scss";
import { useNavigate, Link } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const handlesubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <main>
        <div className="form-container">
          <h1>Login</h1>
          <form onSubmit={handlesubmit}>
            <div className="input-group">
              <label htmlFor="username">username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="enter your username"
              ></input>
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="enter your email"
              ></input>
            </div>

            <div className="input-group">
              <label htmlFor="password">password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="enter your password"
              ></input>
            </div>

            <button className="button primary-button">Login</button>
          </form>

          <p>
            dont have an account? <Link to={"/Register"}>Register</Link>
          </p>
        </div>
      </main>
    </>
  );
}
export default Login;
