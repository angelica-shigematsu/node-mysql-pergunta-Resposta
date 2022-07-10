const Sequelize = require('sequelize');
const connection = new Sequelize('guiaperguntas', 'root', '4E3q7n9Uh',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;