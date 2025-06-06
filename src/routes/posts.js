var express = require("express");
var router = express.Router();

var postController = require("../controllers/postController");

router.get("/geral", function (req, res) {
    postController.buscarPostsCards(req, res);
});

router.get("/:id", function (req, res) {
    postController.buscarPosts(req, res);
});

module.exports = router;