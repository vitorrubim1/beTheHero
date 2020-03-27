import React from 'react';
import { Feather } from '@expo/vector-icons'; //ICONES
import { useNavigation, useRoute } from '@react-navigation/native'; //PARA NEVEGAÇÃO DE PAG, useRoute: PEGAR INFORMACOES DA PAG ATUAL DA APLICACAO
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native'; 
//View: COMO SE FOSSE A DIV, TouchableOpacity: TORNA QUALQUER COISA CLICAVEL, E DIMINUI A OPACIDADE. Linking: PARA LEVAR O USER PARA O WHATS
import * as MailComposer from 'expo-mail-composer'; //IMPORTANDO TUDO DA LIB E JOGANDO NA VAR

import styles from './styles'; //CSS
import logoImg from '../../assets/logo.png'; //IMPORTANDO A LOGO 

export default function Detail(){

    //USANDO A LIB E COLOCANDO NA VARIAVEL
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident //PEGANDO OS INCIDENTS
    //MENSAGEM PRA SER USADA NO EMAIL E NO WHATS
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style:'currency', currency: 'BRL' 
    }).format(incident.value)}`

    function navigateBack(){ 
        navigation.goBack(); //goBack() É UMA FUNÇÃO QUE EXISTE DENTRO DO useNavigation(), PARA VOLTAR 
    }

    //FUNÇÃO DE ENVIAR EMAIL
    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`, //ASSUNTO DA MENSAGEM
            recipients: [incident.email], //PARA QUEM VAI SER ENVIADO
            body: message,
        });
    }

    //FUNÇÃO DE ENVIAR WHATSAPP
    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`); 
        //PARA A URL DO WHATS. COM O METODO DE ENVIO DE MENSAGEM (send)
    }


    return(
        <View style={styles.container}>
             {/*HEADER*/}
             <View style={styles.header}>
                <Image source={logoImg} />
                
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041"></Feather>
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop:0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

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
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o Dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    {/*QUANDO O USER CLICAR DISPARA A FUNÇÃO DE ENVIO PELO WHATSAPP*/}
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    {/*QUANDO O USER CLICAR DISPARA A FUNÇÃO DE EMAIL*/}
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}