// first, to make a server, I need to require express.
const express = require('express');
// then, I need to create an instance of express.
const app = express();
// This returns an object that represents the express application.

// Middleware
// handle Async errors:
require('express-async-errors')//This is all we need to do to handle async errors in express.
// As long as we have this line of code, we can throw errors in async functions 
// and they will be caught by our error handling middleware.


// example of BASIC middleware:
app.use((req,res,next)=>{
    console.log('Middleware')
    next()
})

// KENNY MW:
// require your middleware,
// use your middleware

const kennyMW = require('./middleware/mwKenny')
app.use(kennyMW)


const abdisaMW = require('./middleware/mwAbdisa')
app.use(abdisaMW)

// CHASE MW:
const chaseMW = require('./middleware/mwChase')
app.use(chaseMW)

const Ahmed = require('./middleware/mwAhmed')
app.use(Ahmed)

// Routes
app.get('/', (req, res) => {
    // set type to HTML:
    res.setHeader('Content-Type', 'text/html');
    res.send(`
        <h1>Hello Everyone!</h1>
        <p>Welcome to our website!</p>
        <p>Please use the following routes:</p>
        <p>localhost:3000/</p>
        <ul>
            <li>/chase</li>
            <li>/ahmed</li>
            <li>/abdisa</li>
            <li>/kenneth</li>
        </ul>
        `);
})

// Now we need to import/add our own routes:

// CHASE:
const chaseRouter = require('./routes/chase'); //This imports the chase router.
// this line below is telling express that any requests to the /chase route
// Should be handled by the chaseRouter router/middleware.
app.use('/chase', chaseRouter)

// AHMED:
const AhmedRouter = require('./routes/ahmed')
app.use('/ahmed', AhmedRouter)

// ABDISA:
const abdisaRouter = require('./routes/abdisa')
app.use('/abdisa', abdisaRouter)

// KENNY:
const kennyRouter = require('./routes/kenny')
app.use('/kenny', kennyRouter)

// Error Handling
// If I have no routes, and I sent a get request, I get a 404 error that says "Cannot GET /"
// This error is coming from express, and it's a default error message.
// Express DOES have it's own error handling, but it's not very good.

// Start Server
app.listen(3000, () => {
    console.log('Server running')
});
// I need to tell the server to listen for requests on a specific port.
// The app.listen method will take 2 arguments, the port and a callback function.
// we can use more than 2 arguments, but the first 2 are the most important.

