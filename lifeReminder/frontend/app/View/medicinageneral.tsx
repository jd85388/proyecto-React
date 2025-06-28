import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const MedicinaGeneralScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const {
    nombrePaciente = '',
    telefonoPaciente = '',
    emailPaciente = '',
    pacienteId = ''
  } = route.params || {};

  const [telefono, setTelefono] = useState(telefonoPaciente);
  const [email, setEmail] = useState(emailPaciente);
  const [centros, setCentros] = useState<Array<{ id: string; nombre: string }>>([]);
  const [centroId, setCentroId] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [especialistas, setEspecialistas] = useState<Array<{ id: string; nombre: string }>>([]);
  const [especialista, setEspecialista] = useState('');
  const [politicaChecked, setPoliticaChecked] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    fetch('https://api.ejemplo.com/centros')
      .then(res => res.json())
      .then(json => setCentros(json))
      .catch(console.error);
  }, []);

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
    <View style={{ flex: 1 }}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={24} color="black" />
        <Text style={styles.headerText}>Agenda de medicina general</Text>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>Modalidad presencial</Text>
        <Text style={styles.subSection}>Datos de usuario</Text>

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
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={[styles.input, !isEmailValid && email ? styles.inputError : null]}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            placeholder="usuario@ejemplo.com"
          />
        </View>

        <View style={styles.separator} />
        <Text style={styles.subSection}>Centro médico, día, hora y profesional de la salud</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Elige el centro médico</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={centroId} onValueChange={setCentroId}>
              <Picker.Item label="Selecciona centro…" value="" />
              {centros.map(c => (
                <Picker.Item key={c.id} label={c.nombre} value={c.id} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Elige la fecha disponible</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text>{fecha || 'Selecciona fecha'}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              minimumDate={new Date()}
              onChange={(event, selectedDate) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (selectedDate) {
                  const formatted = selectedDate.toISOString().split('T')[0];
                  setFecha(formatted);
                }
              }}
            />
          )}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Elige la hora de atención</Text>
          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
            <Text>{hora || 'Selecciona hora'}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              display="default"
              onChange={(event, selectedTime) => {
                setShowTimePicker(Platform.OS === 'ios');
                if (selectedTime) {
                  const formatted = selectedTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                  setHora(formatted);
                }
              }}
            />
          )}
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Elige el especialista</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={especialista} enabled={!!hora} onValueChange={setEspecialista}>
              <Picker.Item label="Selecciona especialista…" value="" />
              {especialistas.map(e => (
                <Picker.Item key={e.id} label={e.nombre} value={e.id} />
              ))}
            </Picker>
          </View>
        </View>

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

        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[styles.button, styles.backBtn]}
            onPress={() =>
              navigation.navigate('AgendaCita' as never, { pacienteId, nombrePaciente } as never)
            }
          >
            <Text style={styles.buttonText}>Atras</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.nextBtn, !canProceed && styles.buttonDisabled]}
            disabled={!canProceed}
            onPress={() =>
              navigation.navigate('Home' as never, { pacienteId, nombrePaciente } as never)
            }
          >
            <Text style={styles.buttonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Barra inferior */}
      <View style={styles.appBar}>
        <Ionicons name="settings-outline" size={22} color="#000" />
        <Ionicons name="home" size={22} color="#673AB7" />
        <Ionicons name="person-outline" size={22} color="#000" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2196F3',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  container: {
    padding: 20,
    backgroundColor: '#2196F3'
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10
  },
  subSection: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 10
  },
  fieldGroup: {
    marginBottom: 15
  },
  label: {
    color: '#fff',
    marginBottom: 4
  },
  staticText: {
    fontSize: 16,
    color: '#fff'
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
    color: '#fff',
    flex: 1
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
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
  },
  separator: {
    height: 1,
    backgroundColor: '#BBDEFB',
    marginVertical: 20
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#EDE7F6'
  }
});

export default MedicinaGeneralScreen;
