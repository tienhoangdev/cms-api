const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleControler");

// Create article
router.post("/create", articleController.createArticle);

// Upload article
router.post("/:articleId/upload", articleController.uploadArticleContent);

// // Get all posts
// router.get("/", articleController.getAllPosts);

// // Get a specific post
// router.get("/:id", articleController.getPost);

// // Update a post
// router.put("/:id", articleController.updatePost);

// // Delete a post
// router.delete("/:id", articleController.deletePost);

module.exports = router;
