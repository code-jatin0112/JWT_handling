const postService = require("../services/post.service");

// CREATE
exports.createPost = async (req, res, next) => {
  try {
    const post = await postService.createPost({
      ...req.body,
      author: req.user.id
    });

    res.status(201).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// GET ALL
exports.getPosts = async (req, res, next) => {
  try {
    const posts = await postService.getPosts();
    res.json({ success: true, data: posts });
  } catch (err) {
    next(err);
  }
};

// GET ONE
exports.getPostById = async (req, res, next) => {
  try {
    const post = await postService.getPostById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.updatePost = async (req, res, next) => {
  try {
    const post = await postService.updatePost(req.params.id, req.body);
    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.deletePost = async (req, res, next) => {
  try {
    await postService.deletePost(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
};