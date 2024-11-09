var database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);
    var instrucaoSql = `
        SELECT id, nome, email, fk_empresa as empresaId FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, imagem_perfil, senha, fkEmpresa) {
    console.log("aloooooooooooooooooooooo")
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, fkEmpresa);
    
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, imagem_perfil, senha, fk_empresa) VALUES ('${nome}', '${email}', '${imagem_perfil}', '${senha}', '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Função para buscar um usuário pelo ID
function buscarPorId(id) {
    console.log("ACESSEI O USUARIO MODEL - Buscar por ID:", id);
    var instrucaoSql = `
        SELECT id, nome, email, cpf, fk_empresa as empresaId FROM usuario WHERE id = ${id};
    `;
    console.log("Executando a instrução SQL para buscar usuário por ID: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    buscarPorId // Exportando a função
};
