var postModel = require("../models/postModel");


function buscarPostsCards(req, res) {
    postModel.buscarPostsCard()
    .then(function (resultado) {
        console.log(resultado);
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro)
        res.status(500).json({ erro: erro.sqlMessage});
    });
}

function buscarPosts(req, res) {
    var id = req.params.id;

    postModel.buscarPosts(id)
    .then(function (resultado) {
        console.log(resultado);
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro)
        res.status(500).json({ erro: erro.sqlMessage});
    });
}

module.exports = {
    buscarPostsCards,
    buscarPosts
}