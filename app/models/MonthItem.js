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
            totalPrice += dayItems[0].totalPrice;
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
}