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

const router = express.Router();

router.post("/signup", signupAdmin);
router.post("/login", adminLogin);
router.get("/books", getAllBooks);
router.get("/books/:isbn", getBookByIsbn);
router.put("/books/:isbn", updateBookByIsbn);
router.get("/admins", getAllAdmins);
router.post("/books", addBook);

module.exports = router;
