var express = require("express");
var router = express.Router();

var pesquisaController = require("../controllers/pesquisaController");

//Recebendo os dados do html e direcionando para a função cadastrar de pesquisaController.js
router.post("/guardar", function (req, res) {
    pesquisaController.guardar(req, res);
})

router.post("/verificar", function (req, res) {
    pesquisaController.verificar(req, res);
});

module.exports = router;