import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const HomeScreen = () => {
  const router = useRouter();
  const { pacienteId, nombrePaciente } = useLocalSearchParams();

  const irA = (ruta: string) => {
    router.push({
      pathname: `/View/${ruta}`,
      params: { pacienteId, nombrePaciente },
    });
  };

  return (
    <View style={styles.container}>
      {/* AppBar superior */}
      <View style={styles.topBarContainer}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => irA('Perfil')}>
            <Ionicons name="person-circle-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={26} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        <Text style={styles.titulo}>Bienvenido {nombrePaciente}!</Text>
        <Text style={styles.subtitulo}>¿En qué te puedo ayudar hoy?</Text>

        {/* Tarjetas en cuadrícula */}
        <View style={styles.grid}>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#B2EBF2' }]}
            onPress={() => irA('Medicamentos')}>
            <Text style={styles.cardTitulo}>Medicamentos</Text>
            <Text style={styles.cardTexto}>Recuerda, es importante tomarlos a tiempo para cuidar tu salud.</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#FFCDD2' }]}
            onPress={() => irA('CitasMedicas')}>
            <Text style={styles.cardTitulo}>Citas médicas</Text>
            <Text style={styles.cardTexto}>Tu salud es prioridad, no faltes a tu cita</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#FFFFFF' }]}
            onPress={() => irA('HistoriaClinica')}>
            <Text style={styles.cardTitulo}>Historia clínica</Text>
            <Text style={styles.cardTexto}>Tu historia clínica es clave para recibir la atención adecuada</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, { backgroundColor: '#DCEDC8' }]}
            onPress={() => irA('ImagenesDiagnosticas')}>
            <Text style={styles.cardTitulo}>Imágenes Diagnósticas</Text>
            <Text style={styles.cardTexto}>No dejes pasar tus exámenes, pueden marcar la diferencia en tu tratamiento.</Text>
          </TouchableOpacity>
        </View>

        {/* Botón cerrar sesión */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/login')}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings-outline" size={22} color="#333" />
          <Text style={styles.navText}>Configuración</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => irA('menu')}>
          <Ionicons name="home" size={24} color="#7B61FF" />
          <Text style={[styles.navText, { color: '#7B61FF' }]}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => irA('Perfil')}>
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
    backgroundColor: '#1E88E5',
  },
  topBarContainer: {
    backgroundColor: '#1E88E5',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'left',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    padding: 10,
    borderRadius: 12,
    marginBottom: 15,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  cardTexto: {
    fontSize: 13,
    color: '#333',
  },
  logoutBtn: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
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

export default HomeScreen;
