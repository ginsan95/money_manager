export default class MonthItemMonthItem {
    constructor(dayItems, month) {
        this.dayItems = dayItems;
        this.data = dayItems;

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
}