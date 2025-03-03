import { useState, useEffect } from "react"
import axios from "axios"
import { useTheme } from "../context/ThemeContext"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { FaTrash, FaEdit } from "react-icons/fa"
import { MdOutlineAdminPanelSettings } from "react-icons/md"
//import { updateBookByIsbn } from "../Backend/controller/admin.controller"

function AdminDashboard() {
  const { theme } = useTheme()
  const [users, setUsers] = useState([])
  const [admins, setAdmins] = useState([])
  const [books, setBooks] = useState([])
  const [bookId, setBookId] = useState("")
  const [updateBookId, setUpdateBookId] = useState("")
  const [updateBookDetails, setUpdateBookDetails] = useState({})
  const [showAllUsers, setShowAllUsers] = useState(false)
  const [showAllAdmins, setShowAllAdmins] = useState(false)
  const [newBook, setNewBook] = useState({
    name: "",
    title:"",
    image: "",
    author: "",
    introduction:"",
    category: "",
    price: "",
    isbn: "",
    publisher: "",
    description: "",
  })

  useEffect(() => {
    fetchUsers()
    fetchAdmins()
    fetchBooks()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:2345/admin/getAllUser");
      console.log(response);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("http://localhost:2345/admin/getAllAdmins");
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:2345/admin/getAllBook")
      setBooks(res.data,books)
    } catch (error) {
      console.error("Error fetching books", error)
    }
  }

  const handleInputChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value })
  }

  const handleAddBook = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:2345/admin/add-book", newBook)
      alert("Book added successfully")
      fetchBooks();
    } catch (error) {
      console.error("Error adding book", error)
    }
  }
  const handleDeleteBook = async (isbn) => {
    try {
      await axios.delete(`http://localhost:2345/admin/getBookByIsbn/${isbn}`);
      alert("Book deleted successfully");
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book", error);
    }
  };
  const handleUpdateBook = async () => {
    if (!updateBookId || Object.keys(updateBookDetails).length === 0) {
      alert("Please enter a Book ISBN and at least one field to update.");
      return;
    }

    try {
      await axios.put(`http://localhost:2345/admin/updateBook/${updateBookId}`, updateBookDetails, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Book updated successfully!");
      fetchBooks();
    } catch (error) {
      console.error("Error updating book:", error);
      alert(error.response?.data?.message || "Failed to update book. Please try again.");
    }
  };

    const handleShowAllUsers = () => {
    setShowAllUsers(!showAllUsers)
    setShowAllAdmins(false)
  }

  const handleShowAllAdmins = () => {
    setShowAllAdmins(!showAllAdmins)
    setShowAllUsers(false)
  }


  return (
    <>
      <Navbar />
      <div className="p-8 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white mt-12">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Users Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Show All Users</h2>
            <button
              onClick={() => setShowAllUsers(!showAllUsers)}
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {showAllUsers ? "Hide Users" : "Show All Users"}
            </button>
            {showAllUsers && (
              <div className="mt-4 max-h-64 overflow-y-auto border border-gray-300 p-2">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(users) && users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user._id} className="border-b border-gray-200 dark:border-gray-700">
                          <td className="p-3">{user.fullname}</td>
                          <td className="p-3">{user.email}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="p-3 text-center">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Show All Admins */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Show All Admins</h2>
            <button
              onClick={() => setShowAllAdmins(!showAllAdmins)}
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {showAllAdmins ? "Hide Admins" : "Show All Admins"}
            </button>
            {showAllAdmins && (
              <div className="mt-4 max-h-64 overflow-y-auto border border-gray-300 p-2">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(admins) && admins.length > 0 ? (
                      admins.map((admin) => (
                        <tr key={admin._id} className="border-b border-gray-200 dark:border-gray-700">
                          <td className="p-3">{admin.fullname}</td>
                          <td className="p-3">{admin.email}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="p-3 text-center">
                          No admins found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {/* Add New Book */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
            <form onSubmit={handleAddBook} className="space-y-2">
              {Object.keys(newBook).map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  onChange={handleInputChange}
                  required
                  className={`w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 
                  ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
                              />
              ))}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Add Book
              </button>
            </form>
          </div>

          {/* Delete Book */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Delete Book by ID</h2>
            <input
              type="text"
              placeholder="Enter Book ID"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              className={`w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${theme === "dark" ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
                      />
            <button
              onClick={() => handleDeleteBook(bookId)}
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
            >
              <FaTrash className="mr-2" /> Delete Book
            </button>
          </div>

          {/* Update Book */}
          <div>
            <h2>Update Book</h2>
            <input
              type="text"
              placeholder="Enter Book ISBN"
              value={updateBookId}
              onChange={(e) => setUpdateBookId(e.target.value)}
            />
            <input
              type="text"
              name="title"
              placeholder="Enter Updated Title"
              value={updateBookDetails.title || ""}
              onChange={handleUpdateBookChange}
            />
            <button onClick={handleUpdateBook}>
              <FaEdit /> Update Book
            </button>
          </div>
          </div>
          </div>

      <Footer />
    </>
  )
}

export default AdminDashboard

