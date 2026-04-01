exports.createPost = async (req, res, next) => {
  try {
    if (!req.body.title) {
      const error = new Error("Title is required");
      error.status = 400;
      return next(error);
    }

    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id
    });

    res.status(201).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};