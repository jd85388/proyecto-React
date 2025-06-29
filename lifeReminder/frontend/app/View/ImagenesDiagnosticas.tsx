import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Linking
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

interface ImagenDiagnostica {
  id: string;
  tipo: string;
  numero: string;
  fechaHora: string;
  urlDescarga: string;
  urlVisor: string;
}

const ImagenesDiagnosticasScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { pacienteId, nombrePaciente } = route.params || {};

  const [imagenes, setImagenes] = useState<ImagenDiagnostica[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pacienteId) return;
    fetch(`https://api.tudominio.com/pacientes/${pacienteId}/imagenes`)
      .then(res => res.json())
      .then((data: ImagenDiagnostica[]) => setImagenes(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [pacienteId]);

  return (
    <View style={styles.container}>
      {/* AppBar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <Ionicons name="person-circle-outline" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Imágenes Diagnósticas</Text>
      <Text style={styles.name}>{nombrePaciente}</Text>

      {loading ? (
        <ActivityIndicator color="#fff" size="large" style={styles.loader} />
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {imagenes.map(img => (
            <View key={img.id} style={styles.card}>
              <Text style={styles.studyType}>{img.tipo}</Text>
              <Text style={styles.meta}>ID: {img.numero}</Text>
              <Text style={styles.meta}>{img.fechaHora}</Text>
              <View style={styles.cardButtons}>
                <TouchableOpacity
                  style={styles.cardBtn}
                  onPress={() => Linking.openURL(img.urlDescarga)}
                >
                  <Text style={styles.cardBtnText}>Descargar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cardBtn}
                  onPress={() =>
                    navigation.navigate('VisorImagenes', { url: img.urlVisor })
                  }
                >
                  <Text style={styles.cardBtnText}>Ver Imágenes</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('menu')}
      >
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>

      {/* Bottom Bar */}
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
  container: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingTop: 60
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  name: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20
  },
  loader: {
    flex: 1,
    justifyContent: 'center'
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16
  },
  studyType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0277BD'
  },
  meta: {
    fontSize: 14,
    color: '#000',
    marginTop: 4
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12
  },
  cardBtn: {
    flex: 0.48,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center'
  },
  cardBtnText: {
    color: '#000',
    fontWeight: 'bold'
  },
  backButton: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 24
  },
  backButtonText: {
    color: '#000',
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

export default ImagenesDiagnosticasScreen;
