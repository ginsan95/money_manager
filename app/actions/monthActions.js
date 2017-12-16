import { FETCH_MONTH_ITEMS, TOGGLE_MONTH_EXPEND, CHANGE_YEAR } from './actionTypes';
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

export function fetchItems(year) {
    return async dispatch => {
        dispatch(requestItems());
        try {
            const startDate = new Date(year, 1, 1, 0, 0, 0, 0);
            const endDate = new Date(year, 12, 31, 23, 59, 59, 999);
            const json = await getItems(startDate, endDate);
            dispatch(receiveItems(convertToMonthItems(json)));
        } catch (e) {
            dispatch(receiveItems([], e));
        }
    }
}

function convertToMonthItems(json) {
    let map = new Map();
    for (let i=0; i<Date.months.length; i++) {
        if (!map.has(Date.months[i])) {
            map.set(Date.months[i], []);
        }
    }

    for(let i=0; i<json.length; i++) {
        let item = Item.fromJson(json[i]);
        let month = item.date.toMonthString();
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
            if (array[0].date.sameDateAs(item.date)) {
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
// endregion

export function toggleExpend(monthItem) {
    return {
        type: TOGGLE_MONTH_EXPEND,
        monthItem: monthItem.toggleExpend()
    }
}

export function changeYear(year) {
    return {
        type: CHANGE_YEAR,
        year
    }
}
