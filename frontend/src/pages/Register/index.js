import React from 'react';
import { Link } from 'react-router-dom'; //PARA SUBSTITUIR A TAG <a>, E USA A SPA
import { FiArrowLeft } from 'react-icons/fi'; //ICON

import './styles.css'; //CSS

import logoImg from '../../assets/logo.svg'; //LOGO

export default function Register(){
    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas encontrarem os casos da sua ONG.</p>

                     {/* ESSA TAG LINK EVITA DA PÁGINA SER RECARREGADA AO CHAMAR O to ='register' */}
                     <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>

                <form>
                    <input placeholder="Nome da ONG"/>
                    <input type="email" placeholder="E-mail"/>
                    <input placeholder="WhatsApp"/>

                    <div className="input-group">
                        <input placeholder="Cidade"/>
                        <input placeholder="UF" style={{ width: 80 }}/>
                    </div>

                    <button className="button" type="submit">Cadatrar</button>
                </form>
            </div>
        </div>
    );
}