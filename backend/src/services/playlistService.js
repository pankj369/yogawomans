import { db } from "../config/firebaseAdmin.js";

class PlaylistService {
  /**
   * Save a playlist for a user
   */
  async savePlaylist(userId, playlistId) {
    const savedRef = db.collection("saved_playlists").doc(`${userId}_${playlistId}`);
    
    const savedData = {
      userId,
      playlistId,
      savedAt: new Date().toISOString(),
    };

    await savedRef.set(savedData, { merge: true });
    return savedData;
  }

  /**
   * Unsave a playlist for a user
   */
  async unsavePlaylist(userId, playlistId) {
    await db.collection("saved_playlists").doc(`${userId}_${playlistId}`).delete();
    return true;
  }

  /**
   * Get all saved playlists for a user
   */
  async getSavedPlaylists(userId) {
    const snapshot = await db
      .collection("saved_playlists")
      .where("userId", "==", userId)
      .orderBy("savedAt", "desc")
      .get();

    if (snapshot.empty) return [];

    const savedItems = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    const playlistIds = savedItems.map(item => item.playlistId);

    if (playlistIds.length === 0) return [];

    // Note: Firestore 'in' query is limited to 10 items.
    // For a larger production app, we would chunk this array.
    const chunkedIds = playlistIds.slice(0, 10);

    const playlistSnapshot = await db
      .collection("playlists")
      .where("__name__", "in", chunkedIds)
      .get();

    const playlistMap = {};
    playlistSnapshot.forEach(doc => {
      playlistMap[doc.id] = { id: doc.id, ...doc.data() };
    });

    return savedItems.map(item => ({
      ...item,
      playlist: playlistMap[item.playlistId] || null,
    }));
  }

  /**
   * Create a new custom playlist
   */
  async createPlaylist(userId, playlistData) {
    const playlistRef = db.collection("playlists").doc();
    const newPlaylist = {
      id: playlistRef.id,
      userId,
      title: playlistData.title || "My Healing Collection",
      description: playlistData.description || "",
      mediaItems: playlistData.mediaItems || [],
      category: playlistData.category || "custom",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorites: 0
    };
    await playlistRef.set(newPlaylist);
    return newPlaylist;
  }

  /**
   * Get all custom playlists created by a user
   */
  async getUserPlaylists(userId) {
    const snapshot = await db.collection("playlists")
      .where("userId", "==", userId)
      .orderBy("createdAt", "desc")
      .get();
    
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
}

export default new PlaylistService();
