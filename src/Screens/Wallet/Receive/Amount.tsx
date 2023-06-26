import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native'

import { GlobalStyles } from '../../../Config'

import { Container, HeaderArrow, GradientButton } from '../../../Components'
import AmountHeader from '../AmountHeader'

interface Props {
    navigation: any
}

const Amount: React.FC<Props> = ({ navigation }) => {
    const { colors }: any = useTheme()
    const [amount, setAmount] = React.useState("")
    const [selectedCoin, setSelectedCoin] = React.useState(false)

    return (
        <Container>
            <HeaderArrow headerText={"Amount"} />
            <AmountHeader amount={amount} setAmount={setAmount} onCoinPress={setSelectedCoin} />

            <View style={GlobalStyles.bottomContainer}>
                <GradientButton text='Next'
                    customColors={Number(amount) > 0 ? colors.gradientButton : colors.disabledButton}
                    onPress={() => {
                        if (Number(amount) > 0) {
                            navigation.navigate("LinkReceive")
                        }
                    }}
                />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Amount