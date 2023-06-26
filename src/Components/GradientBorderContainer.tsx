import React from 'react'
import { ViewStyle, View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';
import { scale } from 'react-native-size-matters';

import { GlobalStyles } from '../Config'


interface Props {
    mainContainerStyle?: ViewStyle
    viewContainerStyle?: ViewStyle
    childContainerStyle?: ViewStyle
    customColors?: string[]
}

const GradientBorderContainer: React.FC<Props> = ({
    mainContainerStyle,
    viewContainerStyle,
    children,
    customColors,
    childContainerStyle
}) => {

    const { colors }: any = useTheme();

    return (
        <View
            style={[GlobalStyles.centeredContainer, mainContainerStyle]}>
            <LinearGradient
                colors={customColors || colors.gradientButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                    styles.linearGradient,
                    { width: '100%', borderRadius: scale(13) },// <-- Overwrites the preceding style property
                    viewContainerStyle
                ]}>
                <View style={[styles.innerContainer, { borderRadius: scale(12) }, childContainerStyle]}>
                    {children}
                </View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        width: '100%',
        borderRadius: scale(12), // <-- Outer Border Radius
    },
    innerContainer: {
        borderRadius: scale(12), // <-- Inner Border Radius
        margin: 1, // <-- Border Width
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
});
export default GradientBorderContainer