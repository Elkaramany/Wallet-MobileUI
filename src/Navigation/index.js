import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { DarkTheme, LightTheme } from './Themes';

import Auth from './Auth'
import App from './App/index'
import { RefreshAccessKeys, RefreshActivities, RefreshCollectibles, RefreshTokens } from '../Redux/Actions';


export default ({ theme }) => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.AuthReducer)
    const { accFromSeedPhrase } = useSelector((state) => state.AccountReducer)


    React.useEffect(() => {
        if (accFromSeedPhrase) {
            RefreshTokens(dispatch, accFromSeedPhrase)
            RefreshCollectibles(dispatch, accFromSeedPhrase)
            RefreshActivities(dispatch, accFromSeedPhrase)
            RefreshAccessKeys(dispatch, accFromSeedPhrase)
        }
    }, [accFromSeedPhrase])

    //Navigate users based on their auth status using the token received by the BE
    return (
        <NavigationContainer theme={theme == 'Light' ? LightTheme : DarkTheme}>
            {!token ? <App /> : <Auth />}
        </NavigationContainer>
    );
};