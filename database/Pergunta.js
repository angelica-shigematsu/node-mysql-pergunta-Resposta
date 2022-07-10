//model criar a tabela -- representação da tabela do banco de dados
const Sequelize = require("sequelize");
const connection = require("./database");

//json
const Pergunta = connection.define('pergunta',{//criação da tabela caso não exista
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});
//se não tiver tabela pergunta, ele vai criar na tabela, e false para que não crie se tiver 
Pergunta.sync({force: false}).then(() => {});

module.exports = Pergunta;