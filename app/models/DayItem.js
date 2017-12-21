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

    addItem(item) {
        this.items.push(item);
        this.totalPrice += item.price;
    }

    deleteItems(ids) {
        this.items = this.items.filter(item => {
            for (let i=0; i<ids.length; i++) {
                if (item.id === ids[i]) {
                    ids.splice(i, 1);
                    this.totalPrice -= item.price;
                    return false;
                }
            }
            return true;
        });
    }
}