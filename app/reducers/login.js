import { LOGIN, SIGN_UP } from '../actions/actionTypes';
import { combineReducers } from 'redux';

const initialState = {
    isProcessing: false,
    success: false,
    error: null
}

const login = (state = initialState, action) => {
    if (action.error) {
        console.log('login', action.error);
    }

    switch(action.type) {
        case LOGIN:
        case SIGN_UP:
            return action;
        default:
            return state;
    }
}

export default login;
