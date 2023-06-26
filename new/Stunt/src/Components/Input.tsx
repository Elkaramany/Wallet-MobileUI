import React from 'react'
import { ViewStyle } from 'react-native'
import { TextInput } from 'react-native-paper';
import { Colors } from '../Config'
import { verticalScale } from 'react-native-size-matters';

const textInputTheme = {
    colors: {
        placeholder: Colors.secondary, text: Colors.tertiary, primary: Colors.secondary,
        underlineColor: Colors.secondary, background: Colors.primary
    }, roundness: verticalScale(1.75)
}

interface Props {
    multiline?: boolean
    inputStyle?: ViewStyle
    label: string
    value: string | number
    onChangeText: (text: string) => void
    secureTextEntry?: boolean
    rightIcon?: any
    leftIcon?: any
    type?: any
    numLines?: number
    dense?: boolean
    onSubmitEditing?: () => void
}

const Input: React.FC<Props> = ({ inputStyle, label, value, onChangeText = (text) => { },
    secureTextEntry, rightIcon, leftIcon, type, numLines, dense, onSubmitEditing }) => {
    return (
        <TextInput
            dense={dense || false}
            numberOfLines={numLines || 1}
            right={rightIcon ? rightIcon : null}
            left={leftIcon ? leftIcon : null}
            secureTextEntry={secureTextEntry || false}
            mode="outlined"
            multiline={false}
            style={[{ marginBottom: verticalScale(3.5) }, inputStyle]}
            label={label}
            value={value.toString()}
            onChangeText={text => onChangeText(text)}
            theme={textInputTheme}
            keyboardType={type ? type : "default"}
            onSubmitEditing={onSubmitEditing}
        />
    )
}

export default Input