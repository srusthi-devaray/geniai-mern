import React from "react";
import { useNavigate, Link } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const handlesubmit = (e) => {
    e.preventDefault;
    navigate("/login");
  };
  return (
    <>
      <main>
        <div className="form-container">
          <h1>Register</h1>
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

            <button className="button primary-button">Register</button>
          </form>

          <p>
            already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </main>
    </>
  );
}
export default Register;
