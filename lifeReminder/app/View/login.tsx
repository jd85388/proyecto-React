import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { router, useRouter } from 'expo-router';
import AnimacionYa from '../(tabs)/Components/AnimacionMovil';
import AnimacionEfecto from '../(tabs)/Components/AnimacionElement';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [recordar, setRecordar] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      const correoGuardado = await AsyncStorage.getItem('correo');
      const passwordGuardado = await AsyncStorage.getItem('password');

      if (correoGuardado && passwordGuardado) {
        setCorreo(correoGuardado);
        setPassword(passwordGuardado);
        setRecordar(true);
      }
    };
    cargarDatos();
  }, []);
  const manejar = async () => {
    if (recordar) {
    await AsyncStorage.setItem('correo', correo);
    await AsyncStorage.setItem('password', password);
    } else {
      await AsyncStorage.removeItem('correo');
      await AsyncStorage.removeItem('password');
    }
    console.log('Iniciar Sesión con:', correo, password);
  };

  return (
    <ImageBackground
      source={require('../(tabs)/assets/fondo2.png')}
      style={Estilos.imagen2}
      resizeMode='stretch'>

    <View style={Estilos.contenedorPrincipal}>
      <Image 
        source={require('../(tabs)/assets/Logo2.png')}
        style={Estilos.imagen}/>
        <AnimacionYa style={Estilos.titulo} duration={2000}>
              LIFE REMINDER
        </AnimacionYa>

      
      <View style={Estilos.contenedorSecundario}>
        <AnimacionEfecto duration={2000}>
        <TextInput
         style={Estilos.input} 
         placeholder='Correo Eletronico' 
         value={correo} 
         onChangeText={setCorreo} />

        <TextInput 
        style={Estilos.input} 
        placeholder='Contraseña' 
        value={password} 
        onChangeText={setPassword}
        secureTextEntry />
        <View style={Estilos.contenedorRecordar}>
        <TouchableOpacity onPress={() => setRecordar(!recordar)}
          style={[Estilos.checkbox, recordar && Estilos.activo]}>
        </TouchableOpacity>
        <Text style={Estilos.textoRecordarme}>Recordarme</Text>
        </View>

        <TouchableOpacity style={Estilos.inicio} onPress={manejar}>
          <Text style={Estilos.cuentas}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Estilos.recuperacion} onPress={() => router.push('/View/recuperacion') }>
          <Text style={Estilos.textoRecuperacion}>Olvidaste la contraseña?</Text>
        </TouchableOpacity>

        </AnimacionEfecto>
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

// Desde esta parte empienzan los estilos para la app y para cada elemento 
//dentro de esta pantalla
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
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30,
      borderRadius: 30,
    },
    input: {
      backgroundColor: 'white',
      width: 350,
      height: 50,
      borderRadius: 20,
      marginBottom: 15,
      borderColor: 'black',
      borderWidth: 1

    
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
      color: 'white'
    },

    botonCuenta: {
      backgroundColor: '#1E90FF',
      width: 180,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      elevation: 9,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 4,
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
      color: 'white',
      fontSize: 35,
      marginBottom: 30,
      textShadowColor: 'black',
      textShadowOffset: { width: 1, height: 4},
      textShadowRadius: 1
    },
    recuperacion: {
      marginBottom: 14
    },
    textoRecuperacion: {
      fontSize: 15,
      color: 'black',
      textAlign: 'center'
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
    },
    contenedorRecordar: {
      flexDirection: 'row',
      alignContent: 'center',
    },
    checkbox: {
      width: 24,
      height: 24,
      borderWidth: 2,
      borderColor: '#1E90FF',
      marginRight: 10,
      borderRadius: 4
    },
    activo: {
      backgroundColor: 'black'
    },
    textoRecordarme: {
      fontSize: 15,
      color: 'black',
    },

  })



