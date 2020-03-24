const connection = require('../database/connection') //IMPORTANDO A CONEXÃO


//EXPORTANDO UM OBJETO COM OS METÓDOS
module.exports = {
    //RETORNANDO CASOS ESPECÍFICOS DE UMA UNICA ONG
    
    //FUNÇÃO ASSINCRONA 
    async index(request, response) {
        //ACESSANDO DADOS DA ONG QUE ESTÁ LOGADA
        const ong_id = request.headers.authorization; //ESSE 'authorization' VEM DO INSOMNIA
        
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*')

        return response.json(incidents);
    }
}