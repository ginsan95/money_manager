import { FETCH_MONTH_ITEMS, TOGGLE_MONTH_EXPEND, CHANGE_YEAR, ADD_ITEM, DELETE_ITEM } from '../actions/actionTypes';
import { combineReducers } from 'redux'
import MonthItem from '../models/MonthItem';
import DayItem from '../models/DayItem';

const defaultMonthItems = [
    new MonthItem([], 'January'),
    new MonthItem([], 'February'),
    new MonthItem([], 'March'),
    new MonthItem([], 'April'),
    new MonthItem([], 'May'),
    new MonthItem([], 'June'),
    new MonthItem([], 'July'),
    new MonthItem([], 'August'),
    new MonthItem([], 'September'),
    new MonthItem([], 'October'),
    new MonthItem([], 'Novermber'),
    new MonthItem([], 'December')    
]

const apiState = {
    isFetching: false
}

function monthItems(state = defaultMonthItems, action) {
    switch (action.type) {
        case FETCH_MONTH_ITEMS:
            return !action.isFetching ? action.monthItems : state;
        case TOGGLE_MONTH_EXPEND:
            let monthItems = [...state];
            monthItems[action.monthItem.getMonthIndex()] = action.monthItem;
            return monthItems;
        case `month/${ADD_ITEM}`:
            return addItem(state, action);
        case `month/${DELETE_ITEM}`:
            return deleteItem(state, action);
        default:
            return state;
    }
}

// for month/ADD_ITEM
function addItem(monthItems, action) {
    const { item } = action;
    if (item && monthItems && monthItems.length >= 12) {
        let myMonthItems = [...monthItems];
        let monthItem = myMonthItems[item.date.getMonth()];
        monthItem.addItem(item);
        return myMonthItems;
    }
    return monthItems;
}

// for month/DELETE_ITEM
function deleteItem(monthItems, action) {
    const {ids, date} = action;
    if (ids.length > 0) {
        let myMonthItems = [...monthItems];
        let monthItem = myMonthItems[date.getMonth()];
        monthItem.deleteItems(ids, date);
        return myMonthItems;
    }
    return monthItems;
}

function api(state = apiState, action) {
    if (action.error) {
        console.log(action.error);
    }

    switch (action.type) {
        case FETCH_MONTH_ITEMS:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}

function year(state = new Date().getFullYear().toString(), action) {
    switch(action.type) {
        case CHANGE_YEAR:
            return action.year;
        default:
            return state;
    }
}

export default month = combineReducers ({
    monthItems,
    year,
    api
});
