import React, { useState,  } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity,Platform  } from "react-native";
import FondoImagen from "../(tabs)/Components/fondoPantalla";
import ImagenCualquiera from "../(tabs)/Components/imagenes";
import AnimacionYa from '../(tabs)/Components/AnimacionMovil';
import MiBotonUtil from "../(tabs)/Components/Botones";
import { Picker } from "@react-native-picker/picker";
import  DateTimePicker  from "@react-native-community/datetimepicker";

export default function registro() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [rh, setRh] =useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
    const [mostrarCalendario, setMostrarCalendario] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const mostrarFecha = () => {
        setMostrarCalendario(true);
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || fechaNacimiento;
        setMostrarCalendario(Platform.OS === 'ios');
        setFechaNacimiento(currentDate);
    };
    const validarDatos = () => {
        if(!nombre || !apellido || !rh || !correo || !password) {
            setMensaje('falta llenar campos obligatorios');
            return;
        }
        if(!/\S+@\S+\.\S+/.test(correo)){
            setMensaje("Correo Invalido");
            return;
        }else {
            setMensaje('felicitaciones te registraste')
        }
    };

    //Desde esta parte inicia el diseño
     return (
       <FondoImagen source={require('../(tabs)/assets/fondo2.png')}>
        <View style={estilo.principal}>

            <ImagenCualquiera source={require('../(tabs)/assets/Logo2.png')}></ImagenCualquiera>
            <AnimacionYa style={estilo.titulo} duration={2000}>REGISTRO</AnimacionYa>
            <View style={estilo.contenedorRegistro}>

                <View style={estilo.campo} >
    
                    <TextInput style={estilo.input} 
                    placeholder="Nombre" value={nombre} 
                    onChangeText={(texto) => {const soloLetras = texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                        setNombre(soloLetras)
                    }}/>
                    
                    <TextInput style={estilo.input} 
                    placeholder="Apellido" 
                    value={apellido} 
                    onChangeText={(texto) => {const soloLetras = texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                        setApellido(soloLetras)
                    }}/>

                    <View style={estilo.input}>
                    <Picker selectedValue={rh} onValueChange={(itemValue) => setRh(itemValue)}>
                        <Picker.Item label="Selecciona tu RH" value='' />
                         <Picker.Item label="O+" value='O+' />
                         <Picker.Item label="O-" value='O-' />
                         <Picker.Item label="A+" value='A+' />
                         <Picker.Item label="A-" value='A-' />
                         <Picker.Item label="B+" value='B+' />
                         <Picker.Item label="AB+" value='AB+' />
                         <Picker.Item label="AB-" value='AB-' />
                    </Picker>
                    </View>

                    <View style={estilo.fechas}>
                    <TouchableOpacity  onPress={mostrarFecha} >
                        <Text style={estilo.fecha}>Selecciona Aqui la Fecha</Text>
                    </TouchableOpacity>

                    <Text style={estilo.textoFecha}>
                        Fecha: {fechaNacimiento instanceof Date ? fechaNacimiento.toDateString(): 'sin seleccionar'}
                    </Text>
                    {mostrarCalendario && (
                        <DateTimePicker
                        value={fechaNacimiento}
                        mode="date"
                        display="default"
                        onChange={onChange}
                        maximumDate={new Date}
                        />
                    )}
                    </View>

                    <TextInput style={estilo.input} 
                    placeholder="Correo Eletronico" 
                    value={correo} 
                    onChangeText={(texto) =>{const filtroSeguridad = texto.replace(/[^a-zA-Z0-9@._\-]/g, '');
                        setCorreo(filtroSeguridad)
                    }}/>
                    <TextInput style={estilo.input} placeholder="Contraseña" value={password} onChangeText={(texto) => setPassword(texto)} secureTextEntry/>
                </View>

            </View>

            <MiBotonUtil texto='REGISTRARME' onPress={(validarDatos)}/>
            
        </View>
       </FondoImagen>
     )}

     //Desde este punto inicia los estilos del diseño
     const estilo = StyleSheet.create({
        contenedorRegistro: {
            backgroundColor: 'white',
            width: 410,
            height: '57%',
            borderRadius: 20,
            borderColor: 'black',
            borderWidth: 2,
            textAlign: 'left',
            marginBottom: 10
        },
        principal: {
            alignItems: 'center',
        },
        campo: {
            color: 'red',
            height: 50,
            width: 190,
            marginLeft: 15,
            marginTop: 20,
        },
        texto: {
            color: 'black',
            fontSize: 15,
            marginLeft: 15
        },
        input: {
            borderRadius: 10,
            borderColor: 'gray',
            borderWidth: 2,
            marginTop: 10,
            marginBottom: 10,
            height: 55,
            width: 380 ,
            color: 'black'
        },
        titulo: {
        fontSize: 35,
        alignContent: 'center',
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 4},
        textShadowRadius: 1,
        paddingBottom: 5
        },
        fecha: {
            borderRadius: 10,
            width: 180,
            height: 45,
            borderColor: 'gray',
            borderWidth: 2,
            textAlign: 'center',
            justifyContent: 'center',
            fontSize: 17
        },
        fechas: {
            flexDirection: 'row',
            gap: 10

        },
        textoFecha: {
            fontSize: 17
        },
      
    })