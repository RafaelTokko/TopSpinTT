var database = require("../database/config");

function buscarResultadosGerais(resposta, apelido) {
    var instrucaoSql = `SELECT 
        ${resposta} as ${apelido}, count(*) as total
        FROM pesquisa
        GROUP BY ${resposta}
        ORDER BY total DESC`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarResultadosIndividuais(idUsuario) {

    var instrucaoSql = `SELECT
            e.nome AS Estado,
            p.r2 AS Motivo,
            p.r3 AS Nível,
            p.r4 AS Tempo,
            p.r5 AS Tipo,
            p.r6 AS TipoJogo,
            p.r7 AS Frequencia,
            p.r8 AS Interesse
        FROM pesquisa p
        INNER JOIN estado e ON p.r1 = e.id
        WHERE p.fkUsuario = ${idUsuario}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarResultadosGerais,
    buscarResultadosIndividuais
}
