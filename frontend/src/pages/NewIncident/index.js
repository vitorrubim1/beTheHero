import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; //Link: PARA SUBSTITUIR A TAG <a>, E USA A SPA. useHistory: PARA REDIRECIONAR
import { FiArrowLeft } from 'react-icons/fi'; //ICON

import api from '../../services/api'; //IMPORTANDO A API    
import './styles.css'; //CSS

import logoImg from '../../assets/logo.svg'; //LOGO


export default function NewIncident(){

    //ARMAZENANDO VALORES DOS INPUTS COM useState
    const [title, setTitle] = useState(''); //VAZIO PQ É STRING
    const [description, setDescription] = useState(''); //VAZIO PQ É STRING
    const [value, setValue] = useState(''); 

    const ongId = localStorage.getItem('ongId');

    const history = useHistory(); //PARA REDIRECIONAMENTO

    //FUNÇÃO ASSÍNCRONA RESPONSÁVEL POR FAZER O CADASTRO DE UM CASO
    async function handleNewIncident(e) {
        e.preventDefault(); //ISSO PREVINE O COMPORTAMENTO PADRÃO DE RECARREGAR A PÁGINA, QUANDO O FORM FOR SUBMITADO

        const data = { title, description, value };

        try {
            api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })
            history.push('/profile');
        } catch (err) {
            alert ("Erro em cadastrar este caso, tente novamente!");
        }
    }

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

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso"
                        value={title}
                        onChange= {e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange= {e => setDescription(e.target.value)}
                    />

                    <input 
                        placeholder="Valor em reais"
                        value={value}
                        onChange= {e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadatrar</button>
                </form>
            </div>
        </div>
    );
}