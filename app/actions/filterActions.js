import { FETCH_FILTER_ITEMS, CHANGE_DATE } from './actionTypes';
import { getItems } from '../api/API';
import Item from '../models/Item';
import DayItem from '../models/DayItem';
import ItemManager from '../managers/ItemManager';

// region Fetch Items
export function requestItems() {
    return {
        type: FETCH_FILTER_ITEMS,
        isFetching: true
    }
}

export function receiveItems(dayItems, error = null) {
    return {
        type: FETCH_FILTER_ITEMS,
        isFetching: false,
        dayItems,
        error
    }
}

export function fetchItems(startDate, endDate) {
    return async dispatch => {
        dispatch(requestItems());
        try {
            const json = await getItems(startDate, endDate);
            const items = ItemManager.getInstance().convertToItems(json);
            dispatch(receiveItems(ItemManager.getInstance().convertToDayItems(items)));
        } catch (error) {
            dispatch(receiveItems([], error));
        }
    }
}
// endregion

export function changeDate(namespace, date) {
    return {
        type: typeFrom(namespace, CHANGE_DATE),
        date
    }
}

function typeFrom(namespace, type) {
    return `${namespace}/${type}`;
}
