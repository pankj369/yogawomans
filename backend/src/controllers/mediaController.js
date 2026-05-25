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

/**
 * Save a media item to user's favorites
 * POST /api/media/save
 */
export const saveMediaItem = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;
  const { mediaId } = req.body;

  if (!mediaId) {
    res.status(400);
    throw new Error("Please provide a mediaId");
  }

  const savedData = await mediaService.saveMediaItem(userId, mediaId);
  res.status(200).json({ success: true, message: "Media saved", data: savedData });
});

/**
 * Unsave a media item
 * DELETE /api/media/save/:mediaId
 */
export const unsaveMediaItem = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;
  const { mediaId } = req.params;

  await mediaService.unsaveMediaItem(userId, mediaId);
  res.status(200).json({ success: true, message: "Media unsaved" });
});

/**
 * Get all saved media for user
 * GET /api/media/saved
 */
export const getSavedMediaItems = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;
  const savedItems = await mediaService.getSavedMediaItems(userId);
  res.status(200).json({ success: true, data: savedItems });
});
