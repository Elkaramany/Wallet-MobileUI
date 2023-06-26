import React from 'react';
import { Text, TextStyle } from 'react-native';
import { scale } from 'react-native-size-matters';
import { GlobalStyles } from '../Config';

interface Props {
    str: string
    style?: TextStyle,
    big?: boolean
    bigger?: boolean
    biggest?: boolean
}

const RegText: React.FC<Props> = ({ str, style, big, bigger, biggest }) => {
    const [size, setSize] = React.useState(scale(20))

    React.useEffect(() => {
        if (big === true) setSize(scale(23))
        if (bigger === true) setSize(scale(26))
        if (biggest === true) setSize(scale(30))
    }, [])

    return (
        <Text style={[GlobalStyles.regularText, { fontSize: size }, style]}>
            {str}
        </Text>
    )
}

export default RegText