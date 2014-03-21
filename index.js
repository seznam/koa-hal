var hal = require('halson');

module.exports = function(spacer){
    return function*(next){
        yield next;
        if (this.body && (this.body.className === hal.Resource.prototype.className)) {
            this.set("Content-Type", "application/hal+json");
            this.body = JSON.stringify(this.body, null, spacer);
        }
    };
};
