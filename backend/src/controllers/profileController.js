import supabase from "../config/supabaseClient.js";



// GET CURRENT USER PROFILE
export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      profile: data,
    });

  } catch (error) {
    console.error("Get profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};



// UPDATE USER PROFILE
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      full_name,
      phone,
      age,
      gender,
      height,
      weight,
      wellness_goal,
      experience_level,
      preferred_yoga_style,
      onboarding_completed,
    } = req.body;

    const updateData = {
      user_id: userId,
      full_name,
      phone,
      age,
      gender,
      height,
      weight,
      wellness_goal,
      experience_level,
      preferred_yoga_style,
      onboarding_completed,
      updated_at: new Date(),
    };

    const { data, error } = await supabase
      .from("profiles")
      .upsert(updateData, {
        onConflict: "user_id",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase profile update error:", error);

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile: data,
    });

  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};