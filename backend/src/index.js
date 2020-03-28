const express = require('express'); //IMPORTANDO O EXPRESS
const cors = require('cors'); //IMPORTANDO O CORS
const routes = require('./routes'); //IMPORTANDO AS ROTAS
const { errors } = require ('celebrate'); //PARA EVITAR ERRO 500, UM ERRO RUIM

const app = express();

app.use(cors()); //MÓDULO DE SEGURANÇA
app.use(express.json());
app.use(routes); //USANDO AS ROTAS
app.use(errors());


app.listen(3333);