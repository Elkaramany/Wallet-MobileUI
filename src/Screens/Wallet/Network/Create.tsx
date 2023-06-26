import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'

import { GlobalStyles, ImagePath } from '../../../Config'

import { GradientText, Input, GradientButton, Checker } from '../../../Components'

interface Props {
    onPress: (val: string) => void
    setIndex: (val: number) => void
}

const Create: React.FC<Props> = ({ onPress = () => { }, setIndex = () => { } }) => {
    const [name, setName] = React.useState('')
    const [url, setUrl] = React.useState("")
    const [selectedNet, setSelectedNet] = React.useState("")

    return (
        <>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => setIndex(0)}>
                    <Image source={ImagePath.leftArrow} resizeMode={'contain'} />
                </TouchableOpacity>
                <GradientText style={[GlobalStyles.gradienTextHeader, { fontSize: scale(18) }]}>
                    Create New Endpoint
                </GradientText>
                <View />
            </View>

            <Input
                title='Network name'
                mandatory
                value={name}
                onChangeText={(text) => setName(text)}
                inputStyle={{ marginBottom: 0, height: verticalScale(35) }}
            />

            <Input
                title='RPC URL'
                mandatory
                value={url}
                onChangeText={(text) => setUrl(text)}
                inputStyle={{ marginBottom: 0, height: verticalScale(35) }}
            />
            <Checker
                values={["Mainnet", "Testnet"]}
                selected={selectedNet}
                setSelected={setSelectedNet}
            />


            <GradientButton text='Add a network'
                buttonContainerStyle={{ marginBottom: verticalScale(15) }}
                onPress={() => { }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(20),
    }
})

export default Create