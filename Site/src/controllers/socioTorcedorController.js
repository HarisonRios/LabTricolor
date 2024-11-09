var sociotorcedorModel = require("../models/socioTorcedorModel");

function buscarPorCodigo(req, res) {
  var codigo = req.query.codigo_ativacao;

  if (!codigo) {
    return res.status(400).json({ mensagem: "Código de ativação é obrigatório." });
  }

  sociotorcedorModel.buscarPorCodigo(codigo)
    .then((resultado) => {
      if (resultado.length === 0) {
        return res.status(404).json({ mensagem: `Nenhum sócio torcedor encontrado com o código ${codigo}.` });
      }
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.error("Erro ao buscar por código:", erro);
      res.status(500).json({ mensagem: "Erro ao buscar sócio torcedor por código." });
    });
}


function listar(req, res) {
  sociotorcedorModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}



function buscarPorId(req, res) {
  var id = req.params.id;

  if (!id) {
    return res.status(400).json({ mensagem: "ID do sócio torcedor é obrigatório." });
  }

  sociotorcedorModel.buscarPorId(id)
    .then((resultado) => {
      if (resultado.length === 0) {
        return res.status(404).json({ mensagem: `Nenhum sócio torcedor encontrado com o ID ${id}.` });
      }
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.error("Erro ao buscar por ID:", erro);
      res.status(500).json({ mensagem: "Erro ao buscar sócio torcedor por ID." });
    });
}

function cadastrar(req, res) {
  var nome = req.body.nome;
  var codigo = req.body.codigo_ativacao;

  if (!nome || !codigo) {
    return res.status(400).json({ mensagem: "Nome e código de ativação são obrigatórios." });
  }

  sociotorcedorModel.buscarPorCodigo(codigo)
    .then((resultado) => {
      if (resultado.length > 0) {
        return res.status(401).json({ mensagem: `O sócio torcedor com o código ${codigo} já existe.` });
      }

      sociotorcedorModel.cadastrar(nome, codigo)
        .then((resultado) => {
          res.status(201).json(resultado);
        })
        .catch((erro) => {
          console.error("Erro ao cadastrar sócio torcedor:", erro);
          res.status(500).json({ mensagem: "Erro ao cadastrar sócio torcedor." });
        });
    })
    .catch((erro) => {
      console.error("Erro ao verificar código de ativação:", erro);
      res.status(500).json({ mensagem: "Erro ao verificar código de ativação." });
    });
}

module.exports = {
  buscarPorCodigo,
  buscarPorId,
  cadastrar,
  listar,
};
