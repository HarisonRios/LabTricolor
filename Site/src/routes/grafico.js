var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");

router.get("/buscarPontuacao", function (req, res) {
    graficoController.buscarPontuacao(req, res);
});

router.get("/buscarJogadoresPontuacoes", function (req, res) {
    graficoController.buscarJogadoresPontuacoes(req, res);
});

router.get("/buscarMelhoresPontuadores", function (req, res) {
    graficoController.buscarJogadoresPontuacoes(req, res);
});





module.exports = router;