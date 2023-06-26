import React from 'react'
import { View, Text } from 'react-native'
import BigList from "react-native-big-list";
import { useTheme } from '@react-navigation/native';
import { verticalScale } from 'react-native-size-matters';

import { GlobalStyles, } from '../../../Config';
//import { play, pause, unLoad, loadSong } from './Utils'
import DUMMY_ARR from './DUMMY_ARR';

import { Container, HeaderArrow } from '../../../Components'
import Card from './Card'

interface Props {
    navigation: any
}

const VideoToken: React.FC<Props> = ({ navigation }) => {
    const { colors }: any = useTheme()

    const renderItem = ({ item, index }: any) => {
        return (
            <Card
                item={item}
                navigation={navigation}
            />
        )
    }

    return (
        <Container>
            <HeaderArrow headerText={"Videos"} />
            <BigList
                data={DUMMY_ARR}
                renderItem={renderItem}
                itemHeight={verticalScale(50)}
                renderEmpty={() => {
                    return (
                        <Text style={[GlobalStyles.regularText, { color: colors.foreground, textAlign: 'center' }]}> You have no Video Tokens</Text>
                    )
                }}
            />

        </Container>
    )
}

export default VideoToken