import { combineReducers } from 'redux';
import AuthReducer from './authReducer';
import SnackReducer from './snackReducer';

export default combineReducers({
 auth: AuthReducer,
 snack: SnackReducer
});
