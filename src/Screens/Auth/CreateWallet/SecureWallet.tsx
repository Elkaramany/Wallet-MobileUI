import React from 'react'
import { View, Text, Image } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { useTheme } from '@react-navigation/native'

import { ImagePath, GlobalStyles } from '../../../Config'

import { Container, GradientText, GradientButtonText, GradientButton } from '../../../Components'
import HeaderProgress from './HeaderProgress'
import WarningModal from './Warnings'

interface Props {
    navigation: any
}

const SecureWallet: React.FC<Props> = ({ navigation }) => {
    const [showWarning, setShowWarning] = React.useState(false)

    const { colors }: any = useTheme();

    return (
        <Container>
            {showWarning &&
                <WarningModal
                    visible={showWarning}
                    setVisible={setShowWarning}
                />}
            <HeaderProgress
                progressImage={ImagePath.progress2}
            />
            <View style={[GlobalStyles.centeredContainer, { width: '100%', height: '50%', }]}>
                <Image
                    source={ImagePath.logo} resizeMode={'contain'} style={{ width: '100%', height: '70%', bottom: '5%' }}
                />
                <View style={{ height: verticalScale(25) }} />
                <GradientText style={[GlobalStyles.gradienTextHeader, { fontSize: scale(18) }]}>
                    Secure Your Wallet
                </GradientText>
            </View>
            <Text
                style={[GlobalStyles.regularText,
                {
                    color: colors.infoText,
                }]}
            >
                Don't risk losing your funds. Protect your wallet by saving your <Text style={{ color: colors.tertiary1 }}>Seed phrase</Text> in a place
                {'\n'}you trust. {'\n'} {'\n'}
                It's the only way to recover your wallet if you get locked out of the app or get a new device.
            </Text>
            <View style={GlobalStyles.bottomContainer}>
                <GradientButtonText text='Remind me later'
                    onPress={() => setShowWarning(true)}
                />

                <View style={{ marginVertical: verticalScale(5) }} />

                <GradientButton text='Start'
                    onPress={() => navigation.navigate("SecureWalletInfo")}
                />
            </View>
        </Container>
    )
}


export default SecureWallet