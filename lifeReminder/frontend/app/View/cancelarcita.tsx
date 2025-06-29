import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const CancelarCitaScreen = () => {
  const router = useRouter();
  const {
    nombrePaciente = '',
    id = '',
    tipo = '',
    lugar = '',
    consultorio = '',
    fechaHora = '',
    valor = ''
  } = useLocalSearchParams();

  const [loading, setLoading] = useState(false);

  const cancelarCita = async () => {
    setLoading(true);
    try {
      await fetch(`https://api.ejemplo.com/citas/${id}`, {
        method: 'DELETE',
      });
      Alert.alert('Éxito', 'Tu cita ha sido cancelada.', [
        {
          text: 'OK',
          onPress: () => router.push('/View/menu'),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cancelar la cita.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* AppBar */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => router.push('/View/Perfil')}>
          <Ionicons name="person-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.name}>{nombrePaciente}</Text>

        <Icon
          name="alert-circle-outline"
          size={80}
          color="#D32F2F"
          style={{ marginVertical: 20 }}
        />
        <Text style={styles.warningText}>
          ¿Estás seguro de eliminar la cita médica?
        </Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Tipo de cita</Text>
            <Text style={styles.value}>{tipo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Lugar</Text>
            <Text style={styles.value}>{lugar}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Consultorio</Text>
            <Text style={styles.value}>{consultorio}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha y Hora</Text>
            <Text style={styles.value}>{fechaHora}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Valor</Text>
            <Text style={styles.value}>{valor}</Text>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#D32F2F" />
        ) : (
          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.button, styles.backBtn]}
              onPress={() => router.push('/View/CitasAgendadas')}
            >
              <Text style={styles.buttonText}>Atrás</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelBtn]}
              onPress={cancelarCita}
            >
              <Text style={styles.buttonText}>Cancelar Cita</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* BottomBar */}
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
  wrapper: {
    flex: 1,
    backgroundColor: '#E1F5FE',
  },
  appBar: {
    backgroundColor: '#2196F3',
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    padding: 20,
    flexGrow: 1,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    color: '#01579B',
    fontWeight: 'bold',
  },
  warningText: {
    fontSize: 18,
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: 8,
    padding: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  label: {
    color: '#0277BD',
    fontWeight: 'bold',
  },
  value: {
    color: '#000',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 0.45,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  backBtn: {
    backgroundColor: '#B0BEC5',
  },
  cancelBtn: {
    backgroundColor: '#D32F2F',
  },
  buttonText: {
    color: '#FFFFFF',
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

export default CancelarCitaScreen;
