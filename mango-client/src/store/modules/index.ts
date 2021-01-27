import { combineReducers } from 'redux';
import chat from './chat';
import login from './login';
import nav from './nav';

export default combineReducers({
    chat,
    login,
    nav
});