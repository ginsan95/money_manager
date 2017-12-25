import { FETCH_FILTER_ITEMS, CHANGE_DATE } from '../actions/actionTypes';
import { combineReducers } from 'redux'

const apiState = {
    isFetching: false
}

function dayItems(state = [], action) {
    switch (action.type) {
        case FETCH_FILTER_ITEMS:
            return !action.isFetching ? action.dayItems : state;
        default:
            return state;
    }
}

const date = (namespace) => (state = new Date(), action) => {
    switch (action.type) {
        case typeFrom(namespace, CHANGE_DATE):
            return action.date;
        default:
            return state;
    }
}

function api(state = apiState, action) {
    if (action.error) {
        console.log(action.error);
    }

    switch (action.type) {
        case FETCH_FILTER_ITEMS:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}

const dateReducer = combineReducers({
    start: date('start'),
    end: date('end')
});

export default month = combineReducers ({
    dayItems,
    api,
    dates: dateReducer
});

function typeFrom(namespace, type) {
    return `${namespace}/${type}`;
}