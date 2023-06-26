import React from 'react';
import { Image, ImageStyle } from 'react-native';
import { scale } from 'react-native-size-matters';
import { GlobalStyles } from '../Config';

interface Props {
    source: any
    imgStyle?: ImageStyle
}

const RegImage: React.FC<Props> = ({ source, imgStyle }) => {
    return (
        <Image
            source={source}
            resizeMode={'contain'}
            style={imgStyle}
        />
    )
}

export default RegImage