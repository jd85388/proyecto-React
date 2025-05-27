import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
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
    <View style={estilos.contenedor}>

    <Image 
    source={require('./assets/fondoLife2.png')}
    style={estilos.imagen}
    /> 

      <Text style={estilos.titulo}>INICIAR SESION</Text>

      <TextInput
        style={estilos.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text>Olvidaste tu usuario</Text>
      <TextInput
        style={estilos.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Ingresar" onPress={manejar} />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  imagen: {
    width: 420,
    height: 240,
    alignSelf: 'center',
    marginTop: -190,
    marginBottom: 10,
    resizeMode: 'contain'
  }
});
