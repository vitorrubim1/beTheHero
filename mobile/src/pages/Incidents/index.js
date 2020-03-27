import React, {useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons'; //ICONES
import { useNavigation } from '@react-navigation/native'; //PARA NAVEGAR COM O TouchableOpacity 
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'; //View: COMO SE FOSSE A DIV, TouchableOpacity: TORNA QUALQUER COISA CLICAVEL, E DIMINUI A OPACIDADE, FlatList: SEMPRE QUE TIVER LISTA

import logoImg from '../../assets/logo.png'; //IMPORTANDO A LOGO 
import styles from './style'; //IMPORTANDO O CSS

import api from '../../services/api'; //API

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);  //CONTROLANDO O NUMERO DE PAG, PARA FAZER PAGINAÇÃO INFINITA
    const [loading, setLoading] = useState(false);//PARA PEGAR DADOS NOVOS 

    const navigation = useNavigation();

    //FUNÇÃO ASSINCRONA
    async function loadIncidents(){

        if(loading){
            return; //PARA EVITAR DE FICAR FAZENDO MTS REQ
        }

        if(total > 0 && incidents.length == total){
            return; //SE O NUMERO DE INCIDENTS FOR MAIOR Q O PERMITIDO PRA SER SCROLADO RETURN 
        }

        setLoading(true);

        const response = await api.get('incidents'); //PEGANDO DA API, A ROTA PASSADA NO PARAMETRO

        setIncidents(response.data); //PEGANDO DADOS E PONDO NO setIncidents
        setTotal(response.headers['x-total-count']); //DENTRO DO HEADER PQ O TOTAL VEM DENTRO DO header
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents(); //CARREGANDO A FUNÇÃO DE CARREGA INCIDENTS AQ
    }, []);

    //FUNÇÃO PARA NAVEGAR PARA UM PAG ESPECIFICA
    function navigateToDetail(incident){
        navigation.navigate('Detail', { incident }); //O 1°PARAMETRO É A ROTA, O SEGUNDO É AS INFORMAÇOES DO INCIDENTS, TITLE, DESCRIPTION E VALOR, QUE EU MANDO PRO DETAIL.
    }

    return(

        <View style={styles.container}>
            {/*HEADER*/}
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
                </Text>
            </View>
            {/**/}

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>


            {/*
                data: ARRAY DE DADOS QUE VAI MONTAR A LISTA
                renderItem: FUNÇÃO RESPONSAVEL POR RENDERIZAR CADA UM DOS ITENS, QUE RETORNA JSX
                keyExtractor: RECEBE CADA UM DOS INCIDENTS E RETORNA UMA INFORMAÇÃO UNICA QUE EXISTE EM CADA UM DOS CASOS
                showsVerticalScrollIndicator: PARA TIRAR O SCROLL DE NAVEGAÇÃO
            */}
            <FlatList 
                data={incidents} //PEGO ESSE incidents, do useState 
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)} //CHAVE DE CADA UM DOS INCIDENTS
                showsVerticalScrollIndicator={false}
                renderItem={({ item: incident }) => ( //item = incident
                    <View style={styles.incident}>
                        <Text style={[styles.incidentProperty, {marginTop:0}]}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name} </Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>Valor:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', { 
                                style:'currency', 
                                currency: 'BRL' 
                            }).format(incident.value)}
                            {/*FORMATAR EM MOEDA BR*/}
                        </Text>

                            {/*onPress: É COMO SE FOSSE O HREF DO <a>*/}
                            <TouchableOpacity 
                                style={styles.detailsButton} 
                                onPress={() => navigateToDetail(incident) }
                            >
                                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                                <Feather name="arrow-right" size={16} color="#E02041"></Feather>
                            </TouchableOpacity>
                        </View>
                )}
            />
        </View>
    );
}