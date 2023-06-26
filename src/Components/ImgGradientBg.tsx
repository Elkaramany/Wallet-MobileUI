import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { scale } from 'react-native-size-matters'
import { GlobalStyles } from '../Config'

interface Props {
    img: any
}

const ImgGradientBg: React.FC<Props> = ({ img }) => {
    const { colors }: any = useTheme()

    return (
        <View style={[styles.container, { backgroundColor: colors.lightPurple }]}>
            <Image
                source={img}
                resizeMode={'contain'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.centeredContainer,
        width: scale(30),
        height: scale(30),
        borderRadius: scale(10),
    },
})

export default ImgGradientBg