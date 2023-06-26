import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Reducers from './Reducers'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['AuthReducer'],
}

const persistedReducer = persistReducer(persistConfig, Reducers)

const Store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

const Persistor = persistStore(Store)

const Redux = { Persistor, Store }

export default Redux