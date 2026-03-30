const Post = require("../models/post.model");

// CREATE POST
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

// GET POSTS (PAGINATION)
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