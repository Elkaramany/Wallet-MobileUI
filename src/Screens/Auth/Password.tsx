import React from 'react'
import {
    View, Text, Image,
    TouchableOpacity, Switch,
    Alert,
}
    from 'react-native'
import { verticalScale } from 'react-native-size-matters'
import ReactNativeBiometrics from 'react-native-biometrics'
import { TextInput } from 'react-native-paper'
import { useTheme } from '@react-navigation/native'

import { Credential } from '../../Redux/Actions'
import { useSelector, useDispatch } from 'react-redux'

import { Input } from '../../Components'
import { GlobalStyles, ImagePath } from '../../Config'

interface Props {
    passwordError: string,
    confirmPasswordError: string
    setConfirmPasswordError: (val: string) => void
}

const Password: React.FC<Props> = ({ passwordError, confirmPasswordError, setConfirmPasswordError }) => {
    const dispatch = useDispatch()
    const [hidePassowrd, setHidePassword] = React.useState(true)
    const [hideConfirmPassword, setHideConfirmPassword] = React.useState(true)
    const { password, confirmPassword, biometrics } = useSelector((state: any) => state.AuthReducer)
    const { colors }: any = useTheme();

    React.useEffect(() => {
        if (confirmPassword.length && password !== confirmPassword) {
            setConfirmPasswordError("Password doesn't match")
        } else {
            setConfirmPasswordError("")
        }
    }, [confirmPassword])

    const tryBiometrics = () => {
        if (biometrics) {
            Credential(dispatch, { prop: 'biometrics', value: null })
        } else {
            let epochTimeSeconds = Math.round((new Date()).getTime() / 1000).toString()
            let payload = epochTimeSeconds + 'some message'

            ReactNativeBiometrics.createSignature({
                promptMessage: 'Sign in',
                payload: payload
            })
                .then((resultObject) => {
                    const { success, signature } = resultObject

                    if (success) {
                        Credential(dispatch, { prop: 'biometrics', value: signature })
                        Alert.alert(JSON.stringify(signature))
                        //verifySignatureWithServer(signature, payload)
                    }
                }).catch(() => {
                    Alert.alert("Biometric authentication is not available for this device")
                })
        }
    }

    const getPasswordStrength = () => {
        if (!password.length) {
            return 'Must be at least 8 characters'
        } else {
            if (password.length < 4) return <Text style={[GlobalStyles.subTitle, { color: colors.red }]}>Password strength: Week</Text>
            else if (password.length < 8) return <Text style={[GlobalStyles.subTitle, { color: '#F6BE00' }]}>Password strength: Medium</Text>
            else if (password.length >= 8) return <Text style={[GlobalStyles.subTitle, { color: colors.green }]}>Password strength: Strong</Text>
        }
    }

    const getConfirmPasswordInstructions = () => {
        if (confirmPassword.length && password === confirmPassword) {
            return <Text style={[GlobalStyles.subTitle, { color: colors.green }]}>Password matches</Text>
        }
        return "Password must match"
    }

    return (
        <>
            <Input
                title='New Password'
                mandatory
                rightIcon={<TextInput.Icon name={() => {
                    return (
                        <TouchableOpacity style={{ top: verticalScale(3) }}
                            onPress={() => setHidePassword(!hidePassowrd)}>
                            <Image source={hidePassowrd ? ImagePath.eye : ImagePath.hiddenEye} style={GlobalStyles.arrowImage} />
                        </TouchableOpacity>
                    )
                }} />}
                secureTextEntry={hidePassowrd}
                instructions={getPasswordStrength()}
                value={password}
                error={passwordError.length !== 0}
                errorMessage={passwordError}
                onChangeText={(text) => Credential(dispatch, { prop: 'password', value: text })}
            />

            <Input
                title='Confirm New Password'
                mandatory
                rightIcon={<TextInput.Icon name={() => {
                    return (
                        <TouchableOpacity style={{ top: verticalScale(3) }}
                            onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
                            <Image source={hideConfirmPassword ? ImagePath.eye : ImagePath.hiddenEye} style={GlobalStyles.arrowImage} />
                        </TouchableOpacity>
                    )
                }} />}
                secureTextEntry={hideConfirmPassword}
                instructions={getConfirmPasswordInstructions()}
                value={confirmPassword}
                error={confirmPasswordError.length !== 0}
                errorMessage={confirmPasswordError}
                onChangeText={(text) => Credential(dispatch, { prop: 'confirmPassword', value: text })}

            />

            <View style={[GlobalStyles.horizontalLine, { marginBottom: verticalScale(20) }]} />

            <View style={[GlobalStyles.rowBetween, { marginBottom: verticalScale(20) }]}>
                <Text style={[GlobalStyles.regularText, { color: colors.foreground, }]}>
                    Sign in with your biometrics
                </Text>
                <Switch
                    trackColor={{ false: colors.white, true: colors.tertiary1 }}
                    thumbColor={biometrics !== null ? colors.white : colors.gray}
                    //@ts-ignore
                    onValueChange={() => tryBiometrics()}
                    value={biometrics}
                />
            </View>
        </>
    )
}


export default Password