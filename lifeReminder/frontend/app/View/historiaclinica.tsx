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
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

interface Historia {
  id: string;
  tipoServicio: string;
  numero: string;
  fecha: string;
  urlDescarga: string;
}

const HistorialClinicaScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { pacienteId, nombrePaciente } = route.params || {};

  const [historias, setHistorias] = useState<Historia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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
      {/* AppBar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Ionicons name="person-circle-outline" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

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

      {/* Botón volver */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('menu')}
      >
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      {/* BottomBar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="settings-outline" size={22} color="#333" />
          <Text style={styles.navText}>Configuración</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('menu')}>
          <Ionicons name="home" size={24} color="#7B61FF" />
          <Text style={[styles.navText, { color: '#7B61FF' }]}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Perfil')}>
          <FontAwesome5 name="user-circle" size={20} color="#333" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
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
    padding: 20,
    paddingTop: 60
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
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
    marginTop: 10
  },
  backText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
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
    borderTopWidth: 1
  },
  navItem: {
    alignItems: 'center'
  },
  navText: {
    fontSize: 12,
    color: '#333',
    marginTop: 2
  }
});

export default HistorialClinicaScreen;
