Date.prototype.toMyTimeString = function() {
    return this.toLocaleString('en-US', {hour: 'numeric',minute:'numeric', hour12: true});
}