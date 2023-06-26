import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'


import { BottomModal, GradientBorderContainer, GradientText, } from '../../../Components'
import { GlobalStyles, AddCommas } from '../../../Config'

interface Props {
    visible: boolean
    setVisible: (val: boolean) => void
    arr: any[]
    onPress: (val: any) => void
}

const CoinSelection: React.FC<Props> = ({ visible, setVisible, arr, onPress }) => {
    const { colors }: any = useTheme()
    const dispatch = useDispatch()

    const renderInnerContent = (item: any) => {
        return (
            <View style={{ padding: scale(10) }}>
                <View style={GlobalStyles.rowBetween}>
                    <Text style={[GlobalStyles.regularText, { fontWeight: '500', color: colors.foreground, fontSize: scale(16) }]}>
                        {item.name}
                    </Text>
                    <Text style={[GlobalStyles.regularText, { fontWeight: '500', color: colors.foreground, fontSize: scale(16) }]}>
                        {item.amount} {item.coin}
                    </Text>
                </View>
                <Text style={[GlobalStyles.regularText, { color: colors.infoText, textAlign: 'right' }]}>
                    ${AddCommas(item.total)}
                </Text>
            </View>
        )
    }

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity onPress={() => onPress(item)}
                style={styles.accountsContainer}>
                {item.selected === true ?
                    <GradientBorderContainer childContainerStyle={{ margin: 2 }}>

                        {renderInnerContent(item)}
                    </GradientBorderContainer>
                    :
                    <View style={[GlobalStyles.lightGrayBorder, { borderColor: colors.infoText }]}>
                        {renderInnerContent(item)}
                    </View>
                }
            </TouchableOpacity >

        )
    }

    const renderContent = () => {
        return (
            <>
                <GradientText style={GlobalStyles.gradienTextHeader}>
                    Token
                </GradientText>
                <FlatList
                    data={arr}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ marginBottom: verticalScale(20) }}
                />
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
    accountsContainer: {
        marginVertical: verticalScale(10),
    },
})

export default CoinSelection