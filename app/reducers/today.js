import { ADD_ITEM, DELETE_ITEM, FETCH_ITEMS } from 'actions/actionTypes';
import { combineReducers } from 'redux'

const items = (state = [], action) => {
    switch (action.type) {
        case ADD_ITEM:
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    price: action.price,
                    date: action.date
                }
            ];
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

const isFetching = (state = false, action) => {
    switch (action.type) {
        case FETCH_ITEMS:
            return action.isFetching;
        default:
            return state;
    }
}

const today = combineReducers ({
    items,
    isFetching
});
export default today;