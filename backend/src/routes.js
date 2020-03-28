const express = require('express'); 
const { celebrate, Segments, Joi } = require('celebrate'); //celebrate LIB DE VALIDAÇÃO

//IMPORTANDO OS CONTROLLERS
const OngController = require('./controllers/OngController'); 
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
//

const routes = express.Router(); //DESACOPLANDO O MÓDULO DE ROTAS DO EXPRESS EM UMA VARIAVEL

                    //SESSION, PARA LOGIN
routes.post('/sessions', SessionController.create);


                    // ROTAS DAS ONGS
//PARA LISTAR AS ONGS DO BD
routes.get('/ongs', OngController.index);
//CREATE DAS ONGS
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        //VALIDANDO OQ ESTOU CADASTRANDO (BODY DA REQ)
        name: Joi.string().required(),
        email: Joi.string().required().email(), //FORMATO DE EMAIL
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
    //ENTRE COLCHETES PRA VALIDAR VAR DO JS. DIGO QUE ESTOU RECEBENDO UM OBJETO COMO O CORPO DA REQ
}), OngController.create); //CELEBRATE FAZ A VALIDACAO

                    //PARA LISTAR CASOS ESPECÍFICOS DE UMA ONG
routes.get('/profile', celebrate({
    //FAZENDO COM Q A REQ TRAGA O ID, ATRAVÉS DOS HEADERS
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index); 


                    // ROTAS DOS INCIDENTS (casos)
//PARA LISTAR OS INCIDENTS DO BD
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);


//CREATE DOS INCIDENTS
routes.post('/incidents', IncidentController.create);

//DELETE COM ROUTE PARAMS: 'identificar recursos' NESSE CASO O ID
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);


//EXPORTANDO  
module.exports = routes; 