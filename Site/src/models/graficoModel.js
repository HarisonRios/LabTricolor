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


function buscarJogadoresPontuacoes() {
    var instrucaoSql = `
    SELECT 
        usuario.id AS jogador_id, 
        usuario.nome AS nome_jogador, 
        quiz.qtdPontos 
    FROM quiz 
    JOIN usuario ON quiz.fkUsuario = usuario.id
    ORDER BY quiz.qtdPontos DESC;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarPontuacao,
    buscarJogadoresPontuacoes
}

