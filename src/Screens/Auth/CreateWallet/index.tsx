import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { useTheme } from '@react-navigation/native'

import { useSelector, useDispatch } from 'react-redux'
import { ResetAuthReducer, GetAccountData } from '../../../Redux/Actions'
import { ImagePath, GlobalStyles, validatePassword } from '../../../Config'

import { Container, GradientText, TextLink, GradientButton, SpinnerModal } from '../../../Components'
import HeaderProgress from './HeaderProgress'
import Password from '../Password'

interface Props {
    navigation: any
}

const Index: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch();
    const [passwordError, setPasswordError] = React.useState('')
    const [confirmPasswordError, setConfirmPasswordError] = React.useState('')
    const [checker, setChecker] = React.useState(false)
    const { password, confirmPassword, fromImport, seedPhrase, authLoading } = useSelector((state: any) => state.AuthReducer)
    const { colors }: any = useTheme();

    const isVerified = () => {
        if (!checker) return false
        if (!validatePassword(password) || password !== confirmPassword) return false
        return true
    }

    const createPassword = async () => {
        if (isVerified()) {
            setPasswordError('')
            setConfirmPasswordError('')
            if (fromImport) {
                //Navigates to home screen based on token value in main navigator
                await GetAccountData(dispatch, seedPhrase)
            } else {
                navigation.navigate("SecureWallet")
            }
        } else {
            if (!password || !validatePassword(password)) {
                setPasswordError("Password must be at least 8 characters long")
            } else {
                setPasswordError('')
            }

            if (!confirmPassword || password !== confirmPassword) {
                setConfirmPasswordError("Password doesn't match")
            } else {
                setConfirmPasswordError('')
            }
        }
    }

    const navigateAndReset = () => {
        navigation.goBack();
        ResetAuthReducer(dispatch)
    }

    return (
        <Container>
            <HeaderProgress
                arrowFunction={() => navigateAndReset()}
                progressImage={fromImport ? ImagePath.progress3 : ImagePath.progress1}
            />
            <View style={GlobalStyles.centeredContainer}>
                <GradientText style={[GlobalStyles.gradienTextHeader, { fontSize: scale(23) }]}>
                    Create Password
                </GradientText>
            </View>
            <Text
                style={[GlobalStyles.regularText,
                {
                    textAlign: 'center',
                    marginVertical: verticalScale(15),
                    color: colors.infoText,
                }]}
            >
                This password will unlock your metacoin wallet on this device
            </Text>
            <Password
                passwordError={passwordError}
                confirmPasswordError={confirmPasswordError}
                setConfirmPasswordError={setConfirmPasswordError}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity onPress={() => setChecker(!checker)}>
                    <Image source={checker ? ImagePath.checkerTrue : ImagePath.checkerFalse}
                        style={{ resizeMode: 'contain', marginRight: scale(10) }} />
                </TouchableOpacity>
                <TextLink
                    text={'I understand that metacoin cannot recover this password for me'}
                    clickableText={'. Learn more.'}
                    link={'https://www.google.com/'}
                />
            </View>

            <View style={GlobalStyles.bottomContainer}>
                <GradientButton text='Create Password'
                    customColors={isVerified() ? colors.gradientButton : colors.disabledButton}
                    onPress={() => createPassword()}
                />
            </View>

            {authLoading &&
                <SpinnerModal
                    visible={authLoading}
                />
            }
        </Container>
    )
}

export default Index