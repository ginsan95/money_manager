import { ADD_ITEM, DELETE_ITEM } from './actionTypes';

let id = 1;

export const addItem = (name, price, date) => {
    return {
        type: ADD_ITEM,
        id: id++,
        name,
        price,
        date
    }
}

export const deleteItem = (id) => {
    return {
        type: DELETE_ITEM,
        id
    }
}
