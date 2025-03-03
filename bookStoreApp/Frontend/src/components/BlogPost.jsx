import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';

const BlogPost = ({ blog }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 1000));
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(likes + (liked ? -1 : 1));
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, { user: 'You', text: comment }]);
      setComment('');
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-xl mb-8 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6 }}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={`https://api.dicebear.com/6.x/micah/svg?seed=${blog.author}`}
            alt={blog.author}
            className="w-10 h-10 rounded-full mr-3"
          />
          <span className="font-semibold text-gray-800">{blog.author}</span>
        </div>
        <Bookmark className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors duration-300" />
      </div>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full aspect-square object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <button onClick={handleLike} className="focus:outline-none">
              <Heart className={`${liked ? 'text-red-500 fill-current' : 'text-gray-500'} hover:text-red-500 transition-colors duration-300`} />
            </button>
            <button onClick={() => setShowComments(!showComments)} className="focus:outline-none">
              <MessageCircle className="text-gray-500 hover:text-blue-500 transition-colors duration-300" />
            </button>
            <Share2 className="text-gray-500 hover:text-green-500 cursor-pointer transition-colors duration-300" />
          </div>
          <span className="text-sm font-semibold text-gray-600">{likes} likes</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{blog.introduction}</p>
        <Link to={`/blog/${blog._id}`} className="text-blue-500 font-bold hover:text-blue-700 transition-colors duration-300">
          Read More
        </Link>
        {showComments && (
          <div className="mt-4">
            <h4 className="font-semibold text-gray-700 mb-2">Comments</h4>
            {comments.map((comment, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-2 mb-2">
                <span className="font-semibold">{comment.user}: </span>
                {comment.text}
              </div>
            ))}
            <form onSubmit={handleComment} className="mt-2 flex">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors duration-300">
                Post
              </button>
            </form>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BlogPost;

