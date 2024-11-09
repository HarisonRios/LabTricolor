var database = require("../database/config");

function buscarAquariosPorEmpresa(socioTorcedorId) {

  var instrucaoSql = `SELECT * FROM aquario a WHERE fkSocioTorcedor = ${socioTorcedorId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(socioTorcedorId, descricao) {
  
  var instrucaoSql = `INSERT INTO (descricao, fkSocioTorcedor) aquario VALUES (${descricao}, ${socioTorcedorId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarAquariosPorEmpresa,
  cadastrar
}
