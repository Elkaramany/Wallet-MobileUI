import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import dayjs from "dayjs";
import { useSelector, useDispatch } from 'react-redux'
import { scale, verticalScale } from 'react-native-size-matters'


import { AddCommas, dateFormate, GlobalStyles, ImagePath, randomString } from '../../../Config'

import { Container, HeaderArrow, GradientText, GradientButton, ImgGradientBg } from '../../../Components'
import TransactionModal from './TransactionModal'

const DUMMY_DATA = [
    {
        status: "Confirmed",
        transaction: "Received",
        coin: "BNB",
        from: randomString(),
        to: randomString(),
        date: new Date(),
        nonce: 0,
        amount: 2.5,
        total: 2278.4848,
    },
    {
        status: "Confirmed",
        transaction: "Received",
        coin: "BNB",
        from: randomString(),
        to: randomString(),
        date: new Date(),
        nonce: 1,
        amount: 2.4899,
        total: 2278.4848,
    },
    {
        status: "Confirmed",
        transaction: "Sent",
        coin: "BNB",
        from: randomString(),
        to: randomString(),
        date: new Date(),
        nonce: 2,
        amount: 2.4899,
        total: 2278.4848,
    },
    {
        status: "Confirmed",
        transaction: "Sent",
        coin: "BNB",
        from: randomString(),
        to: randomString(),
        date: new Date(),
        nonce: 3,
        amount: 2.4899,
        total: 2278.4848,
    },
    {
        status: "Cancelled",
        transaction: "Sent",
        coin: "BNB",
        from: randomString(),
        to: randomString(),
        date: new Date(),
        nonce: 4,
        amount: 2.4899,
        total: 2278.4848,
    },
    {
        status: "Cancelled",
        transaction: "Received",
        coin: "BNB",
        from: randomString(),
        to: randomString(),
        date: new Date(),
        nonce: 5,
        amount: 2.4899,
        total: 2278.4848,
    },
]

interface Props {
    navigation: any
    route: any
}

const Index: React.FC<Props> = ({ navigation, route }) => {
    const [showModal, setShowModal] = React.useState(false)
    const [modalItem, setModalItem] = React.useState(null)
    const { token } = route?.params
    const { colors }: any = useTheme()

    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setShowModal(true)
                    setModalItem(item)
                }}
                style={{ marginVertical: verticalScale(10) }}>
                <Text style={[GlobalStyles.regularText, { color: colors.foreground, fontSize: scale(10), fontWeight: 'normal' }]}>
                    {dateFormate(item.date, "MMMM DD, YYYY")} at {dateFormate(item.date, "hh:mm A")}
                </Text>
                <View style={[GlobalStyles.rowBetween, { marginVertical: verticalScale(10) }]}>
                    <View style={GlobalStyles.rowCenter}>
                        <ImgGradientBg
                            img={item.transaction === "Sent" ? ImagePath.sendGradient : ImagePath.receiveGradient}
                        />
                        <View style={{ left: scale(15) }}>
                            <Text
                                style={[GlobalStyles.regularText,
                                { color: colors.foreground, fontWeight: '600', marginBottom: verticalScale(7) }]}>
                                {item.transaction} {item.coin}
                            </Text>
                            <Text
                                style={[GlobalStyles.regularText, styles.status, { color: item.status === "Confirmed" ? colors.green : colors.red }]}>
                                {item.status}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={[GlobalStyles.regularText, { color: colors.foreground, fontWeight: '500', textAlign: 'right' }]}>
                            {item.amount} {item.coin}
                        </Text>
                        <Text style={[GlobalStyles.regularText,
                        { color: colors.infoText, fontSize: scale(12), marginTop: verticalScale(5), textAlign: 'right' }]}>
                            $ {AddCommas(item.total)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <Container>
            <HeaderArrow headerText={token.name} />
            <GradientText style={GlobalStyles.gradienTextHeader}>
                {token.amount} {token.coin}
            </GradientText>
            <Text style={[GlobalStyles.regularText, { color: colors.foreground, textAlign: 'center', fontWeight: '500', fontSize: scale(12) }]}>
                ${AddCommas(19328.19)}
            </Text>

            <View style={GlobalStyles.rowAround}>
                <GradientButton text='Send'
                    textStyle={GlobalStyles.twoButtons}
                    buttonContainerStyle={GlobalStyles.twoButtonContainer}
                    onPress={() => { }}
                    leftIcon={ImagePath.send}
                />
                <GradientButton text='Receive'
                    textStyle={GlobalStyles.twoButtons}
                    buttonContainerStyle={GlobalStyles.twoButtonContainer}
                    onPress={() => { }}
                    leftIcon={ImagePath.receive}
                />
            </View>
            <View style={[GlobalStyles.horizontalLine, { backgroundColor: colors.gray }]} />
            <FlatList
                data={DUMMY_DATA}
                keyExtractor={item => `${item.nonce}`}
                renderItem={renderItem}
            />
            {showModal &&
                <TransactionModal
                    visible={showModal}
                    setVisible={setShowModal}
                    item={modalItem}
                />
            }
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.rowBetween
    },
    status: {
        fontSize: scale(12),
        fontWeight: '400'
    }, transactionImg: {
        width: scale(50),
        height: scale(50)
    }
})

export default Index