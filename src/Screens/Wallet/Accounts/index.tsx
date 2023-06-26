import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetAccountData } from '../../../Redux/Actions'

import { BottomModal } from '../../../Components'

import SelectAccount from './SelectAccount'
import Create from './Create'
import Import from './Import'

interface Props {
    visible: boolean
    setVisible: (val: boolean) => void
    navigation: any
}

const Index: React.FC<Props> = ({ visible = false, setVisible = () => { }, navigation = null }) => {
    const { accounts } = useSelector((state: any) => state.AccountReducer)
    const [screen, setScreen] = React.useState(0)
    const dispatch = useDispatch()

    const renderScreens = () => {
        if (screen === 0) {
            return (
                <SelectAccount
                    setVisible={setVisible}
                    setIndex={setScreen}
                    navigation={navigation}
                />
            )
        } else if (screen === 1) {
            return (
                <Create
                    onPress={async (val: string) => {
                        await GetAccountData(dispatch, val, true, accounts.accounts)
                        setVisible(false)
                    }}
                    setIndex={setScreen}
                />
            )
        } else {
            return (
                <Import
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