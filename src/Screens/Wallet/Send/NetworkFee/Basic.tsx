import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { scale, verticalScale } from 'react-native-size-matters'

import { GlobalStyles } from '../../../../Config'

import { Container, GradientBorderContainer, GradientButton } from '../../../../Components'


interface Props {
    onPress: (val: any) => void
}


const VALS = [
    {
        title: "Slow",
        coin: "BNB",
        amount: 0.09,
        total: 10,
    },
    {
        title: "Moderate",
        coin: "BNB",
        amount: 0.18,
        total: 15,
    },
    {
        title: "Fast",
        coin: "BNB",
        amount: 0.27,
        total: 20,
    },
]

const Basic: React.FC<Props> = ({ onPress = () => { } }) => {
    const [selected, setSelected] = React.useState(VALS[0])
    const { colors }: any = useTheme()

    const renderContent = (item: any) => {
        return (
            <TouchableOpacity onPress={() => setSelected(item)}
                style={{ paddingVertical: verticalScale(15), paddingHorizontal: scale(15) }}>
                <View style={GlobalStyles.rowBetween}>
                    <Text style={[GlobalStyles.regularText, { fontWeight: '500', color: colors.foreground }]}>
                        {item.title}
                    </Text>
                    <Text style={[GlobalStyles.regularText, { fontWeight: '500', color: colors.foreground }]}>
                        {item.amount}{item.coin}
                    </Text>
                </View>
                <Text style={[GlobalStyles.regularText, { color: colors.infoText, textAlign: 'right', marginTop: verticalScale(10) }]}>
                    ${item.total}
                </Text>
            </TouchableOpacity>
        )
    }

    const renderItem = ({ item }: any) => {
        return (
            <View style={{ marginVertical: verticalScale(10) }}>
                {item.title === selected.title ?
                    <GradientBorderContainer childContainerStyle={{ margin: 2 }}>
                        {renderContent(item)}
                    </GradientBorderContainer>
                    :
                    <View style={[GlobalStyles.lightGrayBorder, { borderColor: colors.infoText }]}>
                        {renderContent(item)}
                    </View>
                }
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={VALS}
                keyExtractor={item => `${item.title}`}
                renderItem={renderItem}
            />
            <Text style={[GlobalStyles.regularText, { color: colors.foreground, marginVertical: verticalScale(20) }]}>
                The network fee covers the cost of processing your transaction on the Ethereum network.
            </Text>

            <View style={GlobalStyles.bottomContainer}>
                <GradientButton text='Save'
                    onPress={() => onPress(selected)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Basic