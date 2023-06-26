import React from 'react'
import { Text, ViewStyle, TextStyle, TouchableOpacity, View, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native';

import { GlobalStyles, WIDTH } from '../Config'

interface Props {
    mainButtonStyle?: ViewStyle
    buttonContainerStyle?: ViewStyle
    textStyle?: TextStyle
    text?: string
    onPress: () => void
    customColors?: string[]
    leftIcon?: string | null
}

const GradientButton: React.FC<Props> = ({
    mainButtonStyle,
    buttonContainerStyle, textStyle,
    text, onPress,
    customColors, leftIcon = null }) => {

    const { colors }: any = useTheme();
    return (
        <TouchableOpacity
            style={mainButtonStyle}
            onPress={() => onPress()}
        >
            <LinearGradient colors={customColors || colors.gradientButton}
                style={[{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: scale(30),
                    paddingVertical: verticalScale(10),
                    width: WIDTH * 0.9,
                }, buttonContainerStyle]}
                start={{ y: 0.0, x: 0.15 }} end={{ y: 0.0, x: 1.0 }} >
                {leftIcon ?
                    <View style={GlobalStyles.rowCenter}>
                        <Image
                            //@ts-ignore
                            source={leftIcon}
                            resizeMode={'contain'} />
                        <Text style={[GlobalStyles.regularText,
                        { fontSize: scale(18), fontWeight: '500', color: "#FFFFFF", marginLeft: scale(8) }, textStyle]}>
                            {text}
                        </Text>
                    </View>
                    :
                    <Text style={[GlobalStyles.regularText,
                    { fontSize: scale(18), fontWeight: '500', color: "#FFFFFF" }, textStyle]}>
                        {text}
                    </Text>
                }
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default GradientButton