import Item from '../models/Item';
import DayItem from '../models/DayItem';
import MonthItem from '../models/MonthItem';

export default class ItemManager {
    static instance = null;

    static getInstance() {
        if (!this.instance) {
            this.instance = new ItemManager();
        }
        return this.instance;
    }

    convertToItems(json) {
        let items = [];
        for(let i=0; i<json.length; i++) {
            items[i] = Item.fromJson(json[i]);
        }
        return items;
    }

    convertToDayItems(items) {
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

    convertToMonthItems(items) {
        let map = new Map();
        for (let i=0; i<Date.months.length; i++) {
            if (!map.has(Date.months[i])) {
                map.set(Date.months[i], []);
            }
        }
        for(let i=0; i<items.length; i++) {
            let item = items[i];
            let month = item.date.toMonthString();
            map.get(month).push(item);
        }
        const array = Array.from(map, ([key, val]) => {
            return new MonthItem(this.convertToDayItems(val), key);
        });
        return array;
    }
}