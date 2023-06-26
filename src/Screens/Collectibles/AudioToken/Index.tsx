import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import BigList from "react-native-big-list";
import { useTheme } from '@react-navigation/native';
import { scale, verticalScale } from 'react-native-size-matters';

import { GlobalStyles, } from '../../../Config';
import { play, pause, unLoad, loadSong } from './Utils'
import DUMMY_ARR from './DUMMY_ARR';

import { Container, HeaderArrow } from '../../../Components'
import BottomTab from './BottomTab'
import Card from './Card'
import FullSong from './FullSong'

interface Props {
    navigation: any
    route: any
}

const AudioToken: React.FC<Props> = ({ navigation, route }) => {
    const { colors }: any = useTheme()
    //To keep track for our components
    const [currentSong, setCurrentSong] = React.useState<any>(null)
    //To gold the expo audio object
    const [sound, setSound] = React.useState<any>(null)
    const [paused, setPaused] = React.useState(false)
    const [time, setTime] = React.useState(0)
    const [volume, setVolume] = React.useState(1)
    //Bottom modal when the user clicks
    const [fullSongVisible, setFulLSongVisible] = React.useState(false)

    React.useEffect(() => {

        return () => {
            if (sound) {
                unLoad(sound, setSound)
                sound.stopAsync()
            }
        }
    }, [])

    const loadNextSong = async (index: number) => {
        //The user was just playing the last song in the array so we go back to the first one
        if (index === DUMMY_ARR.length - 1) {
            await loadNewSong({ ...DUMMY_ARR[0], index: 0 })
        } else {
            //Play the next song in the array
            await loadNewSong({ ...DUMMY_ARR[index + 1], index: index + 1 })
        }
    }

    const loadNewSong = async (song: any) => {
        await loadSong(sound, setSound, song, setPaused, setTime, setVolume, setCurrentSong, loadNextSong, volume)
    }

    const playSound = async () => {
        await play(sound, setPaused)
    }

    const pauseSound = async () => {
        await pause(sound, setPaused)
    }

    const renderItem = ({ item, index }: any) => {
        return (
            <Card
                item={item}
                loadNewSong={loadNewSong}
                index={index}
            />
        )
    }

    return (
        <Container>
            <HeaderArrow headerText={"Audios"} />
            <BigList
                data={DUMMY_ARR}
                renderItem={renderItem}
                itemHeight={verticalScale(50)}
                renderEmpty={() => {
                    return (
                        <Text style={[GlobalStyles.regularText, { color: colors.foreground, textAlign: 'center' }]}> You have no audio Tokens</Text>
                    )
                }}
            />

            <BottomTab
                time={time}
                currentSong={currentSong}
                paused={paused}
                playSound={playSound}
                pauseSound={pauseSound}
                loadNewSong={loadNewSong}
                arr={DUMMY_ARR}
                viewSong={setFulLSongVisible}
            />

            <FullSong
                visible={fullSongVisible}
                setVisible={setFulLSongVisible}
                time={time}
                volume={volume}
                currentSong={currentSong}
                paused={paused}
                sound={sound}
                playSound={playSound}
                pauseSound={pauseSound}
                loadNewSong={loadNewSong}
                arr={DUMMY_ARR}
            />

        </Container>
    )
}

const styles = StyleSheet.create({

})

export default AudioToken