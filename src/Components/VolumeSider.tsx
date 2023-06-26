import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { scale } from 'react-native-size-matters'
import Feather from '@expo/vector-icons/Feather';

import { GlobalStyles } from '../Config'

import SlidingValue from './SlidingValue'

interface Props {
    volume: number
    changeVolume: (val: number) => void
    time: number
    player: any
}

const VolumeSlider: React.FC<Props> = ({ volume, changeVolume, time, player }) => {
    const { colors }: any = useTheme()

    return (
        <View style={{ width: '90%', alignSelf: 'center' }}>
            <SlidingValue
                value={volume * 100}
                maxVal={100}
                onComplete={(val) => changeVolume(val)}
            />

            {!isNaN(time) &&

                <View style={GlobalStyles.rowBetween}>

                    <Feather
                        name={"volume"}
                        size={scale(25)}
                        color={colors.gradientButton[1]}
                    />

                    <Feather
                        name={"volume-2"}
                        size={scale(25)}
                        color={colors.gradientButton[1]}
                    />
                </View>
            }
        </View>
    )
}

export default VolumeSlider