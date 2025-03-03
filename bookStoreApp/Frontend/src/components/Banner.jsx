import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Changed to useNavigate
import Image from "../../public/Banner.png";
import { motion } from "framer-motion";

const fadeInAnimation = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
function splitTextIntoSpans(text) {
  return text.split(/\s+/).map((word, index) => (
    <motion.span
      key={index}
      className="inline-block mr-4" // Apply margin here for spacing between words
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {word}
    </motion.span>
  ));
}


export default function Banner() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Updated to useNavigate
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      navigate("/signup"); // Updated to navigate
    }
  };

  return (
    <div className="max-w-screen-2xl container mx- px-4 md:px-20 my-10 flex flex-col md:flex-row items-center relative overflow-hidden mt-16">
      <style jsx global>{`
        ${fadeInAnimation}
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s forwards;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2 flex flex-col items-start space-y-6 mt-12 mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          <span className="text-gradient bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mr-2">
            {splitTextIntoSpans("Explore the World  By reading Books ")
            
            }
          </span>
          
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl leading-relaxed max-w-lg"
        >
          "Discover your next great read with BookStore. Our app offers a curated selection of books tailored to your interests, from the latest bestsellers to timeless classics. Enjoy a seamless browsing experience, personalized recommendations, and easy access to your favorite titles—all in one place."
        </motion.p>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-md flex flex-col sm:flex-row gap-4"
        >
          <label className="flex-grow flex items-center border border-gray-300 rounded-lg bg-white p-2 focus-within:ring-2 focus-within:ring-blue-500 transition duration-300 shadow-md hover:shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-gray-400"
            >
              <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
              <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
            </svg>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ml-2 bg-transparent text-black placeholder-gray-500 focus:outline-none flex-grow"
              placeholder="Enter your email"
              required
            />
          </label>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-lg transform transition duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Get Started
          </motion.button>
        </motion.form>
      </motion.div>
      <div className="w-full md:w-1/2 flex justify-center mt-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-full filter blur-3xl opacity-70 animate-pulse"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
          className="relative z-10"
        >
          <img
            src={Image}
            alt="Book Banner"
            width={400}
            height={400}
            className="rounded-btn shadow-2xl animate-float"
          />
        </motion.div>
      </div>
    </div>
  );
}
