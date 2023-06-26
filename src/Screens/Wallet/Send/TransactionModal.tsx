import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { useTheme } from '@react-navigation/native'

import { GlobalStyles, dateFormate, addEllipsis, AddCommas } from '../../../Config'

import { BottomModal, GradientText, GradientButtonText } from '../../../Components'


interface Props {
    visible: boolean
    setVisible: (val: boolean) => void
    item: any
}

const TransactionModel: React.FC<Props> = ({ visible, setVisible, item }) => {
    const { colors }: any = useTheme();

    const renderContent = () => {
        return (
            <>
                <GradientText style={[GlobalStyles.gradienTextHeader, { fontSize: scale(15) }]}
                    end={{ x: 1, y: 0.35 }}>
                    {item.transaction} {item.coin}
                </GradientText>
                <View style={GlobalStyles.rowBetween}>
                    <View>
                        <Text style={[GlobalStyles.regularText, { color: colors.infoText }]}>Status</Text>
                        <Text
                            style={[GlobalStyles.regularText, styles.boldText,
                            { color: item.status === "Confirmed" ? colors.green : colors.red }]}>
                            {item.status}
                        </Text>
                    </View>
                    <View>
                        <Text style={[GlobalStyles.regularText, { color: colors.infoText, textAlign: 'right' }]}>Date</Text>
                        <Text
                            style={[GlobalStyles.regularText, styles.boldText, { color: colors.foreground }]}>
                            {dateFormate(item.date, "MMMM DD, YYYY")} at {dateFormate(item.date, "hh:mm A")}
                        </Text>
                    </View>
                </View>

                <View style={[GlobalStyles.rowBetween, { marginVertical: verticalScale(20) }]}>
                    <View>
                        <Text style={[GlobalStyles.regularText, { color: colors.infoText }]}>From</Text>
                        <Text
                            style={[GlobalStyles.regularText, styles.boldText,
                            { color: colors.foreground }]}>
                            {addEllipsis(item.from, 5)}
                        </Text>
                    </View>
                    <View>
                        <Text style={[GlobalStyles.regularText, { color: colors.infoText, textAlign: 'right' }]}>To</Text>
                        <Text
                            style={[GlobalStyles.regularText, styles.boldText, { color: colors.foreground }]}>
                            {addEllipsis(item.to, 5)}
                        </Text>
                    </View>
                </View>

                <Text style={[GlobalStyles.regularText, { color: colors.infoText }]}>Nonce</Text>
                <Text
                    style={[GlobalStyles.regularText, styles.boldText,
                    { color: colors.foreground, marginBottom: verticalScale(20) }]}>
                    #{item.nonce}
                </Text>

                <View style={[styles.grayedContainer, { backgroundColor: colors.lightGray }]}>
                    {item.status === "Cancelled" &&
                        <>
                            <View style={GlobalStyles.rowBetween}>
                                <Text style={[GlobalStyles.regularText, styles.boldText, { color: colors.infoText }]}>
                                    Amount
                                </Text>
                                <Text style={[GlobalStyles.regularText, styles.boldText, { color: colors.foreground, }]}>
                                    0.60BNB
                                </Text>
                            </View>
                            <View style={GlobalStyles.rowBetween}>
                                <Text style={[GlobalStyles.regularText, styles.boldText, { color: colors.infoText }]}>
                                    Network fee
                                </Text>
                                <Text style={[GlobalStyles.regularText, styles.boldText, { color: colors.foreground, }]}>
                                    0.09 BNB
                                </Text>
                            </View>
                            <View style={[GlobalStyles.horizontalLine, { backgroundColor: colors.gray }]} />
                        </>
                    }
                    <View style={GlobalStyles.rowBetween}>
                        <Text
                            style={[GlobalStyles.regularText, styles.boldText,
                            { fontWeight: 'bold' }]}>
                            Total Amount
                        </Text>
                        <Text
                            style={[GlobalStyles.regularText, styles.boldText,
                            { fontWeight: 'bold' }]}>
                            {item.amount} {item.coin}
                        </Text>
                    </View>

                    <Text
                        style={[GlobalStyles.regularText, styles.boldText,
                        { fontWeight: 'normal', color: colors.infoText, textAlign: 'right' }]}>
                        ${AddCommas(item.total)}
                    </Text>
                </View>

                <View style={[GlobalStyles.bottomContainer, { marginTop: verticalScale(20) }]}>
                    {item.status === "Confirmed" &&
                        <GradientButtonText
                            text='View on mainnet'
                            onPress={() => { }}
                        />
                    }
                </View>
            </>
        )
    }

    return (
        <BottomModal
            visible={visible}
            setVisible={setVisible}
            renderContent={renderContent}
        />
    )
}

const styles = StyleSheet.create({
    boldText: {
        fontWeight: '400',
        marginTop: verticalScale(5)
    }, grayedContainer: {
        width: '100%',
        padding: scale(15),
        borderRadius: scale(15)
    }
})

export default TransactionModel