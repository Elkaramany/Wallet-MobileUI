import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'
import Feather from '@expo/vector-icons/Feather';

import { GlobalStyles, WIDTH, getMinutes, getSeconds } from '../../../Config'
import { changeVolume, moveAudio } from './Utils'

import { BottomModal, SlidingValue, VolumeSlider } from '../../../Components'
import BottomButtons from './BottomButtons'

interface Props {
    visible: boolean
    setVisible: (val: boolean) => void
    time: number
    volume: number
    currentSong: any
    paused: boolean
    sound: any,
    playSound: () => void
    pauseSound: () => void
    loadNewSong: (item: any) => void
    arr: any[]
}

const FullSong: React.FC<Props> = ({ visible, setVisible, time, volume = 1, currentSong, paused, sound, playSound, pauseSound, loadNewSong, arr }) => {
    const { colors }: any = useTheme()

    const renderContent = () => {
        return (
            <View style={{ paddingBottom: verticalScale(50) }}>
                <Image
                    source={{ uri: currentSong.coverPhoto }}
                    style={styles.coverImg}
                />
                <Text style={[GlobalStyles.regularText, { color: colors.foreground, fontWeight: '600', fontSize: scale(16), marginTop: verticalScale(20) }]}>
                    {currentSong.title}
                </Text>
                <Text style={[GlobalStyles.regularText, { color: colors.foreground, }]}>
                    artist name
                </Text>

                <View style={{ height: verticalScale(20) }} />

                <SlidingValue
                    value={time}
                    maxVal={currentSong.duration}
                    onComplete={async (val) => {
                        await moveAudio(sound, Math.floor(val))
                    }}
                />
                <View style={GlobalStyles.rowBetween}>

                    {!isNaN(time) &&
                        <>
                            <Text style={[GlobalStyles.regularText, { color: colors.foreground, textAlign: 'center', }]}>
                                {getMinutes(time)}:{getSeconds(time)}
                            </Text>

                            <Text style={[GlobalStyles.regularText, { color: colors.foreground, textAlign: 'center', }]}>
                                -{getMinutes(currentSong.duration - time)}:{getSeconds(currentSong.duration - time)}
                            </Text>
                        </>
                    }
                </View>


                <View style={[GlobalStyles.centeredContainer, { marginVertical: verticalScale(20) }]}>
                    <BottomButtons
                        currentSong={currentSong}
                        paused={paused}
                        playSound={playSound}
                        pauseSound={pauseSound}
                        arr={arr}
                        loadNewSong={loadNewSong}
                        customColors={colors.foreground}
                    />
                </View>

                <VolumeSlider
                    volume={volume * 100}
                    changeVolume={async (val) => {
                        await changeVolume(sound, val / 100)
                    }}
                    time={time}
                    player={sound}
                />
            </View>
        )
    }

    if (visible) {
        return (
            <BottomModal
                visible={visible} setVisible={setVisible} renderContent={renderContent}
            />
        )
    } else return <View />
}

const styles = StyleSheet.create({
    coverImg: {
        height: WIDTH * 0.9,
        width: WIDTH * 0.9,
        alignSelf: 'center',
        borderRadius: WIDTH * 0.05,
        resizeMode: 'contain'
    }
})

export default FullSong