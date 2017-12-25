import { FETCH_FILTER_ITEMS, CHANGE_DATE } from './actionTypes';
import { getItems } from '../api/API';
import Item from '../models/Item';
import DayItem from '../models/DayItem';

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
            dispatch(receiveItems(convertDayItems(json)));
        } catch (error) {
            dispatch(receiveItems([], error));
        }
    }
}

function convertDayItems(json) {
    let dayItems = [];
    if (json.length > 0) {
        let array = [Item.fromJson(json[0])];
        for(let i=1; i<json.length; i++) {
            let item = Item.fromJson(json[i]);
            if (array[0].date.sameDateAs(item.date)) {
                array.push(item);
            } else {
                dayItems.push(new DayItem(array));
                array = [item];
            }
        }
        dayItems.push(new DayItem(array));
    }
    console.log('filterItems', dayItems);
    return dayItems;
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
