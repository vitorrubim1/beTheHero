import React from 'react';
import { Link } from 'react-router-dom'; //PARA SUBSTITUIR A TAG <a>, E USA A SPA
import { FiArrowLeft } from 'react-icons/fi'; //ICON


import './styles.css'; //CSS

import logoImg from '../../assets/logo.svg'; //LOGO


export default function NewIncident(){
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                     {/* ESSA TAG LINK EVITA DA PÁGINA SER RECARREGADA AO CHAMAR O to ='register' */}
                     <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para a home
                    </Link>
                </section>

                <form>
                    <input placeholder="Título do caso"/>
                    <textarea placeholder="Descrição"/>

                    <input placeholder="Valor em reais"/>

                    <button className="button" type="submit">Cadatrar</button>
                </form>
            </div>
        </div>
    );
}