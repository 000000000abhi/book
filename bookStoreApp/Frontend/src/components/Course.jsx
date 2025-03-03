import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";
import { Book, ChevronLeft } from 'lucide-react';

function Course() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get('http://localhost:2345/book/');
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getBook();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900"
    >
      <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 py-12">
        <motion.div
          variants={itemVariants}
          className="text-center mt-28 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 transform hover:scale-105 transition-all duration-300"
        >
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to Our <span className="text-pink-500">Course Collection</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-gray-600 dark:text-gray-300 text-lg"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Explore our extensive range of courses designed to elevate your skills and knowledge. From foundational to advanced topics, our expert-led content ensures a comprehensive learning experience tailored to your needs. Start your educational journey with us and achieve your goals efficiently and effectively.
          </motion.p>
          <Link to="/">
            <motion.button
              className="mt-8 bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="inline-block mr-2" />
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
        
        {loading ? (
          <motion.div
            className="flex justify-center items-center h-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {book.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="transform hover:scale-105 transition-all duration-300"
              >
                <Cards item={item} />
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Book className="inline-block text-pink-500 w-16 h-16 mb-4" />
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Discover the power of knowledge with our carefully curated courses.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Course;

