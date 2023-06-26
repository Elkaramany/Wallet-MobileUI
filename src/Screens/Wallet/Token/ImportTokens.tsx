import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { Container, HeaderArrow, Tabs } from '../../../Components'
import Search from './Search'
import CustomToken from './CustomToken'

interface Props {

}

const ImportTokens: React.FC<Props> = props => {
    return (
        <Container>
            <HeaderArrow
                headerText='Manage Testing Tokens'
                headerStyle={{ marginBottom: 0 }}
            />
            <Search />
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default ImportTokens