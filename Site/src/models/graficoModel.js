var database = require("../database/config");

function buscarPontuacao() {
  var instrucaoSql = `
  SELECT 
      (SELECT COUNT(qtdPontos) FROM quiz WHERE qtdPontos < 5) AS ate_5, 
      (SELECT COUNT(qtdPontos) FROM quiz WHERE qtdPontos BETWEEN 5 AND 9) AS ate_9, 
      (SELECT COUNT(qtdPontos) FROM quiz WHERE qtdPontos = 10) AS ate_10 
  FROM quiz 
  LIMIT 1;
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


function calcularPorcentagemGabaritaram() {
  const instrucaoSql = `
      SELECT 
          (COUNT(DISTINCT CASE WHEN quiz.qtdPontos = 10 THEN fkUsuario END) * 100.0 /
           COUNT(DISTINCT fkUsuario)) AS porcentagem
      FROM quiz;
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql).then(resultados => resultados[0]);
}
module.exports = {
  calcularPorcentagemGabaritaram,
};


module.exports = {
  buscarPontuacao,
  buscarJogadoresPontuacoes,
  buscarMelhoresPontuadores,
  calcularPorcentagemGabaritaram
};
