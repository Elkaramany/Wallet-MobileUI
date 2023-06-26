import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'
import AntDesign from '@expo/vector-icons/Entypo';

import { RefreshCollectibles } from '../../Redux/Actions'

import { GlobalStyles } from '../../Config'

import { Container, GradientText } from '../../Components'

interface Props {
    navigation: any
}

const TokensArr = [
    {
        title: "Images",
        destination: "ImageToken",
        coverPhoto: "image",
        id: 0,
    },
    {
        title: "Videos",
        destination: "VideoToken",
        coverPhoto: "video",
        id: 1,
    },
    {
        title: "Audios",
        destination: "AudioToken",
        coverPhoto: "sound",
        id: 2,
    },
    {
        title: "3 D",
        destination: "ThreeDToken",
        coverPhoto: "foursquare",
        id: 3,
    },
]

const Index: React.FC<Props> = ({ navigation }) => {
    const { colors }: any = useTheme()
    const dispatch = useDispatch();
    const { accFromSeedPhrase } = useSelector((state: any) => state.AccountReducer)

    React.useEffect(() => {
        RefreshCollectibles(dispatch, accFromSeedPhrase)
    }, [])

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate(item.destination)}
                style={[GlobalStyles.centeredContainer, { width: '50%', marginVertical: verticalScale(60), }]}
            >
                <Text style={[GlobalStyles.regularText, { color: colors.foreground }]}>
                    {item.title}
                </Text>
                <AntDesign
                    name={item.coverPhoto}
                    size={scale(80)}
                    color={colors.foreground}
                />
            </TouchableOpacity>
        )
    }

    return (
        <Container>
            <GradientText style={[GlobalStyles.gradienTextHeader, { marginBottom: verticalScale(50) }]}>
                Collectibles
            </GradientText>
            <View style={[{ flex: 1 }, GlobalStyles.centeredContainer]}>
                <FlatList
                    //Replace with real data from colletibles
                    numColumns={2}
                    data={TokensArr}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                />
            </View>
        </Container>
    )
}

export default Index