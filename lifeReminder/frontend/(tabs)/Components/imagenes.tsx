import { Image, ImageSourcePropType, StyleSheet,  } from "react-native";
import React from "react";

type Props = {
    source: ImageSourcePropType;
    width?: number;
    height?: number;
    borderRadius?: number; 
};

export default function ImagenCualquiera({
    source,
    width = 410,
    height = 280,
}: Props) {
    return (
        <Image
        source={source}
        style={[estilos.imagen, { width, height}]}
        resizeMode="stretch"
        />
    );
}
const estilos = StyleSheet.create({
    imagen: {
      marginBottom: 1,
      justifyContent: 'center'
    },
});