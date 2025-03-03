import React from 'react';
import { format } from 'date-fns';

const BlogHistory = ({ posts, theme }) => {
  return (
    <div className="space-y-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className={`p-4 border ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'} rounded-lg`}>
            <h3 className={`text-xl font-semibold mb-2 text-${theme === 'light' ? 'gray-800' : 'gray-200'}`}>{post.title}</h3>
            <p className={`text-${theme === 'light' ? 'gray-600' : 'gray-400'} mb-2`}>{post.excerpt}</p>
            <div className="flex justify-between items-center">
              <span className={`text-sm text-${theme === 'light' ? 'gray-500' : 'gray-400'}`}>
                Published on: {format(new Date(post.createdAt), 'MMMM d, yyyy')}
              </span>
              <a
                href={`/blog/${post._id}`}
                className={`text-${theme === 'light' ? 'blue-600' : 'blue-400'} hover:underline`}
              >
                Read more
              </a>
            </div>
          </div>
        ))
      ) : (
        <p>No blog posts found.</p>
      )}
    </div>
  );
};

export default BlogHistory;

