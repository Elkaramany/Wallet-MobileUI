import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'

import { GlobalStyles, ImagePath } from '../../../Config'

interface Props {
    item: any
    navigation: any
}

const Card: React.FC<Props> = ({ item, navigation }) => {
    const { colors }: any = useTheme()

    return (
        <>
            <View style={[styles.container, { flexDirection: 'row', alignItems: 'center', width: '100%' }]}>
                <Image source={ImagePath.image} style={styles.typeIcon} />
                <View style={{ marginHorizontal: scale(20) }}>
                    <Text style={[GlobalStyles.regularText, { color: colors.foreground, fontWeight: '500', textAlign: 'center' }]}>
                        {item.title}
                    </Text>
                    <Image source={{ uri: item.link }} style={styles.coverImg} />
                </View>
                <Text style={[GlobalStyles.regularText, { color: colors.foreground, fontWeight: '500', width: '55%' }]}>
                    {item.description}
                </Text>
            </View>
            <View style={[GlobalStyles.horizontalLine, { backgroundColor: colors.gray }]} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: verticalScale(20)
    },
    typeIcon: {
        height: verticalScale(25),
        width: verticalScale(25),
        resizeMode: 'contain'
    },
    coverImg: {
        height: verticalScale(75),
        width: verticalScale(75),
        borderRadius: scale(10),
        resizeMode: 'contain'
    }
})

export default Card