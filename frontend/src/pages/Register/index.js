import React, { useState } from 'react'; //IMPORTANDO TBM O ESTADO
import { Link, useHistory } from 'react-router-dom'; //Link: PARA SUBSTITUIR A TAG <a>, E USA A SPA. useHistory: PARA REDIRECIONAR
import { FiArrowLeft } from 'react-icons/fi'; //ICON

import api from '../../services/api'; //IMPORTANDO A API
import './styles.css'; //CSS

import logoImg from '../../assets/logo.svg'; //LOGO

export default function Register(){

    //ARMAZENANDO VALORES DOS INPUTS COM useState
    const [name, setName] = useState(''); //VAZIO PQ É STRING
    const [email, setEmail] = useState(''); 
    const [whatsapp, setWhatsapp] = useState(''); 
    const [city, setCity] = useState(''); 
    const [uf, setUf] = useState(''); 

    const history = useHistory(); //PARA REDIRECIONAMENTO

    //FUNÇÃO ASSÍNCRONA RESPONSÁVEL POR FAZER O CADASTRO DAS ONGS
    async function handleRegister(e){
        e.preventDefault(); //ISSO PREVINE O COMPORTAMENTO PADRÃO DE RECARREGAR A PÁGINA, QUANDO O FORM FOR SUBMITADO

        //VALORES DAS VARIAVEL
        const data = {
            name, email, whatsapp, city, uf
        };

        try{
        //ENVIANDO PRO BACKEND, COM A ROTA QUE CORRESPONDE AO CREATE
        //COM O RESPONSE EU PEGO UMA RESPOSTA DA API, E O AWAIT AGUARDO A FUNÇÃO ASSINCRONA FINALIZAR
        const response = await api.post('ongs', data);

        alert (`Seu ID de acesso: ${response.data.id}`) //(data) = RESULTADO DA RESPOSTA, RETORNANDO O ID DE ACESSO PRA ONG  
        history.push('/'); //LEVANDO O USUÁRIO PRA HOME    
        }   
        catch (err){
            alert('Erro no cadastro, tente novamente.')
        }
    
    }

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

                {/*ASSIM QUE O USUÁRIO SUBMITAR, CHAMA A FUNÇÃO handleRegister*/}
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} //onChange OUVE AS MUDANÇAS DO INPUT, 'e' PEGA O EVENTO DE MUDANÇA E PONHO O VALOR DO INPUT DENTRO DA VARIAVEL NAME, ATRAVÉS DO useState
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}

                        />
                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadatrar</button>
                </form>
            </div>
        </div>
    );
}