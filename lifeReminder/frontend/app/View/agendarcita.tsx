// frontend/app/View/SeleccionarServicio.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const SeleccionarServicio = () => {
  const router = useRouter();
  const {
    pacienteId = '',
    nombrePaciente = '',
    telefonoPaciente = '',
    emailPaciente = ''
  } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#4DB6AC' }]}
        onPress={() =>
          router.push({
            pathname: '/View/MedicinaGeneral',
            params: { pacienteId, nombrePaciente, telefonoPaciente, emailPaciente }
          })
        }
      >
        <Text style={styles.buttonText}>Medicina General</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FF8A65' }]}
        onPress={() =>
          router.push({
            pathname: '/View/Odontologia',
            params: { pacienteId, nombrePaciente, telefonoPaciente, emailPaciente }
          })
        }
      >
        <Text style={styles.buttonText}>Odontología General</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#BA68C8' }]}
        onPress={() => {
          // Aquí podrías implementar navegación a Especialidades
        }}
      >
        <Text style={styles.buttonText}>Especialidades</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E0F7FA'
  },
  button: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%'
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default SeleccionarServicio;
