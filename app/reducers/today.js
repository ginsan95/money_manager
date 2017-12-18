import { ADD_ITEM, DELETE_ITEM, FETCH_ITEMS, LONG_SELECT_ITEM, DISMISS_EDITING, SET_ITEMS } from 'actions/actionTypes';
import { combineReducers } from 'redux'

const apiState = {
    isFetching: false,
    isProcessing: false,
    isEditing: false
}

const items = (namespace) => (state = [], action) => {
    switch (action.type) {
        case typeFrom(namespace, ADD_ITEM):
            const myItem = action.item;
            return myItem ? [...state, myItem] : state;
        case typeFrom(namespace, DELETE_ITEM):
            return state.filter(item => {
                return !action.ids.includes(item.id);
            });
        case typeFrom(namespace, FETCH_ITEMS):
            return !action.isFetching ? action.items : state;
        case typeFrom(namespace, LONG_SELECT_ITEM):
            return state.map(item => {
                if (item.id === action.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
        case typeFrom(namespace, DISMISS_EDITING):
            return state.map(item => {
                item.isSelected = false;
                return item;
            });
        case typeFrom(namespace, SET_ITEMS):
            return action.items;
        default:
            return state;
    }
}

const api = (namespace) => (state = apiState, action) => {
    if (action.error) {
        console.log(action.error);
    }

    switch (action.type) {
        case typeFrom(namespace, FETCH_ITEMS):
            return {
                ...state,
                isFetching: action.isFetching
            }
        case typeFrom(namespace, ADD_ITEM):
            return {
                ...state,
                isProcessing: action.isProcessing
            }
        case typeFrom(namespace, DELETE_ITEM):
            return {
                ...state,
                isProcessing: action.isProcessing,
                isEditing: false
            }
        case typeFrom(namespace, LONG_SELECT_ITEM):
            return {
                ...state,
                isEditing: action.isEditing
            }
        case typeFrom(namespace, DISMISS_EDITING):
            return {
                ...state,
                isEditing: false
            }
        default:
            return state;
    }
}

const todayReducer = (namespace) => combineReducers ({
    items: items(namespace),
    api: api(namespace)
});
export default combineReducers ({
    today: todayReducer('today'),
    month: todayReducer('month')
});

function typeFrom(namespace, type) {
    return `${namespace}/${type}`;
}