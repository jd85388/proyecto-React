import  { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter }from 'expo-router';
import AnimacionYa from '../app/(tabs)/Components/AnimacionMovil';
import ModeloCurva from './(tabs)/Components/modeloCurva';

export default function home() {
    const router = useRouter();

    return (
        <View style={estilos.contenedor}>
            <View style={estilos.parteSuperior}>

                <Image 
            source={require('./(tabs)/assets/caraBonita.png')}
            style={estilos.imagen}
            />

            <AnimacionYa style={estilos.titulo} duration={2000}>
                LIFE REMINDER
            </AnimacionYa>

            </View>
            <View style={estilos.parteInferior}>

            <AnimacionYa style={estilos.titulo2} duration={3000}>
                Para Nosotros Cuidar De Tu Salud Es Muy Importante, 
                Juntos Podemos Cuidar De Ti.
            </AnimacionYa>

            <TouchableOpacity style={estilos.boton} onPress={() => router.push('/login')}>
                <Text style={estilos.textoBoton}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity style={estilos.boton} onPress={() => router.push('/Registro')}> 
                <Text style={estilos.textoBoton}>Registrarse</Text>
            </TouchableOpacity>
            </View>
        
        </View>
    );
}

const estilos = StyleSheet.create({
    imagen: {
        width: 350,
        height: 300,
        alignSelf: 'auto',
        resizeMode: 'stretch',
        borderRadius: 300,
        marginTop: 20,
        marginBottom: 20
    },
    titulo: {
        fontSize: 35,
        alignContent: 'center',
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 4},
        textShadowRadius: 1,
        paddingBottom: 20
        
    },
    titulo2: {
        fontSize: 20,
        alignContent: 'center',
        color: 'black',
        textAlign: 'center',
        marginBottom: 50,
        width: 320,
        textShadowColor: 'gray',
        textShadowOffset: { width: 1, height: 3},
        textShadowRadius: 10
    },
    boton: {
        height: 55,
        width: 250,
        backgroundColor: '#1E90FF',
        paddingVertical: 10,
        paddingHorizontal: 26,        
        borderRadius: 8,
        elevation: 20,
        marginBottom: 55,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 4,
       
    },
    contenedor: {
        flex: 1,
        alignContent: 'center'
    },
    textoBoton: {
        color: 'white',
        fontSize: 23,
        textAlign: 'center',
    },
    texto: {

    },
    parteSuperior: {
        width: '100%',
        flex: 1,
        backgroundColor: '#1E90FF',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom: 30
    },
    parteInferior: {
        flex: 1,
        backgroundColor: 'white',
        height: '50%',
        width: '100%',
        borderTopLeftRadius: 80,
        borderTopRightRadius: 80,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        paddingTop: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
        paddingBottom: 40
    }
})