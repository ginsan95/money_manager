Date.prototype.toMyTimeString = function() {
    var dateFormat = require('dateformat');
    return dateFormat(this, "h:mm TT")
}
Date.prototype.toMyDayDateString = function() {
    var dateFormat = require('dateformat');
    return dateFormat(this, "dddd, d/m/yyyy")
}
Date.prototype.toMyDateString = function() {
    var dateFormat = require('dateformat');
    return dateFormat(this, "d/m/yyyy")
}
Date.prototype.toMonthString = function() {
    return Date.months[this.getMonth()];
}
Date.prototype.sameDateAs = function(date) {
    return this.getDate() === date.getDate()
        && this.getMonth() === date.getMonth()
        && this.getFullYear() === date.getFullYear();
}
Date.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];