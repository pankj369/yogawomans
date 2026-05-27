import express from "express";
import blogService from "../services/blogService.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

// GET /api/blog
router.get("/", asyncHandler(async (req, res) => {
  const articles = await blogService.getArticles();
  res.status(200).json({
    success: true,
    data: articles,
  });
}));

// GET /api/blog/:slug
router.get("/:slug", asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const article = await blogService.getArticleBySlug(slug);

  if (!article) {
    res.status(404);
    throw new Error("Article not found");
  }

  res.status(200).json({
    success: true,
    data: article,
  });
}));

export default router;
