import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [toggle, setToggle] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPass] = useState("");
  const [error, setError] = useState({ bool: false, message: "" });
  const [success, setSuccess] = useState({ sucbool: false, msg: "" });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (name === "") {
      setError({ bool: true, message: "Name cannot be empty" });
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError({ bool: true, message: "Invalid Email" });
    } else if (phone.length !== 10) {
      setError({
        bool: true,
        message:
          "Invalid Number Please resend text using a valid 10-digit number",
      });
    } else if (password.length < 8) {
      setError({
        bool: true,
        message: "Password cannot be less 8 character",
      });
    } else if (confirmpassword !== password) {
      setError({
        bool: true,
        message: "Password did not match",
      });
    } else {
      try {
        const res = await axios.post("http://localhost:5000/create-user", {
          name,
          email,
          password,
          phone,
        });
        res.data && togglehandler();
      } catch (err) {
        setError({
          bool: true,
          message: "Something went wrong!",
        });
      }
    }
  };

  const togglehandler = () => {
    setToggle(!toggle);
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPass("");
    setError({ bool: false });
    setSuccess({ sucbool: false });
  };

  const Signup = () => {
    return (
      <div>
        <div className="container">
          <div className="card">
            <button className="button-84" onClick={togglehandler}>
              Login
            </button>
            <h2 style={{ textAlign: "center" }}>Register Page</h2>
            <form onSubmit={submitHandler} className="card-form">
              <div className="input">
                <input
                  type="text"
                  className="input-field"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className="input-label">Full name</label>
              </div>
              <div className="input">
                <input
                  type=""
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="input-label">Email</label>
              </div>
              <div className="input">
                <input
                  value={phone}
                  type="number"
                  pattern="[0-9]*"
                  className="input-field"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label className="input-label">Phone No</label>
              </div>
              <div className="input">
                <input
                  type="password"
                  value={password}
                  className="input-field"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="input-label">Password</label>
              </div>
              <div className="input">
                <input
                  type="password"
                  className="input-field"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
                <label className="input-label">Confirm Password</label>
              </div>
              {error.bool && (
                <div
                  style={{
                    color: "red",
                    marginBlock: "10px",
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  {error.message}
                </div>
              )}
              <div className="action"></div>
              <button type="submit" className="action-button">
                Register
              </button>
            </form>
            <div className="card-info">
              <p>By signing up you are agreeing to our terms and Conditions</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login-user", {
        email,
        password,
      });
      res.data && setSuccess({ sucbool: true, msg: "Login Successfully!" });
    } catch (err) {
      setError({
        bool: true,
        message: "Invalid credentials. Please try again.",
      });
    }
  };

  const Login = () => {
    return (
      <div>
        <div className="container">
          <div className="card">
            <button className="button-84" onClick={togglehandler}>
              SignUp
            </button>
            <h2 style={{ textAlign: "center" }}>Login Page</h2>
            {success.sucbool && (
              <div>
                <div className="card-image">
                  <h2
                    style={{
                      color: "green",
                      marginBlock: "10px",

                      textAlign: "center",
                    }}
                    className="card-heading"
                  >
                    {success.msg}
                    <small>Get started</small>
                  </h2>
                </div>
              </div>
            )}

            {!success.sucbool && (
              <form onSubmit={loginHandler} className="card-form">
                <div className="input">
                  <input
                    type="email"
                    value={email}
                    className="input-field"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="input-label">Email</label>
                </div>
                <div className="input">
                  <input
                    type="password"
                    required
                    value={password}
                    className="input-field"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="input-label">Password</label>
                </div>
                {error.bool && (
                  <div
                    style={{
                      color: "red",
                      marginBlock: "10px",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                  >
                    {error.message}
                  </div>
                )}
                <div className="action">
                  <button type="submit" className="action-button">
                    Get started
                  </button>
                </div>
              </form>
            )}
            <div className="card-info">
              <p>By signing up you are agreeing to our terms and Conditions</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <>{toggle ? Signup() : Login()}</>;
}

export default App;
