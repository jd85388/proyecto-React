import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const AgendaCitaScreen = () => {
  const router = useRouter();
  const { pacienteId = '', nombrePaciente = '' } = useLocalSearchParams();

  const irAServicios = () => {
    if (!pacienteId || !nombrePaciente) {
      Alert.alert('Error', 'Datos del paciente no disponibles');
      return;
    }
    router.push({
      pathname: '/View/AgendarCita',
      params: { pacienteId, nombrePaciente }
    });
  };

  const irACitasAgendadas = () => {
    if (!pacienteId || !nombrePaciente) {
      Alert.alert('Error', 'Datos del paciente no disponibles');
      return;
    }
    router.push({
      pathname: '/View/CitasAgendadas',
      params: { pacienteId, nombrePaciente }
    });
  };

  return (
    <View style={styles.container}>
      {/* AppBar */}
     <View style={styles.topBar}>
       <TouchableOpacity onPress={() => router.push('/View/Perfil')}>
        <Ionicons name="person-circle-outline" size={28} color="black" />
       </TouchableOpacity>
       <TouchableOpacity>
        <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
    </View>


      {/* Título */}
      <Text style={styles.title}>{nombrePaciente}, ¿Qué quieres hacer hoy?</Text>

      {/* Agendar Cita */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Ionicons name="calendar-outline" size={30} color="#000" />
          <Text style={styles.cardText}>Agendar Cita</Text>
        </View>
        <TouchableOpacity style={styles.ingresarBtn} onPress={irAServicios}>
          <Text style={styles.ingresarText}>ingresar</Text>
        </TouchableOpacity>
      </View>

      {/* Citas Agendadas */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Ionicons name="calendar" size={30} color="#000" />
          <Text style={styles.cardText}>Citas agendadas</Text>
        </View>
        <TouchableOpacity style={styles.ingresarBtn} onPress={irACitasAgendadas}>
          <Text style={styles.ingresarText}>ingresar</Text>
        </TouchableOpacity>
      </View>

      {/* Barra inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings-outline" size={22} color="#333" />
          <Text style={styles.navText}>Configuración</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/View/menu')}>
          <Ionicons name="home" size={24} color="#7B61FF" />
          <Text style={[styles.navText, { color: '#7B61FF' }]}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/View/Perfil')}>
          <FontAwesome5 name="user-circle" size={20} color="#333" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  ingresarBtn: {
    backgroundColor: '#1976D2',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    width: 100,
  },
  ingresarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f6f0ff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#333',
    marginTop: 2,
  },
});

export default AgendaCitaScreen;
