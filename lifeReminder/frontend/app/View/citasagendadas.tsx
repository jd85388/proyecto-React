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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Cita } from '../View/types'; // ← Importamos el tipo Cita desde types.ts

// Tipos para navegación y ruta
type NavigationProp = StackNavigationProp<RootStackParamList, 'CitasAgendadas'>;
type RouteProps = RouteProp<RootStackParamList, 'CitasAgendadas'>;

const CitasAgendadasScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { nombrePaciente = '', pacienteId = '' } = route.params || {};

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
      navigation.navigate('AgendaCita', { pacienteId, nombrePaciente });
    } catch {
      Alert.alert('Error', 'No se pudo confirmar la cita.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0277BD" />
      </View>
    );
  }

  if (citas.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.name}>{nombrePaciente}</Text>
        <Text style={styles.emptyText}>No se encontraron citas agendadas</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{nombrePaciente}</Text>

      {citas.map(cita => (
        <View key={cita.id} style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Centro Médico</Text>
            <Text style={styles.value}>{cita.centro}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Consultorio</Text>
            <Text style={styles.value}>{cita.consultorio}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha y Hora</Text>
            <Text style={styles.value}>{cita.fechaHora}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Valor</Text>
            <Text style={styles.value}>{cita.valor}</Text>
          </View>

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() =>
                navigation.navigate('CancelarCita', {
                  cita: cita, // ← se pasa el objeto completo
                  nombrePaciente
                })
              }
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
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E1F5FE'
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#E1F5FE',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  emptyText: {
    fontSize: 16,
    color: '#0277BD',
    marginTop: 12,
    textAlign: 'center'
  },
  container: {
    padding: 20,
    backgroundColor: '#E1F5FE'
  },
  name: {
    fontSize: 20,
    color: '#01579B',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
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
    elevation: 3
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6
  },
  label: {
    color: '#0277BD',
    fontWeight: 'bold'
  },
  value: {
    color: '#000'
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  cancelBtn: {
    flex: 0.45,
    backgroundColor: '#E57373',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center'
  },
  confirmBtn: {
    flex: 0.45,
    backgroundColor: '#0277BD',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center'
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold'
  }
});

export default CitasAgendadasScreen;
