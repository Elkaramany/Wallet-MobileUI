import React from 'react';
import { Text, Image, ViewStyle, TextStyle, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { scale, verticalScale } from 'react-native-size-matters';
import { ImagePath, GlobalStyles } from '../../Config';

interface Props {
    headerStyle?: ViewStyle;
    textStyle?: TextStyle;
    headerText: string;
    menuPress: () => void
    networkPress: () => void
}

const Header: React.FC<Props> =
    ({ headerText, headerStyle,
        textStyle, menuPress = () => { },
        networkPress = () => { },
    }) => {
        const { colors }: any = useTheme();

        return (
            <View style={{ justifyContent: 'center', marginTop: verticalScale(10) }}>
                <View
                    style={[GlobalStyles.rowBetween, styles.HeaderContainer, headerStyle]}>

                    <TouchableOpacity onPress={() => menuPress()}>
                        <Image source={ImagePath.menu} style={{ resizeMode: 'contain', height: scale(12), width: scale(12) }} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={GlobalStyles.rowCenter}
                        onPress={() => networkPress()}>
                        <Text style={[GlobalStyles.headerText, { color: colors.foreground, fontSize: scale(17) }, textStyle]}>
                            {headerText}
                        </Text>
                        <Image source={ImagePath.downArrow} style={{ resizeMode: 'contain', left: scale(8) }} />
                    </TouchableOpacity>

                    <View style={{ width: scale(15) }} />

                </View>

                <View style={[GlobalStyles.horizontalLine,
                { marginBottom: verticalScale(15), backgroundColor: colors.gray }]} />
            </View>
        )
    }

const styles = StyleSheet.create({
    HeaderContainer: {
        marginTop: verticalScale(3),
        backgroundColor: 'transparent',
    },
})

export default Header;