//CONEXÃO DO BANCO DE DADOS

const { Pool } = require("pg") 

module.exports = new Pool({
    user: 'postgres',
    password: "marcos89",
    host:"localhost",
    port: 5432,
    database: "foodfy"
})