import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; //Link: PARA SUBSTITUIR A TAG <a>, E USA A SPA. useHistory: PARA REDIRECIONAR
import { FiLogIn } from 'react-icons/fi'; //ICON

import api from '../../services/api'; //IMPORTANDO A API
import './styles.css'; //ARQUIVO CSS DA PAG

//IMPORT DAS IMAGENS, ARMAZENANDO EM VAR PARA MANIPULA-LAS
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon(){

    //ARMAZENANDO VALORES DOS INPUTS COM useState
    const [id, setId] = useState('');

    const history = useHistory(); //PARA REDIRECIONAMENTO

    //FUNÇÃO ASSÍNCRONA
    async function handleLogin(e){
        e.preventDefault(); //ISSO PREVINE O COMPORTAMENTO PADRÃO DE RECARREGAR A PÁGINA, QUANDO O FORM FOR SUBMITADO
        
        try{
            const response = await api.post('sessions', { id }); //ENVIANDO O ID PARA A ROTA DE LOGIN 

            localStorage.setItem('ongId', id); //PARA TER DISPONIVEL EM TODA A APLICAÇÃO, GRAVO NO STORAGE DO NAVEGADOR
            localStorage.setItem('ongName', response.data.name);
            
            history.push('/profile');
        }
        catch(err){
            alert("Falha no Login, tente novamente.");
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero"/>

                {/*ASSIM QUE O USUÁRIO SUBMITAR, CHAMA A FUNÇÃO handleLogin*/}
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    {/* ESSA TAG LINK EVITA DA PÁGINA SER RECARREGADA AO CHAMAR O to ='register' */}
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}

//props (que é recebido no parametro) RECEBE AS PROPRIEDADES DO App.js, NESSE CASO O children
//PODENDO ASSIM PASSAR DIFERENTES CONTEÚDOS PRA DENTRO DO H1