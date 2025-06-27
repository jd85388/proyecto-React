// C:\Users\USER\Documents\react\proyecto-React\lifeReminder\frontend\app\View\perfil.tsx
/**import React, { useState, useEffect } from 'react';
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
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation, useRoute } from '@react-navigation/native';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface PerfilData {
  id: string;
  nombreCompleto: string;
  tipoDocumento: string;
  numeroDocumento: string;
  telefono: string;
  correo: string;
}

const PerfilScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  //esta dehabilitado
  //const { pacienteId, nombrePaciente } = route.params;

  const [perfil, setPerfil] = useState<PerfilData>({
    id: '',
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
    // Reemplaza esta URL por tu API real
    fetch(`https://api.ejemplo.com/pacientes/${pacienteId}/perfil`)
      .then(res => res.json())
      .then((data: PerfilData) => setPerfil(data))
      .catch(err => {
        console.error(err);
        Alert.alert('Error', 'No se pudo cargar tu información');
      })
      .finally(() => setLoading(false));
  }, [pacienteId]);

  const handleUpdate = async () => {
    const { nombreCompleto, tipoDocumento, numeroDocumento, telefono, correo } = perfil;

    if (!nombreCompleto || !tipoDocumento || !numeroDocumento || !telefono || !correo) {
      return Alert.alert('Error', 'Todos los campos son obligatorios');
    }
    if (!/^\d+$/.test(telefono)) {
      return Alert.alert('Error', 'El número telefónico solo puede contener dígitos');
    }
    if (!correo.includes('@')) {
      return Alert.alert('Error', 'El correo debe contener el símbolo "@"');
    }
    if (!politicaChecked) {
      return Alert.alert('Error', 'Debes aceptar la política de privacidad para continuar');
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
      <View style={styles.headerCircle}>
        <Icon name="account-circle" size={80} color="#fff" />
      </View>
      <Text style={styles.title}>PERFIL</Text>

      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Nombre Completo</Text>
        <TextInput
          style={styles.input}
          value={perfil.nombreCompleto}
          onChangeText={text => setPerfil(prev => ({ ...prev, nombreCompleto: text }))}
          placeholder="Tu nombre"
        />

        <Text style={styles.label}>Tipo de Documento</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={perfil.tipoDocumento}
            onValueChange={value => setPerfil(prev => ({ ...prev, tipoDocumento: value }))}
          >
            <Picker.Item label="Selecciona…" value="" />
            <Picker.Item label="Cédula de Ciudadanía" value="cc" />
            <Picker.Item label="Tarjeta de Identidad" value="ti" />
            <Picker.Item label="Cédula de Extranjería" value="ce" />
          </Picker>
        </View>

        <Text style={styles.label}>Número de Documento</Text>
        <TextInput
          style={styles.input}
          value={perfil.numeroDocumento}
          onChangeText={text => setPerfil(prev => ({ ...prev, numeroDocumento: text }))}
          placeholder="Número de tu documento"
        />

        <Text style={styles.label}>Número Telefónico</Text>
        <TextInput
          style={styles.input}
          value={perfil.telefono}
          onChangeText={text => setPerfil(prev => ({ ...prev, telefono: text }))}
          keyboardType="numeric"
          placeholder="Solo dígitos"
        />

        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          value={perfil.correo}
          onChangeText={text => setPerfil(prev => ({ ...prev, correo: text }))}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="usuario@ejemplo.com"
        />

        <View style={styles.checkboxContainer}>
          
          <Text style={styles.checkboxLabel}>
            Acepto la política de tratamiento de datos personales
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.updateBtn, saving && styles.btnDisabled]}
          onPress={handleUpdate}
          disabled={saving}
        >
          <Text style={styles.btnText}>
            {saving ? 'Actualizando...' : 'Actualizar Información'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Configuracion', { pacienteId, nombrePaciente })}>
          <Icon name="cog-outline" size={24} color="#616161" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home', { pacienteId, nombrePaciente })}>
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
    backgroundColor: '#E1F5FE',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#E1F5FE',
    paddingTop: 40
  },
  headerCircle: {
    backgroundColor: '#00AEEF',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: '#01579B',
    fontWeight: 'bold',
    marginBottom: 20
  },
  form: {
    paddingHorizontal: 24,
    paddingBottom: 80
  },
  label: {
    color: '#0277BD',
    marginBottom: 4
  },
  input: {
    borderWidth: 1,
    borderColor: '#0277BD',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 16
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#0277BD',
    borderRadius: 6,
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
  updateBtn: {
    backgroundColor: '#00AEEF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  btnDisabled: {
    backgroundColor: '#B3E5FC'
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
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
**/