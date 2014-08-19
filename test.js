var request = require('supertest');
var koahal = require('./index');
var assert = require('assert');
var koa = require('koa');
var hal = require('halson');

describe('koa-hal', function() {
    it('should convert HAL+JSON Resource to JSON', function(done) {
        var app = koa();
        app.use(koahal());
        app.use(function*() {
            this.body = hal({title: 'Lorem Ipsum'}).addLink('self', '/lorem');
        });

        request(app.listen())
            .get('/')
            .expect('Content-Type', 'application/hal+json')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.deepEqual(res.body, {});
                assert.equal(res.text, '{"title":"Lorem Ipsum","_links":{"self":{"href":"/lorem"}}}');
                done();
            });
    });

    it('should convert HAL+JSON Resource to JSON and set proper charset', function(done) {
        var app = koa();
        app.use(koahal(undefined, 'utf-8'));
        app.use(function*() {
            this.body = hal({title: 'Lorem Ipsum'}).addLink('self', '/lorem');
        });

        request(app.listen())
            .get('/')
            .expect('Content-Type', 'application/hal+json; charset=utf-8')
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.deepEqual(res.body, {});
                assert.equal(res.text, '{"title":"Lorem Ipsum","_links":{"self":{"href":"/lorem"}}}');
                done();
            });
    });

    it('should ignore non-HAL body', function() {
        var app = koa();
        app.use(koahal());
        app.use(function*() {
            this.body = {title: 'Lorem Ipsum'};
        });

        request(app.listen())
            .get('/')
            .expect('Content-Type', 'application/json')
            .expect(200)
            .expect('{"title":"Lorem Ipsum"}');
    });
});
