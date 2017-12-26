import { FETCH_MONTH_ITEMS, TOGGLE_MONTH_EXPEND, CHANGE_YEAR } from './actionTypes';
import { getItems } from '../api/API';
import Item from '../models/Item';
import DayItem from '../models/DayItem';
import MonthItem from '../models/MonthItem';
import ItemManager from '../managers/ItemManager';

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
            const items = ItemManager.getInstance().convertToItems(json);
            console.log('items', items);
            dispatch(receiveItems(ItemManager.getInstance().convertToMonthItems(items)));
        } catch (e) {
            dispatch(receiveItems([], e));
        }
    }
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
