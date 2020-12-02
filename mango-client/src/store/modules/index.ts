import { combineReducers } from 'redux';
import chat from './chat';
import login from './login';

export default combineReducers({
    chat,
    login
});