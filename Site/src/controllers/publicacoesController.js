var publicacoesModel = require("../models/publicacoesModel");

function listar(req, res) {
    publicacoesModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as publicações: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function publicar(req, res) {
    var descricao = req.body.descricao;
    var idUsuario = req.params.idUsuario;
    var imagem_publicacao = req.file ? req.file.filename : null;

    if (!descricao) {
        return res.status(400).send("A descrição está indefinida!");
    } else if (!idUsuario) {
        return res.status(403).send("O ID do usuário está indefinido!");
    } else if (!imagem_publicacao) {
        return res.status(400).send("Nenhuma imagem foi enviada!");
    }

    publicacoesModel.publicar(descricao, imagem_publicacao, idUsuario)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.error("Erro ao realizar o post:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


function pesquisarDescricao(req, res) {
    var descricao = req.params.descricao;

    publicacoesModel.pesquisarDescricao(descricao)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao buscar as publicações: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function publicar(req, res) {
    var descricao = req.body.descricao;
    var idUsuario = req.params.idUsuario;
    var imagem_publicacao = req.file.filename;

     if (descricao == undefined) {
        res.status(400).send("A descrição está indefinido!");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        publicacoesModel.publicar(descricao, imagem_publicacao, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function editar(req, res) {
    var novaDescricao = req.body.descricao;
    var idPublicacao = req.params.idPublicacao;

    publicacoesModel.editar(novaDescricao, idPublicacao)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function deletar(req, res) {
    var idPublicacao = req.params.idPublicacao;

    publicacoesModel.deletar(idPublicacao)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listar,
    pesquisarDescricao,
    publicar,
    editar,
    deletar
}