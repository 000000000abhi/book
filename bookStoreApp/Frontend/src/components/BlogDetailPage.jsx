import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, ArrowLeft } from 'lucide-react';
import AuthorInfo from '../components/AuthorInfo';

const BlogDetailPage = () => {
  const [blog, setBlog] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:2345/blog/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-indigo-500">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden"
      >
        <div className="relative">
          <img src={blog.image} alt={blog.title} className="w-full h-96 object-cover" />
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black to-transparent">
            <Link to="/" className="text-white hover:text-indigo-200 transition-colors duration-300 flex items-center">
              <ArrowLeft className="mr-2" size={20} />
              Back to blogs
            </Link>
          </div>
        </div>
        <div className="p-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {blog.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8"
          >
            <AuthorInfo author={blog.author} date={blog.createdAt} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl text-gray-700 mb-8 leading-relaxed"
          >
            {blog.introduction}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="prose max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          <div className="flex justify-between items-center border-t pt-8">
            <div className="flex space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 ${
                  isLiked ? 'text-red-500' : 'text-gray-500'
                } hover:text-red-500 transition-colors duration-300`}
              >
                <Heart className={isLiked ? 'fill-current' : ''} size={24} />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-500 transition-colors duration-300">
                <MessageCircle size={24} />
                <span>Comment</span>
              </button>
            </div>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors duration-300">
              <Share2 size={24} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogDetailPage;

