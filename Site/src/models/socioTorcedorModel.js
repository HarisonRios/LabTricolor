var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM sociotorcedor WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT id, nome, codigo_ativacao FROM sociotorcedor`;

  return database.executar(instrucaoSql);
}

function buscarPorCodigo(codigo_ativacao) {
  var instrucaoSql = `SELECT * FROM sociotorcedor WHERE codigo_ativacao = '${codigo_ativacao}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(nome, codigo_ativacao) {
  var instrucaoSql = `INSERT INTO sociotorcedor (nome, codigo_ativacao) VALUES ('${nome}', '${codigo_ativacao}')`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPorCodigo, buscarPorId, cadastrar, listar };
