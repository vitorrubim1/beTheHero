import React, { useEffect, useState } from 'react'; //useEffect: DISPARAR ALGUMA FUNÇÃO, EM ALGUM DETERMINADO MOMENTO DO COMPONENTE
import { Link, useHistory } from 'react-router-dom'; //Link: PARA SUBSTITUIR A TAG <a>, E USA A SPA. useHistory: PARA REDIRECIONAR
import { FiPower, FiTrash2 } from 'react-icons/fi'; //ICON

import api from '../../services/api'; //IMPORTANDO A API
import './styles.css'; //CSS

import logoImg from '../../assets/logo.svg'; //LOGO

export default function Profile(){

    const [incidents, setIncidents] = useState([]); //ESTADO
    
    const history = useHistory();

    //QUANDO A ONG PÕE O ID, SALVA O NOME E O ID NO LOCALSTORE, AQUI EU RESGATO
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');


    //useEffect RECEBE DOIS PARAMETROS, 1º QUAL FUNÇÃO QUE SERÁ EXECUTADA: QUE É PRA A FUNÇÃO DE CARREGAR OS CASOS
    //O 2° É QUANDO A FUNÇÃO SERÁ EXECUTADA, POSSO PASSAR QUANDO A ONG MUDAR O NOME, OU ID, ENFIM 
    useEffect(()=>{
        //PEGANDO OS INCIDENTS
        api.get('profile', {
            headers: {
                Authorization: ongId, //PEGANDO OS INCIDENTS PELO ID, ATRAVÉS DO HEADER QUEM TEM AUTORIZAÇÃO 
            }
        }).then(response => {

            setIncidents(response.data);//E SALVANDO OS DADOS NO ESTADO COM useState
        }); //.then PARA PEGAR OS DADOS
    }, [ongId]); //ongId DEPENDENCIA


    //FUNÇÃO ASSINCRONA PARA DELETAR UM CASO
    async function handleDeleteIncident(id){
        try {
          await api.delete(`incidents/${id}`, {
              headers: {
                  Authorization: ongId, //AQUI PRECISA CONFIRMAR O ID DA ONG, QUE QUER DELETAR
              }
          })  

          setIncidents(incidents.filter(incident => incident.id !== id)) //ESTOU FILTRANDO OS INCIDENTS COM ID DIFERENTE DO QUE FOI EXCLUIDO

        } catch (err) {
            alert ("Erro ao deletar, tente novamente.");
        }
    }

    //FUNÇÃO DE LOGOUT
    function handleLogout(){
        //AQUI EU LIMPO O LOCALSTORAGE, REMOVENDO O ID QUE ESTÁ LOGADO
        localStorage.clear();  
        
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>

                {/*BOTÃO DE LOGOUT, AQUI CHAMO A FUNÇÃO PARA DESLOGAR*/}
                <button onClick={handleLogout} type="button">
                    <FiPower  size={18} color="#e02041"/>
                </button>
            
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>
                            {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
                            .format(incident.value)} { /*FORMATANDO O VALOR EM DINHEIRO*/}
                        </p>

                        <button onClick={() => handleDeleteIncident(incident.id) } type="button">
                            <FiTrash2 size={20} color="rgba(78, 78, 78, 0.781)"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );    
};