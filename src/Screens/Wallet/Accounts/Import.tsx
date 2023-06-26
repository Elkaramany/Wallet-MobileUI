import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'

import { GlobalStyles, ImagePath, WIDTH } from '../../../Config'

import { GradientText, Input, GradientButton, GradientButtonText } from '../../../Components'

interface Props {
    onPress: (val: string) => void
    setIndex: (val: number) => void
}

const Import: React.FC<Props> = ({ onPress = () => { }, setIndex = () => { } }) => {
    const [phrase, setPhrase] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState('')

    return (
        <>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => setIndex(0)}>
                    <Image source={ImagePath.leftArrow} resizeMode={'contain'} />
                </TouchableOpacity>
                <GradientText style={[GlobalStyles.gradienTextHeader, { fontSize: scale(18) }]}>
                    Import Account
                </GradientText>
                <View />
            </View>

            <Input
                title='Paste your private key string'
                value={phrase}
                onChangeText={(text) => setPhrase(text)}
                multiline
                mandatory
                inputStyle={{ height: verticalScale(65) }}
                error={errorMessage.length !== 0}
                errorMessage={errorMessage}
            />

            <View style={[GlobalStyles.bottomContainer, GlobalStyles.rowBetween, { width: '100%', marginTop: verticalScale(30) }]}>
                <GradientButtonText text='Scan a QR code'
                    textStyle={{ fontSize: scale(16) }}
                    buttonContainerStyle={{ width: WIDTH * 0.42 }}
                    onPress={() => { }}
                />

                <View style={{ marginVertical: verticalScale(5) }} />

                <GradientButton text='Import'
                    textStyle={{ fontSize: scale(16) }}
                    buttonContainerStyle={{ width: WIDTH * 0.42 }}
                    onPress={() => onPress(phrase)}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(20),
    }
})

export default Import