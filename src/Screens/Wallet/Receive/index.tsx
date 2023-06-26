import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters';
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';

import {
    GlobalStyles, randomString,
    ImagePath, addEllipsis,
    copyToClipboard, HEIGHT,
    shareLink
} from '../../../Config'

import { Container, HeaderArrow, GradientButton, ImgGradientBg } from '../../../Components'


interface Props {
    navigation: any
}

const Index: React.FC<Props> = ({ navigation }) => {
    const key = randomString()
    const { colors }: any = useTheme()
    const [copied, setCopied] = React.useState(false)

    return (
        <Container>
            <HeaderArrow
                headerText='Receive'
            />

            <View style={[GlobalStyles.copyContainer, GlobalStyles.rowCenter, { marginTop: HEIGHT * 0.1, backgroundColor: colors.lightGray }]}>
                {copied &&
                    <>
                        <Image source={ImagePath.copy} resizeMode={'contain'} style={{ marginRight: scale(20) }} />
                        <Text style={[GlobalStyles.regularText, { color: colors.darkGray, fontWeight: '500' }]}>
                            Link copied to clipboard
                        </Text>
                    </>
                }
            </View>
            <View style={[GlobalStyles.centeredContainer, { marginTop: HEIGHT * 0.05 }]}>
                <QRCode
                    value={key}
                    size={scale(150)}
                />
            </View>
            <Text style={[GlobalStyles.regularText, styles.addressContainer, { color: colors.foreground }]}>
                Scan this address to receive payment
            </Text>

            <View style={GlobalStyles.rowCenter}>
                <TouchableOpacity onPress={() => copyToClipboard(key, setCopied)}
                    style={[GlobalStyles.rowCenter, GlobalStyles.copyContainer, { backgroundColor: colors.lightGray }]}>
                    <Text style={[GlobalStyles.regularText, { color: colors.infoText, fontSize: scale(16) }]}>
                        {addEllipsis(randomString())}
                    </Text>
                    <Image source={copied ? ImagePath.checkedGradient : ImagePath.copy}
                        resizeMode={'contain'} style={{ marginLeft: scale(10), width: scale(14), height: scale(14) }}
                    />

                </TouchableOpacity>
                <View style={{ width: scale(10) }} />
                <TouchableOpacity onPress={() => shareLink("Send money", `Send money to this address: ${randomString()}`, randomString())}>
                    <ImgGradientBg img={ImagePath.share} />
                </TouchableOpacity>
            </View>


            <View style={GlobalStyles.bottomAbsoluted}>
                <GradientButton text='Request payment'
                    onPress={() => navigation.navigate("AmountReceive")}
                />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    addressContainer: {
        fontWeight: '500',
        marginVertical: verticalScale(20),
        textAlign: 'center'
    },
})

export default Index