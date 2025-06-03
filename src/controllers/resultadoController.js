var resultadoModel = require("../models/resultadoModel");

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

function buscarEstados(req, res) {
    resultadoModel.buscarResultadosGerais('r1', 'Estado')
        .then(function(estados) {
            res.status(200).json(estados);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarInteresses(req, res) {
    resultadoModel.buscarResultadosGerais('r2', 'Interesse')
        .then(function(interesses) {
            res.status(200).json(interesses);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarNiveis(req, res) {
    resultadoModel.buscarResultadosGerais('r3', 'Nivel')
        .then(function(niveis) {
            res.status(200).json(niveis);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarTempos(req, res) {
    resultadoModel.buscarResultadosGerais('r4', 'Tempo')
        .then(function(tempos) {
            res.status(200).json(tempos);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarEmpunhaduras(req, res) {
    resultadoModel.buscarResultadosGerais('r5', 'Empunhadura')
        .then(function(empunhaduras) {
            res.status(200).json(empunhaduras);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarTiposJogo(req, res) {
    resultadoModel.buscarResultadosGerais('r6', 'TipoJogo')
        .then(function(tiposJogo) {
            res.status(200).json(tiposJogo);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarFrequencias(req, res) {
    resultadoModel.buscarResultadosGerais('r7', 'Frequencia')
        .then(function(frequencias) {
            res.status(200).json(frequencias);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarConteudos(req, res) {
    resultadoModel.buscarResultadosGerais('r8', 'Conteudo')
        .then(function(conteudos) {
            res.status(200).json(conteudos);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarRegioes(req, res) {
    resultadoModel.buscarResultadosGerais('r.nome', 'Regiao')
        .then(function(regiao) {
            res.status(200).json(regiao);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarFaixaEtaria(req, res) {
    resultadoModel.buscarResultadosFaixaEtaria()
        .then(function(faixaEtaria) {
            res.status(200).json(faixaEtaria);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}


module.exports = {
    buscarResultadosIndividuais,
    buscarEstados,
    buscarInteresses,
    buscarNiveis,
    buscarTempos,
    buscarEmpunhaduras,
    buscarTiposJogo,
    buscarFrequencias,
    buscarConteudos,
    buscarRegioes,
    buscarFaixaEtaria
}