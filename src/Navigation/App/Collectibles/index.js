import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Index from '../../../Screens/Collectibles'

import AudioToken from "../../../Screens/Collectibles/AudioToken/Index";
import VideoToken from "../../../Screens/Collectibles/VideoToken";
import ThreeDToken from "../../../Screens/Collectibles/ThreeDToken";
import ImageToken from "../../../Screens/Collectibles/ImageToken";

import VideoPlayer from "../../../Screens/Collectibles/VideoToken/Player"
import ThreeDViewer from "../../../Screens/Collectibles/ThreeDToken/Player"

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}
            initialRouteName={'Index'}
        >
            <Stack.Screen name="Index" component={Index} />
            <Stack.Screen name="AudioToken" component={AudioToken} />

            <Stack.Screen name="VideoToken" component={VideoToken} />
            <Stack.Screen name="VideoPlayer" component={VideoPlayer} />

            <Stack.Screen name="ThreeDToken" component={ThreeDToken} />
            <Stack.Screen name="ThreeDViewer" component={ThreeDViewer} />

            <Stack.Screen name="ImageToken" component={ImageToken} />


        </Stack.Navigator>
    );
};

