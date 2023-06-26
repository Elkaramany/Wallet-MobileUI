import React from "react";
import { NavigationContainer } from '@react-navigation/native';

import Auth from './AuthStack'

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Auth />
    </NavigationContainer>
  );
};

export default MainNavigator;
