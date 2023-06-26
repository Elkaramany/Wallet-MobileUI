import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { verticalScale } from 'react-native-size-matters'
import { useTheme } from '@react-navigation/native'

import { Credential, ResetAuthReducer, VeirySeedPhraseFormat } from '../../Redux/Actions'
import { GlobalStyles, verifySeedPhrase } from '../../Config'

import { Container, HeaderArrow, Input, GradientButton, TextLink, SpinnerModal } from '../../Components'

interface Props {
    navigation: any,
}

const ImportSeed: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const [textVal, setTextVal] = React.useState("")
    const [seedPhraseError, setSeedPhraseError] = React.useState('')
    const { fromHome, authLoading } = useSelector((state: any) => state.AuthReducer)
    const { colors }: any = useTheme();

    //Valid phrase: remove excess infant tail wealth inherit huge balcony motion ball effort direct

    const importPhrase = async () => {
        if (verifySeedPhrase(textVal)) {

            setSeedPhraseError('')
            const success = await VeirySeedPhraseFormat(dispatch, textVal)

            if (success) {
                setSeedPhraseError("")
                Credential(dispatch, { prop: 'seedPhrase', value: textVal })

                if (fromHome) {

                    console.log("from home")

                } else {


                    Credential(dispatch, { prop: 'fromImport', value: true })
                    navigation.navigate("CreateWallet")

                }
            } else addSeedPhraseError()
        } else addSeedPhraseError()
    }

    const addSeedPhraseError = () => setSeedPhraseError("Please enter a valid seed phrase of at least 12 words")

    const navigateAndReset = () => {
        navigation.goBack()
        if (!fromHome) ResetAuthReducer(dispatch)
        else Credential(dispatch, { prop: 'fromHome', value: false })
    }

    return (
        <Container>
            <HeaderArrow
                arrowFunction={() => navigateAndReset()}
                headerText='Import from seed'
            />

            <View style={{ marginTop: '10%' }}>
                <Input
                    title='Seed Phrase'
                    value={textVal}
                    onChangeText={(text) => setTextVal(text)}
                    multiline
                    mandatory
                    inputStyle={{ height: verticalScale(120) }}
                    error={seedPhraseError.length !== 0}
                    errorMessage={seedPhraseError}
                />
            </View>

            {authLoading &&
                <SpinnerModal
                    visible={authLoading}
                />
            }

            <View style={GlobalStyles.bottomContainer}>

                <View style={{ marginBottom: verticalScale(50) }}>
                    <TextLink
                        text={'By proceeding, you agree to these'}
                        clickableText={' Terms and conditions.'}
                        link={'https://www.google.com/'}
                    />
                </View>

                <GradientButton text='Import'
                    customColors={verifySeedPhrase(textVal) ? colors.gradientButton : colors.disabledButton}
                    onPress={() => importPhrase()}
                />
            </View>
        </Container>
    )
}

export default ImportSeed