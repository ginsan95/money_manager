import { ADD_ITEM, DELETE_ITEM, FETCH_ITEMS, LONG_SELECT_ITEM, DISMISS_EDITING } from 'actions/actionTypes';
import { combineReducers } from 'redux'

const apiState = {
    isFetching: false,
    isProcessing: false,
    isEditing: false
}

function items(state = [], action) {
    switch (action.type) {
        case ADD_ITEM:
            const myItem = action.item;
            return myItem ? [...state, myItem] : state;
        case DELETE_ITEM:
            return state.filter(item => {
                return !action.ids.includes(item.id);
            });
        case FETCH_ITEMS:
            return !action.isFetching ? action.items : state;
        case LONG_SELECT_ITEM:
            return state.map(item => {
                if (item.id === action.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
        case DISMISS_EDITING:
            return state.map(item => {
                item.isSelected = false;
                return item;
            });
        default:
            return state;
    }
}

function api(state = apiState, action) {
    if (action.error) {
        console.log(action.error);
    }

    switch (action.type) {
        case FETCH_ITEMS:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case ADD_ITEM:
            return {
                ...state,
                isProcessing: action.isProcessing
            }
        case DELETE_ITEM:
            return {
                ...state,
                isProcessing: action.isProcessing,
                isEditing: false
            }
        case LONG_SELECT_ITEM:
            return {
                ...state,
                isEditing: action.isEditing
            }
        case DISMISS_EDITING:
            return {
                ...state,
                isEditing: false
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
