import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'

import { CredentialAccount } from '../../../Redux/Actions'

import { BottomModal, GradientText, } from '../../../Components'
import { ImagePath, GlobalStyles, selectValue } from '../../../Config'

interface Props {
    visible: boolean
    setVisible: (val: boolean) => void
    arr: any[]
}

const AccountSelection: React.FC<Props> = ({ visible, setVisible, arr }) => {
    const { colors }: any = useTheme()
    const dispatch = useDispatch()

    const changeAcccount = (id: number) => {
        CredentialAccount(dispatch, { prop: 'accounts', value: selectValue(arr, id) })
        setVisible(false)
    }

    const renderItem = ({ item }: any) => {
        const selectedCoin = item.coins.filter((coin: any) => coin.selected === true)[0]

        return (
            <View style={styles.accountsContainer}>
                <TouchableOpacity onPress={() => changeAcccount(item.id)}
                >
                    <Text style={[GlobalStyles.regularText, { color: colors.foreground, fontWeight: '500' }]}>
                        {item.name}
                    </Text>
                    <Text style={[GlobalStyles.regularText, { color: colors.infoText }]}>
                        {selectedCoin.amount} {selectedCoin.coin}
                    </Text>
                </TouchableOpacity>
                <>
                    {item.selected ?
                        <Image source={ImagePath.checkedGradient} resizeMode={'contain'} />
                        :
                        <View />
                    }
                </>
            </View>
        )
    }

    const renderContent = () => {
        return (
            <>
                <GradientText style={GlobalStyles.gradienTextHeader}>
                    Accounts
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
        ...GlobalStyles.rowBetween,
        marginVertical: verticalScale(8),
    },
})

export default AccountSelection