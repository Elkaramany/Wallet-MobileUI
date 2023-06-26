import { scale, verticalScale } from 'react-native-size-matters';
import { Platform, StyleSheet, Dimensions } from 'react-native';

const IOS: boolean = Platform.OS === 'ios';
const ANDROID: boolean = Platform.OS === 'android';
const WIDTH: number = Dimensions.get('window').width
const HEIGHT: number = Dimensions.get('window').height

const Colors = {
    backGround: '#1E1E1E',
    grayBg: "#232232",
    primary: '#487BFF',
    secondary: '#FFFFFF',
    tertiary: '#F58B6A',
    quaternary: '#80809E',
    mainFooter: '#FFD700',
    gradientButton: ['#ee8a8a', '#ea8085'],
    gray: '#a3b4bf',
    brightRed: '#a35d6a',
    mainHeader: '#3b2e5a',
}

const GlobalStyles = StyleSheet.create({
    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTextStyle: {
        fontSize: verticalScale(5),
        fontWeight: "400",
        color: Colors.secondary
    },
    rowBetween: {
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
    textInputContainer: {
        marginBottom: verticalScale(30),
        width: scale(90),
        borderRadius: scale(50),
    }, buttonContainer: {
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        padding: scale(2.4),
        borderRadius: scale(3),
        margin: verticalScale(2),
    }, buttonText: {
        fontSize: verticalScale(3),
        fontWeight: 'bold',
        color: Colors.primary
    }, textMissMatch: {
        color: Colors.gray,
        fontSize: verticalScale(2),
        fontWeight: 'bold',
        textAlign: 'center'
    }, headerContainer: {
        height: verticalScale(20)
    }, regularText: {
        fontSize: scale(20),
        color: Colors.secondary
    }, arrowImage: {
        width: scale(5),
        height: scale(5),
        resizeMode: 'contain'
    },bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: verticalScale(15),
    }, bottomAbsoluted: {
        position: 'absolute',
        bottom: 0,
        marginBottom: verticalScale(15),
    },
})

const textInputTheme = {
    colors: {
        placeholder: Colors.primary, text: Colors.primary, primary: Colors.primary,
        underlineColor: Colors.primary, background: Colors.primary
    }
}

export { Colors, textInputTheme, GlobalStyles, IOS, ANDROID, WIDTH, HEIGHT };