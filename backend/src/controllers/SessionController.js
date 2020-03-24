const connection = require('../database/connection') //IMPORTANDO A CONEXÃO

//EXPORTANDO UM OBJETO COM OS METÓDOS
module.exports = {
    //FUNÇÃO ASSINCRONA 
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name') //ÚNICO DADO QUE RETONARÁ PRO FRONTEND
            .first();    

            //SE A ONG NAO EXISTIR
            if(!ong){
                return response.status(400).json({ erro: 'no ONG found with this ID.' })
            }

            return response.json(ong); 
    }
}