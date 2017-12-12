import { FETCH_MONTH_ITEMS, TOGGLE_MONTH_EXPEND, CHANGE_YEAR } from 'actions/actionTypes';
import { combineReducers } from 'redux'
import MonthItem from '../models/MonthItem';

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
        default:
            return state;
    }
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
