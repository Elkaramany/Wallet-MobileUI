import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from '@react-navigation/native'

import { GlobalStyles, ImagePath } from '../../../Config'
import { CredentialAccount } from '../../../Redux/Actions'

import { Container, HeaderArrow, GradientButton, GradientBorderContainer, GradientText, Input } from '../../../Components'
import CoinSelection from './CoinSelection'
import AmountHeader from '../AmountHeader'

interface Props {
    navigation: any
}

const DUMMY_DATA = [
    { id: 0, coin: "BNB", name: "Binance coin", amount: 4.66, total: 256.5641, selected: true, img: 'bnbCoin', gain: 0.9 },
    { id: 1, coin: "ETH", name: "Etheruem", amount: 5.66, total: 256.5641, selected: false, img: 'bnbCoin', gain: -0.9 },
    { id: 2, coin: "SYN", name: "Syntheix", amount: 6.66, total: 256.5641, selected: false, img: 'bnbCoin', gain: 3.2 },
    { id: 3, coin: "BIT", name: "Bitcoin", amount: 7.66, total: 256.5641, selected: false, img: 'bnbCoin', gain: -6 },
]

const Amount: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const { colors }: any = useTheme()
    const { send } = useSelector((state: any) => state.AccountReducer)
    const [selectCoin, setSelectedCoin] = React.useState(false)
    const [amount, setAmount] = React.useState("")

    const setNewCoin = (newCoin: any) => {
        console.log(newCoin)
        setSelectedCoin(false)
    }

    return (
        <Container>
            <HeaderArrow headerText={"Amount"} />

            <AmountHeader amount={amount} setAmount={setAmount} onCoinPress={setSelectedCoin} />

            <Text style={[GlobalStyles.regularText, { color: colors.foreground, marginTop: verticalScale(20), textAlign: 'center' }]}>
                Balance: 4,66 BNB
            </Text>

            <View style={GlobalStyles.bottomAbsoluted}>
                <GradientButton
                    text='Next'
                    customColors={Number(amount) > 0 ? colors.gradientButton : colors.disabledButton}
                    onPress={() => {
                        if (Number(amount) > 0) {
                            CredentialAccount(dispatch, { prop: 'send', value: { ...send, amount, coin: "BNB", total: 21454 } })
                            navigation.navigate("ConfirmAndSend")
                        }
                    }}
                />
            </View>

            {selectCoin &&
                <CoinSelection
                    onPress={setNewCoin}
                    visible={selectCoin}
                    setVisible={setSelectedCoin}
                    arr={DUMMY_DATA}
                />
            }
        </Container>
    )
}

export default Amount