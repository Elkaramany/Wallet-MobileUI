import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'

import { Credential, CredentialAccount } from '../../../Redux/Actions'
import { GlobalStyles, ImagePath, selectValue } from '../../../Config'

import { GradientText, GradientButton, GradientButtonText } from '../../../Components'

interface Props {
    setVisible: (val: boolean) => void
    setIndex: (val: number) => void
    navigation: any
}

const SelectAccount: React.FC<Props> = ({ setVisible = () => { }, setIndex = () => { }, navigation = null }) => {
    const dispatch = useDispatch()
    const { accounts } = useSelector((state: any) => state.AccountReducer)
    const { colors }: any = useTheme();

    const changeAcccount = (id: number) => {
        CredentialAccount(dispatch, { prop: 'accounts', value: selectValue(accounts, id) })
        setVisible(false)
    }

    const deleteAccount = (id: number) => {
        let newArr = [...accounts]
        newArr = newArr.filter((item) => item.id !== id)
        CredentialAccount(dispatch, { prop: 'accounts', value: newArr })
    }

    const importAcc = () => {
        Credential(dispatch, { prop: 'fromHome', value: true })
        navigation.navigate("ImportSeedApp")
        setVisible(false)
    }


    const renderItem = ({ item }: any) => {
        return (
            <View style={styles.accountsContainer}>
                <TouchableOpacity onPress={() => changeAcccount(item.id)}
                >
                    <Text style={[GlobalStyles.regularText, { color: colors.foreground, fontWeight: '500' }]}>
                        {item.name}
                    </Text>
                    <Text style={[GlobalStyles.regularText, { color: colors.infoText }]}>
                        gfdg
                    </Text>
                </TouchableOpacity>
                <>
                    {item.selected ?
                        <Image source={ImagePath.checkedGradient} resizeMode={'contain'} />
                        :
                        <TouchableOpacity onPress={() => deleteAccount(item.id)}>
                            <Image source={ImagePath.delete} resizeMode={'contain'} style={{ width: scale(15), height: scale(15) }} />
                        </TouchableOpacity>
                    }
                </>
            </View>
        )
    }

    return (
        <>
            <GradientText style={GlobalStyles.gradienTextHeader}>
                Accounts
            </GradientText>

            <FlatList
                data={accounts.accounts}
                keyExtractor={item => item.seedPhrase}
                renderItem={renderItem}
            />

            <View style={[GlobalStyles.bottomContainer, { marginTop: verticalScale(40) }]}>
                <GradientButtonText text='Import an account'
                    onPress={() => importAcc()}
                />

                <View style={{ marginVertical: verticalScale(5) }} />

                <GradientButton text='Create an account'
                    onPress={() => setIndex(1)}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    accountsContainer: {
        ...GlobalStyles.rowBetween,
        marginVertical: verticalScale(8),
    },
})

export default SelectAccount