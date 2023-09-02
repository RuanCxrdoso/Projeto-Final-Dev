const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const checkToken = require("../middlewares/checkToken");

router.get("/", commentController.findAll);
router.post("/", commentController.create);
router.get("/:NewsId", commentController.findByNews);

module.exports = router;
