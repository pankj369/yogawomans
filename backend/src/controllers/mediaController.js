import asyncHandler from "express-async-handler";
import mediaService from "../services/mediaService.js";

/**
 * Get all media items (paginated/filtered)
 * GET /api/media?category=yoga&limit=20&lastDocId=xyz
 */
export const getMedia = asyncHandler(async (req, res, next) => {
  const { category, limit, lastDocId } = req.query;
  
  const limitNum = limit ? parseInt(limit) : 20;

  const mediaList = await mediaService.getMedia(category, limitNum, lastDocId);

  res.status(200).json({
    success: true,
    data: mediaList,
  });
});

/**
 * Get a specific media item by ID
 * GET /api/media/:id
 */
export const getMediaById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const mediaItem = await mediaService.getMediaById(id);

  if (!mediaItem) {
    res.status(404);
    throw new Error("Media not found");
  }

  res.status(200).json({
    success: true,
    data: mediaItem,
  });
});

/**
 * Create new media (Admin)
 * POST /api/media
 */
export const createMedia = asyncHandler(async (req, res, next) => {
  const newMedia = await mediaService.createMedia(req.body);

  res.status(201).json({
    success: true,
    message: "Media created successfully",
    data: newMedia,
  });
});
