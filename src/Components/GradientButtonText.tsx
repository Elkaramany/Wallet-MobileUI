import React from 'react'
import { ViewStyle, View, TextStyle, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useTheme } from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';
import { scale } from 'react-native-size-matters';

import { GlobalStyles, WIDTH } from '../Config'

import GradientText from './GradientText'

interface Props {
    mainButtonStyle?: ViewStyle
    buttonContainerStyle?: ViewStyle
    textStyle?: TextStyle
    text?: string
    onPress: () => void
    customColors?: string[]
    rightIcon?: string | null
}

const GradientButtonText: React.FC<Props> = ({
    mainButtonStyle,
    buttonContainerStyle, textStyle,
    text, onPress,
    customColors,
    rightIcon = null }) => {

    const { colors }: any = useTheme();

    return (
        <TouchableOpacity
            onPress={() => onPress()}
            style={[GlobalStyles.centeredContainer, mainButtonStyle]}>
            <LinearGradient
                colors={customColors || colors.gradientButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                    styles.linearGradient,
                    { width: WIDTH * 0.9, borderRadius: scale(50) },// <-- Overwrites the preceding style property
                    buttonContainerStyle
                ]}>
                <View style={[styles.innerContainer, { borderRadius: scale(50), backgroundColor: colors.background }]}>
                    {rightIcon ?
                        <View style={[GlobalStyles.rowCenter]}>
                            <GradientText style={[styles.buttonText, textStyle]}
                                end={{ x: 1, y: 0.35 }}>
                                {text}
                            </GradientText>
                            <Image
                                //@ts-ignore
                                source={rightIcon}
                                resizeMode={'contain'} />
                        </View>
                        :
                        <GradientText style={[styles.buttonText, textStyle]}
                            end={{ x: 1, y: 0.35 }}>
                            {text}
                        </GradientText>
                    }
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        width: WIDTH * 0.9,
        borderRadius: scale(10), // <-- Outer Border Radius
    },
    innerContainer: {
        borderRadius: scale(10), // <-- Inner Border Radius
        margin: 2, // <-- Border Width
        justifyContent: 'center',
    },
    buttonText: {
        fontWeight: '500',
        fontSize: scale(18),
        textAlign: 'center',
        margin: scale(10),
        backgroundColor: 'transparent',
    },
});
export default GradientButtonText