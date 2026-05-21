import apiClient from "./apiClient";



// GET CURRENT USER PROFILE
export const getMyProfile = async () => {

  const response = await apiClient.get("/profile/me");

  return response.data;
};



// UPDATE USER PROFILE
export const updateProfile = async (profileData) => {

  const response = await apiClient.put(
    "/profile/update",
    profileData
  );

  return response.data;
};