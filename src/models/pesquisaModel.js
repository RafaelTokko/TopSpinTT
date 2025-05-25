var database = require("../database/config")

function verificar(id) {
    console.log("ACESSEI AS PESQUISAS \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", id)
    var instrucaoSql = `
        SELECT fkUsuario FROM pesquisa WHERE fkUsuario = '${id}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function guardar(idUsuario,r1, r2, r3, r4, r5, r6, r7, r8) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function guardar():", idUsuario, r1, r2, r3, r4, r5, r6, r7, r8);
    var instrucaoSql = `
        INSERT INTO pesquisa (fkUsuario, r1, r2, r3, r4, r5, r6, r7, r8) VALUES ('${idUsuario}','${r1}', '${r2}', '${r3}', '${r4}', '${r5}', '${r6}', '${r7}', '${r8}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizar(idUsuario, r1, r2, r3, r4, r5, r6, r7, r8) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function guardar():", idUsuario, r1, r2, r3, r4, r5, r6, r7, r8);
    var instrucaoSql = `
        UPDATE pesquisa SET r1 = '${r1}',r2 = '${r2}',r3 = '${r3}',r4 = '${r4}',r5 = '${r5}',r6 = '${r6}',r7 = '${r7}',r8 = '${r8}' WHERE fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    verificar,
    guardar,
    atualizar
};