const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const upload = require("../middlewares/multer");
const checkToken = require("../middlewares/checkToken");

router.get("/", newsController.findAll);
router.post("/", upload.single("file"), newsController.create);
router.get("/categoria", newsController.findByCategorie);
//router.get("/:id", checkToken, userController.findById);
//router.post("/login", userController.login);
//router.delete("/:id", userController.remove);
//router.get("/profile", checkToken, userController.profile);

module.exports = router;
