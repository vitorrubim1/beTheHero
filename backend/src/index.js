const express = require('express'); //IMPORTANDO O EXPRESS
const cors = require('cors'); //IMPORTANDO O CORS
const routes = require('./routes'); //IMPORTANDO AS ROTAS

const app = express();

app.use(cors()); //MÓDULO DE SEGURANÇA
app.use(express.json());
app.use(routes); //USANDO AS ROTAS


app.listen(3333);