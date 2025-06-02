var express = require("express");
var router = express.Router();

var postController = require("../controllers/postController");

router.get("/geral", function (req, res) {
    postController.buscarPostsCards(req, res);
});

module.exports = router;