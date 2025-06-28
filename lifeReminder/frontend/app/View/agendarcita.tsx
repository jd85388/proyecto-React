// frontend/app/View/SeleccionarServicio.tsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type SeleccionarServicioRouteProp = RouteProp<RootStackParamList, 'SeleccionarServicio'>;

const SeleccionarServicio = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<SeleccionarServicioRouteProp>();

  const { pacienteId, nombrePaciente, telefonoPaciente, emailPaciente } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#4DB6AC' }]}
        onPress={() =>
          navigation.navigate('MedicinaGeneral', {
            pacienteId,
            nombrePaciente,
            telefonoPaciente,
            emailPaciente
          })
        }
      >
        <Text style={styles.buttonText}>Medicina General</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FF8A65' }]}
        onPress={() =>
          navigation.navigate('Odontologia', {
            pacienteId,
            nombrePaciente,
            telefonoPaciente,
            emailPaciente
          })
        }
      >
        <Text style={styles.buttonText}>Odontología General</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#BA68C8' }]}
        onPress={() => {
          // Aquí podrías implementar navegación a 'Especialidades' si deseas
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
