import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'

import { GlobalStyles, ImagePath, WIDTH } from '../../../../Config'

import { GradientText, GradientButton, GradientButtonText } from '../../../../Components'

interface Props {
    setVisible: (val: boolean) => void
    setIndex: (val: number) => void
}

const FirstWarning: React.FC<Props> = ({ setVisible = () => { }, setIndex = () => { } }) => {
    const { colors }: any = useTheme();
    const [reminder, setReminder] = React.useState(false)
    const [checker, setChecker] = React.useState(false)

    const goToNextWarning = () => {
        if (checker) {
            setReminder(false)
            setIndex(2)
        } else {
            setReminder(true)
        }
    }

    return (
        <>
            <GradientText style={[GlobalStyles.gradienTextHeader, { fontSize: scale(23) }]}>
                Skip account security
            </GradientText>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity onPress={() => setChecker(!checker)}>
                    <Image source={checker ? ImagePath.checkerTrue : ImagePath.checkerFalse}
                        style={{ resizeMode: 'contain', marginRight: scale(10) }} />
                </TouchableOpacity>
                <Text style={[GlobalStyles.regularText, { color: reminder ? colors.error : colors.foreground }]}>
                    I understand that if I lose my seed phrase I will not be able to access my wallet
                </Text>
            </View>
            <View style={[GlobalStyles.bottomContainer, GlobalStyles.rowBetween, { width: '100%', marginTop: verticalScale(30) }]}>
                <GradientButtonText text='Secure'
                    buttonContainerStyle={{ width: WIDTH * 0.4 }}
                    onPress={() => setVisible(false)}
                />

                <View style={{ marginVertical: verticalScale(5) }} />

                <GradientButton text='Yes, Skip'
                    buttonContainerStyle={{ width: WIDTH * 0.4 }}
                    onPress={() => goToNextWarning()}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: verticalScale(50)
    },
})

export default FirstWarning