var postModel = require("../models/postModel");


function buscarPostsCards(req, res) {
    postModel.buscarPostsCard()
    .then((resultado) => {
        console.log(resultado);
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(erro => {
        console.log(erro)
        res.status(500).json({ erro: erro.sqlMessage});
    });
}

module.exports = {
    buscarPostsCards
}