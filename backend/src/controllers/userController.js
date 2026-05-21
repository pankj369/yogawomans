export const getUser = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};