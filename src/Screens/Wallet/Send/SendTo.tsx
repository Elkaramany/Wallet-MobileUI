import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { scale, verticalScale } from 'react-native-size-matters'
import { useTheme } from '@react-navigation/native'
import { TextInput } from 'react-native-paper'

import { CredentialAccount } from '../../../Redux/Actions'
import { addEllipsis, GlobalStyles, ImagePath, randomString } from '../../../Config'

import { Container, HeaderArrow, GradientButtonText, Input, GradientButton } from '../../../Components'
import AccountSelection from './AccountSelection'

const DUMMY_RECENTS = [
    {
        id: 0,
        name: "jane",
        address: randomString()
    }, {
        id: 1,
        name: "jane",
        address: randomString()
    }, {
        id: 2,
        name: "jane",
        address: randomString()
    }, {
        id: 3,
        name: "jane",
        address: randomString()
    }, {
        id: 4,
        name: "jane",
        address: randomString()
    },
]


interface Props {
    navigation: any
}

const SendTo: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const { accounts, send } = useSelector((state: any) => state.AccountReducer)
    const [accountSelection, setAccountSelection] = React.useState(false)
    const [address, setAddress] = React.useState("")
    const { colors }: any = useTheme()
    const [selectedFromAccount, setSelectedFromAccount] = React.useState<any>(null)
    const [selectedToAccount, setSelectedToAccount] = React.useState<any>(null)

    React.useEffect(() => {
        let selected = accounts.filter((acc: any) => acc.selected === true)[0]
        setSelectedFromAccount(selected)
    }, [accounts])

    React.useEffect(() => {
        if (selectedToAccount) setAddress(selectedToAccount.address)
    }, [selectedToAccount])

    return (
        <Container>
            <HeaderArrow headerText={"Send To"} />
            <Text style={GlobalStyles.regularText && { color: colors.foreground, fontWeight: '400', fontSize: scale(16) }}>
                From
            </Text>
            <TouchableOpacity onPress={() => setAccountSelection(true)}
                style={GlobalStyles.rowBetween}>
                <View style={{ marginVertical: verticalScale(20), left: scale(10) }}>
                    <Text style={GlobalStyles.regularText && { color: colors.foreground, fontWeight: '500' }}>
                        {selectedFromAccount?.name}
                    </Text>
                    <Text style={[GlobalStyles.regularText, styles.marginedText, { color: colors.infoText }]}>
                        {selectedFromAccount?.coins.filter((coin: any) => coin.selected === true)[0]?.amount} {selectedFromAccount?.coins.filter((coin: any) => coin.selected === true)[0]?.coin}
                    </Text>
                </View>
                <Image
                    source={ImagePath.rightArrow} resizeMode={'contain'}
                />
            </TouchableOpacity>

            <Text style={GlobalStyles.regularText && { color: colors.foreground, fontWeight: '400', fontSize: scale(16) }}>
                To
            </Text>
            <View style={{ marginTop: verticalScale(10), }}>
                <Input
                    title='Address'
                    placeHolder='Search, Public Address (0x) or ENS'
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                    inputStyle={{ marginBottom: 0 }}
                    mandatory
                    rightIcon={<TextInput.Icon name={() => {
                        return (
                            <TouchableOpacity style={{ top: verticalScale(3) }}
                                onPress={() => { }}>
                                <Image source={ImagePath.scan} resizeMode={'contain'} />
                            </TouchableOpacity>
                        )
                    }} />}
                />
            </View>

            <GradientButtonText text='Transfer between my accounts'
                onPress={() => { }}
            />

            <View style={[GlobalStyles.horizontalLine, { backgroundColor: colors.gray }]} />

            <Text style={[GlobalStyles.regularText, { color: colors.foreground }]}>Recents</Text>

            <FlatList
                data={DUMMY_RECENTS}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => setSelectedToAccount(item)}
                            style={{ marginVertical: verticalScale(10) }}
                        >
                            <View style={GlobalStyles.rowBetween}>
                                <View>
                                    <Text style={[GlobalStyles.regularText, { color: colors.foreground, fontWeight: '500' }]}>
                                        {item.name}
                                    </Text>
                                    <Text style={[GlobalStyles.regularText, { color: colors.infoText, marginTop: verticalScale(5) }]}>
                                        {addEllipsis(item.address)}
                                    </Text>
                                </View>
                                <Image source={ImagePath.rightArrow} resizeMode={'contain'} />
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />

            <View style={[GlobalStyles.bottomAbsoluted, { marginBottom: scale(5), backgroundColor: colors.background }]}>
                <GradientButton
                    text='Next'
                    customColors={address.length > 10 ? colors.gradientButton : colors.disabledButton}
                    onPress={() => {
                        if (address.length > 10) {
                            CredentialAccount(dispatch, { prop: 'send', value: { ...send, from: selectedFromAccount, to: selectedToAccount } })
                            navigation.navigate("TranscationAccounts")
                        }
                    }}
                />
            </View>

            {accountSelection &&
                <AccountSelection
                    visible={accountSelection}
                    setVisible={setAccountSelection}
                    arr={accounts}
                />
            }
        </Container>
    )
}

const styles = StyleSheet.create({
    marginedText: {
        marginTop: verticalScale(10)
    },
})

export default SendTo