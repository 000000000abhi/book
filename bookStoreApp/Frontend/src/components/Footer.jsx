import React from "react";
import { useTheme } from '../context/ThemeContext';
import { Mail } from 'lucide-react';

function Footer() {
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-gray-900" : "bg-gray-100";
  const textColor = isDark ? "text-gray-300" : "text-gray-700";
  const linkColor = isDark ? "text-gray-400 hover:text-yellow-400" : "text-gray-600 hover:text-blue-600";
  const inputBgColor = isDark ? "bg-gray-800" : "bg-white";
  const inputBorderColor = isDark ? "border-gray-700" : "border-gray-300";

  return (
    <footer className={`${bgColor} ${textColor} py-12 px-4 transition-colors duration-200`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h6 className="text-lg font-semibold mb-4 relative inline-block">
            Services
            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500"></span>
          </h6>
          <ul className="space-y-2">
            {["Branding", "Design", "Marketing", "Advertisement"].map((service) => (
              <li key={service}>
                <a href={`/${service.toLowerCase()}`} className={`${linkColor} transition-colors duration-200 hover:underline`}>
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h6 className="text-lg font-semibold mb-4 relative inline-block">
            Company
            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-green-500"></span>
          </h6>
          <ul className="space-y-2">
            {["About Us", "Contact", "Jobs", "Press Kit"].map((item) => (
              <li key={item}>
                <a href={`/${item.toLowerCase().replace(' ', '-')}`} className={`${linkColor} transition-colors duration-200 hover:underline`}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h6 className="text-lg font-semibold mb-4 relative inline-block">
            Legal
            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-purple-500"></span>
          </h6>
          <ul className="space-y-2">
            {["Terms of Use", "Privacy Policy", "Cookie Policy"].map((item) => (
              <li key={item}>
                <a href={`/${item.toLowerCase().replace(' ', '-')}`} className={`${linkColor} transition-colors duration-200 hover:underline`}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h6 className="text-lg font-semibold mb-4 relative inline-block">
            Newsletter
            <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-red-500"></span>
          </h6>
          <form className="space-y-2">
            <p className="text-sm">Stay updated with our latest news and offers!</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full py-2 px-4 rounded-md ${inputBgColor} ${inputBorderColor} border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                required
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center"
              >
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} BookStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
