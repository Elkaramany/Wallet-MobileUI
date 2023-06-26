import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { ResetAuthReducer } from '../../Redux/Actions'

interface Props {

}

const Index: React.FC<Props> = props => {
    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            <Text>Settings screen</Text>
            <TouchableOpacity onPress={() => ResetAuthReducer(dispatch)}>
                <Text>Sign out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Index