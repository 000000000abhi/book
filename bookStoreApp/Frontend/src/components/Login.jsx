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
  const [authUser, setAuthUser] = useAuth();
  const [isAdminLogin, setIsAdminLogin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (modalRef.current) {
      if (isModalOpen) {
        modalRef.current.showModal();
      } else {
        modalRef.current.close();
        navigate("/");
      }
    }
  }, [isModalOpen, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    setIsLoading(true);
  
    const userInfo = {
      email: data.email.trim(),
      password: data.password,
    };
  
    if (!userInfo.email || !userInfo.password) {
      toast.error("Email and password are required.");
      setIsLoading(false);
      return;
    }
  
    try {
      const endpoint = isAdminLogin
        ? "http://localhost:2345/admin/login"
        : "http://localhost:2345/user/login";
  
      const res = await axios.post(endpoint, userInfo, {
        headers: { "Content-Type": "application/json" },
      });
  
      const userData = isAdminLogin ? res.data.admin : res.data.user;
      const token = res.data.token || `session-${Date.now()}`;
  
      if (userData) {
        toast.success(`Logged in Successfully as ${isAdminLogin ? "Admin" : "User"}`);
  
        setAuthUser(userData);  // ✅ Now properly updating auth state
  
        localStorage.setItem("Users", JSON.stringify(userData));
        localStorage.setItem("token", token);
        localStorage.setItem("userEmail", userData.email);
        localStorage.setItem("userType", isAdminLogin ? "admin" : "user");
  
        if (isAdminLogin) {
          const existingTimeoutId = localStorage.getItem("adminTimeoutId");
          if (existingTimeoutId) {
            clearTimeout(Number.parseInt(existingTimeoutId, 10));
          }
  
          const adminTimeout = setTimeout(() => {
            localStorage.removeItem("Users");
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userType");
            localStorage.removeItem("adminTimeoutId");
  
            setAuthUser(null);
            toast.success("Admin session expired. Logging out.");
            navigate("/");
          }, 600000);
  
          localStorage.setItem("adminTimeoutId", adminTimeout.toString());
        }
  
        setIsModalOpen(false);
        navigate(isAdminLogin ? "/admin-dashboard" : "/");
      } else {
        toast.error(`No ${isAdminLogin ? "admin" : "user"} data found in response`);
      }
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data?.message || "Authentication failed";
        toast.error(errorMessage);
      } else if (err.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error("Error setting up request: " + err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleBackToSelection = () => {
    setIsAdminLogin(null);
    reset();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <dialog ref={modalRef} className="modal p-0 bg-transparent">
      {isAdminLogin === null ? (
        <motion.div className="modal-box bg-gradient-to-br from-purple-600 to-blue-500 p-8 rounded-2xl shadow-2xl max-w-md w-full">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white"
            onClick={handleCloseModal}
          >
            ✕
          </button>
          <h3 className="text-white text-center text-2xl font-bold">Select Login Type</h3>
          <div className="mt-6 flex flex-col gap-4">
            <button
              onClick={() => setIsAdminLogin(false)}
              className="w-full bg-white text-purple-600 px-4 py-3 rounded-md font-semibold transition hover:bg-opacity-90"
            >
              Login as User
            </button>
            <button
              onClick={() => setIsAdminLogin(true)}
              className="w-full bg-white text-purple-600 px-4 py-3 rounded-md font-semibold transition hover:bg-opacity-90"
            >
              Login as Admin
            </button>
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
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <h3 className="text-white text-center text-3xl font-bold">{isAdminLogin ? "Admin Login" : "User Login"}</h3>

            <div>
              <label className="text-white">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-3 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300"
                placeholder="Enter your email"
              />
              {errors.email && <span className="text-red-300">{errors.email.message}</span>}
            </div>

            <div>
              <label className="text-white">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-4 py-3 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300"
                placeholder="Enter your password"
              />
              {errors.password && <span className="text-red-300">{errors.password.message}</span>}
            </div>

            <div className="flex flex-col space-y-4">
              <button type="submit" disabled={isLoading} className="w-full bg-white text-purple-600 rounded-md px-4 py-3 font-semibold transition hover:bg-opacity-90">
                {isLoading ? "Logging in..." : "Login"}
              </button>
              <button type="button" onClick={handleBackToSelection} className="w-full bg-transparent border border-white text-white rounded-md px-4 py-3 font-semibold transition hover:bg-opacity-80">
                Back
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </dialog>
  );
}

export default Login;
