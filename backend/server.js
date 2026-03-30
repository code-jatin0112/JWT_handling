// backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); // ✅ ye missing tha

// =======================
// MIDDLEWARE
// =======================
app.use(cors());
app.use(express.json());

// =======================
// ROUTES
// =======================
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// =======================
// DB CONNECT
// =======================
mongoose
  .connect("mongodb://127.0.0.1:27017/blogify")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// =======================
// SERVER START
// =======================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});