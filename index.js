var hal = require('halson');

module.exports = function(spacer, charset) {
    return function*(next) {
        yield next;
        if (this.body && (this.body.className === hal.Resource.prototype.className)) {
            if (charset) {
                this.set("Content-Type", "application/hal+json; charset=".concat(charset));
            } else {
                this.set("Content-Type", "application/hal+json");
            }
            this.body = JSON.stringify(this.body, null, spacer);
        }
    };
};
