import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useTheme } from '../context/ThemeContext';
import { MapPin, Mail, Phone } from 'lucide-react';

function Contact() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatusMessage('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatusMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = `w-full bg-transparent border-b-2 border-${theme === 'light' ? 'gray-300' : 'gray-600'} p-2 focus:outline-none focus:border-blue-500 transition-all duration-300`;
  const labelClasses = `absolute left-0 transition-all duration-300 pointer-events-none text-${theme === 'light' ? 'gray-600' : 'gray-400'}`;

  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`min-h-screen bg-${theme === 'light' ? 'gray-100' : 'gray-900'} text-${theme === 'light' ? 'gray-800' : 'gray-100'} flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8`}
      >
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`max-w-6xl w-full bg-${theme === 'light' ? 'white' : 'gray-800'} shadow-2xl rounded-lg overflow-hidden`}
        >
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 space-y-6">
              <motion.h1 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold mb-6"
              >
                Contact Us
              </motion.h1>
              
              <motion.section 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-semibold">Get in Touch</h2>
                <p>
                  We'd love to hear from you! Feel free to reach out through any of the following channels:
                </p>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <a href="mailto:support@bookhaven.com" className="text-blue-500 hover:text-blue-600 transition-colors duration-300">
                    support@bookhaven.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-green-500" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <span>123 Book Street, Reading City, RC 12345</span>
                </div>
              </motion.section>

              <motion.section 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-semibold">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                    />
                    <label 
                      htmlFor="name" 
                      className={`${labelClasses} ${formData.name ? '-top-6 text-sm' : 'top-2'}`}
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                    />
                    <label 
                      htmlFor="email" 
                      className={`${labelClasses} ${formData.email ? '-top-6 text-sm' : 'top-2'}`}
                    >
                      Email
                    </label>
                  </div>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className={inputClasses}
                    ></textarea>
                    <label 
                      htmlFor="message" 
                      className={`${labelClasses} ${formData.message ? '-top-6 text-sm' : 'top-2'}`}
                    >
                      Message
                    </label>
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                  {statusMessage && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`text-${statusMessage.includes('successfully') ? 'green' : 'red'}-500`}
                    >
                      {statusMessage}
                    </motion.p>
                  )}
                </form>
              </motion.section>
            </div>
            <div className="md:w-1/2">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="h-full bg-blue-100 dark:bg-blue-900 p-8 flex flex-col justify-center items-center"
              >
                <div className="w-full max-w-md aspect-square relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="absolute inset-0 bg-blue-200 dark:bg-blue-700 opacity-50"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-red-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Book Haven</h3>
                      <p className="text-gray-600 dark:text-gray-300">123 Book Street</p>
                      <p className="text-gray-600 dark:text-gray-300">Reading City, RC 12345</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-blue-500 to-transparent opacity-30"></div>
                </div>
                <div className="mt-8 text-center">
                  <p className="text-lg font-semibold text-gray-800 dark:text-white">Visit Our Store</p>
                  <p className="text-gray-600 dark:text-gray-300">Mon-Fri: 9AM-8PM</p>
                  <p className="text-gray-600 dark:text-gray-300">Sat-Sun: 10AM-6PM</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
}

export default Contact;

