import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; //PARA ENVOLVER TODAS AS ROTAS
import { createStackNavigator } from '@react-navigation/stack' //IMPORTANDO DESTE PACOTE AS ROTAS DE BOTÕES

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

const AppStack = createStackNavigator(); //CRIANDO UMA VÁRIAVEL PRA ARMAZENAR AS ROTAS

export default function Routes(){
    return(
        //RETORNANDO AS ROTAS
        <NavigationContainer>

            {/*
                É ESSENCIAL QUE AppStack.Navigator ENVOLVA AS ROTAS
                headerShown: false > PARA SUMIR COM O CABEÇALHO
            */}
            <AppStack.Navigator screenOptions={{ headerShown: false }}>    
                {/*AppStack.Screen TODAS ROTAS TEM Q VIM AQ*/}
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>

        </NavigationContainer>
    );
}