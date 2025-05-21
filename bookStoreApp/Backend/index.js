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
  console.error("❌ MongoDB URI is missing in environment variables!");
  process.exit(1);
}

// CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:2345"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

// Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.use("/admin", adminRoute);

// 404 Middleware
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
