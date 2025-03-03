import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { Home, PlusCircle, Edit, User, Compass, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlogPost from '../components/BlogPost';

const genres = ['All', 'Technology', 'Travel', 'Food', 'Lifestyle', 'Fashion'];

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getGenreForBlog = (index) => {
    if ((index + 1) % 5 === 0) return 'Travel';
    if ((index + 1) % 3 === 0) return 'Technology';
    return 'Food'; // default genre
  };

  const fetchMoreBlogs = async () => {
    if (!hasMore) return;
    try {
      const response = await axios.get(`http://localhost:2345/blog?_page=${page}&_limit=5`);
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        const updatedBlogs = response.data.map((blog, index) => ({
          ...blog,
          genre: getGenreForBlog(index + (page - 1) * 5), // Adjust index based on page
        }));
        setBlogs((prevBlogs) => [...prevBlogs, ...updatedBlogs]);
        setPage((prevPage) => prevPage + 1);
      }
      setIsFetching(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setIsFetching(false);
    }
  };

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreBlogs);

  useEffect(() => {
    fetchMoreBlogs();
  }, []);

  const filteredBlogs = selectedGenre === 'All' 
    ? blogs 
    : blogs.filter(blog => blog.genre === selectedGenre);

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 min-h-screen flex flex-col items-center">
      <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 shadow-md z-10 backdrop-filter backdrop-blur-lg">
        <div className="max-w-4xl mx-auto py-4 px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600">BlogVerse</Link>
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
              <Home size={24} />
            </Link>
            <Link to="/search" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
              <Search size={24} />
            </Link>
            <Link to="/blog/create-blog" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
              <PlusCircle size={24} />
            </Link>
            <Link to="/blog/edit-blog" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
              <Edit size={24} />
            </Link>
            <Link to="/User" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300">
              <User size={24} />
            </Link>
          </div>
        </div>
      </nav>
      <div className="mt-20 w-full max-w-2xl mx-auto pb-20 px-4">
        <div className="mb-8 flex justify-center">
          <div className="bg-white p-2 rounded-full shadow-md flex space-x-2 overflow-x-auto">
            {genres.map(genre => (
              <button
                key={genre}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedGenre === genre
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                } transition-colors duration-300`}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence>
          {filteredBlogs.map((blog) => (
            <BlogPost key={blog._id} blog={blog} />
          ))}
        </AnimatePresence>
        {isFetching && (
          <div className="flex justify-center items-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}
        {!hasMore && !isFetching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white text-lg font-semibold mt-8 bg-indigo-600 bg-opacity-80 rounded-lg py-3 px-6 shadow-lg"
          >
            You've reached the end of your feed
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;
