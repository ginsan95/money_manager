import { ADD_ITEM, DELETE_ITEM } from './actionTypes';

let id = 1;

export const addItem = (name, price) => {
    return {
        type: ADD_ITEM,
        id: id++,
        name,
        price
    }
}

export const deleteItem = (id) => {
    return {
        type: DELETE_ITEM,
        id
    }
}
