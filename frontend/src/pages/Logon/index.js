import React from 'react';
import { Link } from 'react-router-dom'; //PARA SUBSTITUIR A TAG <a>, E USA A SPA
import { FiLogIn } from 'react-icons/fi'; //ICON

import './styles.css'; //ARQUIVO CSS DA PAG

//IMPORT DAS IMAGENS, ARMAZENANDO EM VAR PARA MANIPULA-LAS
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon(){
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero"/>

                <form>
                    <h1>Faça seu logon</h1>

                    <input placeholder="Sua ID"/>
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