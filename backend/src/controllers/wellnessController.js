import supabase from "../config/supabaseClient.js";

export const createWellnessLog = async (
  req,
  res
) => {
  try {
    const {
      stress_type,
      symptoms,
    } = req.body;

    const { data, error } = await supabase
      .from("wellness_logs")
      .insert([
        {
          user_id: req.user.id,
          stress_type,
          symptoms,
        },
      ])
      .select();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};