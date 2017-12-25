import { FETCH_FILTER_ITEMS, CHANGE_DATE, ADD_ITEM, DELETE_ITEM } from '../actions/actionTypes';
import { combineReducers } from 'redux'

const apiState = {
    isFetching: false
}

function dayItems(state = [], action) {
    switch (action.type) {
        case FETCH_FILTER_ITEMS:
            return !action.isFetching ? action.dayItems : state;
        case `filter/${ADD_ITEM}`:
            return addItem(state, action);
        case `filter/${DELETE_ITEM}`:
            return deleteItem(state, action);
        default:
            return state;
    }
}

// for filter/ADD_ITEM
function addItem(dayItems, action) {
    const { item } = action;
    if (item && dayItems) {
        let myDayItems = [...dayItems];
        let dayItem = findDayItem(myDayItems, item.date);
        if (dayItem) {
            dayItem.addItem(item);
        }
        return myDayItems;
    }
    return dayItems;
}

// for filter/DELETE_ITEM
function deleteItem(dayItems, action) {
    const {ids, date} = action;
    if (ids.length > 0) {
        let myDayItems = [...dayItems];
        let dayItem = findDayItem(myDayItems, date);
        if (dayItem) {
            dayItem.deleteItems(ids);
            if (dayItem.items.length <= 0) {
                const index = myDayItems.indexOf(dayItem);
                if (index >= 0) {
                    myDayItems.splice(index, 1);
                }
            }
        }
        return myDayItems;
    }
    return dayItems;
}

function findDayItem(dayItems, date) {
    for (let i=0; i<dayItems.length; i++) {
        if (dayItems[i].date.sameDateAs(date)) {
            return dayItems[i];
        }
    }
    return null;
}

const date = (namespace) => (state = new Date(), action) => {
    switch (action.type) {
        case typeFrom(namespace, CHANGE_DATE):
            return action.date;
        default:
            return state;
    }
}

function api(state = apiState, action) {
    if (action.error) {
        console.log(action.error);
    }

    switch (action.type) {
        case FETCH_FILTER_ITEMS:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}

const dateReducer = combineReducers({
    start: date('start'),
    end: date('end')
});

export default month = combineReducers ({
    dayItems,
    api,
    dates: dateReducer
});

function typeFrom(namespace, type) {
    return `${namespace}/${type}`;
}