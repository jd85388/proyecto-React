// MedicamentosScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface Medicamento {
  id: string;
  nombre: string;
  frecuenciaHoras: number;
}

const MedicamentosScreen = () => {
  const router = useRouter();
  const { pacienteId, nombrePaciente } = useLocalSearchParams();

  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`https://api.ejemplo.com/pacientes/${pacienteId}/medicamentos`)
      .then(res => res.json())
      .then((data: Medicamento[]) => setMedicamentos(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [pacienteId]);

  const irA = (ruta: string) => {
    router.push({
      pathname: `/${ruta}`,
      params: { pacienteId, nombrePaciente },
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
    <View style={styles.container}>
      {/* AppBar azul con íconos negros */}
      <View style={styles.header}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => irA('Perfil')}>
            <Ionicons name="person-circle-outline" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{nombrePaciente}, estos son tus medicamentos</Text>
      </View>

      {/* Lista de medicamentos */}
      <FlatList
        data={medicamentos}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Icon name="pill" size={28} color="black" style={styles.icon} />
            <View>
              <Text style={styles.medName}>{item.nombre}</Text>
              <Text style={styles.frequency}>Cada {item.frecuenciaHoras} horas</Text>
            </View>
          </View>
        )}
      />

      {/* Botón Atrás */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => irA('Home')}
      >
        <Text style={styles.backText}>Atrás</Text>
      </TouchableOpacity>

      {/* Bottom bar blanca */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => irA('Configuracion')}>
          <Ionicons name="settings-outline" size={22} color="#333" />
          <Text style={styles.navText}>Configuración</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => irA('Home')}>
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
    backgroundColor: '#2196F3', // azul de fondo igual que menu.tsx
  },
  loader: {
    flex: 1,
    backgroundColor: '#E1F5FE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#2196F3', // igual que fondo
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 12,
  },
  medName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  frequency: {
    fontSize: 14,
    color: '#333',
    marginTop: 2,
  },
  backButton: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginBottom: 70,
    marginTop: 10,
  },
  backText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#ffffff', // barra blanca
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

export default MedicamentosScreen;
