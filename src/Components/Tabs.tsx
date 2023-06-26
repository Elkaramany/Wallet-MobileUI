import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'

import { GlobalStyles, WIDTH, ImagePath } from '../Config'

import GradientText from './GradientText'

interface Props {
    titles: string[]
    screens: any[]
}

const Tabs: React.FC<Props> = ({ titles = [], screens }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const { colors }: any = useTheme()
    const calculatedWidth = (WIDTH * 0.9) / titles.length

    return (
        <>
            <View style={[GlobalStyles.rowCenter, { marginBottom: verticalScale(15) }]}>
                {titles.map((title, index) => {
                    const isSelected = titles[selectedIndex] === title

                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedIndex(index)}
                            style={[styles.categoryContainer,
                            {
                                width: calculatedWidth,
                                borderColor: isSelected ? "transparent" : colors.infoText
                            }]}>
                            {isSelected ?
                                <GradientText
                                    style={styles.textStyle}
                                    end={{ x: 1, y: 0.35 }}
                                >
                                    {title}
                                </GradientText>
                                :
                                <Text style={[styles.textStyle, { color: colors.infoText }]}>
                                    {title}
                                </Text>
                            }
                            {isSelected &&
                                <Image
                                    source={ImagePath.gradientRectangle}
                                    style={[styles.imgStyle, { width: calculatedWidth }]}
                                />
                            }
                        </TouchableOpacity>
                    )
                })}
            </View>
            {screens[selectedIndex]}
        </>
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        borderBottomWidth: verticalScale(0.25),
        marginTop: verticalScale(15),
    }, imgStyle: {
        height: verticalScale(2.5),
        alignSelf: 'center',
        resizeMode: 'cover'
    }, textStyle: {
        ...GlobalStyles.regularText,
        fontWeight: '500',
        fontSize: scale(14),
        textAlign: 'center',
        marginBottom: verticalScale(10)
    }
})

export default Tabs