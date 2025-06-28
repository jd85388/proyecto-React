import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const { pacienteId, nombrePaciente } = route.params;

  const irA = (ruta: string) => {
    navigation.navigate(ruta, { pacienteId, nombrePaciente });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bienvenido {nombrePaciente}!</Text>
      <Text style={styles.subtitulo}>¿En qué te puedo ayudar hoy?</Text>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#B2DFDB' }]}
        onPress={() => irA('Medicamentos')}>
        <Text style={styles.cardTitulo}>Medicamentos</Text>
        <Text style={styles.cardTexto}>
          Recuerda tomarlos a tiempo para cuidar tu salud.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#FFCC80' }]}
        onPress={() => irA('CitasMedicas')}>
        <Text style={styles.cardTitulo}>Citas médicas</Text>
        <Text style={styles.cardTexto}>
          Tu salud es prioridad, no faltes a tu cita.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#90CAF9' }]}
        onPress={() => irA('HistoriaClinica')}>
        <Text style={styles.cardTitulo}>Historia clínica</Text>
        <Text style={styles.cardTexto}>
          Tu historia clínica es clave para atención adecuada.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#F48FB1' }]}
        onPress={() => irA('ImagenesDiagnosticas')}>
        <Text style={styles.cardTitulo}>Imágenes Diagnósticas</Text>
        <Text style={styles.cardTexto}>No dejes pasar tus exámenes.</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.logoutBtn, { backgroundColor: '#E57373' }]}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => irA('Configuracion')}>
          <Text style={[styles.appBarItem, { color: '#00796B' }]}>Configuración</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => irA('Home')}>
          <Text style={[styles.appBarItem, { color: '#1976D2' }]}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => irA('Perfil')}>
          <Text style={[styles.appBarItem, { color: '#C2185B' }]}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00AEEF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  titulo: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 16,
    color: '#E0F7FA',
    marginBottom: 20,
  },
  card: {
    borderRadius: 12,
    padding: 15,
    width: '85%',
    marginVertical: 8,
    alignItems: 'center',
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004D40',
  },
  cardTexto: {
    fontSize: 14,
    color: '#004D40',
    textAlign: 'center',
    marginTop: 6,
  },
  logoutBtn: {
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: '85%',
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  appBar: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#BDBDBD',
  },
  appBarItem: {
    fontSize: 16,
  },
});

export default HomeScreen;
