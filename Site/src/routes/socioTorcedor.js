var express = require("express");
var router = express.Router();

const socioTorcedorController = require("../controllers/socioTorcedorController");

// Recebendo os dados do HTML e direcionando para a função cadastrar de socioTorcedorController.js
router.post("/cadastrar", function (req, res) {
  socioTorcedorController.cadastrar(req, res);
});

router.get("/buscar", function (req, res) {
  socioTorcedorController.buscarPorCodigo(req, res); // Supondo que agora busca por código de ativação
});

router.get("/buscar/:id", function (req, res) {
  socioTorcedorController.buscarPorId(req, res);
});

router.get("/listar", socioTorcedorController.listar);




module.exports = router;