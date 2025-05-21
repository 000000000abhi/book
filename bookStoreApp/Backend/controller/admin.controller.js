const bcrypt = require("bcryptjs");
const Admin = require("../model/admin.model");
const Book = require("../model/book.model");
// ✅ Signup Admin
const signupAdmin = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const newAdmin = new Admin({
      fullname,
      email,
      password: hashedPassword,
      isAdmin: true,
    });

    await newAdmin.save();

    res.status(201).json({
      message: "✅ Admin Created Successfully",
      admin: { _id: newAdmin._id, fullname: newAdmin.fullname, email: newAdmin.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.findOne({ email });
    console.log("admin is present",admin);
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Trim the entered password to avoid comparison issues
    const isMatch = await bcrypt.compare(password.trim(), admin.password);

    console.log("Entered Password:", password);
     console.log("hashed password:",hashedPassword);
    console.log("Stored Hashed Password:", admin.password);
    console.log("Password Match Result:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "✅ Admin login successful",
      admin: { _id: admin._id, fullname: admin.fullname, email: admin.email, role: "Admin" },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
// ✅ Get All Books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get Book by ISBN
const getBookByIsbn = async (req, res) => {
  try {
    const { isbn } = req.params;

    if (!/^\d{10,13}$/.test(isbn)) {
      return res.status(400).json({ message: "Invalid ISBN format" });
    }

    const book = await Book.findOne({ isbn });
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get All Admins
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Add a Book
const addBook = async (req, res) => {
  try {
    const { name, title, image, author, introduction, category, price, isbn, publisher, description } = req.body;

    if (!name || !title || !author || !category || !price || !isbn || !publisher) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({ message: "Book with this ISBN already exists" });
    }

    const newBook = new Book({ name, title, image, author, introduction, category, price, isbn, publisher, description });
    await newBook.save();

    res.status(201).json({ message: "✅ Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Update Book by ISBN
const updateBookByIsbn = async (req, res) => {
  try {
    const { isbn } = req.params;
    const updateData = req.body;

    if (!/^\d{10,13}$/.test(isbn)) {
      return res.status(400).json({ message: "Invalid ISBN format" });
    }

    const updatedBook = await Book.findOneAndUpdate({ isbn }, updateData, { new: true });

    if (!updatedBook) return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "✅ Book updated successfully", book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signupAdmin,
  adminLogin,
  getAllBooks,
  getBookByIsbn,
  getAllAdmins,
  addBook,
  updateBookByIsbn,
};
