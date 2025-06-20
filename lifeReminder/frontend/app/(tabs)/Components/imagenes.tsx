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
    width = 180,
    height = 180,
    borderRadius = 999,
}: Props) {
    return (
        <Image
        source={source}
        style={[estilos.imagen, { width, height, borderRadius}]}
        resizeMode="stretch"
        />
    );
}
const estilos = StyleSheet.create({
    imagen: {
      marginBottom: 25,
      justifyContent: 'center'
    },
});