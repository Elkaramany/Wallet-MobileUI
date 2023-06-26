import { useTheme } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { useSelector, useDispatch } from 'react-redux'

import { GlobalStyles, WIDTH } from '../Config'

interface Props {
    values: string[]
    selected: string
    setSelected: (val: string) => void
}

const Checker: React.FC<Props> = ({ values = [], selected = '', setSelected = () => { } }) => {
    const { colors }: any = useTheme()

    const renderItem = (item: string) => {
        return (
            <TouchableOpacity onPress={() => setSelected(item)}
                style={GlobalStyles.rowBetween}>
                <View style={[styles.dot, { borderColor: colors.foreground }]}>
                    <View style={[styles.innerDot, { backgroundColor: selected === item ? colors.foreground : colors.background }]} />
                </View>
                <Text style={[GlobalStyles.regularText, { marginLeft: scale(5), color: colors.foreground }]}>{item}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={[GlobalStyles.rowBetween, { width: '80%', marginBottom: verticalScale(20), marginLeft: scale(5) }]}>
            {renderItem(values[0])}
            {renderItem(values[1])}
        </View>
    )
}

const styles = StyleSheet.create({
    dot: {
        height: scale(20),
        width: scale(20),
        borderRadius: scale(20),
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    }, innerDot: {
        height: scale(12),
        width: scale(12),
        borderRadius: scale(12),
    }
})

export default Checker