import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'

import { GlobalStyles } from '../../../Config'

interface Props {
    item: any
    loadNewSong: (item: any) => void
    index: number
}

const Card: React.FC<Props> = ({ item, loadNewSong = () => { }, index }) => {
    const { colors }: any = useTheme()

    return (
        <TouchableOpacity onPress={() => loadNewSong({ ...item, index })}>
            <Text style={[GlobalStyles.regularText, { color: colors.foreground, fontWeight: '500' }]}>
                {item.title}
            </Text>
            <View style={[GlobalStyles.horizontalLine, { backgroundColor: colors.gray }]} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: verticalScale(20)
    },
    typeIcon: {
        height: verticalScale(25),
        width: verticalScale(25),
        resizeMode: 'contain'
    },
    coverImg: {
        height: verticalScale(50),
        width: verticalScale(50),
        borderRadius: scale(10),
        resizeMode: 'contain'
    }
})

export default Card