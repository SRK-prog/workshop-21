import { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email cannot be empty"),
  password: yup.string().required("Password cannot be empty"),
});

const Login = ({ setToggle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [errorMsg, setErrorMsg] = useState({
    status: false,
    message: "",
  });
  const [success, setSuccess] = useState({ sucbool: false, msg: "" });

  const loginHandler = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/login-user", data);
      res.data && setSuccess({ sucbool: true, msg: "Login Successfully!" });
      console.log(res.data);
    } catch (err) {
      setErrorMsg({
        status: true,
        message: "Invalid credentials. Please try again.",
      });
    }
  };
  return (
    <div>
      <div className="container">
        <div className="card">
          <button className="button-84" onClick={() => setToggle(true)}>
            Register Page
          </button>
          {!success.sucbool && (
            <h2 className="text-center">Login Page</h2>
          )}
          {success.sucbool && (
            <div className="card-image">
              <h2 className="card-heading">
                {success.msg}
                <small>Get started</small>
              </h2>
            </div>
          )}

          {!success.sucbool && (
            <form onSubmit={handleSubmit(loginHandler)} className="card-form">
              <div className="input">
                <TextField
                  type="text"
                  autoFocus
                  label="Email"
                  variant="standard"
                  {...register("email")}
                  helperText={errors?.email?.message}
                  error={!!errors.email}
                />
              </div>
              <div className="input">
                <TextField
                  type="password"
                  label="Password"
                  variant="standard"
                  {...register("password")}
                  helperText={errors?.password?.message}
                  error={!!errors.password}
                />
              </div>
              {errorMsg.status && (
                <div className="error-message">{errorMsg.message}</div>
              )}
              <div className="action">
                <button type="submit" className="action-button">
                  Get started
                </button>
              </div>
            </form>
          )}
          {!success.sucbool && (
            <div className="card-info">
              <p>By signing up you are agreeing to our terms and Conditions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
