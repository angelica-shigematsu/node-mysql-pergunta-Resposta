const Sequelize = require('sequelize');
const connection = require("./database");

const Resposta = connection.define("resposta",{
    body: {
        type:Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type:Sequelize.INTEGER,
        allowNull: false
    }
});
Resposta.sync({force: false});

module.exports = Resposta;