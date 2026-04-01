require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const postRoutes = require("./routes/post.routes");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/posts", postRoutes);

// DB connect
connectDB();

// server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});