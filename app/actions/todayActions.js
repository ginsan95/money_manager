import { ADD_ITEM, DELETE_ITEM, FETCH_ITEMS, LONG_SELECT_ITEM, DISMISS_EDITING } from './actionTypes';
import { getItems, postItem, deleteItem as apiDeleteItem } from '../api/API';
import Item from '../models/Item';

// region Fetch Items
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
            const today = new Date();
            const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
            const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
            const json = await getItems(startDate, endDate);
            dispatch(receiveItems(convertItems(json)));
        } catch (e) {
            dispatch(receiveItems([], e));
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
                dispatch(addItemAction(false, item.update(json.objectId)));
            } else {
                dispatch(addItemAction(false, null, json));
            }
        } catch (e) {
            dispatch(addItemAction(false, null, e));
        }
    }
}
// endregion

// region Delete Item
export function deleteItemsAction(isProcessing, ids = [], error = null) {
    return {
        type: DELETE_ITEM,
        ids,
        isProcessing,
        error
    }
}

export function deleteItems(ids) {
    return async dispatch => {
        dispatch(deleteItemsAction(true));
        try {
            const fetches = ids.map(id => {
                return apiDeleteItem(id);
            });
            const json = await Promise.all(fetches);
            dispatch(deleteItemsAction(false, ids));
        } catch (e) {
            dispatch(deleteItemsAction(false, [], e));
        }
    }
}
// endregion

export function longSelectItem(id) {
    return {
        type: LONG_SELECT_ITEM,
        id,
        isEditing: true
    }
}

export function dismissEditing() {
    return {
        type: DISMISS_EDITING
    }
}
