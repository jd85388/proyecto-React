// ServiciosScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ServiciosScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Servicios Disponibles</Text>
      <Text style={styles.subtitulo}>Selecciona el área que requieres</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#4DB6AC' }]}
        onPress={() => navigation.navigate('MedicinaGeneral')}
      >
        <Text style={styles.buttonText}>Medicina General</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FF8A65' }]}
        onPress={() => navigation.navigate('OdontologiaGeneral')}
      >
        <Text style={styles.buttonText}>Odontología General</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#BA68C8' }]}
        onPress={() => navigation.navigate('Especialidades')}
      >
        <Text style={styles.buttonText}>Especialidades</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE7F6',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    color: '#512DA8',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#673AB7',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ServiciosScreen;