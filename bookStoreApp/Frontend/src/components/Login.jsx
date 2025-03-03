"use client";

import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [ ,setAuthUser] = useAuth();
  const [isAdminLogin, setIsAdminLogin] = useState(null);

  useEffect(() => {
    if (modalRef.current) {
      if (isModalOpen) {
        modalRef.current.showModal();
      } else {
        modalRef.current.close();
      }
    }
  }, [isModalOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    const userInfo = {
      email: data.email.trim(),
      password: data.password.trim(),
    };

    if (!userInfo.email || !userInfo.password) {
      toast.error("Email and password are required.");
      return;
    }

    try {
      const endpoint = isAdminLogin
        ? "http://localhost:2345/admin/login"
        : "http://localhost:2345/user/login";
      
      const res = await axios.post(endpoint, userInfo, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("API Response:", res.data);
      const userData = res.data.user || res.data.admin; // Accepts either structure

      if (userData) { // Check only userData existence, no need for token check before storage
        toast.success(`Logged in Successfully as ${isAdminLogin ? "Admin" : "User"}`);
        setIsModalOpen(false);
      
        setAuthUser(userData);
        localStorage.setItem("Users", JSON.stringify(userData));
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userEmail", userData.email);
      
        if (isAdminLogin) {
          setTimeout(() => {
            localStorage.removeItem("Users");
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            toast.success("Admin session expired. Logging out.");
            navigate("/");
          }, 600000); // 10 minutes auto-logout for admin
        }
      
        setTimeout(() => {
          navigate(isAdminLogin ? "/admin-dashboard" : "/");
        }, 1000);
      } else {
        console.error("Unexpected API Response:", res.data);
        toast.error("Unexpected response. Please try again.");
      }
      
     
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || "Invalid email or password.";
      toast.error(errorMessage);
    }
  };

  return (
    <dialog ref={modalRef} className="modal p-0 bg-transparent">
      {isAdminLogin === null ? (
        <motion.div className="modal-box bg-gradient-to-br from-purple-600 to-blue-500 p-8 rounded-2xl shadow-2xl max-w-md w-full">
          <h3 className="text-white text-center text-2xl font-bold">Select Login Type</h3>
          <div className="mt-6 flex flex-col gap-4">
            <button onClick={() => setIsAdminLogin(false)} className="w-full bg-white text-purple-600 px-4 py-3 rounded-md font-semibold">Login as User</button>
            <button onClick={() => setIsAdminLogin(true)} className="w-full bg-white text-purple-600 px-4 py-3 rounded-md font-semibold">Login as Admin</button>
          </div>
          <div className="text-center mt-4">
  <p className="text-white">
    Don't have an account?{" "}
    <button
      onClick={() => navigate("/signup")}
      className="underline font-semibold cursor-pointer"
    >
      Sign Up
    </button>
  </p>
</div>

        </motion.div>
      ) : (
        <motion.div className="modal-box bg-gradient-to-br from-purple-600 to-blue-500 p-8 rounded-2xl shadow-2xl max-w-md w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white" onClick={() => setIsModalOpen(false)}>✕</button>
            <h3 className="text-white text-center text-3xl font-bold">{isAdminLogin ? "Admin Login" : "User Login"}</h3>
            
            <div>
              <label className="text-white">Email</label>
              <input type="email" {...register("email", { required: "Email is required" })} className="w-full px-4 py-3 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300" placeholder="Enter your email" />
              {errors.email && <span className="text-red-300">{errors.email.message}</span>}
            </div>

            <div>
              <label className="text-white">Password</label>
              <input type="password" {...register("password", { required: "Password is required" })} className="w-full px-4 py-3 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300" placeholder="Enter your password" />
              {errors.password && <span className="text-red-300">{errors.password.message}</span>}
            </div>
            
            <div className="flex flex-col space-y-4">
              <button type="submit" className="w-full bg-white text-purple-600 rounded-md px-4 py-3 font-semibold">Login</button>
              <button type="button" onClick={() => setIsAdminLogin(null)} className="w-full bg-transparent border border-white text-white rounded-md px-4 py-3 font-semibold">Back</button>
            </div>
          </form>
        </motion.div>
      )}
    </dialog>
  );
}

export default Login;