import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface Props {

}

const Index: React.FC<Props> = () => {
    return (
        <View style= { styles.container } >
        <Text>Hello world < /Text>
            < /View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Index;