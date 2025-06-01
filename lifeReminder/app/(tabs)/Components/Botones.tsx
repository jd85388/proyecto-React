import { Text,StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

type  Props = {
    texto: string;
    onPress: () => void;
};

const MiBotonUtil: React.FC<Props> = ({ texto, onPress }) => {
    return(
        <TouchableOpacity style={estilos.boton} onPress={onPress}>
            <Text style={estilos.texto}>{texto}</Text>
        </TouchableOpacity>
    );
};

const estilos = StyleSheet.create({
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
    texto: {
        color: 'white',
        fontSize: 23,
        textAlign: 'center',
    }
});

export default MiBotonUtil;