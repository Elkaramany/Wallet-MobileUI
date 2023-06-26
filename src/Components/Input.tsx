import React from 'react'
import { ViewStyle, TextStyle, View, Text, StyleSheet, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInput } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import { scale, verticalScale } from 'react-native-size-matters';

import { GlobalStyles, ImagePath } from '../Config'

interface Props {
    viewStyle?: ViewStyle
    title?: string
    titleStyle?: TextStyle
    multiline?: boolean
    inputStyle?: ViewStyle | TextStyle
    label?: string
    value: string | number
    instructions?: any
    onChangeText: (text: string) => void
    secureTextEntry?: boolean
    rightIcon?: any
    leftIcon?: any
    type?: any
    numLines?: number
    dense?: boolean
    onSubmitEditing?: () => void
    theme?: any
    placeHolder?: string
    maxLength?: number,
    autoCapital?: string
    onFocus?: () => void
    blurOnSubmit?: boolean
    autoFocus?: boolean
    ref?: any
    error?: boolean
    errorMessage?: string
    mandatory?: boolean
}


const Input: React.FC<Props> = ({
    viewStyle, inputStyle, title = '', titleStyle, label = '', value = '', instructions = '',
    onChangeText = (text) => { }, ref = null, error = false, errorMessage = '',
    secureTextEntry = false, rightIcon = null, leftIcon = null, type = 'default',
    numLines = 1, dense = false, mandatory = false,
    multiline = false, onSubmitEditing,
    theme, placeHolder = '', maxLength = 150,
    autoCapital = 'none', onFocus = () => { }, blurOnSubmit = true, autoFocus = false }) => {
    const { colors }: any = useTheme();

    const inputTheme = {
        colors: {
            placeholder: error ? colors.error : colors.gray, text: colors.foreground, primary: error ? colors.error : colors.tertiary1,
            underlineColor: colors.foreground, background: colors.background
        }, roundness: multiline ? scale(10) : scale(30)
    }

    const renderInstructions = () => {
        if (error) {
            return (
                <View style={[styles.errorBackground, { backgroundColor: colors.errorBg }]}>
                    <Image source={ImagePath.redExclamation} style={{
                        width: scale(15),
                        height: scale(15),
                        resizeMode: 'contain',
                        paddingVertical: verticalScale(13),
                        marginHorizontal: scale(12),
                    }} />
                    <Text style={[GlobalStyles.subTitle, { color: colors.error, left: 0, }]}>
                        {errorMessage}
                    </Text>
                </View>
            )
        } else {
            if (instructions) {
                if (typeof (instructions) === 'string') {
                    return (
                        <Text style={[GlobalStyles.subTitle, { color: colors.inputGray }]}>
                            {instructions}
                        </Text>
                    )
                } else {
                    return (
                        <>
                            {instructions}
                        </>
                    )
                }
            }
        }
    }

    return (
        <View style={[{ marginBottom: verticalScale(20) }, viewStyle]}>
            <Text style={[styles.title, { color: colors.foreground }, titleStyle]}>
                {title}{mandatory && <Text style={{ color: colors.error }}> *</Text>}
            </Text>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='handled'>
                <TextInput
                    ref={ref}
                    dense={dense}
                    numberOfLines={numLines}
                    right={rightIcon}
                    left={leftIcon}
                    secureTextEntry={secureTextEntry}
                    mode="outlined"
                    multiline={multiline}
                    style={[{ marginBottom: verticalScale(8), height: verticalScale(40) }, inputStyle]}
                    label={label}
                    placeholder={placeHolder}
                    value={value.toString()}
                    onChangeText={text => onChangeText(text)}
                    theme={theme || inputTheme}
                    keyboardType={type}
                    onSubmitEditing={onSubmitEditing}
                    maxLength={maxLength}
                    //@ts-ignore
                    autoCapitalize={autoCapital}
                    onFocus={onFocus}
                    blurOnSubmit={blurOnSubmit}
                    autoFocus={autoFocus}
                />
            </KeyboardAwareScrollView>
            {renderInstructions()}
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        ...GlobalStyles.regularText,
        fontSize: scale(14),
        left: '5%'
    },
    errorBackground: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: scale(50)
    }
})

export default Input