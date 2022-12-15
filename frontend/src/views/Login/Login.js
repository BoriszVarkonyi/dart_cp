import React from "react";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  //react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //react-router-doms usNavigate hook
  const navigate = useNavigate();

  //onSubmit function, after submit it navigates to the /panel path
  const onSubmit = (data) => {
    console.log(data);
    navigate("/panel")
  };

  //validate rules for the email input
  const emailRules = {
    required: "Please enter your email address!",
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: "Please enter a valid email address!",
    },
  };

  return (
    <div className="LoginForm">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection="column"
        noValidate
      >
        <TextField
          error={!!errors.email}
          helperText={errors?.email?.message}
          label="Email"
          type="text"
          margin="normal"
          size="small"
          variant="filled"
          {...register("email", emailRules)}
        />
        <TextField
          error={!!errors.password}
          helperText={errors?.password?.message}
          label="Password"
          type="password"
          margin="normal"
          size="small"
          variant="filled"
          {...register("password", { required: "Please enter your password!" })}
        />
        <Button variant="contained" type="submit" size="small">
          Login
        </Button>
      </Box>
    </div>
  );
}
