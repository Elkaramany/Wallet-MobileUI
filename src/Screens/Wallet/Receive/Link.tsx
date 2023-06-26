import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native'

import { GlobalStyles, HEIGHT, ImagePath, WIDTH } from '../../../Config'

import { Container, HeaderArrow, GradientButton, GradientButtonText } from '../../../Components'
import AmountHeader from '../AmountHeader'
import { scale, verticalScale } from 'react-native-size-matters'

interface Props {
    navigation: any
}

const Link: React.FC<Props> = ({ navigation }) => {
    const { colors }: any = useTheme();
    const [copied, setCopied] = React.useState(false)

    return (
        <Container>
            <HeaderArrow headerText={"Receive"} />

            <Image source={ImagePath.link} style={styles.linkImg} />

            <Text style={[GlobalStyles.regularText, { color: colors.foreground, textAlign: 'center', marginVertical: HEIGHT * 0.025, }]}>
                Your request link is already to send!
                Send this link to a friend, and it will ask them to send 0.00001 ETH
            </Text>

            <Text style={[GlobalStyles.regularText, { color: colors.secondary, textAlign: 'center', textDecorationLine: 'underline' }]}>
                ethereum:0x897DE1508e9c69e70e3ee5D794fb4BA1868BfB44?value=3e14
            </Text>

            <View style={[GlobalStyles.rowBetween, { width: '100%', marginTop: HEIGHT * 0.025 }]}>
                <GradientButtonText text='Copy Link'
                    rightIcon={ImagePath.copy}
                    buttonContainerStyle={{ width: WIDTH * 0.4 }}
                    onPress={() => { }}
                />

                <View style={{ marginVertical: verticalScale(5) }} />

                <GradientButtonText text='QRCode'
                    rightIcon={ImagePath.qrCode}
                    buttonContainerStyle={{ width: WIDTH * 0.4 }}
                    onPress={() => { }}
                />
            </View>

            <View style={GlobalStyles.bottomContainer}>
                <GradientButton text='Send Link'
                    onPress={() => { }}
                />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    linkImg: {
        alignSelf: 'center',
        marginTop: HEIGHT * 0.2,
        width: scale(90),
        height: verticalScale(90),
        resizeMode: 'contain'
    },
})

export default Link