var database = require("../database/config");

function buscarResultadosGerais(resposta, apelido) {
    var instrucaoSql = `
    SELECT ${resposta} as ${apelido}, count(*) as total
        FROM pesquisa
        INNER JOIN estado e ON pesquisa.r1 = e.id
        INNER JOIN regiao r ON e.fkRegiao = r.id
        GROUP BY ${resposta}
        ORDER BY ${resposta} ASC`;

    var instrucaoSqlMaior = `
    SELECT ${resposta} as ${apelido}, count(*) as total
        FROM pesquisa
        INNER JOIN estado e ON pesquisa.r1 = e.id
        INNER JOIN regiao r ON e.fkRegiao = r.id
        GROUP BY ${resposta}
        ORDER BY total DESC
        LIMIT 1`;

    var instrucaoSqlMenor = `
    SELECT ${resposta} as ${apelido}, count(*) as total
        FROM pesquisa
        INNER JOIN estado e ON pesquisa.r1 = e.id
        INNER JOIN regiao r ON e.fkRegiao = r.id
        GROUP BY ${resposta}
        ORDER BY total ASC
        LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
    .then(function(respostas) {
        return database.executar(instrucaoSqlMaior)
        .then(function(maior) {
            return database.executar(instrucaoSqlMenor)
            .then(function(menor) {
                return [respostas, maior[0], menor[0]];
            });
        });
    });
}

function buscarResultadosFaixaEtaria() {
    var instrucaoSql = `
    SELECT FaixaEtaria, count(*) AS total FROM
    (SELECT idade,
        CASE
            WHEN idade > 50 THEN 'Mais de 50 anos'
            WHEN idade > 20 THEN 'Entre 20 e 50 anos'
            WHEN idade > 10 THEN 'Entre 10 e 20 anos'
            ELSE 'Menos de 10 anos'
        END as faixaEtaria
    FROM (
        SELECT TIMESTAMPDIFF(YEAR, dataNasc, CURDATE()) AS idade
        FROM usuario
    ) idade) tabela
    GROUP BY faixaEtaria`;

    var instrucaoSqlMaior = `
    SELECT FaixaEtaria, count(*) AS total FROM
    (SELECT idade,
        CASE
            WHEN idade > 50 THEN 'Mais de 50 anos'
            WHEN idade > 20 THEN 'Entre 20 e 50 anos'
            WHEN idade > 10 THEN 'Entre 10 e 20 anos'
            ELSE 'Menos de 10 anos'
        END as faixaEtaria
    FROM (
        SELECT TIMESTAMPDIFF(YEAR, dataNasc, CURDATE()) AS idade
        FROM usuario
    ) idade) tabela
    GROUP BY faixaEtaria
    ORDER BY total DESC
    LIMIT 1`;

    var instrucaoSqlMenor = `
    SELECT FaixaEtaria, count(*) AS total FROM
    (SELECT idade,
        CASE
            WHEN idade > 50 THEN 'Mais de 50 anos'
            WHEN idade > 20 THEN 'Entre 20 e 50 anos'
            WHEN idade > 10 THEN 'Entre 10 e 20 anos'
            ELSE 'Menos de 10 anos'
        END as faixaEtaria
    FROM (
        SELECT TIMESTAMPDIFF(YEAR, dataNasc, CURDATE()) AS idade
        FROM usuario
    ) idade) tabela
    GROUP BY faixaEtaria
    ORDER BY total ASC
    LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
    .then(function(respostas) {
        return database.executar(instrucaoSqlMaior)
        .then(function(maior) {
            return database.executar(instrucaoSqlMenor)
            .then(function(menor) {
                return [respostas, maior[0], menor[0]];
            });
        });
    });
}

function buscarResultadosIndividuais(idUsuario) {

    var instrucaoSql = `
        SELECT e.nome AS Estado,
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
    buscarResultadosFaixaEtaria,
    buscarResultadosIndividuais
}
