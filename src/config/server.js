const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressip = require('express-ip');
var cors = require('cors')
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(cors({origin:"*"}))
app.use(expressip().getIpInfoMiddleware)
app.use(bodyParser.urlencoded({extended: false}));

module.exports = app;
