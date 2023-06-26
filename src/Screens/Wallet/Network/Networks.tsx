import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'

import { GlobalStyles, ImagePath, selectValue, WIDTH } from '../../../Config'
import { CredentialAccount } from '../../../Redux/Actions'

import { GradientText, GradientButtonText } from '../../../Components'

interface Props {
    setIndex: (val: number) => void
}

const Networks: React.FC<Props> = ({ setIndex = () => { } }) => {
    const dispatch = useDispatch()
    const { colors }: any = useTheme();
    const { networks } = useSelector((state: any) => state.AccountReducer)

    const changeNetwork = (id: number) => {
        CredentialAccount(dispatch, { prop: 'networks', value: selectValue(networks, id) })
    }

    const renderItem = ({ item }: any) => {
        return (
            <View style={GlobalStyles.rowBetween}>
                <TouchableOpacity onPress={() => changeNetwork(item.id)}
                    style={styles.networkContainer}>
                    <View
                        style={{
                            height: scale(14), width: scale(14),
                            borderRadius: scale(14), backgroundColor: item.color,
                        }}
                    />
                    <Text style={[GlobalStyles.regularText, { color: colors.foreground, left: scale(12) }]}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
                {item.selected && <Image source={ImagePath.checkedGradient} resizeMode={'contain'} />}
            </View>
        )
    }

    return (
        <>
            <GradientText style={[GlobalStyles.gradienTextHeader, { fontSize: scale(18) }]}>
                Networks
            </GradientText>

            <FlatList
                data={networks}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />

            <View style={[GlobalStyles.bottomContainer, { marginTop: verticalScale(20) }]}>
                <GradientButtonText text='Add custom endpoint'
                    textStyle={{ fontSize: scale(16) }}
                    onPress={() => setIndex(1)}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    networkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: verticalScale(6),
    },
})

export default Networks