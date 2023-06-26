import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native'

import { GlobalStyles, WIDTH } from '../../../Config'

import { Input, GradientButton, GradientButtonText } from '../../../Components'



interface Props {

}

const CustomToken: React.FC<Props> = props => {
    const [address, setAddress] = React.useState("")
    const [symbol, setSymbol] = React.useState("")
    const [precision, setPrecision] = React.useState("")

    const { colors }: any = useTheme()


    return (
        <View style={{ flex: 1 }}>
            <Input
                title='Token address'
                mandatory
                value={address}
                inputStyle={{ height: verticalScale(35) }}
                onChangeText={(text) => setAddress(text)}
            />
            <Input
                title='Token Symbol'
                mandatory
                value={symbol}
                inputStyle={{ height: verticalScale(35) }}
                onChangeText={(text) => setSymbol(text)}
            />
            <Input
                title='Token of Precision'
                mandatory
                value={precision}
                inputStyle={{ height: verticalScale(35) }}
                onChangeText={(text) => setPrecision(text)}
            />
            <View style={[GlobalStyles.rowBetween, styles.bottomContainer, { backgroundColor: colors.background, }]}>
                <GradientButtonText text='Cancel'
                    buttonContainerStyle={styles.buttonContainer}
                    onPress={() => { }}
                />
                <GradientButton text='Import'
                    buttonContainerStyle={styles.buttonContainer}
                    onPress={() => { }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: WIDTH * 0.45,

    }, bottomContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        marginBottom: verticalScale(10)
    }
})

export default CustomToken