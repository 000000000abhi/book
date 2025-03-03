const express = require("express");
const {
    signupAdmin,
    adminLogin,
    getAllBooks,
    getBookByIsbn,
    getAllAdmins,
    addBook,
    updateBookByIsbn
  } = require("../controller/admin.controller");
  
  const { getAllUsers } = require("../controller/user.controller");
  
const router = express.Router();

// Admin Signup Route
router.post("/signup", signupAdmin);

// Admin Login Route
router.post("/login", adminLogin);
router.get("/getAllBook",getAllBooks);
router.delete("/getBookByIsbn/:isbn",getBookByIsbn);
router.put("/updateBook/:bookId",updateBookByIsbn);
router.get("/getAllUser", getAllUsers);
router.get("/getAllAdmins",getAllAdmins);
router.post("/add-book",addBook);

module.exports = router;
