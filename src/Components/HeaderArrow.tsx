import React from 'react';
import { Text, Image, ViewStyle, TextStyle, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { scale, verticalScale } from 'react-native-size-matters';
import { ImagePath, GlobalStyles } from '../Config';

interface Props {
    headerStyle?: ViewStyle;
    textStyle?: TextStyle;
    headerText?: string;
    imageName?: string;
    arrowFunction?: () => void
}

const HeaderArrow: React.FC<Props> = ({ headerText, headerStyle, textStyle, imageName, arrowFunction = null }) => {
    const navigation = useNavigation();
    const { colors }: any = useTheme();

    return (
        <View style={{ justifyContent: 'center', marginTop: verticalScale(10) }}>
            <View
                style={[GlobalStyles.rowBetween, styles.HeaderContainer, headerStyle]}>
                <TouchableOpacity onPress={() => arrowFunction ? arrowFunction() : navigation.goBack()}>
                    <Image source={imageName || ImagePath.backArrow} style={{ resizeMode: 'contain', }} />
                </TouchableOpacity>
                <Text style={[GlobalStyles.headerText, { color: colors.foreground }, textStyle]}>
                    {headerText}
                </Text>
                <View style={{ width: scale(20) }} />
            </View>
            <View style={[GlobalStyles.horizontalLine,
            { marginBottom: verticalScale(10), backgroundColor: colors.gray }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    HeaderContainer: {
        marginTop: verticalScale(3),
        backgroundColor: 'transparent',
    },
})

export default HeaderArrow;