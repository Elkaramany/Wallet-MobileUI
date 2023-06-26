import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import { useTheme } from '@react-navigation/native'

import AntDesign from '@expo/vector-icons/AntDesign';


interface Props {
    currentSong: any
    paused: boolean
    playSound: () => void
    pauseSound: () => void
    loadNewSong: (item: any) => void
    arr: any[]
    customColors?: string
}

const Name: React.FC<Props> = ({ currentSong, playSound, pauseSound, paused, arr, loadNewSong, customColors = null, }) => {
    const { colors }: any = useTheme()
    const [loadingSong, setLoadingSong] = React.useState(false)

    const getNewSongIndexAndLoad = async (index: number) => {
        if (!loadingSong) {
            //To prevent multiple loads in case the user clicks the forward or backwards button a bunch of time in a row
            setLoadingSong(true)
            //User pressed next at the last index of the array
            if (index >= arr.length) index = 0
            await loadNewSong({ ...arr[index], index })
            setLoadingSong(false)
        }
    }

    return (
        <View style={{ flexDirection: 'row', marginRight: scale(15) }}>

            {currentSong.index !== 0 &&
                <TouchableOpacity onPress={() => getNewSongIndexAndLoad(currentSong.index - 1)}>
                    <AntDesign
                        name={"banckward"}
                        size={scale(30)}
                        color={customColors || colors.background}
                    />
                </TouchableOpacity>
            }

            <TouchableOpacity
                onPress={() => paused ? playSound() : pauseSound()}
                style={{ marginHorizontal: scale(10) }}
            >
                <AntDesign
                    name={paused ? "play" : "pausecircle"}
                    size={scale(30)}
                    color={paused ? colors.gradientButton[1] : colors.gradientButton[0]}
                    style={{ marginHorizontal: scale(15) }}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => getNewSongIndexAndLoad(currentSong.index + 1)}>
                <AntDesign
                    name={"forward"}
                    size={scale(30)}
                    color={customColors || colors.background}
                />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Name