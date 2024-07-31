const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res, next) => {
    // If we have a route that could result in an error, we should include the next parameter
    // This way, if an error occurs, we can pass it to the next middleware, resulting
    // in the error handling middleware being called with the error object.
    try{
        throw new Error('BROKEN')
        res.send('Hello World!')
    }catch(err){
        // console.log(err)
        // when we pass an argument to next() express will know that there was an error
        // And it will go straight to our error handling middleware
        res.errorStatus = 500
        res.errorMessage = 'There was an error in the / route'
        next(err)
    }
})

app.get('/a', (req, res, next) => {
    try{
        throw new Error('BUSTED')
        res.send('Hello World!')
    }catch(err){
        // console.log(err)
        // when we pass an argument to next() express will know that there was an error
        // And it will go straight to our error handling middleware
        next(err)
    }
})

// Error handling middleware
// The error handler needs to be last in the stack of middleware.
// Error handling middleware always has 4 parameters.
// The usual, and a 4th parameter, the error. (err , req, res, next)
// The error handling middleware is used to catch any errors that occur in the application.
// If an error occurs, the error handling middleware will be called.

// The way we pass an error to our error handling middleware is by calling next() with an argument.
// The argument passed to next() is the error object.
app.use(require('./errorHandler'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})