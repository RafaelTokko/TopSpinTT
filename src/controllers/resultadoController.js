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

async function buscarResultadosGerais(req, res) {
    try {
        const [estados, interesses, niveis, tempos, empunhaduras, tiposJogo, frequencias, conteudos, regiao] = await Promise.all([
            resultadoModel.buscarResultadosGerais('r1', 'Estado'),
            resultadoModel.buscarResultadosGerais('r2', 'Interesse'),
            resultadoModel.buscarResultadosGerais('r3', 'Nivel'),
            resultadoModel.buscarResultadosGerais('r4', 'Tempo'),
            resultadoModel.buscarResultadosGerais('r5', 'Empunhadura'),
            resultadoModel.buscarResultadosGerais('r6', 'TipoJogo'),
            resultadoModel.buscarResultadosGerais('r7', 'Frequencia'),
            resultadoModel.buscarResultadosGerais('r8', 'Conteudo'),
            resultadoModel.buscarResultadosGerais('r.nome', 'Regiao')
        ]);
        const respostas = {
            estados,
            interesses,
            niveis,
            tempos,
            empunhaduras,
            tiposJogo,
            frequencias,
            conteudos,
            regiao
        };
        res.status(200).json(respostas);
    } catch (erro) {
        erroHandler(res, erro);
    }
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