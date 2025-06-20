import React from 'react';
import { ImageBackground, StyleSheet, View, ViewStyle, ImageSourcePropType } from 'react-native';

type Props = {
    children: React.ReactNode;
    source: ImageSourcePropType;
    estiloFondo?: ViewStyle;
};

const FondoImagen: React.FC<Props> = ({ children, source, estiloFondo}) => {
    return (
        <ImageBackground source={source} style={[estilos.fondo, estiloFondo]} resizeMode={'cover'}>
            <View style={estilos.contenedor}>{children}</View>
        </ImageBackground>
    );
};

const estilos = StyleSheet.create({
    fondo: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    contenedor: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    }
});

export default FondoImagen;