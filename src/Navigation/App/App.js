import {
    createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { useTheme, NavigationContainer } from "@react-navigation/native";
import { scale, verticalScale } from "react-native-size-matters";

import { GlobalStyles, ImagePath } from "../../Config";
import { GradientText } from "../../Components";

import Wallet from './Wallet'
import Collectibles from "./Collectibles";
import Swap from './Swap'
import Settings from './Settings'

const BottomTab = createBottomTabNavigator();

export default () => {
    const { colors } = useTheme();

    return (
        <BottomTab.Navigator
            initialRouteName={'Wallet'}
            tabB
            screenOptions={{
                activeTintColor: colors.secondary,
                inactiveTintColor: colors.inputGray,
                headerShown: false,
                tabBarShowLabel: false,
                unmountOnBlur: true,
                tabBarStyle: { backgroundColor: colors.background },
            }}
        >
            <BottomTab.Screen
                name={"Wallet"}
                component={Wallet}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={styles.bottomTabContainer}>
                                <Image
                                    source={focused ? ImagePath.walletFocused : ImagePath.walletUnFocused}
                                    resizeMode={'contain'}
                                />
                                {focused ?
                                    <GradientText style={styles.tabText}
                                        customColors={focused ? colors.gradientButton : colors.disabledButton}>
                                        Wallet
                                    </GradientText>
                                    :
                                    <Text style={[styles.tabText, { color: colors.inputGray }]}>
                                        Wallet
                                    </Text>
                                }
                            </View>
                        );
                    },
                }}
            />

            <BottomTab.Screen
                name={"Collectibles"}
                component={Collectibles}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={styles.bottomTabContainer}>
                                <Image
                                    source={focused ? ImagePath.walletFocused : ImagePath.walletUnFocused}
                                    resizeMode={'contain'}
                                />
                                {focused ?
                                    <GradientText style={styles.tabText}
                                        customColors={focused ? colors.gradientButton : colors.disabledButton}>
                                        Collectibles
                                    </GradientText>
                                    :
                                    <Text style={[styles.tabText, { color: colors.inputGray }]}>
                                        Collectibles
                                    </Text>
                                }
                            </View>
                        );
                    },
                }}
            />

            <BottomTab.Screen
                name={"Swap"}
                component={Swap}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={styles.bottomTabContainer}>
                                <Image
                                    source={focused ? ImagePath.swapFocused : ImagePath.swapUnFocused}
                                    resizeMode={'contain'}
                                />
                                {focused ?
                                    <GradientText style={styles.tabText}
                                        customColors={focused ? colors.gradientButton : colors.disabledButton}>
                                        Swap
                                    </GradientText>
                                    :
                                    <Text style={[styles.tabText, { color: colors.inputGray }]}>
                                        Swap
                                    </Text>
                                }
                            </View>
                        );
                    },
                }}
            />

            <BottomTab.Screen
                name={"Settings"}
                component={Settings}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={styles.bottomTabContainer}>
                                <Image
                                    source={focused ? ImagePath.settingsFocused : ImagePath.settingsUnFocused}
                                    resizeMode={'contain'}
                                />
                                {focused ?
                                    <GradientText style={styles.tabText}
                                        customColors={focused ? colors.gradientButton : colors.disabledButton}>
                                        Settings
                                    </GradientText>
                                    :
                                    <Text style={[styles.tabText, { color: colors.inputGray }]}>
                                        Settings
                                    </Text>
                                }
                            </View>
                        );
                    },
                }}
            />

        </BottomTab.Navigator>
    );
};

const styles = StyleSheet.create({
    bottomTabContainer: {
        ...GlobalStyles.centeredContainer,
        top: verticalScale(5),
        padding: verticalScale(5)
    },
    tabText: {
        ...GlobalStyles.regularText,
        fontSize: scale(10),
        marginTop: scale(3)
    }
})