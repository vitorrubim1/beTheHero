const crypto = require('crypto'); //PACOTE QUE VEM COM NODE
const connection = require('../database/connection') //IMPORTANDO A CONEXÃO


//EXPORTANDO UM OBJETO COM OS METÓDOS
module.exports = {

    //PARA LISTAR TODAS AS ONGS DO BD
    //FUNÇÃO ASSINCRONA 
    async index(request, response) {
        const ongs = await connection('ongs').select('*'); //BUSCANDO TODAS ONGS
    
        //RESPOSTA DA QUERY
        return response.json(ongs);
    },

    //FUNÇÃO ASSINCRONA
    async create(request, response){ //É COMO SE FOSSE O STORE DO LARAVEL
        //DESESTRUTURANDO PARA EVITAR INFORMAÇÕES A MAIS
        const {name, email, whatsapp, city, uf} = request.body;

        //CRIANDO O id DAS ONGS
        const id = crypto.randomBytes(4).toString('HEX');  //GERANDO 4 BYTES DE CARACTERS ALEATÓRIOS

        //QUANDO CHEGA NESSA FUNÇÃO (await) AGUARDA O CÓDIGO FINALIZAR PARA ENVIAR RESPOSTA 
        await connection('ongs').insert({ //PASSANDO COMO PARAMETRO O NOME DA TABELA ongs QUE VAI INSERIR OS CAMPOS            
            id, 
            name, 
            email,
            whatsapp,
            city,
            uf,
        })

        //RETORNANDO APENAS O ID PARA A ONG
        return response.json({ id });
        }
}