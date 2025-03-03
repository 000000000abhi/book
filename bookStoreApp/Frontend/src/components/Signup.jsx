"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Signup() {
  const navigate = useNavigate();
  const [isAdminSignup, setIsAdminSignup] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      isAdmin: isAdminSignup,
      adminKey: isAdminSignup ? data.adminKey : null,
    };

    try {
      const res = await axios.post(
        isAdminSignup ? "http://localhost:2345/admin/signup" : "http://localhost:2345/user/signup",
        userInfo
      );

      console.log(res.data);
      if (res.data) {
        toast.success(`Signup Successful as ${isAdminSignup ? "Admin" : "User"}`);
        localStorage.setItem("Users", JSON.stringify(res.data.user));
        navigate("/login", { replace: true });
      }
    } catch (err) {
      if (err.response) {
        console.log(err);
        toast.error("Error: " + err.response.data.message);
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Close Button */}
          <Link
            to="/"
            className="absolute right-4 top-4 text-white text-2xl cursor-pointer"
          >
            ✕
          </Link>

          {/* Signup Header */}
          <motion.h3
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-white text-center text-3xl font-bold mb-6"
          >
            Create an Account
          </motion.h3>

          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-white">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none"
              {...register("fullname", { required: "Full name is required" })}
            />
            {errors.fullname && <span className="text-red-300">{errors.fullname.message}</span>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-white">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <span className="text-red-300">{errors.email.message}</span>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-white">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <span className="text-red-300">{errors.password.message}</span>}
          </div>

          {/* Admin Signup Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="adminSignup"
              checked={isAdminSignup}
              onChange={() => setIsAdminSignup(!isAdminSignup)}
              className="mr-2"
            />
            <label htmlFor="adminSignup" className="text-white text-sm">Register as Admin</label>
          </div>

          {/* Admin Key Field (Only Show When Admin Signup is Checked) */}
          {isAdminSignup && (
            <div className="space-y-2">
              <label className="text-white">Admin Secret Key</label>
              <input
                type="password"
                placeholder="Enter Admin Key"
                className="w-full px-4 py-3 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none"
                {...register("adminKey", { required: isAdminSignup ? "Admin Key is required" : false })}
              />
              {errors.adminKey && <span className="text-red-300">{errors.adminKey.message}</span>}
            </div>
          )}

          {/* Signup Button */}
          <div className="flex flex-col space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-white text-purple-600 rounded-md px-4 py-3 font-semibold transition-all duration-300"
            >
              Sign Up
            </motion.button>

            {/* Login Link */}
            <p className="text-center text-white">
              Already have an account?{" "}
              <Link to="/login" className="underline font-semibold cursor-pointer">
                Login
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Signup;
