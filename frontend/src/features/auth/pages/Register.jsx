import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hook/useauth";

function Register() {
  const navigate = useNavigate();
  const { loading, handleregister } = useAuth();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    seterror("");
    const registrationresult = await handleregister({
      username,
      email,
      password,
    });
    if (registrationresult === true) {
      navigate("/login");
    } else {
      seterror(registrationresult);
    }
  };

  if (loading) {
    return (
      <main>
        <h1>Loading.....</h1>
      </main>
    );
  }

  return (
    <>
      <main>
        <div className="form-container">
          <h1>Register</h1>
          {error && <p role="alert">{error}</p>}
          <form onSubmit={handlesubmit}>
            <div className="input-group">
              <label htmlFor="username">username</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={(e) => setusername(e.target.value)}
                placeholder="enter your username"
              ></input>
            </div>
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
