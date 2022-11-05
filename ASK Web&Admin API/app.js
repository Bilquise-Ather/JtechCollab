'use strict';
/**
 * Read the configuration file in the process config object. Config can now be used directly from process.config
 */
let constant = "./config/config.local.js";
process.config.global_config = require(constant);

let express         = require('express'),
    app             = express(),
    cors            = require("cors"),
    responseHandler = require('./modules/middleware/responseHandler'),
    bodyParser      = require('body-parser'),
    swaggerJSDoc    = require("swagger-jsdoc"),
    swaggerUi = require("swagger-ui-express");

console.log('Initializing Server.');
console.log("Environment: " +process.env.NODE_ENV);
console.log("Loading Environment Constant: " +constant);
/**
 * Use morgan to log request using winston logger's `info` stream.
 */
 
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
app.use('/uploads', express.static(__dirname + '/uploads'));
/**
 * configure app to use bodyParser()
 */
app.use(bodyParser.urlencoded({
	limit: '50mb',
    extended: true,
}));
app.use(bodyParser.json({limit: '50mb'}));

const docOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'All South Flooring',
            version: '1',
        },
        servers: [{
          url: process.config.global_config.base_url,
          description: 'Development server',
        }],
        components: {
          securitySchemes: {
            ApiKeyAuth: {
              type: "apiKey",
              in: "header",     
              name: "x-auth-token"
            }
          }
        },
        security: [{
          ApiKeyAuth: []
        }]
    },
    apis: ['./modules/controllers/*.js'],
};
const swaggerSpec = swaggerJSDoc(docOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Remove the default express header
 */
app.disable('x-powered-by');

/**
 * Maintain the order of middlewares beneath this line.
 *
 * - Setup success listener
 * - Setup routing - Has handling for 404 as well as Authentication for other routes.
 * - Setup error listener
 */
console.log('Setting up success listener.');
app.use(responseHandler.onSuccess);

console.log('Setting up routes.');
require('./routes')(app);

console.log('Plugging the error leaks.');
app.use(responseHandler.onError);

module.exports = app;

/**
 * START THE SERVER
 */
console.log('Ready for requests.');
let port = Number(process.env.PORT || process.config.global_config.server.port);
let server = app.listen(port, function() {
    console.log('server listening on port ' + server.address().port);
});

server.timeout = process.config.global_config.server.networkCallTimeout;