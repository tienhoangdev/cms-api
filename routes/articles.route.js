import express from "express";
const articleRoute = express.Router();
import articleController from "../controllers/articleControler.js";
import { checkUserApiKey } from "../middlewares/auth.js";

// Create article
articleRoute.post("/create", articleController.createArticle);

// Upload article
articleRoute.post("/:articleId/upload", articleController.uploadArticleContent);

// // Get recent articles
articleRoute.get("/", articleController.getArticleList);

// Get a specific article
articleRoute.get("/:articleId", articleController.getArticleById);

// // Update an article
articleRoute.patch("/:articleId/update", articleController.updateArticleById);

// Delete an article
articleRoute.delete("/:articleId", articleController.deleteArticle);

export default articleRoute;
