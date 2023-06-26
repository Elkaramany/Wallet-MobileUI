import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../../Screens/Home';
import ImportSeed from "../../Screens/Auth/ImportSeed";
import CreateWallet from '../../Screens/Auth/CreateWallet/index';
import SecureWallet from '../../Screens/Auth/CreateWallet/SecureWallet'
import Success from "../../Screens/Auth/CreateWallet/Success";
import SecureWalletInfo from "../../Screens/Auth/CreateWallet/SecureWalletInfo";
import WriteDown from "../../Screens/Auth/CreateWallet/WriteDown";
import ConfirmSeedPhrase from "../../Screens/Auth/CreateWallet/ConfirmSeedPhrase";

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}
            initialRouteName={'Home'}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ImportSeed" component={ImportSeed} />
            <Stack.Screen name="CreateWallet" component={CreateWallet} />
            <Stack.Screen name="SecureWallet" component={SecureWallet} />
            <Stack.Screen name="SecureWalletInfo" component={SecureWalletInfo} />
            <Stack.Screen name="WalletCreationSuccess" component={Success} />
            <Stack.Screen name="WriteDown" component={WriteDown} />
            <Stack.Screen name="ConfirmSeedPhrase" component={ConfirmSeedPhrase} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
