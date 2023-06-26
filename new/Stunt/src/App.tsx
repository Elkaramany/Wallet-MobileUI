
import React from 'react'
import { View } from 'react-native'
import { Colors, IOS } from '@Config';
import { getStatusBarHeight } from 'react-native-status-bar-height';

//Redux
import Redux from '@Redux'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

//Navigation
import Navigation from '@Navigation'

export default () => {

  return (
    <Provider store={Redux['Store']}>
      <View style={{ flex: 1, backgroundColor: Colors.backGround, paddingTop: IOS ? getStatusBarHeight() : 0 }}>
        <PersistGate persistor={Redux['Persistor']}>
          <Navigation />
        </PersistGate>
      </View>
    </Provider>
  )
}