export default class DayItem {
    constructor(items) {
        this.items = items;

        if (items.length > 0) {
            this.date = items[0].date;
        } else {
            this.date = new Date();
        }

        let totalPrice = 0;
        for (let i=0; i<items.length; i++) {
            totalPrice += items[i].price;
        }
        this.totalPrice = totalPrice;
    }
}