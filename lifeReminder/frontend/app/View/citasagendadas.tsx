import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { Cita } from '../View/types';

const CitasAgendadasScreen = () => {
  const router = useRouter();
  const { nombrePaciente = '', pacienteId = '' } = useLocalSearchParams();

  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.ejemplo.com/pacientes/${pacienteId}/citas`)
      .then(res => res.json())
      .then((data: Cita[]) => setCitas(data))
      .catch(() => Alert.alert('Error', 'No se pudo cargar las citas'))
      .finally(() => setLoading(false));
  }, [pacienteId]);

  const confirmCita = async (citaId: string) => {
    try {
      await fetch(`https://api.ejemplo.com/citas/${citaId}/confirmar`, {
        method: 'POST'
      });
      Alert.alert('¡Listo!', 'Tu cita ha sido confirmada.');
      router.push({
        pathname: '/View/AgendarCita',
        params: { pacienteId, nombrePaciente }
      });
    } catch {
      Alert.alert('Error', 'No se pudo confirmar la cita.');
    }
  };

  const cancelar = (cita: Cita) => {
    router.push({
      pathname: '/View/CancelarCita',
      params: {
        ...cita,
        nombrePaciente
      }
    });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0277BD" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* AppBar */}
      <View style={styles.appBarTop}>
        <TouchableOpacity onPress={() => router.push('/View/Perfil')}>
          <Ionicons name="person-circle-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{nombrePaciente}</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Lista de citas o mensaje vacío */}
      {citas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={60} color="#0277BD" />
          <Text style={styles.emptyText}>No se encontraron citas agendadas</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {citas.map(cita => (
            <View key={cita.id} style={styles.card}>
              <Text style={styles.cardTitle}>Cita médica - Medicina general</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Lugar</Text>
                <Text style={styles.value}>{cita.centro}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Consultorio</Text>
                <Text style={styles.value}>{cita.consultorio}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Fecha</Text>
                <Text style={styles.value}>{cita.fechaHora}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Valor</Text>
                <Text style={styles.value}>{cita.valor}</Text>
              </View>
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => cancelar(cita)}
                >
                  <Text style={styles.btnText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={() => confirmCita(cita.id)}
                >
                  <Text style={styles.btnText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

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
  screen: {
    flex: 1,
    backgroundColor: '#E1F5FE',
  },
  appBarTop: {
    backgroundColor: '#2196F3',
    padding: 14,
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E1F5FE',
  },
  container: {
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#0277BD',
    marginTop: 12,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
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
    marginTop: 16,
  },
  cancelBtn: {
    flex: 0.45,
    backgroundColor: '#E57373',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  confirmBtn: {
    flex: 0.45,
    backgroundColor: '#0277BD',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnText: {
    color: '#FFF',
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

export default CitasAgendadasScreen;
