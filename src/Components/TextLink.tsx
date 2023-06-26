import React from 'react'
import { View, Text, TouchableOpacity, Linking, Alert } from 'react-native'
import { scale } from 'react-native-size-matters'
import { useTheme } from '@react-navigation/native'

import { GlobalStyles } from '../Config'

interface Props {
    text: string
    clickableText: string
    link: string
}

const TextLink: React.FC<Props> = ({ text, clickableText, link }) => {
    const { colors }: any = useTheme();

    const linkPress = React.useCallback(async (url) => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, []);

    return (
        <View style={{ width: '95%' }}>
            <Text style={[GlobalStyles.regularText, { fontSize: scale(11), color: colors.foreground }]}>
                {text}
                <Text
                    onPress={() => linkPress(link)}
                    style={{ color: colors.tertiary1 }}>
                    {clickableText}
                </Text>
            </Text>
        </View>
    )
}

export default TextLink