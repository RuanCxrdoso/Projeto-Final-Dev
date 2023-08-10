const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const checkToken = require("../middlewares/checkToken");

router.post("/", userController.create);
router.get("/", userController.findAll);
router.post("/login", userController.login);
router.get("/validation", userController.validation);

module.exports = router;
