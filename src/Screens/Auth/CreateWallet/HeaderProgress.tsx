import React from 'react';
import { Image, ViewStyle, TextStyle, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { scale, verticalScale } from 'react-native-size-matters';

import { ImagePath, GlobalStyles } from '../../../Config';

interface Props {
    headerStyle?: ViewStyle;
    textStyle?: TextStyle;
    headerText?: string;
    imageName?: string;
    progressImage: any
    arrowFunction?: () => void
}

const HeaderProgress: React.FC<Props> = ({ headerStyle, imageName, progressImage, arrowFunction = null }) => {
    const navigation = useNavigation();
    const { colors }: any = useTheme();

    return (
        <View style={{ justifyContent: 'center', marginTop: verticalScale(15) }}>
            <View
                style={[GlobalStyles.rowBetween, styles.HeaderContainer, headerStyle]}>
                <TouchableOpacity onPress={() => arrowFunction ? arrowFunction() : navigation.goBack()}>
                    <Image source={imageName || ImagePath.backArrow} style={{ resizeMode: 'contain', }} />
                </TouchableOpacity>
                <Image source={imageName || progressImage} style={{ resizeMode: 'contain', }} />
                <View style={{ width: scale(5) }} />
            </View>
            <View style={[GlobalStyles.horizontalLine,
            { marginBottom: verticalScale(25), backgroundColor: colors.gray }]} />
        </View >
    )
}

const styles = StyleSheet.create({
    HeaderContainer: {
        marginTop: verticalScale(3),
        backgroundColor: 'transparent',
    },

})

export default HeaderProgress;