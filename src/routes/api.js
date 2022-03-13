const express = require('express');

const app = express();

const authRouter = require('./auth');
const questRouter = require('./quest');

app.use('/auth/', authRouter);
app.use('/quest/', questRouter);

module.exports = app;
