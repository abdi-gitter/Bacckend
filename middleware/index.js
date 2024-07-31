// Require express:
const express = require('express');
// create instance of express:
const app = express()

// use env variables for port:
require('dotenv').config();
const PORT = process.env.PORT || 8000;

// ------------------------ MIDDLEWARE:----------------------------
// middleware is just a function that runs between the request and the response
// middleware is exectured in the order it is written.
// middleware can be used to modify the request and response objects.
    // before the next middleware function is called.
// middleware can be used to end the request-response cycle and send a response.
// to call the next middleware in the stack, we need to call the next() function.
    // otherwise, the request will be left hanging and a response will never be sent.
// express knows the difference between a middleware function and a route handler.
    // middleware callback functions have 3 parameters: req, res, next.
    // route handler callback functions have 2 parameters: req, res.
    // error handlers have 4 parameters: err, req, res, next.
// to use a piece of middleware, we use the app.use() method.

// When dealing with requests from different sources, we end up dealing with something called CORS.
// CORS stands for Cross-Origin Resource Sharing.
// What this basically is is a security feature that prevents requests from one domain to another.
// This is a security feature that is built into the browser.
// If you are making a request from one domain to another, the browser will block the request.
// It does this by sending multiple requests to the server to check if the server allows the request.
// This request method is called a preflight request.
// This is basically just checking if the server allows the request.
// without setting up CORS, the browser will block the request.
// To prevent this from happening, we either need to set up a CORS policy on our server,
// or we can simply just use a middleware called cors that will handle this for us.
// This package is called 'cors' on the NPM registry.
const cors = require('cors');
app.use(cors());
// this will allow requests from any domain to access our server.
// we can also specify which domains are allowed to access our server. (see cors documentation)
// We're doing this because if we don't the browser will block the request.
// This just prevents the browser from blocking the request, by allowing any domain to access our server.

// one common piece of middleware is the express.json() middleware.
// This is used to parse incoming requests with JSON payloads.
// a payload is basically a body of JSON data sent in the request.
// This process simply converts the req.body JSON into JS.
// This middleware is required to access the req.body property.
// Otherwise, req.body will be undefined.
app.use(express.json())
// I now have a req.body.user
// after this middleware runs, we will then have access to the req.body property.
// since middleware runs in the order it is written,
// we need to make sure this middleware is used before any route handlers use req.body.

// You can imaging this middleware working like this:
// app.use((req,res,next)=>{
//     if(req.body){
//         req.body = JSON.parse(req.body)
//     }
//     next()
// })

app.use((req,res, next)=>{
    // example of conditionally running middleware/ending the request-response cycle
    if(req.method === 'DELETE'){
        // if someone makes a POST request, we want to end the request-response cycle
        res.send('DELETE requests are disabled')
    }
    // res.send('Hello World')
    // to send data to the next middelware function,
    // we can add properties/methods to the req and res objects!!!
    req.myMessage = '(from middleware 1)'
    console.log('Middleware 1 running... added ' + req.myMessage)
    next()
})

app.use((req,res,next)=>{
    console.log('Middleware 2 running, adding ' + '(from Middleware 2)')
    req.myMessage += ' (from Middleware 2)'
    next()
})

app.use((req,res,next)=>{
    console.log('Middleware 3 running, adding ' + '(from Middleware 3)')
    req.myMessage += ' (from Middleware 3)'
    // console.log('Middleware stack finished, sending response...')
    console.log('Response: ' + req.myMessage)
    // res.status(200).send(req.myMessage)
    next()
    // Even though this is my last piece of middleware,
    // I'm still going to call next() because if I don't, my routes won't run.
    // if we're not sending some kind of response and we don't call next,
    // the request will be left hanging and a response will never be sent.
    // WE MUST ALWAYS send a response, even if it's an error response.
})

// ------------------------ ROUTES:----------------------------
// to use my userRouter.js router, I need to import it:
const userRouter = require('./routes/userRouter');
// next, I need to tell express to use this router.
app.use('/users', userRouter);
// The reason we don't send a body in a get request is because it's not secure.
// if we're going to send data to the server, we should use a POST request.
// if we need to include information for a get request, we can use query parameters.
// query parameters are included in the URL.
//  http://localhost:8000/users?name=chase


// ------------------------ ERROR HANDLING:----------------------------
// the way we handle errors in express is by using middleware.
// we can create a piece of middleware that has 4 parameters.
// express knows that a piece of middleware with 4 parameters is an error handler.
// our error handler also has to be the LAST piece of middleware in our stack.


// Listen:
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})