import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native'


interface Props {
    size?: string,
    spinnerColor?: string
}


const Spinner: React.FC<Props> = ({ size = 'small', spinnerColor }) => {
    const { colors }: any = useTheme();

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <ActivityIndicator
                //@ts-ignore
                size={size}
                color={spinnerColor || colors.secondary}
            />
        </View>
    );
}

export default Spinner;