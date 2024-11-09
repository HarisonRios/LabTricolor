var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
                            .then((resultadoAquarios) => {
                                if (resultadoAquarios.length > 0) {
                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        senha: resultadoAutenticar[0].senha,
                                        aquarios: resultadoAquarios
                                    });
                                } else {
                                    res.status(204).json({ aquarios: [] });
                                }
                            })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


function cadastrar(req, res) {
    console.log(req.body);
    var nome = req.body.nome;
    var email = req.body.email;
    var imagemPerfil = req.file.filename;
    var senha = req.body.senha;
    var fkEmpresa = req.body.idEmpresaVincular;
    console.log([nome, email, imagemPerfil, senha, fkEmpresa]);
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (imagemPerfil == undefined) {
        res.status(400).send("A imagem do perfil está undefined!"); 
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!"); 
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua empresa a vincular está undefined!");
    }  else {
        console.log("controller")
        usuarioModel.cadastrar(nome, email, imagemPerfil, senha, fkEmpresa)
        .then(function(resultado) {
            res.json(resultado);
        }).catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function listarUsuariosPorId(req, res) {
    var id = req.params.id; 

    if (id == undefined) {
        res.status(400).send("ID do usuário não informado!");
    } else {
        usuarioModel.buscarUsuarioPeloId(id)
            .then(function(resultado) {
                if (resultado.length > 0) {
                    res.json(resultado[0]);
                } else {
                    res.status(404).send("Usuário não encontrado!");
                }
            }).catch(function(erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    autenticar,
    cadastrar,
    listarUsuariosPorId
};