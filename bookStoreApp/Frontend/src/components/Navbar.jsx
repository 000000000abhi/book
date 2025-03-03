import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useTheme } from "../context/ThemeContext";
import Navbartwo from "./Navbartwo";
import { Menu, Search, Sun, Moon, ChevronDown } from "lucide-react";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sticky, setSticky] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    setAuthUser(null);
    navigate("/");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Course", path: "/course" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
    { name: "Gift", path: "/gift" },
    { name: "Blog", path: "/blog" },
    { name: "Admin", path: "/admin-dashboard" },
  ];

  const handleCategoryClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out ${
        sticky ? (theme === "light" ? "bg-white shadow-lg" : "bg-gray-900 shadow-lg") : theme === "light" ? "bg-gray-50" : "bg-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text hover:from-purple-600 hover:to-blue-500 transition-all">
            bookStore
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link key={item.name} to={item.path} className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                {item.name}
              </Link>
            ))}
            <button onClick={handleCategoryClick} className="flex items-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
              Categories <ChevronDown className="ml-1 h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative w-full max-w-xs md:max-w-md">
              <input
                type="text"
                className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 w-full"
                placeholder="Search for books"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </form>

            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {authUser ? (
              <div className="relative">
                <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="flex items-center p-1 rounded-full bg-gray-200 dark:bg-gray-700">
                  <img className="h-8 w-8 rounded-full" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User avatar" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 pr-2">{authUser.name}</span>
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-1">
                    <Link to="/User" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Profile</Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Settings</Link>
                    {authUser.isAdmin && <Link to="/add-book" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Add New Book</Link>}
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all">Login</Link>
            )}
          </div>
        </div>
      </div>
      {isCategoryOpen && <Navbartwo />}
    </nav>
  );
}

export default Navbar;