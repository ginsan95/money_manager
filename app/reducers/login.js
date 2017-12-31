import { LOGIN, SIGN_UP, RESET_DATA } from '../actions/actionTypes';
import { combineReducers } from 'redux';

const initialState = {
    isProcessing: false,
    success: false,
    error: null
}

function login(state = initialState, action) {
    if (action.error) {
        console.log('login', action.error);
    }

    switch(action.type) {
        case LOGIN:
            return action;
        case RESET_DATA:
            return initialState;
        default:
            return state;
    }
}

function signUp(state = initialState, action) {
    if (action.error) {
        console.log('login', action.error);
    }

    switch(action.type) {
        case SIGN_UP:
            return action;
        case RESET_DATA:
            return initialState;
        default:
            return state;
    }
}

export default combineReducers ({
    login,
    signUp
});
