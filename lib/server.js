/**
 * Created by navneetgupta on 8/26/17.
 */

'use strict';

const Koa = require('koa'),
    config = require('../config/config'),
    utilities = require('./util/utiltiy'),
    path = require('path'),
    router = require('koa-router')();
const app = new Koa();


app.use(utilities.errorHandler);
app.use(utilities.responseTime);

config.files.server.routes.forEach(function (routePath) {
    console.log("routePAth === " +routePath);
    require(path.resolve(routePath))(router);
});

app.use(router.routes());

app.use(async function(ctx,next) {
    console.log(JSON.stringify(config));
    await next();
});

app.use(async function(ctx) {
    setTimeout(() => {},3000);
    ctx.body="Hi There";
});

module.exports.start = function() {
    app.listen(3010,() => {
        console.log("Server Started on Port 3010");
    });
};