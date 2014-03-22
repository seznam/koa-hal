# koa-hal
[![Build Status](https://travis-ci.org/seznam/koa-hal.svg?branch=master)](https://travis-ci.org/seznam/koa-hal)

hal+json middleware for Koa

## Installation
```sh
$ npm install koa-hal
```

## Example

```js
var hal = require('halson');
var koahal = require('koa-hal');
var app = require('koa')();

app.use(koahal());

app.use(function*(){
    var nested = hal({title: 'Nested Resrouce'})
        .addLink('self', '/lorem/nested');

    var resource = hal({title: 'Lorem Ipsum'})
        .addLink('self', '/lorem')
        .addEmbed('nested', nested);

    resource.description = 'Lorem ipsum dolor sit amet';
    resource.aNumber = 1000;
    resource.aBoolean = true;

    this.body = resource;
});

app.listen(3000);
```

```sh
$ curl -v http://localhost:3000
< HTTP/1.1 200 OK
< X-Powered-By: koa
< Content-Type: application/hal+json
< Content-Length: 227
< Date: Mon, 17 Mar 2014 13:21:09 GMT
< Connection: keep-alive
<
{
    "_links": {
        "self": {
            "href": "/lorem"
        }
    },
    "title": "Lorem Ipsum",
    "description": "Lorem ipsum dolor sit amet",
    "aBoolean": true,
    "aNumber": 1000,
    "_embedded": {
        "nested": {
            "_links": {
                "self": {
                    "href": "/lorem/nested"
                }
            },
            "title": "Nested Resrouce"
        }
    }
}
```

## License
MIT
