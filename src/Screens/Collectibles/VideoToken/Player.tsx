import React from 'react'
import { View, } from 'react-native'
import { Video } from 'expo-av';
import { verticalScale } from 'react-native-size-matters';

import { GlobalStyles, seconds } from '../../../Config';

import { Container, HeaderArrow, Spinner, VolumeSlider } from '../../../Components';


interface Props {
    route: any
}

const Player: React.FC<Props> = ({ route }) => {
    const { item } = route.params;
    const video = React.useRef(null);
    const [status, setStatus] = React.useState<any>({});

    React.useEffect(() => {
        console.log(status)
    }, [status])

    return (
        <Container>
            <HeaderArrow headerText={item.title} />

            <Video
                ref={video}
                style={{ flex: 1 }}
                source={{ uri: item.link }}
                useNativeControls
                resizeMode="contain"
                isLooping
                progressUpdateIntervalMillis={1000}
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            {status.isLoaded &&
                <View style={{ marginVertical: verticalScale(20) }}>
                    <VolumeSlider
                        volume={status.volume}
                        changeVolume={async (val) => {
                            //@ts-ignore
                            await video.current.setVolumeAsync(val / 100)
                            //@ts-ignore
                            video.current.playAsync()
                        }}
                        time={seconds(status.positionMillis)}
                        player={video}
                    />
                </View>
            }
            {!status.isLoaded &&
                <View style={[GlobalStyles.centeredContainer, { bottom: verticalScale(250) }]}>
                    <Spinner size='large' />
                </View>
            }
        </Container>
    )
}


export default Player