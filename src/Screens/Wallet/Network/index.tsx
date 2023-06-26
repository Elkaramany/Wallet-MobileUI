import React from 'react'
import { useSelector } from 'react-redux'

import { BottomModal } from '../../../Components'

import Networks from './Networks'
import Create from './Create'

interface Props {
    visible: boolean
    setVisible: (val: boolean) => void
}

const Index: React.FC<Props> = ({ visible = false, setVisible = () => { } }) => {
    const [screen, setScreen] = React.useState(0)

    const renderScreens = () => {
        if (screen === 0) {
            return (
                <Networks
                    setIndex={setScreen}
                />
            )
        } else {
            return (
                <Create
                    onPress={(val: string) => console.log(val)}
                    setIndex={setScreen}
                />
            )
        }
    }

    return (
        <BottomModal
            visible={visible}
            setVisible={setVisible}
            renderContent={() => renderScreens()}
        />
    )
}

export default Index