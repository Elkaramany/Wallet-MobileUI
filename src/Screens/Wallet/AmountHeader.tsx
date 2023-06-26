import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'

import { GlobalStyles, ImagePath } from '../../Config'

import { GradientBorderContainer, GradientText, Input } from '../../Components'

interface Props {
    amount: string
    setAmount: (val: string) => void
    onCoinPress: (val: boolean) => void
}

const AmountHeader: React.FC<Props> = ({ amount, setAmount, onCoinPress }) => {
    const { colors }: any = useTheme()

    return (
        <>
            <GradientBorderContainer mainContainerStyle={{ width: '40%', alignSelf: 'center' }}>
                <TouchableOpacity onPress={() => onCoinPress(true)}>
                    <View style={[GlobalStyles.rowCenter, { paddingVertical: verticalScale(10) }]}>
                        <GradientText style={[GlobalStyles.gradienTextHeader, { fontSize: scale(16) }]}>
                            BNB
                        </GradientText>
                        <Image source={ImagePath.downArrow} resizeMode={'contain'} style={{ left: scale(10) }} />
                    </View>
                </TouchableOpacity>
            </GradientBorderContainer>

            <Input
                value={amount}
                onChangeText={(text) => setAmount(text)}
                inputStyle={{ marginBottom: 0, width: '60%', alignSelf: 'center' }}
                autoFocus
                type={'numeric'}
            />

            <View style={[GlobalStyles.rowCenter,
            {
                backgroundColor:
                    colors.lightGray, width: '50%',
                alignSelf: 'center',
                borderRadius: scale(30)
            }]}>
                <Text style={[GlobalStyles.regularText, { color: colors.foreground, padding: scale(10) }]}>
                    $5485.268
                </Text>
                <Image source={ImagePath.exchange} resizeMode={'contain'} />
            </View>
        </>
    )
}

export default AmountHeader