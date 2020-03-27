const express = require('express'); 

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
routes.post('/ongs', OngController.create);

                    //PARA LISTAR CASOS ESPECÍFICOS DE UMA ONG
routes.get('/profile', ProfileController.index); 


                    // ROTAS DOS INCIDENTS (casos)
//PARA LISTAR OS INCIDENTS DO BD
routes.get('/incidents', IncidentController.index);
//CREATE DOS INCIDENTS
routes.post('/incidents', IncidentController.create);

//DELETE COM ROUTE PARAMS: 'identificar recursos' NESSE CASO O ID
routes.delete('/incidents/:id', IncidentController.delete);


//EXPORTANDO  
module.exports = routes; 