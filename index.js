"use strict";

// if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
// }
const Koa = require("koa");
const variables = require("./variables");
const logger = require("./logger");
const responseHandler = require('./utilities/pc-helpers/responseHandler');
const requestId = require('./utilities/pc-helpers/requestId');
const logMiddleware = require('./utilities/pc-helpers/logger');
const router = require("./routes");
const koaBody = require("koa-body");
const render = require('koa-ejs');
const path = require('path');

const app = new Koa();
app.use(koaBody());
app.use(requestId());
app.use(logMiddleware({ logger }));

//rendering the html
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
});



//Added http healpers in middleware
app.use(responseHandler())
    .use(requestId());

app.use(responseHandler());

// Bootstrap application router
app.use(router.routes());
app.use(router.allowedMethods());

// Start server
if (!module.parent) {
    app.listen(variables.port, () => {
      console.log(
        `API server listening on ${variables.host}:${variables.port}, in ${variables.env}`
      );
    });
 }
  
 // Expose app
module.exports = app;
