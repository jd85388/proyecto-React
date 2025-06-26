// HistorialClinica.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Linking
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Historia {
  id: string;
  tipoServicio: string;
  numero: string;
  fecha: string;
  urlDescarga: string;
}

const HistorialClinicaScreen = () => {
  const navigation = useNavigation();
  const { pacienteId, nombrePaciente } = useRoute<any>().params || {};
  const [historias, setHistorias] = useState<Historia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Ajusta esta URL a tu endpoint real
    fetch(`https://api.ejemplo.com/pacientes/${pacienteId}/historial`)
      .then(res => res.json())
      .then((data: Historia[]) => setHistorias(data))
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
      <Text style={styles.header}>
        {nombrePaciente}, aquí está tu historial clínico
      </Text>

      {historias.length > 0 && (
        <FlatList
          data={historias}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.service}>
                SERVICIO AMBULATORIO – {item.tipoServicio}
              </Text>
              <Text style={styles.meta}>Número: {item.numero}</Text>
              <Text style={styles.meta}>Fecha: {item.fecha}</Text>
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={[styles.cardButton, styles.downloadBtn]}
                  onPress={() => Linking.openURL(item.urlDescarga)}
                >
                  <Text style={styles.cardButtonText}>Descargar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.cardButton, styles.viewBtn]}
                  onPress={() =>
                    navigation.navigate('VerHistoriaDetalle', {
                      historiaId: item.id
                    })
                  }
                >
                  <Text style={styles.cardButtonText}>Ver historia</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.backText}>Volver</Text>
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#01579B',
    marginBottom: 20,
    textAlign: 'center'
  },
  list: {
    paddingBottom: 20
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  service: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0277BD',
    marginBottom: 8
  },
  meta: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12
  },
  cardButton: {
    flex: 0.48,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center'
  },
  downloadBtn: {
    backgroundColor: '#4CAF50'
  },
  viewBtn: {
    backgroundColor: '#0277BD'
  },
  cardButtonText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  backButton: {
    backgroundColor: '#0277BD',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto'
  },
  backText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default HistorialClinicaScreen;