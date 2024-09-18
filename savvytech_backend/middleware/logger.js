// middleware/logger.js
const winston = require('winston');

// Configure the Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/combined.log' })
    ]
});

// Middleware to log requests
const requestLogger = (req, res, next) => {
    logger.info(`HTTP ${req.method} ${req.url}`);
    next();
};

module.exports = requestLogger;
