var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");

// Rota para buscar a pontuação agrupada por categorias 
router.get("/buscarPontuacao", function (req, res) {
    graficoController.buscarPontuacao(req, res);
});

// Rota para buscar as pontuações máximas de cada jogador
router.get("/buscarJogadoresPontuacoes", function (req, res) {
    graficoController.buscarJogadoresPontuacoes(req, res);
});

// Rota para buscar os 3 melhores pontuadores
router.get("/buscarMelhoresPontuadores", function (req, res) {
    graficoController.buscarMelhoresPontuadores(req, res); // Correção aqui
});

// Rota para buscar o número de tentativas de cada jogador
router.get("/buscarTentativasPorUsuario", function (req, res) {
    graficoController.buscarTentativasPorUsuario(req, res);
});


module.exports = router;