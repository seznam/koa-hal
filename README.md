# koa-hal
hal+json middleware for Koa

## Install
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
    var nested = new hal.Resource({title: 'Nested Resrouce'}, '/lorem/nested');
    var resource = new hal.Resource({title: 'Lorem Ipsum'}, '/lorem')
        .set('description', 'Lorem ipsum dolor sit amet')
        .set('aNumber', 1000)
        .set('aBoolean', true)
        .embed('nested', nested);
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
