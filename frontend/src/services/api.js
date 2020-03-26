//ESSE FILE, TÁ PROVENDO UMA INTEGRAÇÃO DE SERVIÇO EXTERNO
//NESSE CASO O AXIOS, Q É UM CLIENTE HTTP, E FICA RESPONSÁVEL POR CONECTAR COM API, NODE (backend)

import axios from 'axios';

const api = axios.create({
    //PARAMETROS
    baseURL: 'http://localhost:3333', //BACKEND
})

export default api;