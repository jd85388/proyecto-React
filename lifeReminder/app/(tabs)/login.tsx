import React, { useState } from 'react';
import { View, Text, TextInput,StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { router, Stack } from 'expo-router';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const manejar = () => {
    console.log('Correo:', correo);
    console.log('Contraseña:', password);
    // Aquí puedes agregar la conexión con tu backend más adelante
  };

  return (
    <ImageBackground
      source={require('../(tabs)/assets/fondoPantalla.jpg')}
      style={Estilos.imagen2}
      resizeMode='stretch'>

    <View style={Estilos.contenedorPrincipal}>
      <Image 
        source={require('../(tabs)/assets/Logo2.png')}
        style={Estilos.imagen}/>
        <Text style={Estilos.titulo}>Life Reminder</Text>

      <View style={Estilos.contenedorSecundario}>

        <TextInput style={Estilos.input}>Correo Eletronico</TextInput>

        <TextInput style={Estilos.input}>Contraseña</TextInput>

        <TouchableOpacity style={Estilos.recuperacion} onPress={() => router.push('/Recuperacion') }>
          <Text style={Estilos.textoRecuperacion}>Olvidaste la contraseña?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Estilos.inicio}>
          <Text style={Estilos.cuentas}>Iniciar Sesión</Text>
        </TouchableOpacity>

      </View>

      <Text style={Estilos.separado}>----------------------- o -----------------------</Text>
      
      <View style={Estilos.contenedorTercero}>
      <TouchableOpacity style={Estilos.botonCuenta}>
            <Text style={Estilos.cuentas}>Iniciar con Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={Estilos.botonCuenta}>
          <Text style={Estilos.cuentas}>Iniciar con Faceboock</Text>
      </TouchableOpacity>

      </View>
    </View>
    </ImageBackground>
  );
}

const Estilos = StyleSheet.create({
    contenedorPrincipal: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    contenedorSecundario: {
      height: '40%',
      width: '90%',
      backgroundColor: '#1E90FF',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30,
      borderRadius: 30,
    },
    input: {
      backgroundColor: 'white',
      width: 330,
      height: 50,
      borderRadius: 20,
      marginBottom: 15,
    
    },
    imagen:{
      resizeMode: 'stretch',
      borderRadius: 999,
      marginBottom: 30,
      width: 180,
      height: 180
    },
    texto: {
      fontSize: 23
    },
    separado: {
      fontSize: 20,
      color: 'gray'
    },

    botonCuenta: {
      backgroundColor: '#1E90FF',
      width: 180,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    contenedorTercero: {
     
      width: '94%',
      height: '9%',
      marginTop: 10,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row'
    },
    titulo: {
      fontSize: 35,
      marginBottom: 30
    },
    recuperacion: {
      alignSelf: 'flex-start',
      marginBottom: 30
    },
    textoRecuperacion: {
      fontSize: 15,
      color: 'white'
    },
    inicio: {
      backgroundColor: '#1E90FF',
      width: 360,
      height: 50,
      marginBlock: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 14,
    },
    cuentas: {
      color: 'white',
      fontSize: 16
    },
    imagen2: {
      flex: 1,
      width: '100%',
      height: '100%'
    }
  })



