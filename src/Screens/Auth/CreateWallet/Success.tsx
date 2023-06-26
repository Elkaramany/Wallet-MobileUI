import React from 'react'
import { View, Text, Image } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { useTheme } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { ImagePath, GlobalStyles } from '../../../Config'

import { Container, GradientText, GradientButton } from '../../../Components'
import HeaderProgress from './HeaderProgress'
import WarningModal from './Warnings'

interface Props {

}

const Success: React.FC<Props> = props => {
    const { fromImport } = useSelector((state: any) => state.AuthReducer)
    const dispatch = useDispatch()

    const { colors }: any = useTheme();

    const AuthAction = () => {
        //Navigate users
    }

    return (
        <Container>
            <HeaderProgress
                progressImage={ImagePath.progress3}
            />
            <View style={[GlobalStyles.centeredContainer, { width: '100%', height: '50%', }]}>
                <Image
                    source={ImagePath.success} resizeMode={'contain'} style={{ width: '100%', height: '70%', bottom: '5%' }}
                />
                <View style={{ height: verticalScale(25) }} />
                <GradientText style={[GlobalStyles.gradienTextHeader, { fontSize: scale(25) }]}>
                    Success!
                </GradientText>
            </View>
            <Text
                style={[GlobalStyles.regularText,
                {
                    color: colors.foreground,
                    textAlign: 'center'
                }]}
            >
                You've successfully protected your wallet. Remember to keep your seed phrase safe, it's your responsibility!
                {'\n'}{'\n'}
                Metacoin cannot recover your wallet should you lose it. You can find your seed phrase in{'\n'}
                Settings {'>'} Preferences {'>'} Security  {'&'} Privacy
            </Text>
            <View style={GlobalStyles.bottomContainer}>
                <GradientButton text='Next'
                    onPress={() => AuthAction()}
                />
            </View>
        </Container>
    )
}


export default Success