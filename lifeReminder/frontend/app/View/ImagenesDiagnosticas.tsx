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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
                    navigation.navigate('VisorImagenes' as never, { url: img.urlVisor } as never)
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
        onPress={() =>
          navigation.navigate('Home' as never, { pacienteId, nombrePaciente } as never)
        }
      >
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>

      <View style={styles.appBar}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Configuracion' as never, { pacienteId, nombrePaciente } as never)
          }
        >
          <Icon name="cog-outline" size={24} color="#616161" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Home' as never, { pacienteId, nombrePaciente } as never)
          }
        >
          <Icon name="home-outline" size={24} color="#039BE5" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Perfil' as never, { pacienteId } as never)
          }
        >
          <Icon name="account-outline" size={24} color="#616161" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00AEEF',
    paddingTop: 40
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
  appBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

export default ImagenesDiagnosticasScreen;
