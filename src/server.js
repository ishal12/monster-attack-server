require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const { response } = require('./helpers');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    if (process.env.NODE_ENV !== 'test') {
        console.log('MonggoDB running', process.env.MONGODB_URL);
    }
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});
mongoose.connection.off('error', (err) => {
    console.error('MonggoDB error:', err.message);
});

// Route Prefixes
app.use('/', indexRouter);
app.use('/api/', apiRouter);

// Throw 404 if URL not found
app.all('*', function (req, res) {
    return response.notFoundResponse(res, 'Not Found');
});

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return response.unauthorizedResponse(res, err.message);
    }
});

app.listen(process.env.API_PORT, () => {
    console.log('API running http://localhost:' + process.env.API_PORT);
});

module.exports = app;
