import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const PerfilScreen = () => {
  const router = useRouter();
  const { pacienteId = '', nombrePaciente = '' } = useLocalSearchParams();

  const [perfil, setPerfil] = useState({
    nombreCompleto: '',
    tipoDocumento: '',
    numeroDocumento: '',
    telefono: '',
    correo: ''
  });
  const [politicaChecked, setPoliticaChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`https://api.ejemplo.com/pacientes/${pacienteId}/perfil`)
      .then(res => res.json())
      .then(data => setPerfil(data))
      .catch(() => Alert.alert('Error', 'No se pudo cargar tu información'))
      .finally(() => setLoading(false));
  }, [pacienteId]);

  const handleUpdate = async () => {
    const { telefono, correo } = perfil;

    if (!telefono || !correo) {
      return Alert.alert('Error', 'Todos los campos son obligatorios');
    }
    if (!/^\d+$/.test(telefono)) {
      return Alert.alert('Error', 'El número telefónico solo puede contener dígitos');
    }
    if (!correo.includes('@')) {
      return Alert.alert('Error', 'El correo debe contener el símbolo "@"');
    }
    if (!politicaChecked) {
      return Alert.alert('Error', 'Debes aceptar la política de privacidad');
    }

    setSaving(true);
    try {
      const res = await fetch(`https://api.ejemplo.com/pacientes/${pacienteId}/perfil`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(perfil)
      });
      if (!res.ok) throw new Error();
      Alert.alert('Éxito', 'Tu información ha sido actualizada');
    } catch {
      Alert.alert('Error', 'No se pudo actualizar la información');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00AEEF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.name}>{perfil.nombreCompleto}</Text>
        <Icon name="bell-outline" size={24} color="#fff" />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.label}>Nombre Completo</Text>
        <Text style={styles.staticText}>{perfil.nombreCompleto}</Text>

        <Text style={styles.label}>Tipo de Documento</Text>
        <Text style={styles.staticText}>{perfil.tipoDocumento}</Text>

        <Text style={styles.label}>Número de Documento</Text>
        <Text style={styles.staticText}>{perfil.numeroDocumento}</Text>

        <Text style={styles.label}>Número Telefónico</Text>
        <TextInput
          style={styles.input}
          value={perfil.telefono}
          onChangeText={text => setPerfil(prev => ({ ...prev, telefono: text }))}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          value={perfil.correo}
          onChangeText={text => setPerfil(prev => ({ ...prev, correo: text }))}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setPoliticaChecked(!politicaChecked)}>
            <Ionicons
              name={politicaChecked ? 'checkbox' : 'square-outline'}
              size={24}
              color="#0277BD"
            />
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            He leído y acepto política de tratamiento de datos personales y aviso de privacidad.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, saving && styles.btnDisabled]}
          onPress={handleUpdate}
          disabled={saving}
        >
          <Text style={styles.buttonText}>{saving ? 'Guardando...' : 'Actualizar Información'}</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => router.push({ pathname: '/View/Configuracion', params: { pacienteId, nombrePaciente } })}>
          <Icon name="cog-outline" size={24} color="#616161" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({ pathname: '/View/Home', params: { pacienteId, nombrePaciente } })}>
          <Icon name="home-outline" size={24} color="#616161" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="account-outline" size={24} color="#039BE5" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E1F5FE'
  },
  container: {
    flex: 1,
    backgroundColor: '#E1F5FE'
  },
  header: {
    backgroundColor: '#0288D1',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  content: {
    padding: 20,
    paddingBottom: 100
  },
  label: {
    color: '#0277BD',
    marginBottom: 4
  },
  staticText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#000'
  },
  input: {
    borderWidth: 1,
    borderColor: '#0277BD',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 16
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24
  },
  checkboxLabel: {
    marginLeft: 8,
    color: '#0277BD',
    flexShrink: 1
  },
  button: {
    backgroundColor: '#0277BD',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  btnDisabled: {
    backgroundColor: '#B3E5FC'
  },
  buttonText: {
    color: '#fff',
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

export default PerfilScreen;
