import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'

import { GlobalStyles } from '../../../../Config'

import { GradientText, GradientButton } from '../../../../Components'

interface Props {
    setIndex: (val: number) => void
}

const SecondWarning: React.FC<Props> = ({ setIndex = () => { } }) => {
    const { colors }: any = useTheme();

    const goToNextWarning = () => {
        setIndex(3)
    }

    return (
        <>
            <GradientText style={[GlobalStyles.gradienTextHeader, { fontSize: scale(23) }]}>
                What is a 'Seed Phrase'?
            </GradientText>
            <Text style={[GlobalStyles.regularText, { color: colors.foreground }]}>
                A seed phrase is a set of twelve words that contains all the information about your wallet, including your funds. It's like a secret code used to access your entire wallet.
                {'\n'}{'\n'}
                You must keep your seed phrase secret and safe. If someone gets your seed phrase, they'll gain control over your accounts.
                {'\n'}{'\n'}
                Save it in a place where only you can access it. If you lose it, not even Metacoin can help you recover it.
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

export default SecondWarning