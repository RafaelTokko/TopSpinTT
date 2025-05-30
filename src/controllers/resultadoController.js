var resultadoModel = require("../models/resultadoModel");

function a(req, res) {


    resultadoModel.buscarResultadosGerais().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas resultados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarResultadosIndividuais(req, res) {

    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando resultados em tempo real`);

    resultadoModel.buscarMedidasEmTempoReal(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ultimos resultados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarResultadosGerais(req, res) {
    resultadoModel.buscarResultadosGerais('r1', 'Estado').then(function (estados) {
        resultadoModel.buscarResultadosGerais('r2', 'Interesse').then(function (interesses) {
            resultadoModel.buscarResultadosGerais('r3', 'Nivel').then(function (niveis) {
                resultadoModel.buscarResultadosGerais('r4', 'Tempo').then(function (tempos) {
                    resultadoModel.buscarResultadosGerais('r5', 'Empunhadura').then(function (empunhaduras) {
                        resultadoModel.buscarResultadosGerais('r6', 'TipoJogo').then(function (tiposJogo) {
                            resultadoModel.buscarResultadosGerais('r7', 'Frequencia').then(function (frequencias) {
                                resultadoModel.buscarResultadosGerais('r8', 'Conteudo').then(function (conteudos) {
                                    const respostas = {
                                        estados,
                                        interesses,
                                        niveis,
                                        tempos,
                                        empunhaduras,
                                        tiposJogo,
                                        frequencias,
                                        conteudos
                                    };
                                    res.status(200).json(respostas);
                                }).catch(erro => erroHandler(res, erro));
                            }).catch(erro => erroHandler(res, erro));
                        }).catch(erro => erroHandler(res, erro));
                    }).catch(erro => erroHandler(res, erro));
                }).catch(erro => erroHandler(res, erro));
            }).catch(erro => erroHandler(res, erro));
        }).catch(erro => erroHandler(res, erro));
    }).catch(erro => erroHandler(res, erro));
}

function erroHandler(res, erro) {
    console.log(erro);
    res.status(500).json({ erro: erro.message });
}

module.exports = {
    buscarResultadosGerais,
    buscarResultadosIndividuais,
    a
}