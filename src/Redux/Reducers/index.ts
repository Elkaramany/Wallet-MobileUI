import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import AccountReducer from './AccountReducer';

export default combineReducers({
    AuthReducer,
    AccountReducer,
})