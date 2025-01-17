const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.getPosts);
router.get("/:id", postController.getPostById);
router.post("/", postController.addPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

module.exports = router;
