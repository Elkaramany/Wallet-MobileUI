import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { useTheme } from '@react-navigation/native'


import { GlobalStyles, ImagePath, randomNum, WIDTH } from '../../../Config'

import { Container, GradientText, GradientButton, GradientBorderContainer } from '../../../Components'
import HeaderProgress from './HeaderProgress'

interface Props {
    navigation: any
    route: any
}

const ConfirmSeedPhrase: React.FC<Props> = ({ navigation, route }) => {
    const { phrases } = route.params
    const [counter, setCounter] = React.useState(0);
    const [displayedWord, setDisplayedWord] = React.useState("")
    const [usedIndices, setUsedIndices] = React.useState<number[]>([])
    const [index, setIndex] = React.useState<number>(0)
    const [arr, setArr] = React.useState<any[]>([])
    const { colors }: any = useTheme();

    React.useEffect(() => {
        generateRandomWords()
    }, [])

    const generateRandomWords = () => {
        //Generate an array of 6 random words from the phrases
        let usedNums: number[] = [];
        let half = Math.floor(phrases.length / 2) || 6
        let randNum;

        while (usedNums.length < half) {
            randNum = randomNum(phrases.length)
            //Make sure we don't have any duplicates
            if (!usedNums.includes(randNum)) {
                usedNums.push(randNum)
            }
        }

        //Pick the word we'll be testing the user on and make sure it's never been picked before
        while (true) {
            randNum = randomNum(usedNums.length)
            let selectedIndex = usedNums[randNum]
            if (!usedIndices.includes(selectedIndex)) {
                let newUsedIndices = [...usedIndices, selectedIndex]
                setUsedIndices(newUsedIndices)
                setIndex(selectedIndex)
                break;
            }
        }

        setArr(usedNums)
    }

    React.useEffect(() => {
        console.log('phrase: ' + phrases[index])
    }, [arr])

    const isCorrect = (selection: number) => {
        if (!displayedWord.length) {
            if (phrases[index] === phrases[selection]) {
                setDisplayedWord(phrases[index])
            } else {
                Alert.alert("Wrong choice, please try again!")
            }
        }
    }

    const nextPress = () => {
        if (counter > 0) {
            navigation.navigate("WalletCreationSuccess")
        }
        else {
            generateRandomWords();
            setDisplayedWord("")
            setCounter(counter + 1)
        }
    }

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity
                onPress={() => isCorrect(item)}
                style={[styles.innerPhrasesContainer, { backgroundColor: colors.lightGray, }]}
            >
                <Text
                    style={[GlobalStyles.regularText,
                    {
                        color: colors.foreground,
                        paddingVertical: verticalScale(10),
                        fontSize: scale(12),
                    }]}
                >
                    {phrases[item]}
                </Text>
            </TouchableOpacity>
        )
    }

    const renderDashes = () => {
        return phrases.map((item: any, i: number) => {
            return (
                <Image
                    key={i}
                    source={i <= index ? ImagePath.gradientProgress : ImagePath.grayProgress}
                    resizeMode={'contain'} style={{ width: '5%', height: verticalScale(5), marginHorizontal: scale(5) }}
                />
            )
        })
    }

    return (
        <Container>
            <HeaderProgress
                progressImage={ImagePath.progress3}
            />

            <GradientText style={[GlobalStyles.gradienTextHeader, { fontSize: scale(18) }]}>
                Confirm Seed Phrase
            </GradientText>
            <Text
                style={{
                    color: colors.foreground,
                    marginTop: verticalScale(15),
                    marginBottom: verticalScale(35),
                    textAlign: 'center'
                }}
            >
                Select each word in the order it was presented to you
            </Text>

            <GradientText style={[GlobalStyles.gradienTextHeader, { fontSize: scale(25) }]}>
                {index + 1}. {displayedWord}
            </GradientText>

            <GradientBorderContainer mainContainerStyle={{ marginTop: '20%' }}>
                <View style={{ paddingVertical: verticalScale(12) }}>
                    <FlatList
                        numColumns={3}
                        contentContainerStyle={styles.phrasesContainer}
                        data={arr}
                        keyExtractor={phrase => `${phrase}`}
                        renderItem={renderItem}
                    />
                </View>
            </GradientBorderContainer>

            <View style={[GlobalStyles.rowCenter, { top: '25%' }]}>
                {renderDashes()}
            </View>

            <View style={GlobalStyles.bottomContainer}>
                <GradientButton text='Next'
                    customColors={displayedWord.length ? colors.gradientButton : colors.disabledButton}
                    onPress={() => nextPress()}
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
        width: WIDTH * 0.25,
    }
})


export default ConfirmSeedPhrase