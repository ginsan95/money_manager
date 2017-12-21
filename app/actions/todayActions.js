import { ADD_ITEM, DELETE_ITEM, FETCH_ITEMS, LONG_SELECT_ITEM, DISMISS_EDITING, SET_ITEMS } from './actionTypes';
import { getItems, postItem, deleteItem as apiDeleteItem } from '../api/API';
import Item from '../models/Item';

// region Fetch Items
export function requestItems(namespace) {
    return {
        type: typeFrom(namespace, FETCH_ITEMS),
        isFetching: true
    }
}

export function receiveItems(namespace, items, error = null) {
    return {
        type: typeFrom(namespace, FETCH_ITEMS),
        isFetching: false,
        items,
        error
    }
}

export function fetchItems(namespace, date) {
    return async dispatch => {
        dispatch(requestItems(namespace));
        try {
            const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
            const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
            const json = await getItems(startDate, endDate);
            dispatch(receiveItems(namespace, convertItems(json)));
        } catch (e) {
            dispatch(receiveItems(namespace, [], e));
        }
    }
}

function convertItems(json) {
    let items = [];
    for(let i=0; i<json.length; i++) {
        items[i] = Item.fromJson(json[i]);
    }
    return items;
}
// endregion

// region Add Item
export function addItemAction(namespace, isProcessing, item = null, error = null) {
    return {
        type: typeFrom(namespace, ADD_ITEM),
        isProcessing,
        item,
        error
    }
}

export function addItem(namespace, item) {
    return async dispatch => {
        dispatch(addItemAction(namespace, true));
        try {
            const json = await postItem(item);
            if (json.objectId) {
                dispatch(addItemAction(namespace, false, item.update(json.objectId)));
            } else {
                dispatch(addItemAction(namespace, false, null, json));
            }
        } catch (e) {
            dispatch(addItemAction(namespace, false, null, e));
        }
    }
}
// endregion

// region Delete Item
export function deleteItemsAction(namespace, isProcessing, ids = [], date = null, error = null) {
    return {
        type: typeFrom(namespace, DELETE_ITEM),
        ids,
        isProcessing,
        date,
        error
    }
}

export function deleteItems(namespace, ids, date) {
    return async dispatch => {
        dispatch(deleteItemsAction(namespace, true));
        try {
            const fetches = ids.map(id => {
                return apiDeleteItem(id);
            });
            const json = await Promise.all(fetches);
            dispatch(deleteItemsAction(namespace, false, ids, date));
        } catch (e) {
            dispatch(deleteItemsAction(namespace, false, [], null, e));
        }
    }
}
// endregion

export function longSelectItem(namespace, id) {
    return {
        type: typeFrom(namespace, LONG_SELECT_ITEM),
        id,
        isEditing: true
    }
}

export function dismissEditing(namespace) {
    return {
        type: typeFrom(namespace, DISMISS_EDITING)
    }
}

export function setItems(namespace, items) {
    return {
        type: typeFrom(namespace, SET_ITEMS),
        items
    }
}

function typeFrom(namespace, type) {
    return `${namespace}/${type}`;
}
