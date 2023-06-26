import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTheme } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'

import { CredentialAccount } from '../../../../Redux/Actions'

import { BottomModal, GradientText, Tabs } from '../../../../Components'
import Basic from './Basic'
import Advanced from './Advanced'
import { GlobalStyles } from '../../../../Config'

interface Props {
    visible: boolean
    setVisible: (val: boolean) => void
}

const Index: React.FC<Props> = ({ visible, setVisible }) => {
    const { colors }: any = useTheme()
    const dispatch = useDispatch()

    const changeFee = (item: any) => {
        console.log(item)
        setVisible(false)
    }

    const renderContent = () => {
        return (
            <>
                <GradientText style={[GlobalStyles.gradienTextHeader, { fontSize: scale(18) }]}>
                    Edit Network Fee
                </GradientText>
                <Tabs
                    titles={["Basic", "Advanced"]}
                    screens={[<Basic onPress={changeFee} />, <Advanced onPress={changeFee} />]}
                />
            </>
        )
    }

    return (
        <BottomModal
            visible={visible}
            setVisible={setVisible}
            renderContent={renderContent}
        />
    )
}

const styles = StyleSheet.create({
    accountsContainer: {
        ...GlobalStyles.rowBetween,
        marginVertical: verticalScale(8),
    },
})

export default Index