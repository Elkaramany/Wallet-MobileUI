import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { GlobalStyles, ImagePath } from '../Config';

import { Container, GradientButton, GradientText, GradientButtonText } from '../Components';


interface Props {
    navigation: any,
}

const Home: React.FC<Props> = ({ navigation }) => {

    return (
        <Container smallContainerStyle={GlobalStyles.centeredContainer}>
            <Image
                source={ImagePath.logo}
                style={styles.logoImage}
            />
            <GradientText style={[GlobalStyles.gradienTextHeader, { fontSize: scale(23) }]}>
                Wallet setup
            </GradientText>

            <View style={GlobalStyles.bottomContainer}>
                <GradientButtonText text='Import using seed phrase'
                    onPress={() => navigation.navigate("ImportSeed")}
                />

                <View style={{ marginVertical: verticalScale(5) }} />

                <GradientButton text='Create a new wallet'
                    onPress={() => navigation.navigate("CreateWallet")}
                />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    logoImage: {
        resizeMode: 'contain',
        height: '50%',
        width: '100%',
        marginBottom: verticalScale(30),
    }
})

export default Home