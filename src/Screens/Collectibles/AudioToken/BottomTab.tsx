import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { verticalScale, scale } from 'react-native-size-matters'

import Entypo from '@expo/vector-icons/Entypo';

import { GlobalStyles } from '../../../Config'

import BottomButtons from './BottomButtons'

interface Props {
    time: number
    currentSong: any
    paused: boolean
    playSound: () => void
    pauseSound: () => void
    loadNewSong: (item: any) => void
    arr: any[]
    viewSong: (val: boolean) => void
}

const Name: React.FC<Props> = ({ time, currentSong, paused, playSound, pauseSound, loadNewSong, arr, viewSong }) => {
    const { colors }: any = useTheme()

    if (currentSong) {
        return (
            <TouchableOpacity onPress={() => viewSong(true)}
                style={[{ backgroundColor: colors.foreground, }, styles.bottomModal]}>
                <View style={GlobalStyles.rowBetween}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Entypo
                            name={"music"}
                            size={scale(50)}
                            color={colors.background}
                        />
                        <Text style={[GlobalStyles.regularText, { color: colors.background, }]}>
                            {currentSong ? currentSong.title : "Not playing"}
                        </Text>
                    </View>

                    <BottomButtons
                        currentSong={currentSong}
                        paused={paused}
                        playSound={playSound}
                        pauseSound={pauseSound}
                        arr={arr}
                        loadNewSong={loadNewSong}
                    />

                </View>
            </TouchableOpacity>
        )
    } else return <View />
}

const styles = StyleSheet.create({
    bottomModal: {
        width: '100%',
        marginBottom: 0,
        paddingTop: verticalScale(5),
        borderRadius: scale(5)
    }
})

export default Name