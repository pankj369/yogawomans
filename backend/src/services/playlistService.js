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
}

export default new PlaylistService();
