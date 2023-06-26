import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { Container, HeaderArrow } from '../../../Components'

interface Props {

}

const ImageToken: React.FC<Props> = props => {
    return (
        <Container>
            <HeaderArrow headerText={"Images"} />
            <Text>
                ImageToken
            </Text>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default ImageToken