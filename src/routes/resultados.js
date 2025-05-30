var express = require("express");
var router = express.Router();

var resultadoController = require("../controllers/resultadoController");

router.get("/geral", function (req, res) {
    resultadoController.buscarResultadosGerais(req, res);
});

router.get("/individual/:idUsuario", function (req, res) {
    resultadoController.buscarResultadosIndividuais(req, res);
})

module.exports = router;