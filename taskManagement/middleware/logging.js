const logger = (req, res, next) => {
    console.log(
        `[${new Date().toLocaleString()}] --- `.yellow,
        `${req.method}`.blue,
        `${req.url}`.green
    );
    next();
};

module.exports = logger;
