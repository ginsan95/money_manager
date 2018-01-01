import { LOGIN, SIGN_UP, RESET_DATA } from './actionTypes';
import { login as apiLogin, signUp as apiSignUp } from '../api/API'; 
import UserManager from '../managers/UserManager';

export function loginAction(isProcessing, success = false, error = null) {
    return {
        type: LOGIN,
        isProcessing,
        success,
        error
    }
}

export function login(username, password) {
    return async dispatch => {
        dispatch(loginAction(true));
        try {
            const json = await apiLogin(username, password);
            if (json.objectId && json['user-token']) {
                UserManager.getInstance().objectId = json.objectId;
                UserManager.getInstance().userToken = json['user-token'];
                dispatch(loginAction(false, true));
            } else {
                dispatch(loginAction(false, false, json));
            }
        } catch (e) {
            dispatch(loginAction(false, false, e));
        }
    }
}

export function signUpAction(isProcessing, success = false, error = null) {
    return {
        type: SIGN_UP,
        isProcessing,
        success,
        error
    }
}

export function signUp(username, password) {
    return async dispatch => {
        dispatch(signUpAction(true));
        try {
            const json = await apiSignUp(username, password);
            if (json.objectId) {
                dispatch(signUpAction(false, true));
            } else {
                dispatch(signUpAction(false, false, json));
            }
        } catch (e) {
            dispatch(signUpAction(false, false, e));
        }
    }
}

export function resetData() {
    return {
        type: RESET_DATA
    }
}
