const { createLogger, transports, format } = require('winston');
require('winston-mongodb');

const customFormat = format.combine(format.timestamp(), format.json())

const logger = createLogger({
    transports: [
        new transports.MongoDB({
            level: 'info',
            db: process.env.MONGODB_URL,
            options: {
                useUnifiedTopology: true
            },
            format: customFormat,
            collection: 'logging'
        })
    ]
});

module.exports = logger;