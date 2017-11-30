import { ADD_ITEM, DELETE_ITEM, FETCH_ITEMS } from './actionTypes';
import { getItems } from '../api/API';

let id = 1;

export function addItem(name, price, date) {
    return {
        type: ADD_ITEM,
        id: id++,
        name,
        price,
        date
    }
}

export function deleteItem(id) {
    return {
        type: DELETE_ITEM,
        id
    }
}

export function requestItems() {
    return {
        type: FETCH_ITEMS,
        isFetching: true
    }
}

export function receiveItems(items, error = null) {
    return {
        type: FETCH_ITEMS,
        isFetching: false,
        items,
        error
    }
}

export function fetchItems() {
    return async dispatch => {
        dispatch(requestItems());
        try {
            const json = await getItems();
            dispatch(receiveItems(convertItems(json)));
        } catch (e) {
            dispatch(receiveItems([], e));
        }
    }
}

function convertItems(json) {
    let items = [];
    for(let i=0; i<json.length; i++) {
        item = json[i];
        items[i] = {
            id: item.objectId,
            name: item.name,
            price: item.price,
            date: new Date(item.buy_date)
        }
    }
    return items;
}
