import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { verticalScale } from 'react-native-size-matters'
import { useSelector, useDispatch } from 'react-redux'

import { GlobalStyles } from '../../../../Config'

import { GradientButton, Input } from '../../../../Components'


interface Props {
    onPress: (val: any) => void
}

const Advanced: React.FC<Props> = ({ onPress = () => { } }) => {
    const { colors }: any = useTheme()
    const [selected, setSelected] = React.useState(null)
    const [price, setPrice] = React.useState("")
    const [limit, setLimit] = React.useState("")

    return (
        <View style={styles.container}>
            <View style={[GlobalStyles.rowBetween, { marginBottom: verticalScale(10) }]}>
                <Text style={[GlobalStyles.regularText, { color: colors.foreground, fontWeight: '300' }]}>
                    Total
                </Text>
                <Text style={[GlobalStyles.regularText, { color: colors.foreground, fontWeight: '500' }]}>
                    0.00028479 BNB
                </Text>
            </View>

            <Input
                title='Gas Limit'
                value={limit}
                onChangeText={(text) => setLimit(text)}
                inputStyle={{ marginBottom: 0, }}
                type={'numeric'}
            />

            <Input
                title='Gas Price: (GWEI)'
                value={price}
                onChangeText={(text) => setPrice(text)}
                inputStyle={{ marginBottom: 0, }}
                type={'numeric'}
            />


            <View style={GlobalStyles.bottomContainer}>
                <GradientButton text='Save'
                    onPress={() => onPress(selected)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Advanced