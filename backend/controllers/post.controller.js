const Post = require("../models/post.model");

// =======================
// CREATE POST
// =======================
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id
    });

    res.status(201).json({ status: "success", data: post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// GET POSTS (PAGINATION)
// =======================
exports.getPosts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const posts = await Post.find({ user: req.user.id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Post.countDocuments({ user: req.user.id });

    res.status(200).json({
      status: "success",
      data: posts,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// GET SINGLE POST
// =======================
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json({ data: post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// UPDATE POST
// =======================
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    await post.save();

    res.json({ status: "success", data: post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =======================
// DELETE POST
// =======================
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await post.deleteOne();

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};