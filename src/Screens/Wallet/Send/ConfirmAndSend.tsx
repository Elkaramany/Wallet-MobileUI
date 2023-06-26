import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@react-navigation/native'

import { GlobalStyles, addEllipsis } from '../../../Config'

import { Container, HeaderArrow, GradientButton, GradientText } from '../../../Components'

interface Props {
    navigation: any
}

const ConfirmAndSend: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const { colors }: any = useTheme()
    const { send } = useSelector((state: any) => state.AccountReducer)

    const Account = (acc: any, title: string) => {
        return (
            <>
                <Text style={GlobalStyles.regularText && { color: colors.foreground, fontWeight: '400', fontSize: scale(16) }}>
                    {title}
                </Text>
                <View style={{ marginVertical: verticalScale(20), left: scale(10) }}>
                    <Text style={GlobalStyles.regularText && { color: colors.foreground, fontWeight: '500' }}>
                        {acc?.name}
                    </Text>
                    <Text style={[GlobalStyles.regularText, { color: colors.infoText, marginTop: verticalScale(10) }]}>
                        {title === "From" ?
                            `Balance: 859BNB`
                            :
                            addEllipsis(acc.address)
                        }
                    </Text>
                </View>
            </>
        )
    }

    return (
        <Container>
            <HeaderArrow headerText={"Send To"} />
            <Text style={[GlobalStyles.regularText, { color: colors.foreground, textAlign: 'center', fontWeight: '500' }]}>
                Amount
            </Text>

            <GradientText style={[GlobalStyles.gradienTextHeader, { marginVertical: scale(20) }]}>
                {send.amount} {send.coin}
            </GradientText>

            {Account(send.from, "From")}
            {Account(send.to, "To")}

            <View style={[styles.grayedContainer, { backgroundColor: colors.lightGray }]}>
                <View style={GlobalStyles.rowBetween}>
                    <Text style={[GlobalStyles.regularText, { color: colors.infoText }]}>
                        Amount
                    </Text>

                    <Text style={[GlobalStyles.regularText, { color: colors.foreground, fontWeight: '500' }]}>
                        55BNB
                    </Text>
                </View>

                <View style={[GlobalStyles.rowBetween, { marginTop: scale(15) }]}>
                    <Text style={[GlobalStyles.regularText, { color: colors.infoText }]}>
                        Network fee
                    </Text>
                    <Text style={[GlobalStyles.regularText, { color: colors.foreground, fontWeight: '500' }]}>
                        0.09BNB
                    </Text>
                </View>

                <View style={[GlobalStyles.horizontalLine, { backgroundColor: colors.gray, marginBottom: verticalScale(15) }]} />

                <View style={GlobalStyles.rowBetween}>
                    <Text style={[GlobalStyles.regularText, { color: colors.foreground, fontWeight: '500', fontSize: scale(17) }]}>
                        Total Amount
                    </Text>

                    <View >
                        <Text style={[GlobalStyles.regularText, { color: colors.foreground, fontWeight: '500', textAlign: 'right', marginBottom: verticalScale(10) }]}>
                            55BNB
                        </Text>
                        <Text style={[GlobalStyles.regularText, { color: colors.infoText, fontWeight: '500', textAlign: 'right' }]}>
                            ${addEllipsis("56452.251")}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={GlobalStyles.bottomAbsoluted}>
                <GradientButton
                    text='Send'
                    onPress={() => { }}
                />
            </View>

        </Container>
    )
}

const styles = StyleSheet.create({
    grayedContainer: {
        borderRadius: scale(10),
        padding: scale(20)
    }
})

export default ConfirmAndSend