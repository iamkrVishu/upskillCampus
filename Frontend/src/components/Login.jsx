import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [authUser, setAuthUser] = useAuth();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post("http://localhost:4001/user/login", userInfo);
      if (response.data) {
        toast.success("Logged in Successfully");
        setAuthUser(response.data.user); // Update auth state with user data
        localStorage.setItem("Users", JSON.stringify(response.data.user)); // Save user data in localStorage
        document.getElementById("my_modal_3").close(); // Close modal
      }
    } catch (err) {
      if (err.response) {
        console.error("Login Error:", err);
        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg">Login</h3>
            {/* Email */}
            <div className="mt-4 space-y-2">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("email", { required: "This field is required" })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="mt-4 space-y-2">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("password", { required: "This field is required" })}
              />
              {errors.password && (
                <span className="text-sm text-red-500">{errors.password.message}</span>
              )}
            </div>

            {/* Button */}
            <div className="flex justify-around mt-6">
              <button
                type="submit"
                className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200"
              >
                Login
              </button>
              <p>
                Not registered?{" "}
                <Link to="/signup" className="underline text-blue-500 cursor-pointer">
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
