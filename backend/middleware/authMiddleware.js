const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");

const authenticateToken = async (req, res, next) => {
  const accessToken = req.cookies.token || "";

  if (!accessToken) {
    return res
      .status(401)
      .json({ error: "Unauthorized - Missing access token" });
  }

  try {
    const decoded = jwt.verify(accessToken, SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Access token verification failed:", error.message);
    return res
      .status(401)
      .json({ error: "Unauthorized - Invalid access token" });
  }
};

module.exports = { authenticateToken };
