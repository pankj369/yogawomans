import asyncHandler from "express-async-handler";
import playlistService from "../services/playlistService.js";

/**
 * Save a playlist to user's saved_playlists
 * POST /api/playlists/save
 */
export const savePlaylist = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;
  const { playlistId } = req.body;

  if (!playlistId) {
    res.status(400);
    throw new Error("Please provide a playlistId");
  }

  const savedData = await playlistService.savePlaylist(userId, playlistId);

  res.status(200).json({
    success: true,
    message: "Playlist saved successfully",
    data: savedData,
  });
});

/**
 * Unsave a playlist from user's saved_playlists
 * DELETE /api/playlists/save/:playlistId
 */
export const unsavePlaylist = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;
  const { playlistId } = req.params;

  await playlistService.unsavePlaylist(userId, playlistId);

  res.status(200).json({
    success: true,
    message: "Playlist removed from saved items",
  });
});

/**
 * Get all saved playlists for the current user
 * GET /api/playlists/saved
 */
export const getSavedPlaylists = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;

  const savedPlaylists = await playlistService.getSavedPlaylists(userId);

  res.status(200).json({
    success: true,
    data: savedPlaylists,
  });
});

/**
 * Create a new custom playlist
 * POST /api/playlists
 */
export const createPlaylist = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;
  const newPlaylist = await playlistService.createPlaylist(userId, req.body);

  res.status(201).json({
    success: true,
    message: "Playlist created",
    data: newPlaylist,
  });
});

/**
 * Get all user created custom playlists
 * GET /api/playlists/user
 */
export const getUserPlaylists = asyncHandler(async (req, res, next) => {
  const userId = req.user.uid;
  const playlists = await playlistService.getUserPlaylists(userId);

  res.status(200).json({
    success: true,
    data: playlists,
  });
});
