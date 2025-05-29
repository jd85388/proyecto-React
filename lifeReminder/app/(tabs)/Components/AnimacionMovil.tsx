import React, { useEffect, useRef } from 'react';
import {Animated, Text, TextStyle, StyleProp } from 'react-native';

type FadeInTextProps = {
    children: string;
    duration: number;
    style?: StyleProp<TextStyle>;
};

export default function AnimacionYa({ children, duration = 2000, style }: FadeInTextProps) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim, duration]);

    return (
        <Animated.Text style={[{ opacity: fadeAnim }, style]}>
            {children }
        </Animated.Text>
    )
}