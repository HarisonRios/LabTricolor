var express = require("express");
var router = express.Router();
var upload = require('../config/configUpload'); // Configuração de upload
var usuarioController = require("../controllers/usuarioController");


router.post("/cadastrar", upload.single('foto'), function (req, res) {
    usuarioController.cadastrar(req, res);
});

// Rota para autenticação de usuário
router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

module.exports = router;
