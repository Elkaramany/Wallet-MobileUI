import { scale, verticalScale } from 'react-native-size-matters';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import Constants from 'expo-constants'

const IOS: boolean = Platform.OS === 'ios';
const ANDROID: boolean = Platform.OS === 'android';
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const statusBarHeight = Constants.statusBarHeight;
const REFRESH_RATE = 5000

const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '4%'
    },
    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }, rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowAround: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrowImage: {
        width: scale(20),
        height: scale(20),
        resizeMode: 'contain'
    },
    horizontalLine: {
        width: '100%',
        height: verticalScale(1),
        alignSelf: 'center',
        marginVertical: verticalScale(15),
    },
    regularText: {
        fontSize: scale(14),
        fontWeight: '400',
    }, headerText: {
        fontSize: scale(20),
        fontWeight: '400',
    },
    rowWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    }, bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: verticalScale(15),
    }, bottomAbsoluted: {
        position: 'absolute',
        bottom: 0,
        marginBottom: verticalScale(15),
    }, graySeperator: {
        width: WIDTH * 1.5,
        height: verticalScale(5),
        right: scale(5),
        marginVertical: scale(5)
    }, subTitle: {
        fontWeight: '400',
        fontSize: scale(11),
        left: '5%',
        flexShrink: 1
    }, twoButtons: {
        fontSize: scale(16),
        fontWeight: '500'
    },
    twoButtonContainer: {
        width: WIDTH * 0.4,
        paddingVertical: scale(8),
        marginTop: verticalScale(15),
    }, coinImg: {
        width: scale(45),
        height: scale(45),
        resizeMode: 'contain'
    }, gradienTextHeader: {
        fontSize: scale(32),
        textAlign: 'center',
        fontWeight: '500',
    }, lightGrayBorder: {
        borderWidth: scale(0.25),
        borderRadius: scale(10),
    }, copyContainer: {
        alignSelf: 'center',
        borderRadius: scale(20),
        paddingVertical: scale(8),
        paddingHorizontal: scale(15)
    },
})

export { GlobalStyles, IOS, ANDROID, WIDTH, HEIGHT, statusBarHeight, REFRESH_RATE };