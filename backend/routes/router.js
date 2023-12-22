const { Router } = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const {
  getArticle,
  saveArticle,
  updateArticle,
  deleteArticle,
  getUser,
} = require("../controllers/articleController");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

const router = Router();

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/logout", logoutUser);

router.use("/app", authenticateToken);

router.get("/app/article", getArticle);
router.get("/app/getUser", getUser);
router.post("/app/save", saveArticle);
router.post("/app/update", updateArticle);
router.post("/app/delete", deleteArticle);

module.exports = router;
