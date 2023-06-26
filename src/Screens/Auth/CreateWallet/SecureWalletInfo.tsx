import React from 'react'
import { View, Text, Image } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { useTheme } from '@react-navigation/native'

import { ImagePath, GlobalStyles } from '../../../Config'

import { Container, GradientText, GradientButton } from '../../../Components'
import HeaderProgress from './HeaderProgress'

interface Props {
    navigation: any
}

const SecureWalletInfo: React.FC<Props> = ({ navigation }) => {
    const { colors }: any = useTheme();

    return (
        <Container>
            <HeaderProgress
                progressImage={ImagePath.progress2}
            />
            <View style={[GlobalStyles.rowCenter, { marginBottom: verticalScale(15) }]}>
                <GradientText style={[GlobalStyles.gradienTextHeader, { fontSize: scale(18), marginRight: scale(10) }]}>
                    Secure Your Wallet
                </GradientText>
                <Image source={ImagePath.gradientInfo} resizeMode={'contain'} />
            </View>

            <Text
                style={{
                    color: colors.foreground,
                }}
            >
                Secure your wallet's "<Text style={{ color: colors.tertiary1 }}>Seed Phrase</Text>"
            </Text>

            <Text style={[GlobalStyles.regularText, { color: colors.foreground, fontWeight: '600', marginVertical: verticalScale(20) }]}>
                Manual
            </Text>

            <Text
                style={{
                    color: colors.foreground,
                }}
            >
                Write down your seed phrase on a piece of paper and store in a safe place.
            </Text>

            <Text style={[GlobalStyles.regularText, { color: colors.foreground, marginVertical: verticalScale(20) }]}>
                Security level: Very strong
            </Text>

            <Image source={ImagePath.strongLine} resizeMode={'contain'} style={{ marginBottom: verticalScale(15) }} />

            <Text style={[GlobalStyles.regularText, { color: colors.foreground, lineHeight: verticalScale(20) }]}>
                Risks are:
                {'\n'}  • You lose it
                {'\n'}  • You forget where you put it
                {'\n'}  • Someone else finds it
            </Text>

            <Text style={[GlobalStyles.regularText, { color: colors.foreground, marginVertical: verticalScale(20) }]}>
                Other options: Doesn't have to be paper!
            </Text>

            <Text style={[GlobalStyles.regularText, { color: colors.foreground, lineHeight: verticalScale(20) }]}>
                Tips:
                {'\n'}  • Store in bank vault
                {'\n'}  • Store in a safe
                {'\n'}  • Store in multiple secret placest
            </Text>


            <View style={GlobalStyles.bottomContainer}>
                <GradientButton text='Start'
                    onPress={() => navigation.navigate("WriteDown")}
                />
            </View>
        </Container>
    )
}


export default SecureWalletInfo