import React from 'react';

//IMPORTANDO ROTAS DO PACOTE
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes(){
    
    //RETORNANDO COMPONENTES
    return(
        //ESSE BrowserRouter PRECISA ESTAR POR VOLTA DE TUDO
        //O Switch FAZ COM QUE APENAS UMA ROTA SEJA EXECUTADA POR VEZ
        //path DO PRIMEIRO Route FAZ COM QUE A PRIMEIRA ROTA SEJA ACESSADA, LOCALHOST
        //exact FAZ COM QUE A ROTA PRECISE SER EXATAMENTE IGUAL, FAZENDO COM QUE A BARRA NÃO ATRAPALHE OUTRAS ROTAS
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    );
}