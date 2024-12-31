import React from "react";
import { useForm } from "react-hook-form";
import '../styles/Profile.css';

const Profile = ({ user, setUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: user });

  const onSubmit = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    alert("Profile updated successfully.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Edit Profile</h1>
      <div>
        <label>Username</label>
        <input {...register("username", { required: true })} />
        {errors.username && <p>Username is required.</p>}
      </div>
      <div>
        <label>Email</label>
        <input {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
        {errors.email && <p>Invalid email address.</p>}
      </div>
      <div>
        <label>New Password</label>
        <input type="password" {...register("password", { minLength: 6, maxLength: 40 })} />
        {errors.password && <p>Password must be 6-40 characters.</p>}
      </div>
      <div>
        <label>Avatar URL</label>
        <input {...register("avatar", { required: true, pattern: /(https?:\/\/.*\.(?:png|jpg|jpeg))/i })} />
        {errors.avatar && <p>Invalid image URL.</p>}
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default Profile;
