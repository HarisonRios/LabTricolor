var database = require("../database/config");

function buscarPontuacao() {
  var instrucaoSql = `
SELECT
   COUNT(CASE WHEN qtdPontos < 5 THEN 1 END) AS menor_que_5,
   COUNT(CASE WHEN qtdPontos BETWEEN 5 AND 7 THEN 1 END) AS de_5_a_7,
   COUNT(CASE WHEN qtdPontos = 8 OR qtdPontos = 9 THEN 1 END) AS de_8_a_9,
   COUNT(CASE WHEN qtdPontos = 10 THEN 1 END) AS ate_10
FROM quiz;
`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// usei o max para pegar maior pontuação do jogador, e o group by para por jogador para pegar a maior pontuação

function buscarJogadoresPontuacoes() {
  var instrucaoSql = `
    SELECT 
        usuario.id AS jogador_id, 
        usuario.nome AS nome_jogador, 
        MAX(quiz.qtdPontos) AS qtdPontos 
    FROM quiz 
    JOIN usuario ON quiz.fkUsuario = usuario.id
    GROUP BY usuario.id, usuario.nome  
    ORDER BY qtdPontos DESC;`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMelhoresPontuadores() {
  var instrucaoSql = `
    SELECT 
        usuario.nome AS nome_jogador, 
        quiz.qtdPontos 
    FROM quiz 
    JOIN usuario ON quiz.fkUsuario = usuario.id
    ORDER BY quiz.qtdPontos DESC
    LIMIT 3;
    `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarPontuacao,
  buscarJogadoresPontuacoes,
  buscarMelhoresPontuadores,
};
