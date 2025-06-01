import {Text, TextInput, ImageBackground, View, StyleSheet} from 'react-native';
import AnimacionYa from './Components/AnimacionMovil';
import FondoImagen from './Components/fondoPantalla';
import React from 'react';
import ImagenCualquiera from './Components/imagenes';
import MiBotonUtil from './Components/Botones';
import { router } from 'expo-router';

export default function recuperar() {
    return(
        <FondoImagen source={require('../(tabs)/assets/fondo2.png')}>

            <View style={estilos.contenedorPrincipal}>
            <ImagenCualquiera source={require('../(tabs)/assets/Logo2.png')}></ImagenCualquiera>
            <Text style={estilos.texto}>LIFE REMINDER</Text>
            <View style={estilos.contenedor}>
                <Text style={estilos.texto2}>!Lamentamos lo sucedido, ingresa tu correo eletronico y te enviaremos el enlance de recuperacion.</Text>
                <TextInput style={estilos.input} placeholder='Ingresa tu Correo' />
                <MiBotonUtil  
                texto="Enviar Enlace"
                onPress={() => router.prefetch}/>
             </View>
            </View>
        </FondoImagen>
    );
}

const estilos = StyleSheet.create({
    texto: {
      color: 'white',
      fontSize: 35,
      marginBottom: 30,
      textShadowColor: 'black',
      textShadowOffset: { width: 1, height: 4},
      textShadowRadius: 1
    },
    contenedor: {
        width: '98%',
        height: '30%',
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center'
    },
    input: {
      backgroundColor: 'white',
      width: 330,
      height: 50,
      borderRadius: 20,
      marginBottom: 15,
      borderColor: 'black',
      borderWidth: 1
    },
    contenedorPrincipal: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        marginTop: 180
    },
    texto2: {
        fontSize: 15,
        color: 'black',
        textAlign: 'justify',
        marginTop: 15,
        marginBottom: 10,
        width: 340,
        textShadowColor: 'gray',
        textShadowOffset: { width: 1, height: 3},
        textShadowRadius: 10
    }
});