import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import { AddCommas, GlobalStyles, ImagePath, addEllipsis, copyToClipboard } from '../../Config'

import { Container, GradientText, GradientButton } from '../../Components'
import Header from './Header'
import Network from './Network'
import Accounts from './Accounts'
import Token from './Token'

interface Props {
    navigation: any
}

const Index: React.FC<Props> = ({ navigation }) => {
    const { accounts } = useSelector((state: any) => state.AccountReducer)
    const [networkModal, setNetworkModal] = React.useState(false)
    const [accountsModal, setAccountsModal] = React.useState(false)
    const [copied, setCopied] = React.useState(false)
    const [key, setKey] = React.useState("")
    const { colors }: any = useTheme();
    const gainValue = -2.9
    const green = gainValue > 0
    React.useEffect(() => {
        
    }, [accounts])

    return (
        <Container>
            <Header headerText='Network main'
                menuPress={() => setAccountsModal(true)}
                networkPress={() => setNetworkModal(true)}
            />

            <GradientText style={GlobalStyles.gradienTextHeader}>
                9.3729 ETH
            </GradientText>
            <Text style={[GlobalStyles.regularText, { color: colors.foreground, textAlign: 'center', fontWeight: '500', marginBottom: verticalScale(10) }]}>
                ${AddCommas(19328.19)}
                <Text style={{ color: green ? colors.green : colors.red, fontWeight: 'normal' }}>
                    {' '}{green ? "+" : ""}{gainValue}%
                </Text>
            </Text>

            <TouchableOpacity onPress={() => copyToClipboard(key, setCopied)}
                style={[GlobalStyles.rowCenter, GlobalStyles.copyContainer, { backgroundColor: colors.lightGray }]}>
                <Text style={[GlobalStyles.regularText, { color: colors.infoText, fontSize: scale(16) }]}>
                    {addEllipsis(key)}
                </Text>
                <Image source={copied ? ImagePath.checkedGradient : ImagePath.copy}
                    resizeMode={'contain'} style={{ marginLeft: scale(10), width: scale(14), height: scale(14) }}
                />
            </TouchableOpacity>

            <View style={GlobalStyles.rowAround}>
                <GradientButton text='Send'
                    textStyle={GlobalStyles.twoButtons}
                    buttonContainerStyle={GlobalStyles.twoButtonContainer}
                    onPress={() => navigation.navigate("SendTo", { token: { header: "ETH", amount: 9.3728, total: 19328.19 } })}
                    leftIcon={ImagePath.send}
                />
                <GradientButton text='Receive'
                    textStyle={GlobalStyles.twoButtons}
                    buttonContainerStyle={GlobalStyles.twoButtonContainer}
                    onPress={() => navigation.navigate("Receive")}
                    leftIcon={ImagePath.receive}
                />
            </View>

            <Token navigation={navigation} />

            {networkModal && <Network visible={networkModal} setVisible={setNetworkModal} />}
            {accountsModal && <Accounts visible={accountsModal} setVisible={setAccountsModal} navigation={navigation} />}
        </Container>
    )
}

export default Index