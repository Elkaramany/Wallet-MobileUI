import React from 'react'

import { Container, HeaderArrow } from '../../../Components';


interface Props {
    route: any
}

const Player: React.FC<Props> = ({ route }) => {
    const { item } = route.params;

    return (
        <Container>
            <HeaderArrow headerText={item.title} />

        </Container>
    )
}


export default Player