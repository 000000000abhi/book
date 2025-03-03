import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { format } from 'date-fns';

const Dashboard = ({ theme }) => {
  const [userData, setUserData] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [newBlog, setNewBlog] = useState({ title: '', content: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    // Fetch user data, order history, payment history, and blog posts here
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user'); // Replace with your API endpoint
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchOrderHistory = async () => {
      try {
        const response = await fetch('/api/orders'); // Replace with your API endpoint
        const data = await response.json();
        setOrderHistory(data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    const fetchPaymentHistory = async () => {
      try {
        const response = await fetch('/api/payments'); // Replace with your API endpoint
        const data = await response.json();
        setPaymentHistory(data);
      } catch (error) {
        console.error('Error fetching payment history:', error);
      }
    };

    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog'); // Replace with your API endpoint
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };


    fetchUserData();
    fetchOrderHistory();
    fetchPaymentHistory();
    fetchBlogPosts();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...userData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // Handle saving the updated user data here.  Replace with your API call
    try {
      const response = await fetch('/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUserData(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleBlogInputChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Handle submitting the new blog post here. Replace with your API call
    try {
      const response = await fetch('/api/blog/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBlogPosts([...blogPosts, data]);
      setNewBlog({ title: '', content: '' });
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error submitting blog post:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen p-8 md:p-12 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'}`}>
        <div className={`max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden`}>
          <div className="p-8 space-y-8">
            <h1 className={`text-4xl font-bold ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>User Dashboard</h1>

            <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
              <h2 className={`text-3xl font-semibold mb-6 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Profile Information</h2>
              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={editData.name || ''}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'light' ? 'bg-white' : 'bg-gray-700 text-white'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={editData.email || ''}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'light' ? 'bg-white' : 'bg-gray-700 text-white'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Birthdate:</label>
                    <input
                      type="date"
                      name="birthdate"
                      value={editData.birthdate || ''}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'light' ? 'bg-white' : 'bg-gray-700 text-white'}`}
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <p className="text-lg">Name: <span className="font-semibold">{userData?.name || 'N/A'}</span></p>
                  <p className="text-lg">Email: <span className="font-semibold">{userData?.email || 'N/A'}</span></p>
                  <p className="text-lg">Birthdate: <span className="font-semibold">{userData?.birthdate ? format(new Date(userData.birthdate), 'MMMM d, yyyy') : 'N/A'}</span></p>
                  <button
                    onClick={handleEdit}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                  >
                    Edit
                  </button>
                </div>
              )}
            </section>

            <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
              <h2 className={`text-3xl font-semibold mb-6 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Order History</h2>
              <div className="space-y-4">
                {orderHistory.length === 0 ? (
                  <p className="text-lg">No orders placed yet.</p>
                ) : (
                  orderHistory.map((order) => (
                    <div key={order.id} className={`${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'} p-6 rounded-lg shadow-md`}>
                      <h3 className="text-xl font-semibold mb-2">Order ID: {order.id}</h3>
                      <p className="text-md">Date: {format(new Date(order.date), 'MMMM d, yyyy')}</p>
                      <p className="text-md">Total: ${order.total}</p>
                      <p className="text-md">Status: <span className="font-semibold">{order.status}</span></p>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
              <h2 className={`text-3xl font-semibold mb-6 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Payment History</h2>
              <div className="space-y-4">
                {paymentHistory.length === 0 ? (
                  <p className="text-lg">No payments made yet.</p>
                ) : (
                  paymentHistory.map((payment) => (
                    <div key={payment.id} className={`${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'} p-6 rounded-lg shadow-md`}>
                      <h3 className="text-xl font-semibold mb-2">Payment ID: {payment.id}</h3>
                      <p className="text-md">Date: {format(new Date(payment.date), 'MMMM d, yyyy')}</p>
                      <p className="text-md">Amount: ${payment.amount}</p>
                      <p className="text-md">Status: <span className="font-semibold">{payment.status}</span></p>
                    </div>
                  ))
                )}
              </div>
            </section>

            <section>
              <h2 className={`text-3xl font-semibold mb-6 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Blog Posts</h2>
              <form onSubmit={handleBlogSubmit} className="space-y-4 mb-8">
                <input
                  type="text"
                  name="title"
                  value={newBlog.title}
                  onChange={handleBlogInputChange}
                  placeholder="Blog Title"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'light' ? 'bg-white' : 'bg-gray-700 text-white'}`}
                />
                <textarea
                  name="content"
                  value={newBlog.content}
                  onChange={handleBlogInputChange}
                  placeholder="Blog Content"
                  rows="6"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'light' ? 'bg-white' : 'bg-gray-700 text-white'}`}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Blog'}
                </button>
              </form>
              <div className="space-y-6">
                {blogPosts.map((post) => (
                  <div key={post.id} className={`${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'} p-6 rounded-lg shadow-md`}>
                    <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                    <p className="text-md">{post.content.slice(0, 150)}...</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;

