import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext'; // Assuming you have a theme context
import Navbar from '../components/Navbar'; // Importing Navbar component
import Footer from '../components/Footer'; // Importing Footer component
import axios from 'axios';

const CreateBlogPage = () => {
  const { theme } = useTheme(); // Get the current theme from the context
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const [blogs, setBlogs] = useState([]); // State to store the list of blogs

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = { title, image, content, introduction };

    try {
      const response = await axios.post('http://localhost:2345/blog', newBlog);
      if (response.status === 200) {
        setIsSuccess(true);
        setMessage('Blog created successfully!');
        // Prepend the new blog to the top of the blogs list
        setBlogs([response.data, ...blogs]);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('Error creating blog. Please try again.');
    }
  };

  return (
    <div className={`${theme === 'light' ? 'bg-white text-gray-800' : 'bg-slate-900 text-white'} min-h-screen`}>
      <Navbar /> {/* Include Navbar */}
      
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">Create a New Blog</h1>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${theme === 'light' ? 'bg-white' : 'bg-slate-800'} w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <input
            type="text"
            placeholder="Blog Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={`${theme === 'light' ? 'bg-white' : 'bg-slate-800'} w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <textarea
            placeholder="Introduction"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            className={`${theme === 'light' ? 'bg-white' : 'bg-slate-800'} w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`${theme === 'light' ? 'bg-white' : 'bg-slate-800'} w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600">
            Create Blog
          </button>
        </form>
        
        {message && (
          <div className={`mt-4 p-3 ${isSuccess ? 'bg-green-500' : 'bg-red-500'} text-white rounded`}>
            {message}
          </div>
        )}

        {/* Display the list of blogs */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">All Blogs</h2>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog.id} className="p-4 mb-4 border rounded bg-gray-100 dark:bg-slate-800">
                <h3 className="text-xl font-semibold">{blog.title}</h3>
                <p>{blog.introduction}</p>
                <img src={blog.image} alt="Blog" className="mt-2 w-full h-48 object-cover" />
              </div>
            ))
          ) : (
            <p>No blogs available yet.</p>
          )}
        </div>
      </div>
      
      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default CreateBlogPage;
