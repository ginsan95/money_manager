import { ADD_ITEM, DELETE_ITEM, FETCH_ITEMS } from './actionTypes';
import { getItems, postItem } from '../api/API';

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

export function addItemAction(isProcessing, item = null, error = null) {
    return {
        type: ADD_ITEM,
        isProcessing,
        item,
        error
    }
}

export function addItem(item) {
    return async dispatch => {
        dispatch(addItemAction(true));
        try {
            const json = await postItem(item);
            if (json.objectId) {
                dispatch(addItemAction(false, {
                    ...item,
                    id: json.objectId
                }));
            } else {
                dispatch(addItemAction(false, null, "Failed to add item"));
            }
        } catch (e) {
            dispatch(addItemAction(false, null, e));
        }
    }
}

