const express = require('express');

const app = express();

const authRouter = require('./auth');
const questRouter = require('./quest');
const userRouter = require('./user');

app.use('/auth/', authRouter);
app.use('/quest/', questRouter);
app.use('/user/', userRouter);

module.exports = app;
