var express = require("express");
var router = express.Router();
var upload = require('../config/configUploadP'); // Configuração de upload
var publicacoesController = require("../controllers/publicacoesController");

router.get("/listar", function (req, res) {
    publicacoesController.listar(req, res);
    console.log(req.body)
});

router.get("/listar/:idUsuario", function (req, res) {
    publicacoesController.listarPorUsuario(req, res);
});

router.get("/pesquisar/:descricao", function (req, res) {
    publicacoesController.pesquisarDescricao(req, res);
});

router.post("/publicar/:idUsuario", upload.single('foto'), function (req, res) {
    publicacoesController.publicar(req, res);
});


router.put("/editar/:idPublicacao", function (req, res) {
    publicacoesController.editar(req, res);
});

router.delete("/deletar/:idPublicacao", function (req, res) {
    publicacoesController.deletar(req, res);
});

module.exports = router;