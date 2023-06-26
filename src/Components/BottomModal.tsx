import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal'
import { useTheme } from '@react-navigation/native'
import { scale } from 'react-native-size-matters';

import { GlobalStyles } from '../Config';
import Container from './Container';


interface Props {
    visible: boolean
    setVisible: (val: boolean) => void
    renderContent: () => void
}


const BottomModal: React.FC<Props> = ({ visible = false, setVisible = () => { }, renderContent = () => { } }) => {
    const { colors }: any = useTheme();

    return (
        <Container>
            <Modal
                isVisible={visible}
                backdropOpacity={0.7}
                style={{ flex: 1, width: '100%', right: '5%', top: '5%', }}
            >
                <TouchableOpacity onPress={() => setVisible(false)} style={{ flex: 1 }}>

                </TouchableOpacity>
                <View style={[styles.centeredView, GlobalStyles.centeredContainer]}>
                    <View style={[styles.modalView, { backgroundColor: colors.background }]}>
                        <TouchableOpacity onPress={() => setVisible(false)}>
                            <View style={[GlobalStyles.horizontalLine, styles.topBar, { backgroundColor: colors.gray, }]} />
                        </TouchableOpacity>
                        {renderContent()}
                    </View>
                </View>
            </Modal>
        </Container>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        width: '100%'
    },
    modalView: {
        height: '100%',
        width: '100%',
        borderRadius: scale(30),
        padding: scale(20),
    }, topBar: {
        width: '15%',
        marginTop: 0,
        height: scale(3),
        borderRadius: scale(10)
    }
})

export default BottomModal;