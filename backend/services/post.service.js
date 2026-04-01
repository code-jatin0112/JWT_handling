const Post = require("../models/post.model");

// CREATE
exports.createPost = (data) => {
  return Post.create(data);
};

// GET ALL
exports.getPosts = () => {
  return Post.find().populate("author", "name email");
};

// GET ONE
exports.getPostById = (id) => {
  return Post.findById(id).populate("author", "name email");
};

// UPDATE
exports.updatePost = (id, data) => {
  return Post.findByIdAndUpdate(id, data, { new: true });
};

// DELETE
exports.deletePost = (id) => {
  return Post.findByIdAndDelete(id);
};