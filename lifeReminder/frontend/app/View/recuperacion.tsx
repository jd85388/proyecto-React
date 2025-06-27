import {Text, TextInput, ImageBackground, View, StyleSheet, Alert} from 'react-native';
import FondoImagen from '../../(tabs)/Components/fondoPantalla';
import React, { useState } from 'react';
import ImagenCualquiera from '../../(tabs)/Components/imagenes';
import MiBotonUtil from '../../(tabs)/Components/Botones';
import { router } from 'expo-router';



export default function recuperacion() {
    const [correo, setCorreo] = useState('');
   const validarCorreo = async () => {
    try{
        const respuesta = await fetch('http://192.168.1.10:3000/api/recuperacion', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                correo
            })
        });
        const data = await respuesta.json();
        if (respuesta.ok) {
            Alert.alert("Validacion Exitosa", "Hemos comprobado que si estas registrado en nuestro sistema, hemos enviado un enlance a tu correo para restablecer tu contraseña"); 
        }else {
            Alert.alert(`Lo sentimos..., Hemos validado en nuestro sistema y no hemos encontrado una cuenta asosiada a este correo eletronico ${data.message}`);
        }
    }catch(error){
        console.error('Hemos perdido la conexion con la base de datos, porfavor intenta mas tarde', error)
    }
   };

    return(
        <FondoImagen source={require('../../(tabs)/assets/fondo2.png')}>

            <View style={estilos.contenedorPrincipal}>
            <ImagenCualquiera source={require('../../(tabs)/assets/logoIcon.png')}></ImagenCualquiera>
            <View style={estilos.contenedor}>
                <Text style={estilos.texto2}>!Lamentamos lo sucedido, ingresa tu correo eletronico y te enviaremos el enlance de recuperacion.</Text>
                <TextInput style={estilos.input} placeholder='Ingresa tu Correo' onChangeText={setCorreo} />
                <MiBotonUtil 
                texto="Enviar Enlace"
                onPress={validarCorreo}/>
             </View>
            </View>
        </FondoImagen>
    );
}

const estilos = StyleSheet.create({
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