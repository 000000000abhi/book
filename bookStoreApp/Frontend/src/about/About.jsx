import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useTheme } from '../context/ThemeContext';
import { Book, Users, Clock, Mail, Phone } from 'lucide-react';

function About() {
  const { theme } = useTheme();

  const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-900';
  const textColor = theme === 'light' ? 'text-gray-800' : 'text-gray-200';
  const sectionBg = theme === 'light' ? 'bg-gray-50' : 'bg-gray-800';

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-300`}>
      <Navbar />

      <motion.header 
        className="py-16 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="text-5xl font-bold mb-4"
          {...fadeInUp}
        >
          About Book Haven
        </motion.h1>
        <motion.p 
          className="text-xl mt-2 max-w-2xl mx-auto"
          {...fadeInUp}
        >
          Discover our story, mission, and the passionate team behind your favorite bookstore.
        </motion.p>
      </motion.header>

      <motion.section 
        className={`py-16 px-4 ${sectionBg}`}
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={fadeInUp}
        >
          <Book className="w-16 h-16 mx-auto mb-6 text-blue-500" />
          <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            At Book Haven, we are committed to providing a wide selection of books for readers of all ages. Our mission is to create a community where people can explore, discover, and enjoy literature in all its forms. We believe that every book tells a story and every reader deserves to find their next great read.
          </p>
        </motion.div>
      </motion.section>

      <motion.section 
        className={`py-16 px-4 ${bgColor}`}
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={fadeInUp}
        >
          <Users className="w-16 h-16 mx-auto mb-6 text-purple-500" />
          <h2 className="text-3xl font-semibold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "John Doe", role: "Founder & CEO", image: "?height=128&width=128", description: "John is the visionary behind Book Haven. With a passion for literature and a commitment to community, he leads our team with enthusiasm and dedication." },
              { name: "Jane Smith", role: "Marketing Director", image: "/placeholder.svg?height=128&width=128", description: "Jane handles our marketing and outreach efforts, ensuring that the world knows about the great reads available at Book Haven." },
              { name: "Alex Johnson", role: "Head Librarian", image: "/placeholder.svg?height=128&width=128", description: "Alex curates our vast collection, always on the lookout for exciting new titles and hidden literary gems." }
            ].map((member, index) => (
              <motion.div 
                key={index}
                className={`text-center p-6 ${sectionBg} rounded-lg shadow-lg transition-transform duration-300 hover:scale-105`}
                variants={fadeInUp}
              >
                <img src={member.image} alt={member.name} className="w-32 h-32 mx-auto rounded-full mb-4 border-4 border-blue-500" />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-blue-500 dark:text-blue-400 mb-4">{member.role}</p>
                <p className="text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <motion.section 
        className={`py-16 px-4 ${sectionBg}`}
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={fadeInUp}
        >
          <Clock className="w-16 h-16 mx-auto mb-6 text-green-500" />
          <h2 className="text-3xl font-semibold text-center mb-6">Our History</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500"></div>
            {[
              { year: 2020, event: "Book Haven was established with the goal of creating a unique space for book lovers." },
              { year: 2021, event: "Expanded our online presence, reaching readers beyond our local community." },
              { year: 2022, event: "Launched our popular book club program, fostering a vibrant reading community." },
              { year: 2023, event: "Opened our second physical location to meet growing demand." },
              { year: 2024, event: "Celebrating our growth from a small local bookstore to a thriving community hub." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="relative mb-8"
                variants={fadeInUp}
              >
                <div className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${index % 2 === 0 ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
                <div className={`ml-8 p-4 ${bgColor} rounded-lg shadow-md ${index % 2 === 0 ? 'mr-8' : 'ml-auto mr-0'}`}>
                  <h3 className="text-xl font-semibold mb-2">{item.year}</h3>
                  <p>{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      <motion.section 
        className={`py-16 px-4 ${bgColor}`}
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-semibold mb-8">Contact Us</h2>
          <p className="text-lg mb-8">
            If you have any questions or want to get in touch with us, feel free to reach out through the following channels:
          </p>
          <div className="flex justify-center space-x-8">
            <motion.a 
              href="mailto:contact@bookhaven.com" 
              className="flex items-center text-blue-500 dark:text-blue-400 hover:underline"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail className="w-6 h-6 mr-2" />
              contact@bookhaven.com
            </motion.a>
            <motion.a 
              href="tel:+1234567890" 
              className="flex items-center text-blue-500 dark:text-blue-400 hover:underline"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Phone className="w-6 h-6 mr-2" />
              (123) 456-7890
            </motion.a>
          </div>
        </motion.div>
      </motion.section>

      <footer className={`py-8 text-center ${sectionBg}`}>
        <p>&copy; 2024 Book Haven. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default About;

