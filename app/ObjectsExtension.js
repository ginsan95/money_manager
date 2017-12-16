Date.prototype.toMyTimeString = function() {
    return this.toLocaleString('en-MY', {hour: 'numeric', minute:'numeric', hour12: true});
}
Date.prototype.toMyDateString = function() {
    return this.toLocaleString('en-MY', {weekday: 'long', day:'numeric', month:'numeric', year:'numeric'});
}
Date.prototype.toMonthString = function() {
    return this.toLocaleString('en-MY', {month: 'long'});
}
Date.prototype.sameDateAs = function(date) {
    return this.getDate() === date.getDate()
        && this.getMonth() === date.getMonth()
        && this.getFullYear() === date.getFullYear();
}
Date.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];