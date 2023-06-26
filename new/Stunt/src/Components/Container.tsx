import React from 'react'
import { View, ViewStyle } from 'react-native'
import { Colors } from '../Config'

interface Props {
    bigContainerStyle?: ViewStyle
    smallContainerStyle?: ViewStyle
    children: any
}

const Container: React.FC<Props> = ({ bigContainerStyle, smallContainerStyle, children }) => {

    return (
        <View style={[{ flex: 1, backgroundColor: Colors.backGround }, bigContainerStyle]}>
            <View style={[{ flex: 1, marginHorizontal: '5.5%' }, smallContainerStyle,]}>
                {children}
            </View>
        </View>
    )
}

export default Container