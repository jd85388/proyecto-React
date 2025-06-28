import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Cita } from '../View/types'; // Ajusta la ruta si es necesario

type NavigationProp = StackNavigationProp<RootStackParamList, 'CancelarCita'>;
type RouteParams = RouteProp<RootStackParamList, 'CancelarCita'>;

const CancelarCitaScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteParams>();
  const { cita, nombrePaciente } = route.params;
  const [loading, setLoading] = useState(false);

  const cancelarCita = async () => {
    setLoading(true);
    try {
      await fetch(`https://api.ejemplo.com/citas/${cita.id}`, {
        method: 'DELETE'
      });
      Alert.alert('Éxito', 'Tu cita ha sido cancelada.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('CitasAgendadas', { nombrePaciente })
        }
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cancelar la cita.');
    } finally {
      setLoading(false);
    }
  };

  return (
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
          <Text style={styles.value}>{cita.tipo}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Lugar</Text>
          <Text style={styles.value}>{cita.lugar}</Text>
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
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#D32F2F" />
      ) : (
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[styles.button, styles.backBtn]}
            onPress={() =>
              navigation.navigate('CitasAgendadas', { nombrePaciente })
            }
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
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#E1F5FE',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  name: {
    fontSize: 20,
    color: '#01579B',
    fontWeight: 'bold'
  },
  warningText: {
    fontSize: 18,
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 20
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
    width: '100%'
  },
  button: {
    flex: 0.45,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center'
  },
  backBtn: {
    backgroundColor: '#B0BEC5'
  },
  cancelBtn: {
    backgroundColor: '#D32F2F'
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold'
  }
});

export default CancelarCitaScreen;
