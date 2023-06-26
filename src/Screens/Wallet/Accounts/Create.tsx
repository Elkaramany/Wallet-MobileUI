import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import { checkAccountId } from '../../../Config/services/surfer/SurferAccount'
import { GlobalStyles, ImagePath } from '../../../Config'

import { GradientText, Input, GradientButton, Spinner } from '../../../Components'

interface Props {
    onPress: (val: string) => void
    setIndex: (val: number) => void
}

const Create: React.FC<Props> = ({ onPress = () => { }, setIndex = () => { } }) => {
    const { colors }: any = useTheme()
    const [name, setName] = React.useState('')
    const [errorMessage, setErrorMessage] = React.useState('')
    const [validName, setValidName] = React.useState(false)
    const { authLoading } = useSelector((state: any) => state.AuthReducer)

    React.useEffect(() => {
        checkData()
    }, [name])

    const checkData = async () => {
        if (name.length) {
            const value = await checkAccountId(name)
            if (value) {
                setErrorMessage("Account ID is taken, try something else.")
                setValidName(false)
            }
            else {
                setErrorMessage("")
                setValidName(true)
            }
        } else {
            setErrorMessage("Please enter an account name")
            setValidName(false)
        }
    }

    const validNameInstructions = () => {
        return <Text style={[GlobalStyles.subTitle, { color: colors.green, marginTop: verticalScale(5) }]}>Congrats, {name} is avaialble</Text>
    }

    return (
        <>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => setIndex(0)}>
                    <Image source={ImagePath.leftArrow} resizeMode={'contain'} />
                </TouchableOpacity>
                <GradientText style={[GlobalStyles.gradienTextHeader, { fontSize: scale(18) }]}>
                    Create New Account
                </GradientText>
                <View />
            </View>

            <Input
                title='Account name'
                mandatory
                value={name}
                instructions={validName && name.length ? validNameInstructions() : ""}
                error={errorMessage.length !== 0}
                errorMessage={errorMessage}
                onChangeText={(text) => setName(text)}
                inputStyle={{ marginBottom: 0 }}
                maxLength={64}
            />

            {authLoading ?
                <Spinner size='small' />
                :
                <GradientButton text='Create an account'
                    buttonContainerStyle={{ marginBottom: verticalScale(15) }}
                    onPress={() => validName ? onPress(name) : {}}
                />
            }
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

export default Create