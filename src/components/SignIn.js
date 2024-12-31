import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import '../styles/SignIn.css';

const SignIn = ({ setUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === data.email && user.password === data.password);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/");
    } else {
      alert("Invalid credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign In</h1>
      <div>
        <label>Email</label>
        <input {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
        {errors.email && <p>Invalid email address.</p>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register("password", { required: true })} />
        {errors.password && <p>Password is required.</p>}
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;