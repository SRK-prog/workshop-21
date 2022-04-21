import { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup.string().required("Name cannot be empty"),
  email: yup.string().email("Invalid Email").required("Email cannot be empty"),
  phone: yup
    .string()
    .length(
      10,
      "Invalid Number Please resend text using a valid 10-digit number"
    )
    .required("Phone number cannot be empty"),
  password: yup
    .string()
    .min(8, "Password cannot be less 8 character")
    .required("password is required"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("confirm password is required"),
});

const Signup = ({setToggle}) => {
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

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/create-user", data);
      res.data && setToggle(false);
    } catch (err) {
      console.log(err)
      setErrorMsg({
        status: true,
        message: "Something went wrong!",
      });
    }
  };
  return (
    <div>
      <div className="container">
        <div className="card">
          <button className="button-84" onClick={() => setToggle(false)}>
            Login
          </button>
          <h2 className="text-center">Register Page</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="card-form">
            <div className="input">
              <TextField
                autoFocus
                type="text"
                id="standard-basic"
                label="Full Name"
                variant="standard"
                {...register("name")}
                helperText={errors?.name?.message}
                error={!!errors.name}
              />
            </div>
            <div className="input">
              <TextField
                type="text"
                label="Email"
                variant="standard"
                {...register("email")}
                helperText={errors?.email?.message}
                error={!!errors.email}
              />
            </div>
            <div className="input">
              <TextField
                type="text"
                label="Mobile No"
                variant="standard"
                {...register("phone")}
                helperText={errors?.phone?.message}
                error={!!errors.phone}
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
            <div className="input">
              <TextField
                type="password"
                label="Confirm Password"
                variant="standard"
                {...register("confirmpassword")}
                helperText={errors?.confirmpassword?.message}
                error={!!errors.confirmpassword}
              />
            </div>
            {errorMsg.status && (
              <div className="error-message">{errorMsg.message}</div>
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

export default Signup;
