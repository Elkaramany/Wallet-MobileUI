import './global'
import React from 'react'
import { View } from 'react-native'
import AppContext from './src/Components/AppContext';

//Redux
import Redux from './src/Redux'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

//Navigator
import Navigator from './src/Navigation'

//Constants
import { IOS, statusBarHeight } from './src/Config';

export default () => {
  const [theme, setTheme] = React.useState("Light")

  const toggleTheme = () => {
    if (theme === "Light") {
      setTheme("Dark")
    } else {
      setTheme("Light")
    }
  }

  React.useEffect(() => {
    //If you don't want to persist any data
    //Redux['Persistor'].purge()
  }, [])

  return (
    <Provider store={Redux['Store']}>
      <View style={{ flex: 1, backgroundColor: 'transparent', paddingTop: IOS ? statusBarHeight : 0 }}>
        <PersistGate persistor={Redux['Persistor']}>
          <AppContext.Provider value={{ theme, toggleTheme }}>
            <Navigator theme={theme} />
          </AppContext.Provider>
        </PersistGate>
      </View>
    </Provider>
  )
}