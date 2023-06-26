import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'
import { useSelector, useDispatch } from 'react-redux'

import { RefreshTokens } from '../../../Redux/Actions';
import { AddCommas, GlobalStyles, ImagePath, REFRESH_RATE } from '../../../Config'

import { GradientButtonText, GradientText, ImgGradientBg } from '../../../Components'


interface Props {
    navigation: any
}

const Index: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const { tokens, accFromSeedPhrase } = useSelector((state: any) => state.AccountReducer)
    const { colors }: any = useTheme()

    React.useEffect(() => {
        const intervalFn = () => {
            RefreshTokens(dispatch, accFromSeedPhrase)
        }
        const intervalId = setInterval(intervalFn, REFRESH_RATE)
        return () => {
            clearInterval(intervalId)
        }
    }, [])

    const renderItem = ({ item, index }: any) => {
        return (
            <View style={[styles.cardContainer, { backgroundColor: colors.background, shadowColor: colors.foreground }]}>
                <TouchableOpacity onPress={() => navigation.navigate("Send", { token: item })}
                    style={[GlobalStyles.rowBetween, { marginVertical: verticalScale(10) }]}>
                    <View style={GlobalStyles.rowCenter}>
                        <Image
                            source={ImagePath.bnbCoin}
                            style={GlobalStyles.coinImg}
                        />
                        <View style={{ left: scale(15) }}>
                            <Text
                                style={[GlobalStyles.regularText, { color: colors.foreground, fontWeight: '600', marginBottom: verticalScale(7) }]}>
                                {item.metadata.name}
                            </Text>
                            <Text
                                style={[GlobalStyles.regularText, { color: colors.infoText, fontSize: scale(11) }]}>
                                $ 87878
                                <Text style={{ color: item.gain > 0 ? colors.green : colors.red, fontWeight: '600' }}>
                                    {' '}+3.47%
                                </Text>
                            </Text>
                        </View>
                    </View>
                    <Text style={[GlobalStyles.regularText, { color: colors.foreground, fontWeight: '500' }]}>
                        {item.balance} {item.metadata.symbol}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <>
            <Image
                source={ImagePath.gradientRectangle}
                style={{ width: '100%', height: verticalScale(2), marginTop: verticalScale(35), marginBottom: verticalScale(15) }}
            />
            <FlatList
                contentContainerStyle={{ paddingHorizontal: scale(1) }}
                data={tokens}
                keyExtractor={tok => tok.tokenId}
                renderItem={renderItem}
                ListEmptyComponent={() => {
                    return (
                        <View style={GlobalStyles.centeredContainer}>
                            <Text style={GlobalStyles.regularText && { color: colors.foreground }}>You have no tokens</Text>
                        </View>
                    )
                }}
            />
            <View style={[GlobalStyles.bottomAbsoluted, { backgroundColor: colors.background, marginBottom: verticalScale(3), paddingTop: verticalScale(5) }]}>
                <GradientButtonText text='Manage testing tokens'
                    onPress={() => navigation.navigate("ImportTokens")}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginVertical: verticalScale(8),
        paddingHorizontal: scale(5),
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 10,
        borderRadius: scale(15)
    }
})

export default Index