import React from 'react';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useTheme } from '../context/ThemeContext';

function Notifications() {
  const { theme } = useTheme();
  const notifications = [
    { id: 1, title: 'New Book Release', content: 'Check out the latest release in the Science Fiction genre.' },
    { id: 2, title: 'Upcoming Event', content: 'Join us for an author signing event next weekend.' },
    { id: 3, title: 'Promotion', content: 'Get 20% off on all non-fiction books this month!' },
  ];

  return (
    <>
      <Navbar />
      <div className={`min-h-screen bg-${theme === 'light' ? 'gray-100' : 'gray-900'} text-${theme === 'light' ? 'gray-800' : 'gray-100'} flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8`}>
        <div className={`max-w-4xl w-full bg-${theme === 'light' ? 'white' : 'gray-800'} shadow-lg rounded-lg p-8 space-y-6`}>
          <h1 className={`text-4xl font-bold mb-6 text-${theme === 'light' ? 'gray-800' : 'gray-100'}`}>Notifications</h1>
          
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className={`p-4 rounded-lg border border-${theme === 'light' ? 'gray-300' : 'gray-700'} bg-${theme === 'light' ? 'white' : 'gray-700'}`}>
                  <h2 className={`text-2xl font-semibold text-${theme === 'light' ? 'gray-800' : 'gray-200'}`}>{notification.title}</h2>
                  <p className={`text-${theme === 'light' ? 'gray-600' : 'gray-400'}`}>{notification.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className={`text-${theme === 'light' ? 'gray-600' : 'gray-400'}`}>You have no new notifications.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Notifications;
