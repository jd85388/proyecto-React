import  { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useRouter }from 'expo-router';

export default function home() {
    const router = useRouter();

    return (
        <View >
            <Text style={estilos.titulo}> TU SALUD ES MUY IMPORTANTE</Text>
            <Image 
            source={require('./(tabs)/assets/caraBonita.png')}
            style={estilos.imagen}
            />
            <Text style={estilos.texto}>INICIAR SESION</Text>
            <Button style={estilos.boton} title="ir a login" onPress={() => router.push('/login')}/>
        </View>
    );
}

const estilos = StyleSheet.create({
    imagen: {
        width: 350,
        height: 300,
        alignSelf: 'center',
        resizeMode: 'stretch',
        borderRadius: 300,
        marginTop: 130
    },
    texto: {

    },
    titulo: {
        fontSize: 20,
        alignContent: 'center'
    },
    boton: {

    }
})