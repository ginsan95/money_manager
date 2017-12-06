export default class Item {
    constructor(name, price, date, id = "", isSelected = false) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.date = date;
        this.isSelected = isSelected;
    }

    static fromJson(json) {
        return new Item(json.name, json.price, new Date(json.buy_date), json.objectId);
    }

    toJson() {
        const body = {
            'name': this.name,
            'price': this.price,
            'buy_date': this.date.getTime()
        }
        return JSON.stringify(body);
    }

    update(id) {
        return new Item(this.name, this.price, this.date, id, this.isSelected);
    }
}