export default class MonthItem {
    constructor(dayItems, month, isExpended = true) {
        this.dayItems = dayItems;
        this.data = dayItems;
        this.isExpended = isExpended;

        if (!month) {
            if (dayItems.length > 0) {
                this.month = dayItems.date.toMonthString();
            } else {
                this.month = new Date().toMonthString();
            }
        } else {
            this.month = month;
        }

        let totalPrice = 0;
        for (let i=0; i<dayItems.length; i++) {
            totalPrice += dayItems[i].totalPrice;
        }
        this.totalPrice = totalPrice;
    }

    toggleExpend() {
        return new MonthItem(this.dayItems, this.month, !this.isExpended);
    }

    getMonthIndex() {
        let date = new Date('01 ' + this.month + ' 2000');
        return date.getMonth();
    }

    addItem(item) {
        let dayItem = this.findSameDayItem(item.date);
        if (dayItem) {
            dayItem.addItem(item);
        } else {
            this.dateItems.push(new DayItem([item]));
        }
        this.totalPrice += item.price;
    }

    findSameDayItem(date) {
        for (let i=0; i<this.dayItems.length; i++) {
            if (this.dayItems[i].date.getDate() == date.getDate()) {
                return this.dayItems[i];
            }
        }
        return null;
    }
}