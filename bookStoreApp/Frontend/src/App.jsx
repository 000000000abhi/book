import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./home/Home";
import About from "./about/About";
import Contact from "./contact/Contact";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import Accountancy from "./components/Accountancy";
import Core_subjects from "./components/Core_subjects";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import { useTheme } from "./context/ThemeContext";
import Programming from "./components/Programming";
import Notification from "./components/Notification";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import Gift from "./components/Gift";
import UserDashboard from "./components/UserDashboard";
import Dbms from "./components/Dbms";
 import BookDetail from "./components/BookDetail"
import Payment from "./components/Payment";
import Discounts from "./components/Discounts";
import BlogListPage from "./components/BlogListPage";
import BlogDetailPage from "./components/BlogDetailPage";
import CreateBlogPage from "./components/CreateBlogPage";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [authUser] = useAuth();
  const { theme } = useTheme(); // Get the current theme

  useEffect(() => {
    document.body.className = theme === 'light' ? '' : 'dark-mode'; // Apply the theme class to the body
  }, [theme]);

  return (
    
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/programming" element={<Programming />} />
          <Route path="/accountancy" element={<Accountancy />} />
          <Route path="/core" element={<Core_subjects />} />
          <Route path="/dbms" element={<Dbms />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/User" element={<UserDashboard />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/book/:isbn" element={<BookDetail/>}/>
          <Route path="/payment" element ={<Payment/>}/>
          <Route path="/gift" element={<Gift />} />
          <Route path="/discounts" element={<Discounts />} />
          <Route path="/blog" element={<BlogListPage/>} />
      <Route path="/blog/:id" element={<BlogDetailPage/>} />
      <Route path="/blog/create-blog" element={<CreateBlogPage/>} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
        <Toaster />
      </>
    
  );
}

export default App;
