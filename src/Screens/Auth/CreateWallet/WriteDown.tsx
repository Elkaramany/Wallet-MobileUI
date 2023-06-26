import React from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, FlatList } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { useTheme } from '@react-navigation/native'
//@ts-ignore
import randomWords from 'random-words'

import { GlobalStyles, HEIGHT, ImagePath, WIDTH } from '../../../Config'

import { Container, GradientText, GradientButton, GradientBorderContainer } from '../../../Components'
import HeaderProgress from './HeaderProgress'

interface Props {
    navigation: any
}

const WriteDown: React.FC<Props> = ({ navigation }) => {
    const [visible, setVisible] = React.useState(false)
    const phrases = React.useRef(randomWords(12)).current;
    const fontSize = scale(12);
    const { colors }: any = useTheme();

    const renderItem = ({ item, index }: any) => {
        return (
            <View
                style={[styles.innerPhrasesContainer, { backgroundColor: colors.lightGray, }]}
            >
                <Text
                    style={[GlobalStyles.regularText,
                    {
                        color: colors.foreground,
                        paddingVertical: verticalScale(10),
                    }]}
                >
                    {index + 1}. {item}
                </Text>
            </View>
        )
    }

    const renderSeed = () => {
        if (visible) {
            return (
                <GradientBorderContainer>
                    <View style={{ paddingVertical: verticalScale(12) }}>
                        <FlatList
                            numColumns={2}
                            contentContainerStyle={styles.phrasesContainer}
                            data={phrases}
                            keyExtractor={phrase => `${phrase}`}
                            renderItem={renderItem}
                        />
                    </View>
                </GradientBorderContainer>
            )
        } else {
            return (
                <ImageBackground source={ImagePath.blurredRectangle}
                    style={[GlobalStyles.centeredContainer, { width: '100%', height: HEIGHT * 0.5 }]}>
                    <Text
                        style={[GlobalStyles.regularText,
                        {
                            color: colors.foreground,
                            fontWeight: '600',
                            fontSize
                        }]}>
                        Tap to reveal your Seed Phrase
                    </Text>
                    <Text style={[GlobalStyles.regularText, { color: colors.foreground, fontSize, marginVertical: verticalScale(10), }]}>
                        Make sure no one is watching your screen
                    </Text>

                    <GradientButton text='View'
                        buttonContainerStyle={{ width: WIDTH * 0.4 }}
                        onPress={() => setVisible(true)}
                        leftIcon={ImagePath.eyeWhite}
                    />
                </ImageBackground>
            )
        }
    }

    return (
        <Container>
            <HeaderProgress
                progressImage={ImagePath.progress3}
            />

            <GradientText style={[GlobalStyles.gradienTextHeader, { fontSize: scale(18) }]}>
                Write Down Your Seed Phrase
            </GradientText>
            <Text
                style={{
                    color: colors.foreground,
                    marginTop: verticalScale(20),
                    marginBottom: verticalScale(35),
                }}
            >
                This is your seed phrase. Write it down on a paper and keep it in a safe place. You'll be asked to re-enter this phrase (in order) on the next step.
            </Text>
            {renderSeed()}
            <View style={GlobalStyles.bottomContainer}>
                <GradientButton text='Next'
                    onPress={() => visible ? navigation.navigate("ConfirmSeedPhrase", { phrases }) : {}}
                    customColors={visible ? colors.gradientButton : colors.disabledButton}
                />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    phrasesContainer: {
        alignItems: 'center'
    }, innerPhrasesContainer: {
        ...GlobalStyles.centeredContainer,
        marginVertical: scale(8),
        marginHorizontal: scale(10),
        borderRadius: scale(20),
        width: WIDTH * 0.35,
    }
})

export default WriteDown