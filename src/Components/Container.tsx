import React from 'react'
import { View, ViewStyle } from 'react-native'
import { useTheme } from '@react-navigation/native';

interface Props {
    bigContainerStyle?: ViewStyle
    smallContainerStyle?: ViewStyle
}

const Container: React.FC<Props> = ({ bigContainerStyle, smallContainerStyle, children }) => {
    const { colors } : any = useTheme();

    return (
        <View style={[{ flex: 1, backgroundColor: colors.background }, bigContainerStyle]}>
            <View style={[{ flex: 1, marginHorizontal: '4%' }, smallContainerStyle,]}>
                {children}
            </View>
        </View>
    )
}

export default Container