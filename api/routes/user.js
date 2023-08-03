const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const checkToken = require("../middlewares/checkToken");

router.post("/", userController.create);
router.get("/:id", checkToken, userController.findById);
router.post("/login", userController.login);
router.get("/", userController.findAll);
router.delete("/:id", userController.remove);
router.get("/profile", checkToken, userController.profile);

module.exports = router;
