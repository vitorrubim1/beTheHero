import React from 'react';
import { Link } from 'react-router-dom'; //PARA SUBSTITUIR A TAG <a>, E USA A SPA
import { FiPower, FiTrash2 } from 'react-icons/fi'; //ICON

import './styles.css'; //CSS

import logoImg from '../../assets/logo.svg'; //LOGO

export default function Profile(){
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, APAD</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button">
                    <FiPower  size={18} color="#e02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                <li>
                    <strong>CASO:</strong>
                    <p>Caso teste</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem cupiditate quas </p>

                    <strong>VALOR:</strong>
                    <p>R$ 120.00</p>

                    <button type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>

                <li>
                    <strong>CASO:</strong>
                    <p>Caso teste</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem cupiditate quas </p>

                    <strong>VALOR:</strong>
                    <p>R$ 120.00</p>

                    <button type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>

                <li>
                    <strong>CASO:</strong>
                    <p>Caso teste</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem cupiditate quas </p>

                    <strong>VALOR:</strong>
                    <p>R$ 120.00</p>

                    <button type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>

                <li>
                    <strong>CASO:</strong>
                    <p>Caso teste</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem cupiditate quas </p>

                    <strong>VALOR:</strong>
                    <p>R$ 120.00</p>

                    <button type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
            </ul>
        </div>
    );    
};