const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// routes
const postRoutes = require("./routes/post.routes");

app.use("/api/posts", postRoutes);

// DB connect
mongoose
  .connect("mongodb://127.0.0.1:27017/blogify")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const errorMiddleware = require("./middleware/error.middleware");

// routes ke baad
app.use(errorMiddleware);