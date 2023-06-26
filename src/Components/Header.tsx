import React from 'react';
import { View, Text, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { useTheme } from '@react-navigation/native'

interface Props {
    headerStyle?: ViewStyle;
    textStyle?: TextStyle;
    headerText: string;
}

const Header: React.FC<Props> = ({ headerStyle, textStyle, headerText }) => {
    const { colors }: any = useTheme();

    return (
        <View style={[styles.headerContainer, headerStyle]}>
            <Text style={[styles.headerTextStyle, { color: colors.primary, }, textStyle]}>
                {headerText}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'transparent'
    }, headerTextStyle: {
        fontSize: verticalScale(50),
        fontWeight: 'bold'
    },
})

export default Header;