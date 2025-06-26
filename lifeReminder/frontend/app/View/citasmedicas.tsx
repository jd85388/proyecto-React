// AgendaCitaScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AgendaCitaScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agenda tu cita médica</Text>
      <Text style={styles.subtitulo}>Elige una opción para continuar</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#0277BD' }]}
        onPress={() => navigation.navigate('Servicios')}
      >
        <Text style={styles.buttonText}>Ingresar a Servicios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#039BE5' }]}
        onPress={() => navigation.navigate('CitasAgendadas')}
      >
        <Text style={styles.buttonText}>Ver Citas Agendadas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1F5FE',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    color: '#01579B',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#0277BD',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AgendaCitaScreen;