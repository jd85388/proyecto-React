// medicinaGeneral.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
//import CheckBox from '@react-native-community/checkbox';
import { useNavigation, useRoute } from '@react-navigation/native';

const MedicinaGeneralScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute<any>();
  const {
    nombrePaciente = '',
    telefonoPaciente = '',
    emailPaciente = '',
    pacienteId = ''
  } = params || {};

  const [telefono, setTelefono] = useState(telefonoPaciente);
  const [email, setEmail] = useState(emailPaciente);
  const [centros, setCentros] = useState<Array<{ id: string; nombre: string }>>([]);
  const [centroId, setCentroId] = useState('');
  const [fechas, setFechas] = useState<string[]>([]);
  const [fecha, setFecha] = useState('');
  const [horas, setHoras] = useState<string[]>([]);
  const [hora, setHora] = useState('');
  const [especialistas, setEspecialistas] = useState<Array<{ id: string; nombre: string }>>([]);
  const [especialista, setEspecialista] = useState('');
  const [politicaChecked, setPoliticaChecked] = useState(false);

  useEffect(() => {
    fetch('https://api.ejemplo.com/centros')
      .then(res => res.json())
      .then(json => setCentros(json))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (centroId) {
      fetch(`https://api.ejemplo.com/centros/${centroId}/fechas`)
        .then(res => res.json())
        .then(json => setFechas(json))
        .catch(console.error);
    }
  }, [centroId]);

  useEffect(() => {
    if (fecha) {
      fetch(`https://api.ejemplo.com/fechas/${fecha}/horas`)
        .then(res => res.json())
        .then(json => setHoras(json))
        .catch(console.error);
    }
  }, [fecha]);

  useEffect(() => {
    if (hora) {
      fetch(`https://api.ejemplo.com/horas/${hora}/especialistas`)
        .then(res => res.json())
        .then(json => setEspecialistas(json))
        .catch(console.error);
    }
  }, [hora]);

  const isPhoneValid = /^\d+$/.test(telefono);
  const isEmailValid = email.includes('@');
  const canProceed =
    telefono &&
    email &&
    isPhoneValid &&
    isEmailValid &&
    centroId &&
    fecha &&
    hora &&
    especialista &&
    politicaChecked;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Medicina General</Text>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Paciente</Text>
        <Text style={styles.staticText}>{nombrePaciente}</Text>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={[styles.input, !isPhoneValid && telefono ? styles.inputError : null]}
          keyboardType="numeric"
          value={telefono}
          onChangeText={setTelefono}
          placeholder="Sólo números"
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={[styles.input, !isEmailValid && email ? styles.inputError : null]}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          placeholder="usuario@ejemplo.com"
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Centro Médico</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={centroId}
            onValueChange={setCentroId}
            mode="dropdown"
          >
            <Picker.Item label="Selecciona centro…" value="" />
            {centros.map(c => (
              <Picker.Item key={c.id} label={c.nombre} value={c.id} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Fecha Disponible</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={fecha}
            enabled={!!centroId}
            onValueChange={setFecha}
            mode="dropdown"
          >
            <Picker.Item label="Selecciona fecha…" value="" />
            {fechas.map(f => (
              <Picker.Item key={f} label={f} value={f} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Hora Disponible</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={hora}
            enabled={!!fecha}
            onValueChange={setHora}
            mode="dropdown"
          >
            <Picker.Item label="Selecciona hora…" value="" />
            {horas.map(h => (
              <Picker.Item key={h} label={h} value={h} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Especialista</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={especialista}
            enabled={!!hora}
            onValueChange={setEspecialista}
            mode="dropdown"
          >
            <Picker.Item label="Selecciona especialista…" value="" />
            {especialistas.map(e => (
              <Picker.Item key={e.id} label={e.nombre} value={e.id} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.checkboxContainer}>
        

        <Text style={styles.checkboxLabel}>
          He leído la política de privacidad
        </Text>
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.button, styles.backBtn]}
          onPress={() =>
            // cuidado esta deshabilitado
            (navigation as any).navigate('AgendaCita', { pacienteId, nombrePaciente })
          }
        >
          <Text style={styles.buttonText}>Atrás</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.nextBtn,
            !canProceed && styles.buttonDisabled
          ]}
          disabled={!canProceed}
          onPress={() =>
          // cuidado esta deshabilitado
            (navigation as any).navigate('Home', { pacienteId, nombrePaciente })
          }
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#E1F5FE'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#01579B',
    marginBottom: 20,
    textAlign: 'center'
  },
  fieldGroup: {
    marginBottom: 15
  },
  label: {
    color: '#0277BD',
    marginBottom: 4
  },
  staticText: {
    fontSize: 16,
    color: '#000'
  },
  input: {
    borderWidth: 1,
    borderColor: '#0277BD',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fff'
  },
  inputError: {
    borderColor: '#D32F2F'
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#0277BD',
    borderRadius: 6,
    backgroundColor: '#fff'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  checkboxLabel: {
    marginLeft: 8,
    color: '#0277BD'
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  nextBtn: {
    backgroundColor: '#0277BD'
  },
  buttonDisabled: {
    backgroundColor: '#B3E5FC'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default MedicinaGeneralScreen;
