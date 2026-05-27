import apiClient from "./apiClient";

/**
 * Fetch all available live classes.
 * Returns array of classes from Firestore.
 */
export const getLiveClasses = async () => {
  try {
    const response = await apiClient.get("/bookings/classes");
    return response.data; // response is unwrapped by interceptor to the body (success, data)
  } catch (error) {
    console.error("Error fetching live classes:", error);
    throw error;
  }
};

/**
 * Fetch all booked class records for the current user.
 */
export const getBookings = async () => {
  try {
    const response = await apiClient.get("/bookings");
    return response.data;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    throw error;
  }
};

/**
 * Book a seat in the specified class.
 */
export const bookClass = async (classId) => {
  try {
    const response = await apiClient.post("/bookings", { classId });
    return response.data;
  } catch (error) {
    console.error(`Error booking class ${classId}:`, error);
    throw error;
  }
};

/**
 * Cancel booking for the specified class.
 */
export const cancelBooking = async (classId) => {
  try {
    const response = await apiClient.delete(`/bookings/${classId}`);
    return response.data;
  } catch (error) {
    console.error(`Error cancelling booking for class ${classId}:`, error);
    throw error;
  }
};
