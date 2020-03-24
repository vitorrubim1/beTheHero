const connection = require('../database/connection') //IMPORTANDO A CONEXÃO


//EXPORTANDO UM OBJETO COM OS METÓDOS
module.exports = {

    //FUNÇÃO ASSINCRONA 
    async index(request, response){

        //PAGINAÇÃO
        const { page = 1 } = request.query; //PEGA REQUISIÇÃO DA URL '?'
        //SE PAGE NÃO EXISTIR O PADRÃO SERÁ 1

        //RETORNADO O TOTAL DE INCIDENTS
        const [count] = await connection('incidents').count() 

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')//RELACIONANDO DADOS ENTRE TABELAS, PARA BUSCAR EMAIL E WHATS
            .limit(5) //LIMITANDO APENAS 5 INCIDENTES
            .offset((page - 1 ) * 5) //PULANDO PARA OS OUTROS 5 REGISTROS APÓS A PRIMEIRA SELEÇÃO
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp',
                'ongs.city', 
                'ongs.uf'
            ]); //BUSCANDO TODOS OS DADOS DA TABLE INCIDENTS, E ALGUNS DA ONG

        response.header('X-Total-Count', count['count(*)']); //ENVIANDO ATRAVÉS DO CABEÇALHO DA REQUISIÇÃO O TOTAL DE INCIDENTS

        return response.json(incidents);
    },

    //FUNÇÃO ASSINCRONA 
    async create(request, response){
        const { title, description, value } = request.body; 

        //GUARDA INFORMAÇÕES DO CONTEXTO DA REQUISIÇÃO
        //TIPO: DADOS DA AUTENTICAÇÃO DO USUÁRIO, COMO: ID, LOCALIZAÇÃO etc
        const ong_id = request.headers.authorization; //ESSE 'authorization' VEM DO INSOMNIA
    
        const [id] = await connection('incidents').insert({ //PASSANDO COMO PARAMETRO O NOME DA TABELA incidents QUE VAI INSERIR OS CAMPOS 
            title, 
            description,
            value,
            ong_id
        })

        return response.json({ id });
    },

    //FUNÇÃO ASSINCRONA 
    async delete(request, response){
        const { id } = request.params; //PARA SABER O ID
        
        //PEGO O ID DA ONG, PARA QUE O INCIDENT POSSA SER SOMENTE DELETADO PELA ONG QUE O CRIOU
        //SENDO ESSE ID O DA ONG QUE ESTÁ LOGADA NA APLICAÇÃO 
        const ong_id = request.headers.authorization; //ESSE 'authorization' VEM DO INSOMNIA

        const incident = await connection('incidents') //FAZENDO UM SELECT COM WHERE
            .where('id', id)
            .select('ong_id') //PEGANDO SOMENTE ESSA COLUNA DA TABLE
            .first() //PARA RETORNAR APENAS UM RESULTADO

            //SE O ID DA ONG FOR DIFERENTE DA QUE ESTA LOGADA DA ERRO
            if(incident.ong_id != ong_id ){
                return response.status(401).json({ error: 'Operação não autorizada.' });
            }

        //SE TUDO DEU CERTO
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }

}