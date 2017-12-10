import { FETCH_MONTH_ITEMS } from './actionTypes';
import { getItems } from '../api/API';
import Item from '../models/Item';
import DayItem from '../models/DayItem';
import MonthItem from '../models/MonthItem';

// region Fetch Items
export function requestItems() {
    return {
        type: FETCH_MONTH_ITEMS,
        isFetching: true
    }
}

export function receiveItems(monthItems, error = null) {
    return {
        type: FETCH_MONTH_ITEMS,
        isFetching: false,
        monthItems,
        error
    }
}

export function fetchItems(date) {
    return async dispatch => {
        dispatch(requestItems());
        try {
            const json = await getItems(date);
            dispatch(receiveItems(convertToMonthItems(json)));
        } catch (e) {
            dispatch(receiveItems([], e));
        }
    }
}

function convertToMonthItems(json) {
    let map = new Map();
    for(let i=0; i<json.length; i++) {
        let item = Item.fromJson(json[i]);
        let month = item.date.toMonthString();
        if (!map.has(month)) {
            map.set(month, []);
        }
        map.get(month).push(item);
    }

    const array = Array.from(map, ([key, val]) => {
        return new MonthItem(convertDayItems(val), key);
    });

    console.log(array);
    return array;
}

function convertDayItems(items) {
    let dayItems = [];
    if (items.length > 0) {
        let array = [items[0]];
        for(let i=1; i<items.length; i++) {
            let item = items[i];
            if (array[0].date.sameDayAs(item.date)) {
                array.push(item);
            } else {
                dayItems.push(new DayItem(array));
                array = [item];
            }
        }
        dayItems.push(new DayItem(array));
    }
    return dayItems;
}
