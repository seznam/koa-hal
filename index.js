var hal = require('halson');

module.exports = function(spacer){
    return function*(next){
        yield next;
        if (this.body instanceof hal.Resource) {
            this.set("Content-Type", "application/hal+json");
            this.body = this.body.toJSON(spacer);
        }
    };
};
