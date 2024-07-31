const middleware = (req, res, next) => {
    console.log('USERS ROUTE MIDDLEWARE RUNNING...');
    // look for an auth property in the body with a value of true.
    if (req.body.auth === true) {
        console.log('AUTHENTICATED');
        next();
    } else {
        console.log('UNAUTHENTICATED');
        // This will end the request-response cycle.
        // I'll leave this commented out, as this was just an exmaple
        // res.send('UNAUTHENTICATED');
    }
    next();
}

module.exports = middleware;