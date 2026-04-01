const express = require("express");
const router = express.Router();

const controller = require("../controllers/post.controller");
const auth = require("../middleware/auth.middleware");

router.post("/", auth, controller.createPost);
router.get("/", controller.getPosts);
router.get("/:id", controller.getPostById);
router.patch("/:id", auth, controller.updatePost);
router.delete("/:id", auth, controller.deletePost);

module.exports = router;