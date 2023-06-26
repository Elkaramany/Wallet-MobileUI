import React from 'react'
import { View, Text, } from 'react-native'
import { useNavigation, useTheme } from '@react-navigation/native';
import { scale, verticalScale } from 'react-native-size-matters'

import { GlobalStyles } from '../../../../Config'

import { GradientText, GradientButton } from '../../../../Components'

interface Props {
    setVisible: (val: boolean) => void
}

const ThirdWarning: React.FC<Props> = ({ setVisible = () => { } }) => {
    const { colors }: any = useTheme();
    const navigation = useNavigation()

    const goToNextWarning = () => {
        setVisible(false)
        //@ts-ignore
        navigation.navigate("WalletCreationSuccess")
    }

    return (
        <>
            <GradientText style={[GlobalStyles.gradienTextHeader, { fontSize: scale(23) }]}>
                Protect your wallet
            </GradientText>
            <Text style={[GlobalStyles.regularText, { color: colors.foreground }]}>
                Dont’t risk losing your funds. Protect
                your wallet by saving your seed phrase in a place you trust.
                {'\n'}{'\n'}
                It’s the only way to recover your wallet if you get locked out of the app or get a new device.
            </Text>
            <View style={[GlobalStyles.bottomContainer, { width: '100%', marginTop: verticalScale(30) }]}>
                <GradientButton text='I Got it'
                    buttonContainerStyle={{ width: '100%' }}
                    onPress={() => goToNextWarning()}
                />
            </View>
        </>
    )
}

export default ThirdWarning