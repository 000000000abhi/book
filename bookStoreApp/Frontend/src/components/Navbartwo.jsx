import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ChevronDown, Bell, Heart, ShoppingCart, Menu } from 'lucide-react';

function Navbartwo() {
  const { theme } = useTheme();
  const [sticky, setSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const categories = [
    { name: 'Fiction', links: ['science-fiction', 'fantasy', 'mystery', 'historical-fiction'] },
    { name: 'Education', links: ['math', 'science', 'history', 'technology'] },
    { name: 'Non-Fiction', links: ['biographies', 'self-help', 'true-crime'] },
    { name: 'Audiobooks', links: ['best-sellers', 'new-releases', 'childrens-audiobooks'] },
    { name: 'Kids', links: ['picture-books', 'young-readers', 'chapter-books'] },
    { name: 'Events', links: ['upcoming-events', 'past-events'] },
   
    { name: 'Reviews', links: ['book-reviews', 'author-interviews'] },
    { name: 'Promotions', links: ['discounts', 'special-offers'] },
  ];

  return (
    <nav className={`fixed left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
      sticky ? 'shadow-lg' : ''
    } ${
      theme === 'light' ? 'bg-white' : 'bg-gray-900'
    } border-t border-gray-200 dark:border-gray-700`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 space-x-4">
          {/* Hamburger Menu for Mobile - hidden on large screens */}
          <div className="flex items-center lg:hidden">
            <button
              className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={toggleMenu}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-6">
            {categories.map(({ name, links }) => (
              <div key={name} className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200">
                  <span>{name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50">
                  {links.map(link => (
                    <Link
                      key={link}
                      to={`/${link}`}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <Link to="/notification" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200">
              <Bell className="h-6 w-6" />
            </Link>
            <Link to="/wishlist" className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200">
              <Heart className="h-6 w-6" />
            </Link>
            <Link to="/cart" className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors duration-200">
              <ShoppingCart className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {categories.map(({ name, links }) => (
              <div key={name} className="relative group">
                <button className="w-full text-left flex items-center justify-between text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
                  <span>{name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-4 space-y-1">
                  {links.map(link => (
                    <Link
                      key={link}
                      to={`/${link}`}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbartwo;
