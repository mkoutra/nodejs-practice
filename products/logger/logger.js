// We obtain only some methods from the winston library
const { format, createLogger, transports} = require('winston');
require('winston-daily-rotate-file');
require('winston-mongodb')

const { combine, timestamp, label, prettyPrint} = format;

const CATEGORY = "winston custom format";

// rotate per 14 days a file called rotate-{a date}.logs
const fileRotateTransport = new transports.DailyRotateFile({
    filename: "logs/rotate-%DATE%.log",    // Name of the file to rotate
    datePattern: "DD-MM-YYYY",
    maxFiles: "14d"
});

// ---------------------------------------------------
// Documentation: https://github.com/winstonjs/winston
// ---------------------------------------------------

// Modify the way my logs will be saved.
const logger = createLogger({
    format: combine(
        label({label: CATEGORY}),
        timestamp({
            format: "DD-MM-YYYY-HH:mm:ss"
        }),
        prettyPrint()   // or format.json() but not pretty print, it will be like json
    ),
    transports: [
        fileRotateTransport,                    // 1st
        new transports.File({
            level: "info",  // info and above
            filename: "logs/example.log"        // 2nd 
        }),
        new transports.Console(),               // 3rd
        new transports.MongoDB({                // 4th Save to db to collection "logs". Save with timestamp
            level: "error",
            db: process.env.MONGODB_URI,
            collection: "logs",
            format: format.combine(
                format.timestamp(),
                format.json()
            )
        })
    ]
})

module.exports = logger;    // In order for other files to have access to logger.