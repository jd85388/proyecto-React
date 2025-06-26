// Medicamentos.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Medicamento {
  id: string;
  nombre: string;
  frecuenciaHoras: number;
}

const MedicamentosScreen = () => {
  const navigation = useNavigation();
  const { pacienteId, nombrePaciente } = useRoute<any>().params;

  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Ajusta la URL a tu endpoint real
    fetch(`https://api.ejemplo.com/pacientes/${pacienteId}/medicamentos`)
      .then(res => res.json())
      .then((data: Medicamento[]) => setMedicamentos(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [pacienteId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0277BD" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medicamentos de {nombrePaciente}</Text>

      {medicamentos.length > 0 && (
        <FlatList
          data={medicamentos}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingVertical: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Icon
                name="pill"
                size={36}
                color="#0277BD"
                style={styles.icon}
              />
              <View>
                <Text style={styles.medName}>{item.nombre}</Text>
                <Text style={styles.frequency}>
                  Cada {item.frecuenciaHoras} horas
                </Text>
              </View>
            </View>
          )}
        />
      )}

      {/* Si no hay medicamentos, la pantalla queda en blanco debajo del título */}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.backText}>Atrás</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: '#E1F5FE',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#E1F5FE',
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#01579B',
    textAlign: 'center'
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  icon: {
    marginRight: 12
  },
  medName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0277BD'
  },
  frequency: {
    fontSize: 14,
    color: '#01579B',
    marginTop: 2
  },
  backButton: {
    marginTop: 'auto',
    backgroundColor: '#0277BD',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default MedicamentosScreen;