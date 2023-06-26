import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import App from "./App";
import ImportSeed from "../../Screens/Auth/ImportSeed";

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}
            initialRouteName={"App"}
        >
            <Stack.Screen name="App" component={App} />
            <Stack.Screen name="ImportSeedApp" component={ImportSeed} />
        </Stack.Navigator>
    );
};