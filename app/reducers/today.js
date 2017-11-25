import { ADD_ITEM, DELETE_ITEM } from 'actions/actionTypes';
import { combineReducers } from 'redux'

const items = (state = [], action) => {
    switch (action.type) {
        case ADD_ITEM:
            return [
                ...state,
                {
                    name: action.name,
                    price: action.price,
                    id: action.id
                }
            ];
        case DELETE_ITEM:
            return state.filter(item => {
                return item.id !== action.id
            });
        default:
            return state;
    }
}

const today = combineReducers ({
    items
});
export default today;