import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import '../styles/SignUp.css';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(data);
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/sign-in");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign Up</h1>
      <div>
        <label>Username</label>
        <input {...register("username", { required: true, minLength: 3, maxLength: 20 })} />
        {errors.username && <p>Username must be 3-20 characters.</p>}
      </div>
      <div>
        <label>Email</label>
        <input {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
        {errors.email && <p>Invalid email address.</p>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register("password", { required: true, minLength: 6, maxLength: 40 })} />
        {errors.password && <p>Password must be 6-40 characters.</p>}
      </div>
      <div>
        <label>Repeat Password</label>
        <input type="password" {...register("repeatPassword", { validate: (value) => value === watch("password") })} />
        {errors.repeatPassword && <p>Passwords must match.</p>}
      </div>
      <div>
        <label>Avatar URL</label>
        <input {...register("avatar", { required: true, pattern: /(https?:\/\/.*\.(?:png|jpg|jpeg))/i })} />
        {errors.avatar && <p>Invalid image URL.</p>}
      </div>
      <div>
        <label>
          <input type="checkbox" {...register("consent", { required: true })} /> I agree to the terms
        </label>
        {errors.consent && <p>You must agree to the terms.</p>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;