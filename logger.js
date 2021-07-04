const { getFormattedDateTime } = require('./utils');

const logger = (req, res, next) => {
    const currentDate = new Date();
    const formattedDate = getFormattedDateTime(currentDate);
    const url = req.url.substring(1);
    const index = url.indexOf('/');
    const service = url.slice(0, index);
    const log = `[${formattedDate}] [${service}-service]: ${JSON.stringify(req.body)}`;
    console.log(log);
    next();
};

const errorLogger = (err, req) => {
    const url = req.url.substring(1);
    const index = url.indexOf('/');
    const service = url.slice(0, index);
    const log = `[${service}-service]: ${JSON.stringify(req.body)} [ERRORS]: ${err}`;
    console.log(log);
};

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    errorLogger(err, req);
    res.status(500);
    res.render('error', { error: err });
    process
        .on('unhandledRejection', (reason, p) => {
            console.error(reason, p);
        })
        .on('uncaughtException', error => {
            console.error(error);
            process.exit(1);
        });
};

module.exports = {
    logger,
    errorLogger,
    errorHandler
};
