const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const bookRoute = require("./route/book.route.js");
const userRoute = require("./route/user.route.js");
const blogRoute = require("./route/blog.route.js");
const adminRoute = require("./route/admin.route.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;
const URI = process.env.MongoDBURI;

if (!URI) {
  console.error("MongoDB URI is missing in environment variables!");
  process.exit(1);
}

// Middleware
app.use(cors({ origin: "*" })); // Allow all origins (modify for security)
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.use("/admin", adminRoute);

// 404 Middleware (Handles Undefined Routes)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
