const Admin = require("../model/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Book = require("../model/book.model");
const User = require("../model/user.model");
const Category = require("../model/category.model");
const mongoose = require("mongoose");
dotenv.config();

// ✅ Admin Signup
exports.signupAdmin = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ fullname, email, password: hashedPassword });
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
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      message: "✅ Admin Login Successful",
      admin: { _id: admin._id, fullname: admin.fullname, email: admin.email },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get All Books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get Book by ID
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID format" });
    }

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get Book by ISBN
exports.getBookByIsbn = async (req, res) => {
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

// ✅ Search Books by Name
exports.searchBooksByName = async (req, res) => {
  try {
    const books = await Book.find({ name: { $regex: req.params.name, $options: "i" } });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get All Admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Add a Book
exports.addBook = async (req, res) => {
  try {
    const { name, title, image, author, introduction, category, price, isbn, publisher, description ,subcategory } = req.body;
    if (!name || !title || !author || !category || !price || !isbn || !publisher || !subcategory) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res.status(400).json({ message: "Book with this ISBN already exists" });
    }
    const newBook = new Book({ name, title, image, author, introduction, category, subcategory, price, isbn, publisher, description });
    await newBook.save();
    const category1 = await Category.findOne({ category });
    const subcategory1 = category1.subcategories.find((sub) => sub.name === subcategory);
    subcategory1.books.push(newBook._id);
    await category1.save();
    res.status(201).json({ message: "✅ Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Update Book by ISBN
exports.updateBookByIsbn = async (req, res) => {
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
exports.addCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const newCategory = new Category({ category });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addSubCategory = async (req, res) => {
  try {
    const { category, subcategory } = req.body;
    const existingCategory = await Category.findOne({ category });

    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    existingCategory.subcategories.push({ name: subcategory, books: [] });
    await existingCategory.save();
    res.status(201).json(existingCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.retrieveCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const categoryData = await Category.findOne({ category });
    if (!categoryData) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(categoryData);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
}
exports.getBookBySub = async (req, res) => {
  try{
    const { category, subcategory } = req.body;
    const Books = await Book.find({
      category: category,
      subcategory: subcategory
    });
    res.status(200).json(Books);
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
}