import React from 'react'
import { View } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { verticalScale } from 'react-native-size-matters'
import Slider from '@react-native-community/slider'


import Spinner from './Spinner'

interface Props {
    value: number,
    maxVal: number
    onComplete: (val: number) => void
}

const SlidingValue: React.FC<Props> = ({ value, maxVal, onComplete }) => {
    const [moving, setMoving] = React.useState<null | number>(null)
    const { colors }: any = useTheme()

    if (!isNaN(value)) {
        return (
            <Slider
                value={moving ? moving : value}
                style={{ width: '100%', height: verticalScale(10), }}
                onValueChange={(val) => setMoving(val)}
                onSlidingComplete={async (val) => {
                    await onComplete(Math.floor(val))
                    setMoving(null)
                }}
                minimumValue={0}
                maximumValue={maxVal}
                minimumTrackTintColor={colors.gradientButton[0]}
                maximumTrackTintColor={colors.gradientButton[1]}
                thumbTintColor={'transparent'}
            />

        )
    } else {
        return <View style={{height: verticalScale(25)}}/>
    }

}


export default SlidingValue