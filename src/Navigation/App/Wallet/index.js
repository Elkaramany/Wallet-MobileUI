import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Index from '../../../Screens/Wallet'
//Send
import Send from '../../../Screens/Wallet/Send'
import SendTo from "../../../Screens/Wallet/Send/SendTo";
import TranscationAccounts from "../../../Screens/Wallet/Send/TransactionAccounts";
import AmountSend from "../../../Screens/Wallet/Send/Amount";
import ConfirmAndSend from "../../../Screens/Wallet/Send/ConfirmAndSend";

//Receive
import Receive from "../../../Screens/Wallet/Receive"
import AmountReceive from "../../../Screens/Wallet/Receive/Amount";
import LinkReceive from "../../../Screens/Wallet/Receive/Link"

import ImportTokens from "../../../Screens/Wallet/Token/ImportTokens";


const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}
            initialRouteName={'Index'}
        >
            <Stack.Screen name="Index" component={Index} />
            <Stack.Screen name="Send" component={Send} />
            <Stack.Screen name="SendTo" component={SendTo} />
            <Stack.Screen name="TranscationAccounts" component={TranscationAccounts} />
            <Stack.Screen name="AmountSend" component={AmountSend} />
            <Stack.Screen name="ConfirmAndSend" component={ConfirmAndSend} />


            <Stack.Screen name="Receive" component={Receive} />
            <Stack.Screen name="AmountReceive" component={AmountReceive} />
            <Stack.Screen name="LinkReceive" component={LinkReceive} />

            <Stack.Screen name="ImportTokens" component={ImportTokens} />
        </Stack.Navigator>
    );
};

