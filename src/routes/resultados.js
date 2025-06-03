var express = require("express");
var router = express.Router();

var resultadoController = require("../controllers/resultadoController");

router.get("/geral", function (req, res) {
    resultadoController.buscarResultadosGerais(req, res);
});

router.get("/individual/:idUsuario", function (req, res) {
    resultadoController.buscarResultadosIndividuais(req, res);
});

router.get("/estados", function (req, res) {
    resultadoController.buscarEstados(req, res);
});

router.get("/interesses", function (req, res) {
    resultadoController.buscarInteresses(req, res);
});

router.get("/niveis", function (req, res) {
    resultadoController.buscarNiveis(req, res);
});

router.get("/tempos", function (req, res) {
    resultadoController.buscarTempos(req, res);
});

router.get("/empunhaduras", function (req, res) {
    resultadoController.buscarEmpunhaduras(req, res);
});

router.get("/tiposjogo", function (req, res) {
    resultadoController.buscarTiposJogo(req, res);
});

router.get("/frequencias", function (req, res) {
    resultadoController.buscarFrequencias(req, res);
});

router.get("/conteudos", function (req, res) {
    resultadoController.buscarConteudos(req, res);
});

router.get("/regioes", function (req, res) {
    resultadoController.buscarRegioes(req, res);
});

module.exports = router;