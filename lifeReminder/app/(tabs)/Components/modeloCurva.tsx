import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function ModeloCurva() {
    return (
        <View style={{ position: 'absolute', bottom: -1}}>
        <Svg
        height="100"
        width="100%"
        viewBox="0 0 1440 320"
        style={{ position: 'absolute', bottom: 0}}
        >
            <Path
            fill="#FF0000"
            d="M0,64L48,90.7C96,117,192,171,288,181.3C384,192,480,160,576,154.7C672,149,768,171,864,176C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
           /> 
           </Svg>
           </View>
    );
}