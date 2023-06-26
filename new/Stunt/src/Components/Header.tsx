import React from 'react';
import { View, Text, ViewStyle, TextStyle, StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { Colors } from '../Config'

interface Props {
    headerStyle?: ViewStyle;
    textStyle?: TextStyle;
    headerText: string;
}

const Header: React.FC<Props> = ({ headerStyle, textStyle, headerText }) => {
    return (
        <View style={[styles.headerContainer, headerStyle]}>
            <Text style={[styles.headerTextStyle, textStyle]}>
                {headerText}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'transparent'
    }, headerTextStyle: {
        color: Colors.primary,
        fontSize: verticalScale(50),
        fontWeight: 'bold'
    },
})

export default Header;