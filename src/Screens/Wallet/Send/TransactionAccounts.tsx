import React from 'react'
import { View, Text } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import { addEllipsis, GlobalStyles } from '../../../Config'

import { Container, HeaderArrow, GradientButton } from '../../../Components'

interface Props {
    navigation: any
}

const TransactionAccounts: React.FC<Props> = ({ navigation }) => {
    const { colors }: any = useTheme()
    const { send } = useSelector((state: any) => state.AccountReducer)

    const coin = send.from.coins.filter((coin: any) => coin.selected === true)[0]


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
                            `Balance: ${coin?.amount} ${coin?.coin}`
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
            {Account(send.from, "From")}
            {Account(send.to, "To")}
            <View style={GlobalStyles.bottomAbsoluted}>
                <GradientButton
                    text='Next'
                    onPress={() => navigation.navigate("AmountSend")}
                />
            </View>
        </Container>
    )
}

export default TransactionAccounts