export const getSession = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Session route working",
  });
};