import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const SeleccionarServicio = () => {
  const router = useRouter();
  const {
    pacienteId = '',
    nombrePaciente = '',
    telefonoPaciente = '',
    emailPaciente = ''
  } = useLocalSearchParams();

  const navegarA = (ruta: string) => {
    router.push({
      pathname: `/View/${ruta}`,
      params: { pacienteId, nombrePaciente, telefonoPaciente, emailPaciente }
    });
  };

  return (
    <View style={styles.container}>
      {/* AppBar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navegarA('Perfil')}>
          <Ionicons name="person-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{nombrePaciente}, ¿Qué quieres hacer hoy?</Text>
      <Text style={styles.subTitle}>Servicios plan básico de salud</Text>

      {/* Medicina General */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Ionicons name="person-outline" size={28} color="#000" />
          <Text style={styles.cardText}>Medicina General</Text>
        </View>
        <TouchableOpacity style={styles.ingresarBtn} onPress={() => navegarA('MedicinaGeneral')}>
          <Text style={styles.ingresarText}>ingresar</Text>
        </TouchableOpacity>
      </View>

      {/* Odontología */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Ionicons name="medkit-outline" size={28} color="#000" />
          <Text style={styles.cardText}>Odontología General</Text>
        </View>
        <TouchableOpacity style={styles.ingresarBtn} onPress={() => navegarA('Odontologia')}>
          <Text style={styles.ingresarText}>ingresar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subTitle}>Servicios particulares</Text>

      {/* Especialidades */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <FontAwesome5 name="user-md" size={24} color="#000" />
          <Text style={styles.cardText}>Especialidades</Text>
        </View>
        <TouchableOpacity style={styles.ingresarBtn}>
          <Text style={styles.ingresarText}>ingresar</Text>
        </TouchableOpacity>
      </View>

      {/* BottomBar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings-outline" size={22} color="#333" />
          <Text style={styles.navText}>Configuración</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navegarA('menu')}>
          <Ionicons name="home" size={24} color="#7B61FF" />
          <Text style={[styles.navText, { color: '#7B61FF' }]}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navegarA('Perfil')}>
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
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
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
    fontSize: 16,
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

export default SeleccionarServicio;
