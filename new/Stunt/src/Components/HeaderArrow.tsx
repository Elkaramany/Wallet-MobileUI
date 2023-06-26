import React from 'react';
import { Text, Image, ViewStyle, TextStyle, StyleSheet, TouchableOpacity, View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { ImagePath, GlobalStyles, Colors } from '../Config';

interface Props {
    headerStyle?: ViewStyle;
    textStyle?: TextStyle;
    headerText?: string;
    imageName?: string;
    navigateMeBack: () => void;
    onSkip?: () => void
}

const HeaderArrow: React.FC<Props> = ({ headerText, headerStyle, textStyle, imageName, navigateMeBack, onSkip }) => {
    const headerButtons = () => {
        if (onSkip) {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => navigateMeBack()}>
                        <Image source={imageName || ImagePath.leftArrow} style={GlobalStyles.arrowImage} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onSkip()}>
                        <Text style={[GlobalStyles.regularText, { color: Colors.gray }]}>Skip</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <TouchableOpacity onPress={() => navigateMeBack()}>
                <Image source={imageName || ImagePath.leftArrow} style={GlobalStyles.arrowImage} />
            </TouchableOpacity >
        )
    }

    return (
        <View
            style={[styles.HeaderContainer, headerStyle]}>
            {headerButtons()}
            <Text style={[styles.TextStyle, textStyle]}>
                {headerText}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    HeaderContainer: {
        marginTop: verticalScale(3),
        backgroundColor: 'transparent',
    },
    TextStyle: {
        fontSize: verticalScale(5),
        fontWeight: 'bold',
        color: Colors.secondary,
        marginVertical: verticalScale(5)
    }
})

export default HeaderArrow;