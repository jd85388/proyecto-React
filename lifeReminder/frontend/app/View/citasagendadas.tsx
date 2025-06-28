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
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Cita } from '../View/types';

const CitasAgendadasScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
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
      <View style={styles.screen}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="person-circle-outline" size={24} color="black" />
          <Text style={styles.headerText}>{nombrePaciente}</Text>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </View>

        {/* Empty message */}
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={60} color="#0277BD" />
          <Text style={styles.emptyText}>No se encontraron citas agendadas</Text>
        </View>

        {/* Bottom Bar */}
        <View style={styles.appBar}>
          <Ionicons name="settings-outline" size={22} color="#000" />
          <Ionicons name="home" size={22} color="#673AB7" />
          <Ionicons name="person-outline" size={22} color="#000" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={24} color="black" />
        <Text style={styles.headerText}>{nombrePaciente}</Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>

      {/* Lista de citas */}
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
                onPress={() =>
                  navigation.navigate('CancelarCita', {
                    cita,
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

      {/* Bottom Bar */}
      <View style={styles.appBar}>
        <Ionicons name="settings-outline" size={22} color="#000" />
        <Ionicons name="home" size={22} color="#673AB7" />
        <Ionicons name="person-outline" size={22} color="#000" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#E1F5FE'
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E1F5FE'
  },
  container: {
    padding: 20
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  emptyText: {
    fontSize: 16,
    color: '#0277BD',
    marginTop: 12,
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
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: '#000'
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
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#EDE7F6'
  }
});

export default CitasAgendadasScreen;
