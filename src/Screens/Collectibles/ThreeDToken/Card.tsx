import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'

import { GlobalStyles } from '../../../Config'

interface Props {
    item: any
    navigation: any
}

const Card: React.FC<Props> = ({ item, navigation }) => {
    const { colors }: any = useTheme()

    return (
        <TouchableOpacity onPress={() => navigation.navigate("ThreeDViewer", { item })}>
            <Text style={[GlobalStyles.regularText, { color: colors.foreground, fontWeight: '500' }]}>
                {item.title}
            </Text>
            <View style={[GlobalStyles.horizontalLine, { backgroundColor: colors.gray }]} />
        </TouchableOpacity>
    )
}

export default Card