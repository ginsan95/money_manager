import { ADD_ITEM, DELETE_ITEM, FETCH_ITEMS } from 'actions/actionTypes';
import { combineReducers } from 'redux'

const apiState = {
    isFetching: false,
    isProcessing: false
}

function item(action) {
    const {item, error, isProcessing} = action;
    if (item) {
        return {
            id: item.id,
            name: item.name,
            price: item.price,
            date: item.date
        } 
    } else if (error) {
        console.log(error);
    }
    return null;
}

function items(state = [], action) {
    switch (action.type) {
        case ADD_ITEM:
            const myItem = item(action);
            return myItem ? [...state, myItem] : state;
        case DELETE_ITEM:
            return state.filter(item => {
                return item.id !== action.id
            });
        case FETCH_ITEMS:
            return !action.isFetching ? action.items : state;
        default:
            return state;
    }
}

function api(state = apiState, action) {
    switch (action.type) {
        case FETCH_ITEMS:
            return {
                ...apiState,
                isFetching: action.isFetching
            }
        case ADD_ITEM:
            return {
                ...apiState,
                isProcessing: action.isProcessing
            }
        default:
            return state;
    }
}

const today = combineReducers ({
    items,
    api
});
export default today;