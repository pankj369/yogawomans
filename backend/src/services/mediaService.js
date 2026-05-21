import { db } from "../config/firebaseAdmin.js";

class MediaService {
  /**
   * Fetch paginated media items, optionally filtered by category
   */
  async getMedia(category = null, limit = 20, lastDocId = null) {
    let query = db.collection("media").orderBy("createdAt", "desc").limit(limit);

    if (category) {
      query = query.where("category", "==", category);
    }

    if (lastDocId) {
      const lastDocRef = await db.collection("media").doc(lastDocId).get();
      if (lastDocRef.exists) {
        query = query.startAfter(lastDocRef);
      }
    }

    const snapshot = await query.get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  /**
   * Get a single media item by ID
   */
  async getMediaById(mediaId) {
    const doc = await db.collection("media").doc(mediaId).get();
    
    if (!doc.exists) return null;

    return {
      id: doc.id,
      ...doc.data()
    };
  }

  /**
   * Create new media metadata (Admin only usually)
   */
  async createMedia(data) {
    const mediaItem = {
      ...data,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection("media").add(mediaItem);
    return { id: docRef.id, ...mediaItem };
  }
}

export default new MediaService();
