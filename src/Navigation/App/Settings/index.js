import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Index from '../../../Screens/Settings'

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}
            initialRouteName={'Index'}
        >
            <Stack.Screen name="Index" component={Index} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
