import { FETCH_MONTH_ITEMS } from 'actions/actionTypes';
import { combineReducers } from 'redux'

const apiState = {
    isFetching: false
}

function monthItems(state = [], action) {
    switch (action.type) {
        case FETCH_MONTH_ITEMS:
            return !action.isFetching ? action.monthItems : state;
        default:
            return state;
    }
}

function api(state = apiState, action) {
    if (action.error) {
        console.log(action.error);
    }

    switch (action.type) {
        case FETCH_MONTH_ITEMS:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}

export default month = combineReducers ({
    monthItems,
    api
});
