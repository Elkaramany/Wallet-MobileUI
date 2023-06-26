import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Modal from 'react-native-modal'
import { useTheme } from '@react-navigation/native'

import { GlobalStyles } from '../Config'


interface Props {
    size?: string,
    spinnerColor?: string
    visible: boolean
}


const SpinnerModal: React.FC<Props> =
    ({ size = 'large',
        spinnerColor,
        visible = false,
    }) => {
        const { colors }: any = useTheme();

        return (

            <View style={styles.centeredView}>
                <Modal
                    isVisible={visible}
                    backdropOpacity={0.7}
                >
                    <View style={styles.centeredView}>
                        <View style={[styles.modalView, { backgroundColor: colors.background }]}>
                            <ActivityIndicator
                                //@ts-ignore
                                size={size}
                                color={spinnerColor || colors.secondary}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        ...GlobalStyles.centeredContainer,
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})

export default SpinnerModal;
