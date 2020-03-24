const knex = require('knex');
const configuration = require ('../../knexfile');

//criando a conexão e passando a conexão de desenvolvimento de dentro do knexfile
const connection = knex(configuration.development);

module.exports = connection;